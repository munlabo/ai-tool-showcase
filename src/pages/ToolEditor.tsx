
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTool } from '@/hooks/useSupabaseData';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/layout/Layout';
import ToolEditorForm from '@/components/tools/ToolEditorForm';
import ToolFormActions from '@/components/tools/ToolFormActions';

const ToolEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const { user } = useAuth();
  
  const { data: tool, isLoading: toolLoading } = useTool(id);
  const [formKey, setFormKey] = useState(0);

  // Submit handler (triggers the form submission)
  const handleFormSubmit = () => {
    // This will increment the key to force a re-render of the form
    // and the form's onSubmit handler will be called
    setFormKey(prev => prev + 1);
    const submitButton = document.querySelector('form button[type="submit"]');
    if (submitButton) {
      (submitButton as HTMLButtonElement).click();
    }
  };

  if (toolLoading && isEditMode) {
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
            <div>
              <Link to="/dashboard/tools" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-2">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to My Tools
              </Link>
              <h1 className="text-3xl font-bold">
                {isEditMode ? 'Edit Tool' : 'Add New Tool'}
              </h1>
            </div>
            <ToolFormActions 
              isEditMode={isEditMode}
              onSubmit={handleFormSubmit}
            />
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            {user && (
              <ToolEditorForm 
                key={formKey}
                tool={tool}
                userId={user.id}
                isEditMode={isEditMode}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ToolEditor;
