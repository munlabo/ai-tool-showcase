
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { BlogPost } from '@/types/blog';

// Get all blog posts
export const useQueryBlogPosts = (limit = 10, featured = false, categorySlug?: string) => {
  return useQuery({
    queryKey: ['blogPosts', limit, featured, categorySlug],
    queryFn: async () => {
      let query = supabase
        .from('blog_posts')
        .select(`
          *,
          profiles:author_id(id, name, avatar),
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

      if (limit > 0) {
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

        const authorData = post.profiles || null;

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
          author: authorData ? {
            id: authorData.id,
            name: authorData.name,
            avatar: authorData.avatar,
          } : undefined,
        };
      });
    },
  });
};
