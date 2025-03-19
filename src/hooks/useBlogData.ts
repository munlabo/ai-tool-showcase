
// This file is kept for backward compatibility
// It re-exports all the blog hooks from the new organization

import { 
  useQueryBlogPost, 
  useQueryBlogPosts,
  useQueryBlogTags,
  useQueryBlogCategories,
  useCreateBlogPost,
  useUpdateBlogPost, 
  useDeleteBlogPost 
} from './blog';

// Maintain the old exports with the same names
export const useBlogPost = useQueryBlogPost;
export const useBlogPosts = useQueryBlogPosts;
export const useBlogTags = useQueryBlogTags;
export const useBlogCategories = useQueryBlogCategories;
export const useCreateBlogPost = useCreateBlogPost;
export const useUpdateBlogPost = useUpdateBlogPost;
export const useDeleteBlogPost = useDeleteBlogPost;
