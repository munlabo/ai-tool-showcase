
// This file is kept for backward compatibility
// It re-exports all the blog hooks from the new organization

import { 
  useQueryBlogPost, 
  useQueryBlogPosts,
  useQueryBlogTags,
  useQueryBlogCategories,
  useCreateBlogPost as createBlogPost,
  useUpdateBlogPost as updateBlogPost, 
  useDeleteBlogPost as deleteBlogPost 
} from './blog';

// Re-export with the legacy names
export const useBlogPost = useQueryBlogPost;
export const useBlogPosts = useQueryBlogPosts;
export const useBlogTags = useQueryBlogTags;
export const useBlogCategories = useQueryBlogCategories;
export const useCreateBlogPost = createBlogPost;
export const useUpdateBlogPost = updateBlogPost;
export const useDeleteBlogPost = deleteBlogPost;
