
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CircleUser,
  FileText,
  LayoutDashboard,
  ThumbsUp,
  View,
  Wrench,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const DashboardOverview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    tools: 0,
    blogs: 0,
    views: 0,
    likes: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentTools, setRecentTools] = useState<any[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      try {
        // Get tools count
        const { count: toolsCount, error: toolsError } = await supabase
          .from('tools')
          .select('id', { count: 'exact', head: true })
          .eq('author_id', user.id);

        // Get blogs count
        const { count: blogsCount, error: blogsError } = await supabase
          .from('blog_posts')
          .select('id', { count: 'exact', head: true })
          .eq('author_id', user.id);

        // Get total views for all user's tools
        const { data: toolsData, error: toolsViewsError } = await supabase
          .from('tools')
          .select('view_count')
          .eq('author_id', user.id);

        const totalViews = toolsData
          ? toolsData.reduce((sum, tool) => sum + (tool.view_count || 0), 0)
          : 0;

        // Get total likes for all user's tools
        const { data: toolsLikesData, error: toolsLikesError } = await supabase
          .from('tools')
          .select('like_count')
          .eq('author_id', user.id);

        const totalLikes = toolsLikesData
          ? toolsLikesData.reduce((sum, tool) => sum + (tool.like_count || 0), 0)
          : 0;

        // Fetch recent tools
        const { data: recentToolsData, error: recentToolsError } = await supabase
          .from('tools')
          .select('*')
          .eq('author_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);

        // Fetch recent blog posts
        const { data: recentBlogsData, error: recentBlogsError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('author_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);

        if (!toolsError && !blogsError && !toolsViewsError && !toolsLikesError) {
          setStats({
            tools: toolsCount || 0,
            blogs: blogsCount || 0,
            views: totalViews,
            likes: totalLikes,
          });
        }

        if (!recentToolsError) {
          setRecentTools(recentToolsData || []);
        }

        if (!recentBlogsError) {
          setRecentBlogs(recentBlogsData || []);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 space-y-6">
          <div className="h-8 bg-muted animate-pulse rounded w-1/4 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-muted animate-pulse rounded" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className="h-64 bg-muted animate-pulse rounded" />
            <div className="h-64 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Tools"
            value={stats.tools}
            description="AI tools published"
            icon={<Wrench className="h-5 w-5" />}
            href="/dashboard/tools"
          />
          <StatsCard
            title="Blog Posts"
            value={stats.blogs}
            description="Articles published"
            icon={<FileText className="h-5 w-5" />}
            href="/dashboard/blogs"
          />
          <StatsCard
            title="Total Views"
            value={stats.views}
            description="Across all tools"
            icon={<View className="h-5 w-5" />}
          />
          <StatsCard
            title="Total Likes"
            value={stats.likes}
            description="Community engagement"
            icon={<ThumbsUp className="h-5 w-5" />}
          />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Recent Tools */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Recent Tools</CardTitle>
              <CardDescription>Your recently created AI tools</CardDescription>
            </CardHeader>
            <CardContent>
              {recentTools.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">You haven't created any tools yet</p>
                  <Link to="/dashboard/tools/new">
                    <Button variant="outline" size="sm">
                      Create Your First Tool
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentTools.map((tool) => (
                    <div key={tool.id} className="flex justify-between items-center">
                      <div>
                        <Link to={`/tools/${tool.slug}`} className="font-medium hover:underline">
                          {tool.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {new Date(tool.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Link to={`/dashboard/tools/edit/${tool.id}`}>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </Link>
                    </div>
                  ))}
                  {stats.tools > 5 && (
                    <div className="text-center pt-2">
                      <Link to="/dashboard/tools" className="text-sm text-primary hover:underline">
                        View all tools
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Blog Posts */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Recent Posts</CardTitle>
              <CardDescription>Your recently created blog posts</CardDescription>
            </CardHeader>
            <CardContent>
              {recentBlogs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">You haven't created any posts yet</p>
                  <Link to="/admin/blog/new">
                    <Button variant="outline" size="sm">
                      Create Your First Post
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentBlogs.map((blog) => (
                    <div key={blog.id} className="flex justify-between items-center">
                      <div>
                        <Link to={`/blog/${blog.slug}`} className="font-medium hover:underline">
                          {blog.title}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {new Date(blog.created_at).toLocaleDateString()}
                          {!blog.published && (
                            <span className="ml-2 text-xs bg-muted px-1.5 py-0.5 rounded-sm">
                              Draft
                            </span>
                          )}
                        </p>
                      </div>
                      <Link to={`/admin/blog/edit/${blog.id}`}>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </Link>
                    </div>
                  ))}
                  {stats.blogs > 5 && (
                    <div className="text-center pt-2">
                      <Link to="/dashboard/blogs" className="text-sm text-primary hover:underline">
                        View all posts
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

interface StatsCardProps {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  href?: string;
}

function StatsCard({ title, value, description, icon, href }: StatsCardProps) {
  const content = (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );

  if (href) {
    return <Link to={href}>{content}</Link>;
  }

  return content;
}

export default DashboardOverview;
