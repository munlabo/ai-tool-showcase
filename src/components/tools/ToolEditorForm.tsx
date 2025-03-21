
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import ToolMetadataFields from './ToolMetadataFields';
import ToolCategoryField from './ToolCategoryField';
import ToolPricingField from './ToolPricingField';
import ToolTagsSection from './ToolTagsSection';
import ToolImageField from './ToolImageField';
import ToolDescriptionField from './ToolDescriptionField';
import { Tool } from '@/types/tools';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category_id: z.string().min(1, 'Category is required'),
  image_url: z.string().url('Must be a valid URL').optional(),
  pricing: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

export type ToolFormValues = z.infer<typeof formSchema>;

interface ToolEditorFormProps {
  tool?: Tool;
  userId: string;
  isEditMode: boolean;
}

const ToolEditorForm = ({ tool, userId, isEditMode }: ToolEditorFormProps) => {
  const navigate = useNavigate();
  const [currentTags, setCurrentTags] = useState<string[]>([]);

  // Create form with validation
  const form = useForm<ToolFormValues>({
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

  // Form submission handler
  const onSubmit = async (values: ToolFormValues) => {
    try {
      if (!userId) {
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
            author_id: userId,
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

  const handleTagsChange = (newTags: string[]) => {
    setCurrentTags(newTags);
    form.setValue('tags', newTags);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Tool Name and Slug */}
        <ToolMetadataFields 
          control={form.control} 
          autoGenerateSlug={autoGenerateSlug} 
        />
        
        {/* Category */}
        <ToolCategoryField 
          control={form.control} 
        />
        
        {/* Pricing */}
        <ToolPricingField 
          control={form.control} 
        />
        
        {/* Tags */}
        <ToolTagsSection 
          currentTags={currentTags}
          onTagsChange={handleTagsChange}
        />
        
        {/* Image */}
        <ToolImageField 
          control={form.control} 
        />
        
        {/* Description */}
        <ToolDescriptionField 
          control={form.control} 
        />
      </form>
    </Form>
  );
};

export default ToolEditorForm;
