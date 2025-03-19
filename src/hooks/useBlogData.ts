import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { BlogPost, BlogCategory, BlogTag } from '@/types/blog';
import { toast } from 'sonner';

// Get all blog posts
export const useBlogPosts = (limit = 10, featured = false, categorySlug?: string) => {
  return useQuery({
    queryKey: ['blogPosts', limit, featured, categorySlug],
    queryFn: async () => {
      let query = supabase
        .from('blog_posts')
        .select(`
          *,
          author:profiles(id, name, avatar),
          blog_post_tags(tag_id)
        `)
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (featured) {
        query = query.eq('featured', true);
      }

      if (categorySlug) {
        query = query.eq('category_slug', categorySlug);
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Fetch all tags to map them to posts
      const { data: tagsData, error: tagsError } = await supabase
        .from('blog_tags')
        .select('*');

      if (tagsError) throw tagsError;

      return data.map((post): BlogPost => {
        const postTags = post.blog_post_tags
          ? post.blog_post_tags.map((tt: { tag_id: string }) => 
              tagsData.find((tag) => tag.id === tt.tag_id)?.name
            ).filter(Boolean)
          : [];

        return {
          id: post.id,
          title: post.title,
          slug: post.slug,
          content: post.content,
          excerpt: post.excerpt,
          featured_image: post.featured_image,
          author_id: post.author_id,
          published: post.published,
          created_at: post.created_at,
          updated_at: post.updated_at,
          tags: postTags,
          author: post.author ? {
            id: post.author.id,
            name: post.author.name,
            avatar: post.author.avatar,
          } : undefined,
        };
      });
    },
  });
};

// Get a single blog post by slug
export const useBlogPost = (slug: string | undefined) => {
  return useQuery({
    queryKey: ['blogPost', slug],
    queryFn: async () => {
      if (!slug) return null;

      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          author:profiles(id, name, avatar),
          blog_post_tags(tag_id)
        `)
        .eq('slug', slug)
        .single();

      if (error) throw error;

      // Fetch all tags to map them to the post
      const { data: tagsData, error: tagsError } = await supabase
        .from('blog_tags')
        .select('*');

      if (tagsError) throw tagsError;

      const postTags = data.blog_post_tags
        ? data.blog_post_tags.map((tt: { tag_id: string }) => 
            tagsData.find((tag) => tag.id === tt.tag_id)?.name
          ).filter(Boolean)
        : [];

      return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        featured_image: data.featured_image,
        author_id: data.author_id,
        published: data.published,
        created_at: data.created_at,
        updated_at: data.updated_at,
        tags: postTags,
        author: data.author ? {
          id: data.author.id,
          name: data.author.name,
          avatar: data.author.avatar,
        } : undefined,
      };
    },
    enabled: !!slug,
  });
};

// Create a new blog post
export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (postData: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => {
      // First, insert the post
      const { data: post, error: postError } = await supabase
        .from('blog_posts')
        .insert({
          title: postData.title,
          slug: postData.slug,
          content: postData.content,
          excerpt: postData.excerpt,
          featured_image: postData.featured_image,
          author_id: postData.author_id,
          published: postData.published,
        })
        .select()
        .single();

      if (postError) throw postError;

      // Then, add tags if any
      if (postData.tags && postData.tags.length > 0) {
        const tagInserts = postData.tags.map(async (tagName) => {
          // First check if tag exists
          const { data: existingTag, error: tagError } = await supabase
            .from('blog_tags')
            .select('id')
            .eq('name', tagName)
            .maybeSingle();

          if (tagError) throw tagError;

          let tagId;
          
          // If tag doesn't exist, create it
          if (!existingTag) {
            const slug = tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const { data: newTag, error: newTagError } = await supabase
              .from('blog_tags')
              .insert({ name: tagName, slug })
              .select()
              .single();
              
            if (newTagError) throw newTagError;
            tagId = newTag.id;
          } else {
            tagId = existingTag.id;
          }

          // Associate tag with post
          const { error: linkError } = await supabase
            .from('blog_post_tags')
            .insert({ post_id: post.id, tag_id: tagId });

          if (linkError) throw linkError;
        });

        await Promise.all(tagInserts);
      }

      return post;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      toast.success('Blog post created successfully');
    },
    onError: (error) => {
      toast.error(`Error creating blog post: ${error.message}`);
    },
  });
};

// Update a blog post
export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...postData }: BlogPost) => {
      // Update the post
      const { error: postError } = await supabase
        .from('blog_posts')
        .update({
          title: postData.title,
          slug: postData.slug,
          content: postData.content,
          excerpt: postData.excerpt,
          featured_image: postData.featured_image,
          published: postData.published,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (postError) throw postError;

      // Delete all existing tag associations
      const { error: deleteError } = await supabase
        .from('blog_post_tags')
        .delete()
        .eq('post_id', id);

      if (deleteError) throw deleteError;

      // Add new tags
      if (postData.tags && postData.tags.length > 0) {
        const tagInserts = postData.tags.map(async (tagName) => {
          // First check if tag exists
          const { data: existingTag, error: tagError } = await supabase
            .from('blog_tags')
            .select('id')
            .eq('name', tagName)
            .maybeSingle();

          if (tagError) throw tagError;

          let tagId;
          
          // If tag doesn't exist, create it
          if (!existingTag) {
            const slug = tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const { data: newTag, error: newTagError } = await supabase
              .from('blog_tags')
              .insert({ name: tagName, slug })
              .select()
              .single();
              
            if (newTagError) throw newTagError;
            tagId = newTag.id;
          } else {
            tagId = existingTag.id;
          }

          // Associate tag with post
          const { error: linkError } = await supabase
            .from('blog_post_tags')
            .insert({ post_id: id, tag_id: tagId });

          if (linkError) throw linkError;
        });

        await Promise.all(tagInserts);
      }

      return { id, ...postData };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      queryClient.invalidateQueries({ queryKey: ['blogPost', data.slug] });
      toast.success('Blog post updated successfully');
    },
    onError: (error) => {
      toast.error(`Error updating blog post: ${error.message}`);
    },
  });
};

// Delete a blog post
export const useDeleteBlogPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      toast.success('Blog post deleted successfully');
    },
    onError: (error) => {
      toast.error(`Error deleting blog post: ${error.message}`);
    },
  });
};

// Get all blog tags
export const useBlogTags = () => {
  return useQuery({
    queryKey: ['blogTags'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_tags')
        .select('*')
        .order('name');

      if (error) throw error;

      return data.map((tag): BlogTag => ({
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
      }));
    },
  });
};

// Get all blog categories
export const useBlogCategories = () => {
  return useQuery({
    queryKey: ['blogCategories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name');

      if (error) throw error;

      return data.map((category): BlogCategory => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
      }));
    },
  });
};
