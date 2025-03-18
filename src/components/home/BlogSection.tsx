
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  imageUrl: string;
  slug: string;
}

const BlogSection = () => {
  // Mock blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "The Future of AI in Creative Industries",
      excerpt: "How artificial intelligence is transforming content creation, design, and artistic expression.",
      date: "May 15, 2024",
      readTime: "5 min read",
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGFpJTIwcm9ib3R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      slug: "future-of-ai-in-creative-industries"
    },
    {
      id: "2",
      title: "Building Ethical AI Systems",
      excerpt: "Exploring the challenges and solutions for creating responsible AI that benefits humanity.",
      date: "May 8, 2024",
      readTime: "7 min read",
      imageUrl: "https://images.unsplash.com/photo-1677442135076-1c09e254b92d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGFpJTIwZXRoaWNzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      slug: "building-ethical-ai-systems"
    },
    {
      id: "3",
      title: "Top AI Tools for Productivity in 2024",
      excerpt: "A comprehensive guide to the most effective AI tools that can boost your workflow.",
      date: "April 30, 2024",
      readTime: "8 min read",
      imageUrl: "https://images.unsplash.com/photo-1655720828018-edd2daec9853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGFpJTIwdG9vbHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      slug: "top-ai-tools-for-productivity"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Latest From Our Blog</h2>
            <p className="mt-4 text-xl text-gray-600">
              Insights, trends, and deep dives into the world of AI
            </p>
          </div>
          <Link to="/blog" className="mt-4 md:mt-0">
            <Button variant="outline">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.slug}`}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all h-full flex flex-col">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="object-cover w-full h-full transition-transform group-hover:scale-105" 
                  />
                </div>
                
                <div className="p-5 flex-grow flex flex-col">
                  <div className="flex items-center text-gray-500 text-xs mb-3">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {post.date}
                    </div>
                    <div className="w-1 h-1 rounded-full bg-gray-300 mx-2"></div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg group-hover:text-brand-purple transition-colors mb-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-4 text-brand-purple font-medium text-sm flex items-center">
                    Read more
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
