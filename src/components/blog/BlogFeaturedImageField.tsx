
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ImageUploader } from './ImageUploader';
import { useState } from 'react';
import { Control } from 'react-hook-form';
import { BlogFormValues } from './BlogEditorForm';

interface BlogFeaturedImageFieldProps {
  control: Control<BlogFormValues>;
  initialImage?: string;
}

const BlogFeaturedImageField = ({ control, initialImage }: BlogFeaturedImageFieldProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(initialImage || null);

  return (
    <FormField
      control={control}
      name="featured_image"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Featured Image</FormLabel>
          <ImageUploader
            previewImage={previewImage}
            onImageSelected={(imageUrl) => {
              field.onChange(imageUrl);
              setPreviewImage(imageUrl);
            }}
            onImageRemoved={() => {
              setPreviewImage(null);
              field.onChange('');
            }}
            imageUrl={field.value}
            onChange={field.onChange}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BlogFeaturedImageField;
