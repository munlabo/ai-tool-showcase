
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';

interface BlogFormActionsProps {
  isPending: boolean;
  isPublished: boolean;
}

const BlogFormActions = ({ isPending, isPublished }: BlogFormActionsProps) => {
  return (
    <Button 
      type="submit"
      disabled={isPending}
      className="w-full md:w-auto"
    >
      <Save className="mr-2 h-4 w-4" />
      Save {isPublished ? 'Post' : 'Draft'}
    </Button>
  );
};

export default BlogFormActions;
