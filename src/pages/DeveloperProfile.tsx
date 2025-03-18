
import { useParams } from "react-router-dom";
import { useDeveloper, useDeveloperTools } from "@/hooks/useSupabaseData";
import Layout from "@/components/layout/Layout";
import ProfileLoading from "@/components/developer/ProfileLoading";
import ProfileNotFound from "@/components/developer/ProfileNotFound";
import ProfileHero from "@/components/developer/ProfileHero";
import ProfileLinks from "@/components/developer/ProfileLinks";
import ProfileStats from "@/components/developer/ProfileStats";
import ProfileSkillsServices from "@/components/developer/ProfileSkillsServices";
import ProfileTabs from "@/components/developer/ProfileTabs";

const DeveloperProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Fetch developer data from Supabase
  const { data: developer, isLoading: isLoadingDeveloper } = useDeveloper(slug);
  
  // Fetch developer tools from Supabase
  const { data: developerTools, isLoading: isLoadingTools } = useDeveloperTools(
    developer?.id
  );

  if (isLoadingDeveloper) {
    return <ProfileLoading />;
  }

  if (!developer) {
    return <ProfileNotFound />;
  }

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar - Left Column */}
          <div className="md:col-span-1 space-y-6">
            <ProfileHero developer={developer} />
            <ProfileLinks links={developer.links} />
            <ProfileStats 
              toolsCount={developer.toolsCount} 
              followersCount={developer.followersCount} 
              likesCount={developer.likesCount} 
            />
          </div>
          
          {/* Main Content - Right Column */}
          <div className="md:col-span-3">
            <ProfileSkillsServices 
              longDescription={developer.longDescription}
              description={developer.description}
              skills={developer.skills} 
              services={developer.services} 
            />
            
            <ProfileTabs 
              developer={developer}
              tools={developerTools || []}
              isLoadingTools={isLoadingTools}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DeveloperProfile;
