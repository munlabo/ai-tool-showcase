
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useTool, useCategories, useTags } from '@/hooks/useSupabaseData';
import Layout from '@/components/layout/Layout';

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category_id: z.string().min(1, 'Category is required'),
  image_url: z.string().url('Must be a valid URL').optional(),
  pricing: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

type FormValues = z.infer<typeof formSchema>;

const ToolEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const { user, profile } = useAuth();
  
  const [uploadLoading, setUploadLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  
  const { data: tool, isLoading: toolLoading } = useTool(id);
  const { data: categories = [] } = useCategories();
  const { data: tags = [] } = useTags();
  
  // Create form with validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      category_id: '',
      image_url: '',
      pricing: 'Free',
      tags: [],
    },
  });

  // Update form when tool data is loaded
  useEffect(() => {
    if (isEditMode && tool) {
      form.reset({
        name: tool.name,
        slug: tool.slug,
        description: tool.description,
        category_id: tool.category.id,
        image_url: tool.imageUrl || '',
        pricing: tool.pricing || 'Free',
        tags: tool.tags.map(tag => tag.id),
      });
      setPreviewImage(tool.imageUrl);
      setCurrentTags(tool.tags.map(tag => tag.id));
    }
  }, [tool, form, isEditMode]);

  // Auto-generate slug from name (only if slug is empty)
  const autoGenerateSlug = (name: string) => {
    const currentSlug = form.getValues('slug');
    if (!currentSlug || currentSlug === '') {
      const slug = name.toLowerCase()
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
        .from('tool-images')
        .upload(`public/${fileName}`, file);
        
      if (error) throw error;
      
      // Get public URL for the uploaded image
      const { data: publicURL } = supabase.storage
        .from('tool-images')
        .getPublicUrl(`public/${fileName}`);
        
      form.setValue('image_url', publicURL.publicUrl);
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
  
  const removeTag = (tagId: string) => {
    const newTags = currentTags.filter(t => t !== tagId);
    setCurrentTags(newTags);
    form.setValue('tags', newTags);
  };

  // Form submission handler
  const onSubmit = async (values: FormValues) => {
    try {
      if (!user) {
        toast.error('You must be logged in to create or edit a tool');
        return;
      }

      if (isEditMode && tool) {
        // Update existing tool
        const { error } = await supabase
          .from('tools')
          .update({
            name: values.name,
            slug: values.slug,
            description: values.description,
            category_id: values.category_id,
            image_url: values.image_url || null,
            pricing: values.pricing || 'Free',
            updated_at: new Date().toISOString(),
          })
          .eq('id', tool.id);

        if (error) throw error;

        // Delete existing tag associations
        const { error: deleteError } = await supabase
          .from('tool_tags')
          .delete()
          .eq('tool_id', tool.id);

        if (deleteError) throw deleteError;

        // Add new tag associations
        if (values.tags && values.tags.length > 0) {
          const tagInserts = values.tags.map(tagId => ({
            tool_id: tool.id,
            tag_id: tagId
          }));

          const { error: insertError } = await supabase
            .from('tool_tags')
            .insert(tagInserts);

          if (insertError) throw insertError;
        }

        toast.success('Tool updated successfully');
        navigate('/dashboard/tools');
      } else {
        // Create new tool
        const { data: newTool, error } = await supabase
          .from('tools')
          .insert({
            name: values.name,
            slug: values.slug,
            description: values.description,
            category_id: values.category_id,
            image_url: values.image_url || null,
            pricing: values.pricing || 'Free',
            author_id: user.id,
          })
          .select()
          .single();

        if (error) throw error;

        // Add tag associations
        if (values.tags && values.tags.length > 0) {
          const tagInserts = values.tags.map(tagId => ({
            tool_id: newTool.id,
            tag_id: tagId
          }));

          const { error: insertError } = await supabase
            .from('tool_tags')
            .insert(tagInserts);

          if (insertError) throw insertError;
        }

        toast.success('Tool created successfully');
        navigate('/dashboard/tools');
      }
    } catch (error: any) {
      toast.error(`Error saving tool: ${error.message}`);
    }
  };

  if (toolLoading && isEditMode) {
    return (
      <Layout>
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-6 bg-muted rounded w-1/4"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12 bg-background">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <Link to="/dashboard/tools" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-2">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to My Tools
              </Link>
              <h1 className="text-3xl font-bold">
                {isEditMode ? 'Edit Tool' : 'Add New Tool'}
              </h1>
            </div>
            <Button 
              onClick={form.handleSubmit(onSubmit)}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Tool
            </Button>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter tool name" 
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
                          placeholder="tool-slug" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Category */}
                <FormField
                  control={form.control}
                  name="category_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Pricing */}
                <FormField
                  control={form.control}
                  name="pricing"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pricing</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select pricing" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Free">Free</SelectItem>
                          <SelectItem value="Freemium">Freemium</SelectItem>
                          <SelectItem value="Paid">Paid</SelectItem>
                          <SelectItem value="Enterprise">Enterprise</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Tags */}
                <div className="space-y-2">
                  <FormLabel>Tags</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {currentTags.map((tagId, idx) => {
                      const tagName = tags.find(t => t.id === tagId)?.name || tagId;
                      return (
                        <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                          {tagName}
                          <button 
                            type="button" 
                            onClick={() => removeTag(tagId)}
                            className="rounded-full hover:bg-primary/20 p-1"
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove tag</span>
                          </button>
                        </Badge>
                      );
                    })}
                  </div>
                  <div className="flex">
                    <Select onValueChange={setTagInput}>
                      <SelectTrigger className="rounded-r-none flex-1">
                        <SelectValue placeholder="Select a tag" />
                      </SelectTrigger>
                      <SelectContent>
                        {tags.map(tag => (
                          <SelectItem key={tag.id} value={tag.id}>
                            {tag.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tool Image</FormLabel>
                      <div className="space-y-4">
                        {previewImage && (
                          <div className="relative w-full h-48 rounded-md overflow-hidden bg-muted">
                            <img 
                              src={previewImage} 
                              alt="Tool" 
                              className="w-full h-full object-cover" 
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2"
                              onClick={() => {
                                setPreviewImage(null);
                                form.setValue('image_url', '');
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
                
                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your tool..." 
                          {...field} 
                          rows={8}
                        />
                      </FormControl>
                      <FormMessage />
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

export default ToolEditor;
