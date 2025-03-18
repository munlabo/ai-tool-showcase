
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import { Tool as ToolType } from "@/types/tools";
import { mockTools } from "@/data/mockTools";
import ProfileHero from "@/components/developer/ProfileHero";
import ProfileStats from "@/components/developer/ProfileStats";
import ProfileLinks from "@/components/developer/ProfileLinks";
import ProfileSkillsServices from "@/components/developer/ProfileSkillsServices";
import ProfileTabs from "@/components/developer/ProfileTabs";
import ProfileLoading from "@/components/developer/ProfileLoading";
import ProfileNotFound from "@/components/developer/ProfileNotFound";

// This would come from your Supabase database in a real app
const mockDevelopers = [
  {
    id: "1",
    name: "Alex Johnson",
    slug: "alex-johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    description: "AI researcher and developer specializing in natural language processing tools",
    longDescription: "With over 8 years of experience in machine learning and natural language processing, I build AI tools that help businesses automate content creation and analysis. My focus is on creating accessible and ethical AI solutions that solve real-world problems.",
    joinedDate: "2022-03-15",
    location: "San Francisco, CA",
    toolsCount: 8,
    toolIds: ["1", "2", "5", "8", "11", "14", "17", "20"],
    followersCount: 245,
    likesCount: 1892,
    links: {
      website: "https://alexjohnson.dev",
      github: "https://github.com/alexjohnson",
      twitter: "https://twitter.com/alexjohnson"
    },
    services: ["AI Consulting", "Custom Tool Development", "NLP Implementation"],
    skills: ["Python", "TensorFlow", "NLP", "React", "Node.js", "PostgreSQL"]
  },
  {
    id: "2",
    name: "Maria Garcia",
    slug: "maria-garcia",
    avatar: "https://i.pravatar.cc/150?img=5",
    description: "Full-stack developer focused on building accessible AI tools for education",
    longDescription: "I'm passionate about making education more accessible through AI. As a former teacher turned developer, I understand the challenges educators face and build tools that empower them to create better learning experiences for students of all abilities.",
    joinedDate: "2022-01-22",
    location: "Austin, TX",
    toolsCount: 5,
    toolIds: ["3", "6", "9", "12", "15"],
    followersCount: 178,
    likesCount: 923,
    links: {
      website: "https://mariagarcia.io",
      github: "https://github.com/mariagarcia",
      twitter: "https://twitter.com/mariagarcia"
    },
    services: ["EdTech Consulting", "LMS Integration", "Accessibility Audits"],
    skills: ["JavaScript", "React", "Node.js", "Accessibility", "UX Design", "MongoDB"]
  }
];

const DeveloperProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // In a real app, these would fetch from Supabase
  const { data: developer, isLoading: isLoadingDeveloper } = useQuery({
    queryKey: ['developer', slug],
    queryFn: () => Promise.resolve(mockDevelopers.find(dev => dev.slug === slug)),
  });
  
  const { data: developerTools, isLoading: isLoadingTools } = useQuery({
    queryKey: ['developerTools', slug],
    queryFn: () => {
      if (!developer) return Promise.resolve([]);
      return Promise.resolve(
        mockTools.filter(tool => developer.toolIds.includes(tool.id))
      );
    },
    enabled: !!developer,
  });

  if (isLoadingDeveloper) {
    return <ProfileLoading />;
  }

  if (!developer) {
    return <ProfileNotFound />;
  }

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section with Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ProfileHero developer={developer} />
          <ProfileStats 
            likesCount={developer.likesCount}
            followersCount={developer.followersCount}
            toolsCount={developer.toolsCount}
            joinedDate={developer.joinedDate}
          />
        </div>
        
        {/* Links & Skills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ProfileLinks links={developer.links} />
          <ProfileSkillsServices 
            services={developer.services} 
            skills={developer.skills} 
          />
        </div>
        
        {/* Developer's Tools */}
        <ProfileTabs 
          toolsCount={developer.toolsCount}
          developerTools={developerTools}
          isLoadingTools={isLoadingTools}
        />
      </div>
    </Layout>
  );
};

export default DeveloperProfile;
