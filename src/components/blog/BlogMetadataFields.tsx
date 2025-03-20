
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Control } from 'react-hook-form';
import { BlogFormValues } from './BlogEditorForm';

interface BlogMetadataFieldsProps {
  control: Control<BlogFormValues>;
  handleTitleChange: (title: string) => void;
}

const BlogMetadataFields = ({ control, handleTitleChange }: BlogMetadataFieldsProps) => {
  return (
    <>
      {/* Title */}
      <FormField
        control={control}
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
                  handleTitleChange(e.target.value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Slug */}
      <FormField
        control={control}
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
        control={control}
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
    </>
  );
};

export default BlogMetadataFields;
