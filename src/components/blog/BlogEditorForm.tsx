import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Image, X, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  useCreateBlogPost, 
  useUpdateBlogPost 
} from '@/hooks/useBlogData';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/types/blog';
import { ImageUploader } from './ImageUploader';
import TagManager from './TagManager';
import CategoryCreator from '@/components/shared/CategoryCreator';
import TagCreator from '@/components/shared/TagCreator';

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
  
  const [previewImage, setPreviewImage] = useState<string | null>(null);
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

  // Handle image selection
  const handleImageSelected = (imageUrl: string) => {
    form.setValue('featured_image', imageUrl);
    setPreviewImage(imageUrl);
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

  // Handle new tag creation
  const handleTagCreated = (tag: { id: string; name: string }) => {
    const newTags = [...currentTags, tag.name];
    setCurrentTags(newTags);
    form.setValue('tags', newTags);
    toast.success(`Tag "${tag.name}" added to post`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter post title" 
                  {...field} 
                  onChange={(e) => {
                    field.onChange(e);
                    autoGenerateSlug(e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Slug */}
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input 
                  placeholder="enter-post-slug" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Excerpt */}
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Brief summary of the post" 
                  {...field} 
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Tags */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <FormLabel>Tags</FormLabel>
            <TagCreator 
              table="blog_tags"
              onTagCreated={handleTagCreated}
            />
          </div>
          <TagManager 
            initialTags={currentTags}
            onTagsChange={handleTagsChange}
          />
        </div>
        
        {/* Featured Image */}
        <FormField
          control={form.control}
          name="featured_image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Featured Image</FormLabel>
              <ImageUploader
                previewImage={previewImage}
                onImageSelected={handleImageSelected}
                onImageRemoved={() => {
                  setPreviewImage(null);
                  form.setValue('featured_image', '');
                }}
                imageUrl={field.value}
                onChange={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Content */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Write your post content here..." 
                  {...field} 
                  rows={15}
                  className="font-mono"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Published Toggle */}
        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  {field.value ? 'Published' : 'Draft'}
                </FormLabel>
                <p className="text-sm text-muted-foreground">
                  {field.value
                    ? 'This post is live and visible to all users'
                    : 'This post is a draft and only visible to administrators'}
                </p>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <Button 
          type="submit"
          disabled={createMutation.isPending || updateMutation.isPending}
          className="w-full md:w-auto"
        >
          <Save className="mr-2 h-4 w-4" />
          Save {form.getValues('published') ? 'Post' : 'Draft'}
        </Button>
      </form>
    </Form>
  );
};

export default BlogEditorForm;
