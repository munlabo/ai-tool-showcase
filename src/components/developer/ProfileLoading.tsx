
import Layout from "@/components/layout/Layout";

const ProfileLoading = () => {
  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-48 bg-gray-100 rounded-xl"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="h-64 bg-gray-100 rounded-xl"></div>
            <div className="h-64 bg-gray-100 rounded-xl"></div>
            <div className="h-64 bg-gray-100 rounded-xl"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileLoading;
