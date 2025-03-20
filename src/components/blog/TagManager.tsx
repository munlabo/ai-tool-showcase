
import { useState } from 'react';
import { Tag, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FormLabel } from '@/components/ui/form';

interface TagManagerProps {
  initialTags: string[];
  onTagsChange: (tags: string[]) => void;
}

const TagManager = ({ initialTags = [], onTagsChange }: TagManagerProps) => {
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(initialTags);

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      onTagsChange(newTags);
      setTagInput('');
    }
  };
  
  const removeTag = (tag: string) => {
    const newTags = tags.filter(t => t !== tag);
    setTags(newTags);
    onTagsChange(newTags);
  };

  return (
    <div className="space-y-2">
      <FormLabel>Tags</FormLabel>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, idx) => (
          <Badge key={idx} variant="secondary" className="flex items-center gap-1">
            {tag}
            <button 
              type="button" 
              onClick={() => removeTag(tag)}
              className="rounded-full hover:bg-primary/20 p-1"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove tag</span>
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex">
        <Input
          placeholder="Add a tag"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
          className="rounded-r-none"
        />
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

export default TagManager;
