
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBlogPosts, useBlogTags, useBlogCategories } from '@/hooks/useBlogData';
import Layout from '@/components/layout/Layout';
import { Badge } from '@/components/ui/badge';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { data: posts = [], isLoading: postsLoading } = useBlogPosts(20);
  const { data: tags = [], isLoading: tagsLoading } = useBlogTags();
  
  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = selectedTag === null || 
      post.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  return (
    <Layout>
      <div className="py-12 bg-background">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold sm:text-5xl mb-4">Our Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Insights, updates, and stories about AI tools and the future of technology
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedTag === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(null)}
              >
                All
              </Button>
              {!tagsLoading && tags.map((tag) => (
                <Button
                  key={tag.id}
                  variant={selectedTag === tag.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(tag.name)}
                >
                  {tag.name}
                </Button>
              ))}
            </div>
          </div>
          
          {postsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl shadow-sm border border-border animate-pulse h-96"></div>
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Link 
                  key={post.id} 
                  to={`/blog/${post.slug}`}
                  className="group"
                >
                  <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-all h-full flex flex-col">
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={post.featured_image} 
                        alt={post.title} 
                        className="object-cover w-full h-full transition-transform group-hover:scale-105" 
                      />
                    </div>
                    
                    <div className="p-5 flex-grow flex flex-col">
                      <div className="flex items-center text-muted-foreground text-xs mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(post.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="w-1 h-1 rounded-full bg-muted mx-2"></div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {Math.ceil(post.content.length / 1000)} min read
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors mb-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm flex-grow">
                        {post.excerpt}
                      </p>
                      
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 my-3">
                          {post.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <div className="mt-4 text-primary font-medium text-sm flex items-center">
                        Read more
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-medium mb-2">No articles found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
