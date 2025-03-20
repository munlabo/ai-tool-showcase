
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { BlogPost } from '@/types/blog';

// Get a single blog post by slug
export const useQueryBlogPost = (slug: string | undefined) => {
  return useQuery({
    queryKey: ['blogPost', slug],
    queryFn: async () => {
      if (!slug) return null;

      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          profiles:author_id(id, name, avatar),
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

      const authorData = data.profiles || null;

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
        author: authorData ? {
          id: authorData.id,
          name: authorData.name,
          avatar: authorData.avatar,
        } : undefined,
      };
    },
    enabled: !!slug,
  });
};
