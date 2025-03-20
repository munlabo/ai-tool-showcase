
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BlogEditorHeaderProps {
  isEditMode: boolean;
}

const BlogEditorHeader = ({ isEditMode }: BlogEditorHeaderProps) => {
  return (
    <div>
      <Link to="/admin/blog" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-2">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to All Posts
      </Link>
      <h1 className="text-3xl font-bold">
        {isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}
      </h1>
    </div>
  );
};

export default BlogEditorHeader;
