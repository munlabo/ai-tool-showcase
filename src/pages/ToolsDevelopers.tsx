
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search, ExternalLink } from "lucide-react";

// This would come from your Supabase database
const mockDevelopers = [
  {
    id: "1",
    name: "Alex Johnson",
    slug: "alex-johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    description: "AI researcher and developer specializing in natural language processing tools",
    joinedDate: "2022-03-15",
    toolsCount: 8,
    followersCount: 245
  },
  {
    id: "2",
    name: "Maria Garcia",
    slug: "maria-garcia",
    avatar: "https://i.pravatar.cc/150?img=5",
    description: "Full-stack developer focused on building accessible AI tools for education",
    joinedDate: "2022-01-22",
    toolsCount: 5,
    followersCount: 178
  },
  {
    id: "3",
    name: "James Wilson",
    slug: "james-wilson",
    avatar: "https://i.pravatar.cc/150?img=3",
    description: "Former Google engineer building AI tools for productivity and automation",
    joinedDate: "2021-11-30",
    toolsCount: 12,
    followersCount: 562
  },
  {
    id: "4",
    name: "Sophie Chen",
    slug: "sophie-chen",
    avatar: "https://i.pravatar.cc/150?img=9",
    description: "AI ethicist and developer creating responsible AI tools for businesses",
    joinedDate: "2023-02-18",
    toolsCount: 3,
    followersCount: 127
  },
  {
    id: "5",
    name: "David Kim",
    slug: "david-kim",
    avatar: "https://i.pravatar.cc/150?img=8",
    description: "Machine learning specialist developing computer vision applications",
    joinedDate: "2021-09-05",
    toolsCount: 6,
    followersCount: 310
  },
  {
    id: "6",
    name: "Emily Roberts",
    slug: "emily-roberts",
    avatar: "https://i.pravatar.cc/150?img=11",
    description: "AI startup founder specializing in content generation tools",
    joinedDate: "2022-08-12",
    toolsCount: 4,
    followersCount: 215
  },
  {
    id: "7",
    name: "Michael Wong",
    slug: "michael-wong",
    avatar: "https://i.pravatar.cc/150?img=6",
    description: "Data scientist working on predictive analytics tools for businesses",
    joinedDate: "2023-01-07",
    toolsCount: 2,
    followersCount: 98
  },
  {
    id: "8",
    name: "Sarah Johnson",
    slug: "sarah-johnson",
    avatar: "https://i.pravatar.cc/150?img=2",
    description: "UX designer and developer focused on human-centered AI tools",
    joinedDate: "2022-05-19",
    toolsCount: 7,
    followersCount: 286
  }
];

const ToolsDevelopers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // In a real app, this would fetch from Supabase
  const { data: developers, isLoading } = useQuery({
    queryKey: ['developers'],
    queryFn: () => Promise.resolve(mockDevelopers),
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  const filteredDevelopers = developers?.filter(dev => 
    dev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dev.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">AI Tools Developers</h1>
            <p className="text-muted-foreground text-lg">
              Meet the talented developers behind our community's innovative AI tools
            </p>
          </div>
          
          <div className="w-full max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                className="pl-10"
                placeholder="Search developers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-48 rounded-lg bg-gray-100 animate-pulse"></div>
              ))
            ) : filteredDevelopers?.length ? (
              filteredDevelopers.map(developer => (
                <Link to={`/developers/${developer.slug}`} key={developer.id} className="block h-full">
                  <Card className="h-full hover:shadow-md transition-all group">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16 border-2 border-muted">
                          <AvatarImage src={developer.avatar} alt={developer.name} />
                          <AvatarFallback>{developer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg group-hover:text-brand-purple transition-colors">
                            {developer.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Joined {formatDate(developer.joinedDate)}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mt-4 line-clamp-2 flex-grow">
                        {developer.description}
                      </p>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <Badge variant="outline" className="font-normal">
                          {developer.toolsCount} {developer.toolsCount === 1 ? 'Tool' : 'Tools'}
                        </Badge>
                        
                        <Button size="sm" variant="outline" className="ml-auto group-hover:bg-brand-purple group-hover:text-white transition-colors">
                          View Profile
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No developers found matching your search.</p>
              </div>
            )}
          </div>
          
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </Layout>
  );
};

export default ToolsDevelopers;
