
export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  author: Author;
  category: Category;
  tags: Tag[];
  pricing: string;
  createdAt: string;
  viewCount: number;
  likeCount: number;
}
