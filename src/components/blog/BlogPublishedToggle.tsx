
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Control } from 'react-hook-form';
import { BlogFormValues } from './BlogEditorForm';

interface BlogPublishedToggleProps {
  control: Control<BlogFormValues>;
}

const BlogPublishedToggle = ({ control }: BlogPublishedToggleProps) => {
  return (
    <FormField
      control={control}
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
  );
};

export default BlogPublishedToggle;
