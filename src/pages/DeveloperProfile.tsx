
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import { mockTools } from "@/data/mockTools";
import ProfileLoading from "@/components/developer/ProfileLoading";
import ProfileNotFound from "@/components/developer/ProfileNotFound";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Users, MapPin, Github, Twitter, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(date);
};

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
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar - Left Column */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Avatar className="h-32 w-32 border-4 border-muted mt-4">
                  <AvatarImage src={developer.avatar} alt={developer.name} />
                  <AvatarFallback>{developer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <h2 className="text-2xl font-bold mt-4">{developer.name}</h2>
                
                <div className="flex items-center text-muted-foreground mt-1 justify-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{developer.location}</span>
                </div>
                
                <p className="text-sm text-muted-foreground mt-2">
                  Joined {formatDate(developer.joinedDate)}
                </p>
                
                <div className="flex flex-col w-full gap-3 mt-6">
                  <Button>
                    <Mail className="mr-2 h-4 w-4" /> Contact
                  </Button>
                  <Button variant="outline">
                    <Users className="mr-2 h-4 w-4" /> Follow
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Links */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-3">Links</h3>
                <div className="space-y-3">
                  {developer.links.website && (
                    <a 
                      href={developer.links.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      <span className="text-sm">Website</span>
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
                      <span className="text-sm">GitHub</span>
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
                      <span className="text-sm">Twitter</span>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Stats */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-3">Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-2 rounded-md bg-secondary">
                    <p className="text-lg font-bold">{developer.toolsCount}</p>
                    <p className="text-xs text-muted-foreground">Tools</p>
                  </div>
                  <div className="text-center p-2 rounded-md bg-secondary">
                    <p className="text-lg font-bold">{developer.followersCount}</p>
                    <p className="text-xs text-muted-foreground">Followers</p>
                  </div>
                  <div className="text-center p-2 rounded-md bg-secondary">
                    <p className="text-lg font-bold">{developer.likesCount}</p>
                    <p className="text-xs text-muted-foreground">Likes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content - Right Column */}
          <div className="md:col-span-3">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h1 className="text-3xl font-bold mb-2">{developer.name}</h1>
                <p className="text-muted-foreground mb-4">{developer.description}</p>
                <Separator className="my-4" />
                <p className="text-sm">{developer.longDescription}</p>
              </CardContent>
            </Card>
            
            {/* Skills & Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {developer.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-3">Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {developer.services.map((service, index) => (
                      <Badge key={index}>
                        {service}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Tabs for Tools and Activities */}
            <Tabs defaultValue="tools" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="tools">Tools ({developer.toolsCount})</TabsTrigger>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
              </TabsList>
              
              <TabsContent value="tools">
                <div className="grid grid-cols-1 gap-4">
                  {isLoadingTools ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="h-24 rounded-lg bg-gray-100 animate-pulse"></div>
                    ))
                  ) : developerTools?.length ? (
                    developerTools.map((tool) => (
                      <Card key={tool.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium">{tool.name}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
                            </div>
                            <Button size="sm" variant="outline" asChild>
                              <a href={`/tools/${tool.slug}`}>View Tool</a>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No tools found.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="activity">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="border-l-2 border-primary pl-4 py-2">
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
        </div>
      </div>
    </Layout>
  );
};

export default DeveloperProfile;
