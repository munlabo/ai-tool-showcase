
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import { useCategories, useComments, useRecentActivity } from "@/hooks/useSupabaseData";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { 
  MessageSquare, 
  Heart, 
  Search, 
  Filter, 
  Calendar 
} from "lucide-react";

const Community = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: comments, isLoading: commentsLoading } = useComments(selectedCategory);
  const { data: activities, isLoading: activitiesLoading } = useRecentActivity(50);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const filteredComments = comments?.filter(comment => 
    comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredActivities = activities?.filter(activity => {
    if (activity.type === 'comment') {
      return activity.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
             activity.tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             activity.user.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return activity.tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           activity.user.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Community</h1>
            <p className="text-muted-foreground text-lg">
              Join the conversation about AI tools and connect with developers
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search comments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={!selectedCategory ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(undefined)}
              >
                All Categories
              </Button>
              
              {!categoriesLoading && categories?.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
          
          <Tabs defaultValue="comments" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="comments">
                <MessageSquare className="h-4 w-4 mr-2" />
                Comments
              </TabsTrigger>
              <TabsTrigger value="activity">
                <Calendar className="h-4 w-4 mr-2" />
                Recent Activity
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="comments">
              {commentsLoading ? (
                <div className="grid gap-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-32 rounded-lg bg-gray-100 animate-pulse"></div>
                  ))}
                </div>
              ) : filteredComments?.length ? (
                <div className="grid gap-4">
                  {filteredComments.map(comment => (
                    <Card key={comment.id}>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                            <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <div>
                                <h3 className="font-medium">{comment.user.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  Commented on <Link to={`/tools/${comment.tool.slug}`} className="font-medium hover:underline">
                                    {comment.tool.name}
                                  </Link>
                                </p>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(comment.createdAt)}
                              </span>
                            </div>
                            <p className="mt-3">{comment.content}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No comments found</h3>
                  <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="activity">
              {activitiesLoading ? (
                <div className="grid gap-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-24 rounded-lg bg-gray-100 animate-pulse"></div>
                  ))}
                </div>
              ) : filteredActivities?.length ? (
                <div className="grid gap-4">
                  {filteredActivities.map(activity => (
                    <Card key={activity.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                            <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{activity.user.name}</h3>
                                <Badge variant="secondary" className="py-0 px-2 h-5">
                                  {activity.type === 'comment' ? (
                                    <MessageSquare className="h-3 w-3 mr-1" />
                                  ) : (
                                    <Heart className="h-3 w-3 mr-1" />
                                  )}
                                  {activity.type === 'comment' ? 'Comment' : 'Like'}
                                </Badge>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(activity.createdAt)}
                              </span>
                            </div>
                            <div className="mt-1">
                              {activity.type === 'comment' ? (
                                <p>Commented on <Link to={`/tools/${activity.tool.slug}`} className="font-medium hover:underline">
                                  {activity.tool.name}
                                </Link>: "{activity.content.length > 100 ? `${activity.content.substring(0, 100)}...` : activity.content}"</p>
                              ) : (
                                <p>Liked <Link to={`/tools/${activity.tool.slug}`} className="font-medium hover:underline">
                                  {activity.tool.name}
                                </Link></p>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No activity found</h3>
                  <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Community;
