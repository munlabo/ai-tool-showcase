
import { Control } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ToolFormValues } from './ToolEditorForm';

interface ToolMetadataFieldsProps {
  control: Control<ToolFormValues>;
  autoGenerateSlug: (name: string) => void;
}

const ToolMetadataFields = ({ control, autoGenerateSlug }: ToolMetadataFieldsProps) => {
  return (
    <>
      {/* Name */}
      <FormField
        control={control}
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
        control={control}
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
    </>
  );
};

export default ToolMetadataFields;
