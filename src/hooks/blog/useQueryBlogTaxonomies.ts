
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { BlogCategory, BlogTag } from '@/types/blog';

// Get all blog tags
export const useQueryBlogTags = () => {
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
export const useQueryBlogCategories = () => {
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
