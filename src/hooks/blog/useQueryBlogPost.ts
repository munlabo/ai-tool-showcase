
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { BlogPost } from '@/types/blog';

// Get a single blog post by slug
export const useQueryBlogPost = (slug: string | undefined) => {
  return useQuery({
    queryKey: ['blogPost', slug],
    queryFn: async () => {
      if (!slug) return null;

      // First fetch the blog post
      const { data: post, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;

      // Fetch tags for this post
      const { data: postTagsData, error: postTagsError } = await supabase
        .from('blog_post_tags')
        .select('tag_id')
        .eq('post_id', post.id);

      if (postTagsError) throw postTagsError;

      // Fetch all tags to map them to the post
      const { data: tagsData, error: tagsError } = await supabase
        .from('blog_tags')
        .select('*');

      if (tagsError) throw tagsError;

      // Fetch author profile
      const { data: authorData, error: authorError } = await supabase
        .from('profiles')
        .select('id, name, avatar')
        .eq('id', post.author_id)
        .maybeSingle();

      if (authorError) throw authorError;

      // Map tags to post
      const postTags = postTagsData
        ? postTagsData.map((tt) => 
            tagsData.find((tag) => tag.id === tt.tag_id)?.name
          ).filter(Boolean)
        : [];

      // Create the final blog post object
      const blogPost: BlogPost = {
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
        featured: post.featured || false
      };

      // Add author if available
      if (authorData) {
        blogPost.author = {
          id: authorData.id,
          name: authorData.name,
          avatar: authorData.avatar
        };
      }

      return blogPost;
    },
    enabled: !!slug,
  });
};
