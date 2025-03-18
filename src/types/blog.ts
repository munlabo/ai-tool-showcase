
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  author_id: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  tags: string[];
  author?: {
    id: string;
    name: string;
    avatar: string;
  };
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
}
