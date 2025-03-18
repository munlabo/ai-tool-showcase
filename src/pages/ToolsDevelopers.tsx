
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search, ExternalLink } from "lucide-react";
import { useDevelopers } from "@/hooks/useSupabaseData";

const ToolsDevelopers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fetch developers from Supabase
  const { data: developers, isLoading } = useDevelopers();

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
          
          {!isLoading && filteredDevelopers?.length > 0 && (
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
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ToolsDevelopers;
