
import { Tool, Tag, Category } from "@/types/tools";

export const mockTags: Tag[] = [
  { id: "tag1", name: "GPT", slug: "gpt" },
  { id: "tag2", name: "Image Generation", slug: "image-generation" },
  { id: "tag3", name: "Text to Speech", slug: "text-to-speech" },
  { id: "tag4", name: "Data Analysis", slug: "data-analysis" },
  { id: "tag5", name: "Content Creation", slug: "content-creation" },
  { id: "tag6", name: "Coding Assistant", slug: "coding-assistant" },
  { id: "tag7", name: "Productivity", slug: "productivity" },
  { id: "tag8", name: "Audio Processing", slug: "audio-processing" },
  { id: "tag9", name: "Customer Support", slug: "customer-support" },
];

export const mockCategories: Category[] = [
  { id: "cat1", name: "Language Models", slug: "language-models" },
  { id: "cat2", name: "Creative Tools", slug: "creative-tools" },
  { id: "cat3", name: "Business Tools", slug: "business-tools" },
  { id: "cat4", name: "Developer Tools", slug: "developer-tools" },
  { id: "cat5", name: "Productivity Tools", slug: "productivity-tools" },
];

const authors = [
  { 
    id: "author1", 
    name: "Alex Johnson", 
    avatar: "/placeholder.svg" 
  },
  { 
    id: "author2", 
    name: "Sarah Parker", 
    avatar: "/placeholder.svg" 
  },
  { 
    id: "author3", 
    name: "Mike Zhang", 
    avatar: "/placeholder.svg" 
  },
];

export const mockTools: Tool[] = [
  {
    id: "tool1",
    name: "TextCraft AI",
    slug: "textcraft-ai",
    description: "Advanced text generation and content creation tool powered by GPT-4.",
    imageUrl: "/placeholder.svg",
    author: authors[0],
    category: mockCategories[0],
    tags: [mockTags[0], mockTags[4]],
    pricing: "Freemium",
    createdAt: "2023-09-15",
    viewCount: 1250,
    likeCount: 342
  },
  {
    id: "tool2",
    name: "PixelGenius",
    slug: "pixel-genius",
    description: "AI image generator that creates stunning visuals from text descriptions.",
    imageUrl: "/placeholder.svg",
    author: authors[1],
    category: mockCategories[1],
    tags: [mockTags[1], mockTags[4]],
    pricing: "Paid",
    createdAt: "2023-10-02",
    viewCount: 980,
    likeCount: 248
  },
  {
    id: "tool3",
    name: "CodeWizard",
    slug: "code-wizard",
    description: "AI coding assistant that helps developers write better code faster.",
    imageUrl: "/placeholder.svg",
    author: authors[2],
    category: mockCategories[3],
    tags: [mockTags[5], mockTags[6]],
    pricing: "Free",
    createdAt: "2023-08-28",
    viewCount: 1530,
    likeCount: 410
  },
  {
    id: "tool4",
    name: "VoiceForge",
    slug: "voice-forge",
    description: "Text-to-speech tool that generates natural-sounding voices in multiple languages.",
    imageUrl: "/placeholder.svg",
    author: authors[0],
    category: mockCategories[1],
    tags: [mockTags[2], mockTags[7]],
    pricing: "Paid",
    createdAt: "2023-07-12",
    viewCount: 860,
    likeCount: 195
  },
  {
    id: "tool5",
    name: "DataInsight",
    slug: "data-insight",
    description: "AI-powered data analysis tool that transforms complex data into actionable insights.",
    imageUrl: "/placeholder.svg",
    author: authors[1],
    category: mockCategories[2],
    tags: [mockTags[3], mockTags[6]],
    pricing: "Freemium",
    createdAt: "2023-09-05",
    viewCount: 720,
    likeCount: 163
  },
  {
    id: "tool6",
    name: "SupportBot",
    slug: "support-bot",
    description: "AI customer support chatbot that handles inquiries and resolves issues automatically.",
    imageUrl: "/placeholder.svg",
    author: authors[2],
    category: mockCategories[2],
    tags: [mockTags[0], mockTags[8]],
    pricing: "Paid",
    createdAt: "2023-10-18",
    viewCount: 540,
    likeCount: 127
  },
  {
    id: "tool7",
    name: "TaskMaster",
    slug: "task-master",
    description: "AI productivity assistant that helps manage tasks, schedules, and workflows.",
    imageUrl: "/placeholder.svg",
    author: authors[0],
    category: mockCategories[4],
    tags: [mockTags[6], mockTags[0]],
    pricing: "Freemium",
    createdAt: "2023-08-10",
    viewCount: 905,
    likeCount: 231
  },
  {
    id: "tool8",
    name: "ImageTranslator",
    slug: "image-translator",
    description: "AI tool that extracts and translates text from images across multiple languages.",
    imageUrl: "/placeholder.svg",
    author: authors[1],
    category: mockCategories[4],
    tags: [mockTags[1], mockTags[0]],
    pricing: "Free",
    createdAt: "2023-09-22",
    viewCount: 670,
    likeCount: 152
  },
];
