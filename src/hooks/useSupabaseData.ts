import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Tool, Tag, Category, Author } from '@/types/tools';

// Fetch all tools
export const useTools = () => {
  return useQuery({
    queryKey: ['tools'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tools')
        .select(`
          *,
          profiles:author_id(*),
          categories:category_id(*),
          tool_tags(tag_id)
        `);

      if (error) throw error;

      // Fetch all tags to map them to tools
      const { data: tagsData, error: tagsError } = await supabase
        .from('tags')
        .select('*');

      if (tagsError) throw tagsError;

      // Transform the data to match our Tool type
      return data.map((tool): Tool => {
        const toolTags = tool.tool_tags.map((tt: { tag_id: string }) => 
          tagsData.find((tag) => tag.id === tt.tag_id)
        ).filter(Boolean);

        return {
          id: tool.id,
          name: tool.name,
          slug: tool.slug,
          description: tool.description,
          imageUrl: tool.image_url,
          author: {
            id: tool.profiles.id,
            name: tool.profiles.name,
            avatar: tool.profiles.avatar,
          },
          category: {
            id: tool.categories.id,
            name: tool.categories.name,
            slug: tool.categories.slug,
          },
          tags: toolTags.map((tag): Tag => ({
            id: tag.id,
            name: tag.name,
            slug: tag.slug,
          })),
          pricing: tool.pricing,
          createdAt: tool.created_at,
          viewCount: tool.view_count,
          likeCount: tool.like_count,
        };
      });
    },
  });
};

// Fetch a specific tool by slug
export const useTool = (slug: string | undefined) => {
  return useQuery({
    queryKey: ['tool', slug],
    queryFn: async () => {
      if (!slug) return null;

      const { data, error } = await supabase
        .from('tools')
        .select(`
          *,
          profiles:author_id(*),
          categories:category_id(*),
          tool_tags(tag_id)
        `)
        .eq('slug', slug)
        .single();

      if (error) throw error;

      // Fetch all tags to map them to the tool
      const { data: tagsData, error: tagsError } = await supabase
        .from('tags')
        .select('*');

      if (tagsError) throw tagsError;

      // Transform the data to match our Tool type
      const toolTags = data.tool_tags.map((tt: { tag_id: string }) => 
        tagsData.find((tag) => tag.id === tt.tag_id)
      ).filter(Boolean);

      return {
        id: data.id,
        name: data.name,
        slug: data.slug,
        description: data.description,
        imageUrl: data.image_url,
        author: {
          id: data.profiles.id,
          name: data.profiles.name,
          avatar: data.profiles.avatar,
        },
        category: {
          id: data.categories.id,
          name: data.categories.name,
          slug: data.categories.slug,
        },
        tags: toolTags.map((tag): Tag => ({
          id: tag.id,
          name: tag.name,
          slug: tag.slug,
        })),
        pricing: data.pricing,
        createdAt: data.created_at,
        viewCount: data.view_count,
        likeCount: data.like_count,
      };
    },
    enabled: !!slug,
  });
};

// Fetch all tags
export const useTags = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tags')
        .select('*');

      if (error) throw error;

      return data.map((tag): Tag => ({
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
      }));
    },
  });
};

// Fetch all categories
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*');

      if (error) throw error;

      return data.map((category): Category => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
      }));
    },
  });
};

// Fetch all developers (profiles)
export const useDevelopers = () => {
  return useQuery({
    queryKey: ['developers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');

      if (error) throw error;

      // Get tool count for each developer
      const { data: toolsData, error: toolsError } = await supabase
        .from('tools')
        .select('id, author_id');

      if (toolsError) throw toolsError;

      return data.map((profile) => {
        const toolsCount = toolsData.filter(tool => tool.author_id === profile.id).length;

        return {
          id: profile.id,
          name: profile.name,
          slug: profile.slug,
          avatar: profile.avatar,
          description: profile.description,
          joinedDate: profile.joined_date,
          toolsCount,
          followersCount: profile.followers_count
        };
      });
    },
  });
};

// Fetch a specific developer by slug
export const useDeveloper = (slug: string | undefined) => {
  return useQuery({
    queryKey: ['developer', slug],
    queryFn: async () => {
      if (!slug) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;

      // Get skills for this developer
      const { data: skillsData, error: skillsError } = await supabase
        .from('profile_skills')
        .select('skill')
        .eq('profile_id', data.id);

      if (skillsError) throw skillsError;

      // Get services for this developer
      const { data: servicesData, error: servicesError } = await supabase
        .from('profile_services')
        .select('service')
        .eq('profile_id', data.id);

      if (servicesError) throw servicesError;

      // Get tools for this developer
      const { data: toolsData, error: toolsError } = await supabase
        .from('tools')
        .select('id')
        .eq('author_id', data.id);

      if (toolsError) throw toolsError;

      return {
        id: data.id,
        name: data.name,
        slug: data.slug,
        avatar: data.avatar,
        description: data.description,
        longDescription: data.long_description,
        joinedDate: data.joined_date,
        location: data.location,
        toolsCount: toolsData.length,
        toolIds: toolsData.map((tool) => tool.id),
        followersCount: data.followers_count,
        likesCount: data.likes_count,
        links: {
          website: data.website,
          github: data.github,
          twitter: data.twitter
        },
        services: servicesData.map((s) => s.service),
        skills: skillsData.map((s) => s.skill)
      };
    },
    enabled: !!slug,
  });
};

// Fetch developer tools by developer slug
export const useDeveloperTools = (developerId: string | undefined) => {
  return useQuery({
    queryKey: ['developerTools', developerId],
    queryFn: async () => {
      if (!developerId) return [];

      const { data, error } = await supabase
        .from('tools')
        .select(`
          *,
          profiles:author_id(*),
          categories:category_id(*),
          tool_tags(tag_id)
        `)
        .eq('author_id', developerId);

      if (error) throw error;

      // Fetch all tags to map them to tools
      const { data: tagsData, error: tagsError } = await supabase
        .from('tags')
        .select('*');

      if (tagsError) throw tagsError;

      // Transform the data to match our Tool type
      return data.map((tool): Tool => {
        const toolTags = tool.tool_tags.map((tt: { tag_id: string }) => 
          tagsData.find((tag) => tag.id === tt.tag_id)
        ).filter(Boolean);

        return {
          id: tool.id,
          name: tool.name,
          slug: tool.slug,
          description: tool.description,
          imageUrl: tool.image_url,
          author: {
            id: tool.profiles.id,
            name: tool.profiles.name,
            avatar: tool.profiles.avatar,
          },
          category: {
            id: tool.categories.id,
            name: tool.categories.name,
            slug: tool.categories.slug,
          },
          tags: toolTags.map((tag): Tag => ({
            id: tag.id,
            name: tag.name,
            slug: tag.slug,
          })),
          pricing: tool.pricing,
          createdAt: tool.created_at,
          viewCount: tool.view_count,
          likeCount: tool.like_count,
        };
      });
    },
    enabled: !!developerId,
  });
};

// Fetch comments for the community page
export const useComments = (categoryId?: string) => {
  return useQuery({
    queryKey: ['comments', categoryId],
    queryFn: async () => {
      let query = supabase
        .from('comments')
        .select(`
          *,
          tools!inner(*),
          profiles:user_id(*)
        `)
        .order('created_at', { ascending: false });
      
      // Filter by category if provided
      if (categoryId) {
        query = query.eq('tools.category_id', categoryId);
      }

      const { data, error } = await query;

      if (error) throw error;

      return data.map((comment) => ({
        id: comment.id,
        content: comment.content,
        createdAt: comment.created_at,
        tool: {
          id: comment.tools.id,
          name: comment.tools.name,
          slug: comment.tools.slug,
        },
        user: {
          id: comment.profiles.id,
          name: comment.profiles.name,
          avatar: comment.profiles.avatar,
        }
      }));
    },
  });
};

// Fetch recent activity (likes & comments)
export const useRecentActivity = (limit = 10) => {
  return useQuery({
    queryKey: ['recentActivity', limit],
    queryFn: async () => {
      // Fetch recent comments
      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select(`
          id,
          content,
          created_at,
          tools!inner(id, name, slug),
          profiles:user_id(id, name, avatar)
        `)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (commentsError) throw commentsError;

      // Fetch recent likes
      const { data: likesData, error: likesError } = await supabase
        .from('likes')
        .select(`
          created_at,
          tools!inner(id, name, slug),
          profiles:user_id(id, name, avatar)
        `)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (likesError) throw likesError;

      // Combine and sort by date
      const comments = commentsData.map((comment: any) => ({
        id: comment.id,
        type: 'comment' as const,
        createdAt: comment.created_at,
        content: comment.content,
        tool: {
          id: comment.tools.id,
          name: comment.tools.name,
          slug: comment.tools.slug,
        },
        user: {
          id: comment.profiles.id,
          name: comment.profiles.name,
          avatar: comment.profiles.avatar,
        }
      }));

      const likes = likesData.map((like: any) => ({
        id: `${like.profiles.id}-${like.tools.id}`,
        type: 'like' as const,
        createdAt: like.created_at,
        tool: {
          id: like.tools.id,
          name: like.tools.name,
          slug: like.tools.slug,
        },
        user: {
          id: like.profiles.id,
          name: like.profiles.name,
          avatar: like.profiles.avatar, // Ensure this property exists
        }
      }));

      // Combine and sort by date
      return [...comments, ...likes].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ).slice(0, limit);
    },
  });
};
