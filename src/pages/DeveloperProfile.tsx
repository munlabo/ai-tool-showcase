
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Users, Calendar, Mail, ExternalLink, MapPin, Github, Twitter, Link as LinkIcon, Tool } from "lucide-react";
import ToolCard from "@/components/tools/ToolCard";
import { Tool as ToolType } from "@/types/tools";
import { mockTools } from "@/data/mockTools";

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
  }

  if (!developer) {
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
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2">
            <CardContent className="p-6 flex flex-col md:flex-row gap-6">
              <Avatar className="h-24 w-24 border-4 border-muted">
                <AvatarImage src={developer.avatar} alt={developer.name} />
                <AvatarFallback>{developer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl font-bold">{developer.name}</h1>
                  <div className="flex items-center text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{developer.location}</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground">{developer.longDescription}</p>
                
                <div className="flex flex-wrap gap-2">
                  <Button>
                    <Mail className="mr-2 h-4 w-4" /> Contact
                  </Button>
                  <Button variant="outline">
                    <Users className="mr-2 h-4 w-4" /> Follow
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                <Heart className="h-8 w-8 text-brand-purple mb-2" />
                <span className="text-2xl font-bold">{developer.likesCount.toLocaleString()}</span>
                <span className="text-muted-foreground text-sm">Likes</span>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                <Users className="h-8 w-8 text-brand-purple mb-2" />
                <span className="text-2xl font-bold">{developer.followersCount.toLocaleString()}</span>
                <span className="text-muted-foreground text-sm">Followers</span>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                <Tool className="h-8 w-8 text-brand-purple mb-2" />
                <span className="text-2xl font-bold">{developer.toolsCount}</span>
                <span className="text-muted-foreground text-sm">Tools</span>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                <Calendar className="h-8 w-8 text-brand-purple mb-2" />
                <span className="text-sm font-semibold">Joined</span>
                <span className="text-muted-foreground text-xs text-center">
                  {formatDate(developer.joinedDate)}
                </span>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Links & Skills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {developer.links.website && (
                <a 
                  href={developer.links.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <LinkIcon className="h-4 w-4 mr-2" />
                  <span>Personal Website</span>
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              )}
              {developer.links.github && (
                <a 
                  href={developer.links.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-4 w-4 mr-2" />
                  <span>GitHub</span>
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              )}
              {developer.links.twitter && (
                <a 
                  href={developer.links.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  <span>Twitter</span>
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {developer.services.map((service, index) => (
                  <Badge key={index} variant="secondary">
                    {service}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {developer.skills.map((skill, index) => (
                  <Badge key={index}>
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Developer's Tools */}
        <Tabs defaultValue="tools" className="w-full mt-8">
          <TabsList className="mb-6">
            <TabsTrigger value="tools">Tools ({developer.toolsCount})</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tools">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoadingTools ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-64 rounded-lg bg-gray-100 animate-pulse"></div>
                ))
              ) : developerTools?.length ? (
                developerTools.map((tool: ToolType) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-muted-foreground">No tools found.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="activity">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="border-l-2 border-brand-purple pl-4 py-2">
                    <p className="text-sm text-muted-foreground">2 days ago</p>
                    <p>Updated <span className="font-medium">AI Text Summarizer</span> with new features</p>
                  </div>
                  <div className="border-l-2 border-muted pl-4 py-2">
                    <p className="text-sm text-muted-foreground">1 week ago</p>
                    <p>Released new tool <span className="font-medium">Language Detector AI</span></p>
                  </div>
                  <div className="border-l-2 border-muted pl-4 py-2">
                    <p className="text-sm text-muted-foreground">2 weeks ago</p>
                    <p>Commented on <span className="font-medium">ImageGen AI</span></p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="comments">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">Jane Smith</h4>
                        <span className="text-xs text-muted-foreground">3 days ago</span>
                      </div>
                      <p className="text-sm mt-1">Your AI Text Summarizer tool is amazing! It's saved me hours of work already.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="https://i.pravatar.cc/150?img=23" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">Robert Chen</h4>
                        <span className="text-xs text-muted-foreground">1 week ago</span>
                      </div>
                      <p className="text-sm mt-1">Would love to see an API for the Image Generator tool. Any plans for that?</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DeveloperProfile;
