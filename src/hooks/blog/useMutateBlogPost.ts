
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { BlogPost } from '@/types/blog';
import { toast } from 'sonner';

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
