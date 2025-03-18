
import Layout from "@/components/layout/Layout";

const ProfileNotFound = () => {
  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="text-center py-16">
          <h1 className="text-4xl font-bold mb-4">Developer Not Found</h1>
          <p className="text-muted-foreground">The developer you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileNotFound;
