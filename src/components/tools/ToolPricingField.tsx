
import { Control } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToolFormValues } from './ToolEditorForm';

interface ToolPricingFieldProps {
  control: Control<ToolFormValues>;
}

const ToolPricingField = ({ control }: ToolPricingFieldProps) => {
  return (
    <FormField
      control={control}
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
  );
};

export default ToolPricingField;
