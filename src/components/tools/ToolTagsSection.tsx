
import { useState } from 'react';
import { X, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FormLabel } from '@/components/ui/form';
import TagCreator from '@/components/shared/TagCreator';
import { useTags } from '@/hooks/useSupabaseData';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ToolTagsSectionProps {
  currentTags: string[];
  onTagsChange: (tags: string[]) => void;
}

const ToolTagsSection = ({ currentTags, onTagsChange }: ToolTagsSectionProps) => {
  const { data: tags = [] } = useTags();
  const [tagInput, setTagInput] = useState('');
  const [, setRefreshTrigger] = useState(0);

  const addTag = () => {
    if (tagInput.trim() && !currentTags.includes(tagInput.trim())) {
      const newTags = [...currentTags, tagInput.trim()];
      onTagsChange(newTags);
      setTagInput('');
    }
  };
  
  const removeTag = (tagId: string) => {
    const newTags = currentTags.filter(t => t !== tagId);
    onTagsChange(newTags);
  };

  const handleTagCreated = (tag: { id: string; name: string }) => {
    // Add the new tag to the current tags
    if (!currentTags.includes(tag.id)) {
      onTagsChange([...currentTags, tag.id]);
    }
    // This will cause the component to re-render and fetch the updated tags
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <FormLabel>Tags</FormLabel>
        <TagCreator onTagCreated={handleTagCreated} />
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {currentTags.map((tagId, idx) => {
          const tagName = tags.find(t => t.id === tagId)?.name || tagId;
          return (
            <Badge key={idx} variant="secondary" className="flex items-center gap-1">
              {tagName}
              <button 
                type="button" 
                onClick={() => removeTag(tagId)}
                className="rounded-full hover:bg-primary/20 p-1"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove tag</span>
              </button>
            </Badge>
          );
        })}
      </div>
      <div className="flex">
        <Select onValueChange={setTagInput}>
          <SelectTrigger className="rounded-r-none flex-1">
            <SelectValue placeholder="Select a tag" />
          </SelectTrigger>
          <SelectContent>
            {tags.map(tag => (
              <SelectItem key={tag.id} value={tag.id}>
                {tag.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button 
          type="button" 
          onClick={addTag}
          className="rounded-l-none"
        >
          <Tag className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>
    </div>
  );
};

export default ToolTagsSection;
