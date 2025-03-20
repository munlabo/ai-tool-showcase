
import { Textarea } from '@/components/ui/textarea';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Control } from 'react-hook-form';
import { BlogFormValues } from './BlogEditorForm';

interface BlogContentFieldProps {
  control: Control<BlogFormValues>;
}

const BlogContentField = ({ control }: BlogContentFieldProps) => {
  return (
    <FormField
      control={control}
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
  );
};

export default BlogContentField;
