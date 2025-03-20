
import { useState } from 'react';
import { Image, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useStorage } from '@/hooks/useStorage';

interface ImageUploaderProps {
  previewImage: string | null;
  onImageSelected: (imageUrl: string) => void;
  onImageRemoved: () => void;
  imageUrl?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageUploader = ({
  previewImage,
  onImageSelected,
  onImageRemoved,
  imageUrl = '',
  onChange
}: ImageUploaderProps) => {
  const [uploadLoading, setUploadLoading] = useState(false);
  const { uploadFile } = useStorage();

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
      const imageUrl = await uploadFile('blog-images', file);
      if (imageUrl) {
        onImageSelected(imageUrl);
        toast.success('Image uploaded successfully');
      }
    } catch (error: any) {
      toast.error(`Error uploading image: ${error.message}`);
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {previewImage && (
        <div className="relative w-full h-48 rounded-md overflow-hidden bg-muted">
          <img 
            src={previewImage} 
            alt="Featured" 
            className="w-full h-full object-cover" 
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={onImageRemoved}
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
          value={imageUrl}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
