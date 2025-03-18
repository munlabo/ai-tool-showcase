
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ProfileNotFound = () => {
  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="text-center py-16">
          <h1 className="text-4xl font-bold mb-4">Developer Not Found</h1>
          <p className="text-muted-foreground mb-8">The developer you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/tools-developers">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Developers
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileNotFound;
