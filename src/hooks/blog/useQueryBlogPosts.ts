
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { BlogPost } from '@/types/blog';

// Get all blog posts
export const useQueryBlogPosts = (limit = 10, featured = false, categorySlug?: string) => {
  return useQuery({
    queryKey: ['blogPosts', limit, featured, categorySlug],
    queryFn: async () => {
      // Fetch blog posts
      let query = supabase
        .from('blog_posts')
        .select('*')
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

      const { data: posts, error } = await query;

      if (error) throw error;

      // Fetch all post-tag relationships for these posts
      const postIds = posts.map(post => post.id);
      const { data: postTagsData, error: postTagsError } = await supabase
        .from('blog_post_tags')
        .select('post_id, tag_id')
        .in('post_id', postIds);

      if (postTagsError) throw postTagsError;

      // Fetch all tags
      const { data: tagsData, error: tagsError } = await supabase
        .from('blog_tags')
        .select('*');

      if (tagsError) throw tagsError;

      // Fetch all authors in one query
      const authorIds = posts.map(post => post.author_id);
      const { data: authorsData, error: authorsError } = await supabase
        .from('profiles')
        .select('id, name, avatar')
        .in('id', authorIds);

      if (authorsError) throw authorsError;

      // Map posts to BlogPost objects
      return posts.map((post): BlogPost => {
        // Find tags for this post
        const postTagIds = postTagsData
          ? postTagsData
              .filter(pt => pt.post_id === post.id)
              .map(pt => pt.tag_id)
          : [];

        const postTags = postTagIds
          .map(tagId => {
            const tag = tagsData.find(t => t.id === tagId);
            return tag ? tag.name : null;
          })
          .filter(Boolean) as string[];

        // Find author for this post
        const author = authorsData?.find(a => a.id === post.author_id);

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
        if (author) {
          blogPost.author = {
            id: author.id,
            name: author.name,
            avatar: author.avatar
          };
        }

        return blogPost;
      });
    },
  });
};
