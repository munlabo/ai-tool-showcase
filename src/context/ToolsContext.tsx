
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Tool, Tag, Category } from "@/types/tools";
import { useTools, useTags, useCategories } from "@/hooks/useSupabaseData";

interface ToolsContextType {
  tools: Tool[];
  filteredTools: Tool[];
  tags: Tag[];
  categories: Category[];
  selectedTags: string[];
  selectedCategories: string[];
  searchQuery: string;
  isLoading: boolean;
  setSearchQuery: (query: string) => void;
  toggleTag: (tagId: string) => void;
  toggleCategory: (categoryId: string) => void;
  resetFilters: () => void;
}

const ToolsContext = createContext<ToolsContextType | undefined>(undefined);

export const useTools = () => {
  const context = useContext(ToolsContext);
  if (!context) {
    throw new Error("useTools must be used within a ToolsProvider");
  }
  return context;
};

export const ToolsProvider = ({ children }: { children: ReactNode }) => {
  const { data: supabaseTools, isLoading: isLoadingTools } = useSupabaseData.useTools();
  const { data: supaTags, isLoading: isLoadingTags } = useSupabaseData.useTags();
  const { data: supaCategories, isLoading: isLoadingCategories } = useSupabaseData.useCategories();
  
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const isLoading = isLoadingTools || isLoadingTags || isLoadingCategories;
  const tools = supabaseTools || [];
  const tags = supaTags || [];
  const categories = supaCategories || [];

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId) 
        : [...prev, tagId]
    );
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  };

  const resetFilters = () => {
    setSelectedTags([]);
    setSelectedCategories([]);
    setSearchQuery("");
  };

  // Filter tools based on selected tags, categories, and search query
  const filteredTools = tools.filter(tool => {
    // Search filter
    const searchMatch = searchQuery === "" || 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Tags filter
    const tagMatch = selectedTags.length === 0 || 
      tool.tags.some(tag => selectedTags.includes(tag.id));
    
    // Category filter
    const categoryMatch = selectedCategories.length === 0 || 
      selectedCategories.includes(tool.category.id);
    
    return searchMatch && tagMatch && categoryMatch;
  });

  const value = {
    tools,
    filteredTools,
    tags,
    categories,
    selectedTags,
    selectedCategories,
    searchQuery,
    isLoading,
    setSearchQuery,
    toggleTag,
    toggleCategory,
    resetFilters
  };

  return (
    <ToolsContext.Provider value={value}>
      {children}
    </ToolsContext.Provider>
  );
};
