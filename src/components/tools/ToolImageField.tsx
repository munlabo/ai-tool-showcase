
import { useState, useEffect } from 'react';
import { Image, X } from 'lucide-react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { Control } from 'react-hook-form';
import { ToolFormValues } from './ToolEditorForm';
import { useStorage } from '@/hooks/useStorage';

interface ToolImageFieldProps {
  control: Control<ToolFormValues>;
}

const ToolImageField = ({ control }: ToolImageFieldProps) => {
  const [uploadLoading, setUploadLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { uploadFile } = useStorage();

  // Initialize preview image from form value
  useEffect(() => {
    const currentValue = control._formValues.image_url;
    if (currentValue) {
      setPreviewImage(currentValue);
    }
  }, [control._formValues.image_url]);

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }
    
    setUploadLoading(true);
    
    try {
      const publicUrl = await uploadFile('tool-images', file);
      
      if (!publicUrl) {
        throw new Error('Failed to get public URL');
      }
      
      setPreviewImage(publicUrl);
      toast.success('Image uploaded successfully');
    } catch (error: any) {
      toast.error(`Error uploading image: ${error.message}`);
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <FormField
      control={control}
      name="image_url"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tool Image</FormLabel>
          <div className="space-y-4">
            {previewImage && (
              <div className="relative w-full h-48 rounded-md overflow-hidden bg-muted">
                <img 
                  src={previewImage} 
                  alt="Tool" 
                  className="w-full h-full object-cover" 
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setPreviewImage(null);
                    field.onChange('');
                  }}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            )}
            
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('image-upload')?.click()}
                disabled={uploadLoading}
              >
                <Image className="mr-2 h-4 w-4" />
                {uploadLoading ? 'Uploading...' : 'Upload Image'}
              </Button>
              <Input
                id="image-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <Input
                placeholder="Or enter image URL"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  setPreviewImage(e.target.value);
                }}
              />
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ToolImageField;
