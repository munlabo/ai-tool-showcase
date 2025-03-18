
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Image, X, Tag } from 'lucide-react';
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
  useBlogPost, 
  useCreateBlogPost, 
  useUpdateBlogPost 
} from '@/hooks/useBlogData';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  featured_image: z.string().url('Must be a valid URL').optional(),
  published: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
});

const BlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [uploadLoading, setUploadLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  
  const { data: blogPost, isLoading: postLoading } = useBlogPost(id || '');
  const createMutation = useCreateBlogPost();
  const updateMutation = useUpdateBlogPost();
  
  // Create form with validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featured_image: '',
      published: false,
      tags: [],
    },
  });

  // Check if user is authenticated and has admin role
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // In a real app, you'd check if the user has the admin role
        // For now, we'll just set isAdmin to true if user is authenticated
        setIsAdmin(true);
      } else {
        navigate('/login');
      }
    };
    
    checkAuth();
  }, [navigate]);

  // Update form when blog post data is loaded
  useEffect(() => {
    if (isEditMode && blogPost) {
      form.reset({
        title: blogPost.title,
        slug: blogPost.slug,
        excerpt: blogPost.excerpt,
        content: blogPost.content,
        featured_image: blogPost.featured_image,
        published: blogPost.published,
        tags: blogPost.tags,
      });
      setPreviewImage(blogPost.featured_image);
      setCurrentTags(blogPost.tags || []);
    }
  }, [blogPost, form, isEditMode]);

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

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }
    
    setUploadLoading(true);
    
    try {
      // Upload to Supabase Storage
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(`public/${fileName}`, file);
        
      if (error) throw error;
      
      // Get public URL for the uploaded image
      const { data: publicURL } = supabase.storage
        .from('blog-images')
        .getPublicUrl(`public/${fileName}`);
        
      form.setValue('featured_image', publicURL.publicUrl);
      setPreviewImage(publicURL.publicUrl);
      toast.success('Image uploaded successfully');
    } catch (error: any) {
      toast.error(`Error uploading image: ${error.message}`);
    } finally {
      setUploadLoading(false);
    }
  };

  // Handle tag operations
  const addTag = () => {
    if (tagInput.trim() && !currentTags.includes(tagInput.trim())) {
      const newTags = [...currentTags, tagInput.trim()];
      setCurrentTags(newTags);
      form.setValue('tags', newTags);
      setTagInput('');
    }
  };
  
  const removeTag = (tag: string) => {
    const newTags = currentTags.filter(t => t !== tag);
    setCurrentTags(newTags);
    form.setValue('tags', newTags);
  };

  // Form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isEditMode && blogPost) {
      await updateMutation.mutateAsync({
        ...values,
        id: blogPost.id,
        author_id: blogPost.author_id,
        created_at: blogPost.created_at,
        updated_at: new Date().toISOString(),
      });
      navigate('/admin/blog');
    } else {
      // We need the user's ID for the author_id field
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        toast.error('You must be logged in to create a blog post');
        return;
      }
      
      await createMutation.mutateAsync({
        ...values,
        author_id: session.user.id,
      });
      navigate('/admin/blog');
    }
  };

  if (!isAdmin) {
    return null; // We're redirecting in the useEffect
  }

  return (
    <Layout>
      <div className="py-12 bg-background">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <Link to="/admin/blog" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-2">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Posts
              </Link>
              <h1 className="text-3xl font-bold">
                {isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}
              </h1>
            </div>
            <Button 
              onClick={form.handleSubmit(onSubmit)}
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              <Save className="mr-2 h-4 w-4" />
              Save {form.getValues('published') ? 'Post' : 'Draft'}
            </Button>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
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
                  <FormLabel>Tags</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {currentTags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button 
                          type="button" 
                          onClick={() => removeTag(tag)}
                          className="rounded-full hover:bg-primary/20 p-1"
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove tag</span>
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex">
                    <Input
                      placeholder="Add a tag"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      className="rounded-r-none"
                    />
                    <Button 
                      type="button" 
                      onClick={addTag}
                      className="rounded-l-none"
                    >
                      <Tag className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
                
                {/* Featured Image */}
                <FormField
                  control={form.control}
                  name="featured_image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Featured Image</FormLabel>
                      <div className="space-y-4">
                        {previewImage && (
                          <div className="relative w-full h-48 rounded-md overflow-hidden bg-muted">
                            <img 
                              src={previewImage} 
                              alt="Featured" 
                              className="w-full h-full object-cover" 
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2"
                              onClick={() => {
                                setPreviewImage(null);
                                form.setValue('featured_image', '');
                              }}
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                        )}
                        
                        <div className="flex gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById('image-upload')?.click()}
                            disabled={uploadLoading}
                          >
                            <Image className="mr-2 h-4 w-4" />
                            {uploadLoading ? 'Uploading...' : 'Upload Image'}
                          </Button>
                          <Input
                            id="image-upload"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                          <Input
                            placeholder="Or enter image URL"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setPreviewImage(e.target.value);
                            }}
                          />
                        </div>
                      </div>
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
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogEditor;
