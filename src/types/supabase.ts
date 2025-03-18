
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      tools: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          image_url: string
          author_id: string
          category_id: string
          pricing: string
          created_at: string
          view_count: number
          like_count: number
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description: string
          image_url: string
          author_id: string
          category_id: string
          pricing: string
          created_at?: string
          view_count?: number
          like_count?: number
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          image_url?: string
          author_id?: string
          category_id?: string
          pricing?: string
          created_at?: string
          view_count?: number
          like_count?: number
        }
      }
      profiles: {
        Row: {
          id: string
          name: string
          slug: string
          avatar: string
          description: string
          long_description: string
          joined_date: string
          location: string
          website: string | null
          github: string | null
          twitter: string | null
          followers_count: number
          likes_count: number
        }
        Insert: {
          id: string
          name: string
          slug: string
          avatar: string
          description: string
          long_description?: string
          joined_date?: string
          location?: string
          website?: string | null
          github?: string | null
          twitter?: string | null
          followers_count?: number
          likes_count?: number
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          avatar?: string
          description?: string
          long_description?: string
          joined_date?: string
          location?: string
          website?: string | null
          github?: string | null
          twitter?: string | null
          followers_count?: number
          likes_count?: number
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          slug: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
        }
      }
      tool_tags: {
        Row: {
          tool_id: string
          tag_id: string
        }
        Insert: {
          tool_id: string
          tag_id: string
        }
        Update: {
          tool_id?: string
          tag_id?: string
        }
      }
      profile_skills: {
        Row: {
          profile_id: string
          skill: string
        }
        Insert: {
          profile_id: string
          skill: string
        }
        Update: {
          profile_id?: string
          skill?: string
        }
      }
      profile_services: {
        Row: {
          profile_id: string
          service: string
        }
        Insert: {
          profile_id: string
          service: string
        }
        Update: {
          profile_id?: string
          service?: string
        }
      }
      comments: {
        Row: {
          id: string
          tool_id: string
          user_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          tool_id: string
          user_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          tool_id?: string
          user_id?: string
          content?: string
          created_at?: string
        }
      }
      likes: {
        Row: {
          user_id: string
          tool_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          tool_id: string
          created_at?: string
        }
        Update: {
          user_id?: string
          tool_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
