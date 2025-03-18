
import { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Heart, 
  Users, 
  Eye, 
  Star, 
  CircleUser, 
  Settings, 
  LogOut, 
  Plus,
  BookmarkCheck,
  MessageSquare,
  Bell,
  Search,
  ListFilter
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { mockTools } from "@/data/mockTools";

const Dashboard = () => {
  // Mock user data - would come from Supabase auth in a real app
  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    role: "developer",
    joinedDate: "March 15, 2023",
    stats: {
      totalTools: 5,
      totalLikes: 234,
      totalViews: 1892,
      followers: 42
    },
    recentActivity: [
      { id: 1, type: "tool_update", tool: "AI Text Summarizer", date: "2 days ago" },
      { id: 2, type: "new_follower", user: "Maria Garcia", date: "3 days ago" },
      { id: 3, type: "comment", tool: "Image Generator AI", comment: "Great tool!", date: "1 week ago" }
    ]
  };

  // Get first 3 tools for the dashboard
  const userTools = mockTools.slice(0, 3);
  
  // Mock saved tools
  const savedTools = mockTools.slice(3, 6);

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user.name}!
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="bg-brand-purple/10 p-2 rounded-full">
                  <BarChart3 className="h-5 w-5 text-brand-purple" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Tools</p>
                  <h3 className="text-2xl font-bold">{user.stats.totalTools}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="bg-pink-100 p-2 rounded-full">
                  <Heart className="h-5 w-5 text-pink-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Likes</p>
                  <h3 className="text-2xl font-bold">{user.stats.totalLikes}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Eye className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                  <h3 className="text-2xl font-bold">{user.stats.totalViews}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="bg-green-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Followers</p>
                  <h3 className="text-2xl font-bold">{user.stats.followers}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Your AI Tools</CardTitle>
                  <Button size="sm" asChild>
                    <Link to="/dashboard/tools/new">
                      <Plus className="mr-1 h-4 w-4" />
                      Add New Tool
                    </Link>
                  </Button>
                </div>
                <CardDescription>
                  Manage and monitor your AI tools
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {userTools.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">You haven't added any AI tools yet.</p>
                    <Button asChild>
                      <Link to="/dashboard/tools/new">
                        <Plus className="mr-1 h-4 w-4" />
                        Add Your First Tool
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userTools.map((tool) => (
                      <div key={tool.id} className="flex items-start space-x-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                        <img 
                          src={tool.imageUrl} 
                          alt={tool.name}
                          className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium truncate">{tool.name}</h4>
                            <Badge variant={tool.pricing === "Free" ? "outline" : "default"}>
                              {tool.pricing}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{tool.description}</p>
                          <div className="flex items-center mt-2 text-xs text-muted-foreground gap-3">
                            <div className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              <span>{tool.viewCount}</span>
                            </div>
                            <div className="flex items-center">
                              <Heart className="h-3 w-3 mr-1" />
                              <span>{tool.likeCount}</span>
                            </div>
                            <div className="flex items-center">
                              <Badge variant="secondary" className="text-xs h-5">
                                {tool.category.name}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/dashboard/tools/${tool.id}/edit`}>
                              <Settings className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    <div className="text-center pt-2">
                      <Button variant="outline" asChild>
                        <Link to="/dashboard/tools">
                          View All Tools
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Tabs defaultValue="saved">
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="saved">Saved Tools</TabsTrigger>
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>
                
                <Button variant="ghost" size="sm">
                  <ListFilter className="mr-1 h-4 w-4" />
                  Filter
                </Button>
              </div>
              
              <TabsContent value="saved">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    {savedTools.map((tool) => (
                      <div key={tool.id} className="flex items-start space-x-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                        <img 
                          src={tool.imageUrl} 
                          alt={tool.name}
                          className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <Link to={`/tools/${tool.slug}`} className="font-medium hover:text-brand-purple transition-colors">
                              {tool.name}
                            </Link>
                            <BookmarkCheck className="h-4 w-4 text-brand-purple" />
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{tool.description}</p>
                          <div className="flex items-center mt-1 text-xs text-muted-foreground">
                            <span>Saved 3 days ago</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="messages">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start space-x-4 p-3 rounded-lg border">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="https://i.pravatar.cc/150?img=5" />
                        <AvatarFallback>MG</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Maria Garcia</h4>
                          <span className="text-xs text-muted-foreground">2 days ago</span>
                        </div>
                        <p className="text-sm mt-1">I'm interested in using your AI Text Summarizer for my project. Could we discuss integration options?</p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm">Reply</Button>
                          <Button size="sm" variant="outline">View Thread</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-3 rounded-lg border">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="https://i.pravatar.cc/150?img=3" />
                        <AvatarFallback>JW</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">James Wilson</h4>
                          <span className="text-xs text-muted-foreground">1 week ago</span>
                        </div>
                        <p className="text-sm mt-1">Great work on the Image Generator AI! Would love to connect and share some feedback.</p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm">Reply</Button>
                          <Button size="sm" variant="outline">View Thread</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start space-x-4 p-3 rounded-lg border">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Bell className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">Your tool <span className="font-medium">AI Text Summarizer</span> was featured on the homepage!</p>
                        <span className="text-xs text-muted-foreground">2 days ago</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-3 rounded-lg border">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Users className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm"><span className="font-medium">Maria Garcia</span> started following you</p>
                        <span className="text-xs text-muted-foreground">3 days ago</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-3 rounded-lg border">
                      <div className="bg-pink-100 p-2 rounded-full">
                        <Heart className="h-4 w-4 text-pink-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">Your tool <span className="font-medium">Image Generator AI</span> received 10 new likes</p>
                        <span className="text-xs text-muted-foreground">1 week ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold mt-4">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline" className="text-xs">Developer</Badge>
                    <span className="text-xs text-muted-foreground ml-2">• Joined {user.joinedDate}</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link to="/dashboard/profile">
                        <CircleUser className="mr-1 h-4 w-4" />
                        Edit Profile
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link to="/dashboard/settings">
                        <Settings className="mr-1 h-4 w-4" />
                        Settings
                      </Link>
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-1 pt-2 border-t">
                  <h4 className="text-sm font-medium mb-2">Recent Activity</h4>
                  {user.recentActivity.map((activity) => (
                    <div key={activity.id} className="text-sm py-1">
                      {activity.type === 'tool_update' && (
                        <p>
                          Updated <span className="font-medium">{activity.tool}</span>
                          <span className="text-xs text-muted-foreground block">
                            {activity.date}
                          </span>
                        </p>
                      )}
                      {activity.type === 'new_follower' && (
                        <p>
                          <span className="font-medium">{activity.user}</span> started following you
                          <span className="text-xs text-muted-foreground block">
                            {activity.date}
                          </span>
                        </p>
                      )}
                      {activity.type === 'comment' && (
                        <p>
                          New comment on <span className="font-medium">{activity.tool}</span>
                          <span className="text-xs text-muted-foreground block">
                            {activity.date}
                          </span>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/dashboard/tools/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Tool
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/tools">
                    <Search className="mr-2 h-4 w-4" />
                    Explore Tools
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/dashboard/messages">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Messages
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
