
import { Control } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { ToolFormValues } from './ToolEditorForm';

interface ToolDescriptionFieldProps {
  control: Control<ToolFormValues>;
}

const ToolDescriptionField = ({ control }: ToolDescriptionFieldProps) => {
  return (
    <FormField
      control={control}
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
  );
};

export default ToolDescriptionField;
