
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ToolFormActionsProps {
  isEditMode: boolean;
  onSubmit: () => void;
}

const ToolFormActions = ({ isEditMode, onSubmit }: ToolFormActionsProps) => {
  return (
    <Button 
      onClick={onSubmit}
      type="button"
    >
      <Save className="mr-2 h-4 w-4" />
      {isEditMode ? 'Update Tool' : 'Save Tool'}
    </Button>
  );
};

export default ToolFormActions;
