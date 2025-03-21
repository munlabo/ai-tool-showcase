
import { Control } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCategories } from '@/hooks/useSupabaseData';
import CategoryCreator from '@/components/shared/CategoryCreator';
import { useState } from 'react';
import { ToolFormValues } from './ToolEditorForm';

interface ToolCategoryFieldProps {
  control: Control<ToolFormValues>;
}

const ToolCategoryField = ({ control }: ToolCategoryFieldProps) => {
  const { data: categories = [] } = useCategories();
  const [, setRefreshTrigger] = useState(0);

  const handleCategoryCreated = (category: { id: string; name: string }) => {
    // This will cause the component to re-render and fetch the updated categories
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <FormField
      control={control}
      name="category_id"
      render={({ field }) => (
        <FormItem>
          <div className="flex justify-between items-center">
            <FormLabel>Category</FormLabel>
            <CategoryCreator 
              onCategoryCreated={handleCategoryCreated}
            />
          </div>
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
  );
};

export default ToolCategoryField;
