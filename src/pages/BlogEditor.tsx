
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlogPost } from '@/hooks/useBlogData';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/lib/supabase';
import BlogEditorForm from '@/components/blog/BlogEditorForm';
import BlogEditorHeader from '@/components/blog/BlogEditorHeader';

const BlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const { data: blogPost, isLoading: postLoading } = useBlogPost(id || '');
  
  // Check if user is authenticated and has admin role
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // In a real app, you'd check if the user has the admin role
        // For now, we'll just set isAdmin to true if user is authenticated
        setIsAdmin(true);
      } else {
        navigate('/login');
      }
    };
    
    checkAuth();
  }, [navigate]);

  if (!isAdmin) {
    return null; // We're redirecting in the useEffect
  }

  if (postLoading && isEditMode) {
    return (
      <Layout>
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-6 bg-muted rounded w-1/4"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12 bg-background">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <BlogEditorHeader isEditMode={isEditMode} />
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <BlogEditorForm 
              blogPost={blogPost} 
              isEditMode={isEditMode} 
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogEditor;
