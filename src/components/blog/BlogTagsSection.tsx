
import { FormLabel } from '@/components/ui/form';
import TagCreator from '@/components/shared/TagCreator';
import TagManager from './TagManager';

interface BlogTagsSectionProps {
  currentTags: string[];
  onTagsChange: (tags: string[]) => void;
}

const BlogTagsSection = ({ currentTags, onTagsChange }: BlogTagsSectionProps) => {
  const handleTagCreated = (tag: { id: string; name: string }) => {
    const newTags = [...currentTags, tag.name];
    onTagsChange(newTags);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <FormLabel>Tags</FormLabel>
        <TagCreator 
          table="blog_tags"
          onTagCreated={handleTagCreated}
        />
      </div>
      <TagManager 
        initialTags={currentTags}
        onTagsChange={onTagsChange}
      />
    </div>
  );
};

export default BlogTagsSection;
