
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  useCreateBlogPost, 
  useUpdateBlogPost 
} from '@/hooks/useBlogData';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { BlogPost } from '@/types/blog';
import BlogMetadataFields from './BlogMetadataFields';
import BlogTagsSection from './BlogTagsSection';
import BlogFeaturedImageField from './BlogFeaturedImageField';
import BlogContentField from './BlogContentField';
import BlogPublishedToggle from './BlogPublishedToggle';
import BlogFormActions from './BlogFormActions';

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  featured_image: z.string().url('Must be a valid URL').optional(),
  published: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type BlogFormValues = z.infer<typeof formSchema>;

interface BlogEditorFormProps {
  blogPost?: BlogPost | null;
  isEditMode: boolean;
}

const BlogEditorForm = ({ blogPost, isEditMode }: BlogEditorFormProps) => {
  const navigate = useNavigate();
  const [currentTags, setCurrentTags] = useState<string[]>(blogPost?.tags || []);
  
  const createMutation = useCreateBlogPost();
  const updateMutation = useUpdateBlogPost();
  
  // Create form with validation
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: blogPost?.title || '',
      slug: blogPost?.slug || '',
      excerpt: blogPost?.excerpt || '',
      content: blogPost?.content || '',
      featured_image: blogPost?.featured_image || '',
      published: blogPost?.published || false,
      tags: blogPost?.tags || [],
    },
  });

  // Auto-generate slug from title (only if slug is empty)
  const autoGenerateSlug = (title: string) => {
    const currentSlug = form.getValues('slug');
    if (!currentSlug || currentSlug === '') {
      const slug = title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      form.setValue('slug', slug);
    }
  };

  // Handle tag operations
  const handleTagsChange = (newTags: string[]) => {
    setCurrentTags(newTags);
    form.setValue('tags', newTags);
  };

  // Form submission handler
  const onSubmit = async (values: BlogFormValues) => {
    try {
      if (isEditMode && blogPost) {
        await updateMutation.mutateAsync({
          id: blogPost.id,
          author_id: blogPost.author_id,
          created_at: blogPost.created_at,
          updated_at: new Date().toISOString(),
          title: values.title,
          slug: values.slug,
          excerpt: values.excerpt,
          content: values.content,
          featured_image: values.featured_image || '',
          published: values.published,
          tags: values.tags || [],
        });
        toast.success('Blog post updated successfully');
        navigate('/admin/blog');
      } else {
        // We need the user's ID for the author_id field
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          toast.error('You must be logged in to create a blog post');
          return;
        }
        
        await createMutation.mutateAsync({
          author_id: session.user.id,
          title: values.title,
          slug: values.slug,
          excerpt: values.excerpt,
          content: values.content,
          featured_image: values.featured_image || '',
          published: values.published,
          tags: values.tags || [],
        });
        toast.success('Blog post created successfully');
        navigate('/admin/blog');
      }
    } catch (error: any) {
      toast.error(`Error saving blog post: ${error.message}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <BlogMetadataFields 
          control={form.control} 
          handleTitleChange={autoGenerateSlug} 
        />
        
        <BlogTagsSection 
          currentTags={currentTags} 
          onTagsChange={handleTagsChange} 
        />
        
        <BlogFeaturedImageField 
          control={form.control} 
          initialImage={blogPost?.featured_image} 
        />
        
        <BlogContentField control={form.control} />
        
        <BlogPublishedToggle control={form.control} />
        
        <BlogFormActions 
          isPending={createMutation.isPending || updateMutation.isPending} 
          isPublished={form.getValues('published')} 
        />
      </form>
    </Form>
  );
};

export default BlogEditorForm;
