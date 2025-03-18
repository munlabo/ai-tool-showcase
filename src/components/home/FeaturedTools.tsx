
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Tool, Tag } from "@/types/tools";
import { mockTools, mockTags } from "@/data/mockTools";

const FeaturedTools = () => {
  const allTools = mockTools.slice(0, 6); // Just show first 6 tools on homepage
  const tags = mockTags;
  
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  const filteredTools = selectedTag 
    ? allTools.filter(tool => tool.tags.some(tag => tag.id === selectedTag))
    : allTools;
  
  return (
    <section className="py-16">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold sm:text-4xl">Featured AI Tools</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the most innovative AI tools from our community
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <Button 
            variant={selectedTag === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTag(null)}
            className="rounded-full"
          >
            All Categories
          </Button>
          
          {tags.slice(0, 8).map(tag => (
            <Button
              key={tag.id}
              variant={selectedTag === tag.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(tag.id)}
              className="rounded-full"
            >
              {tag.name}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/tools">
            <Button size="lg">
              View All Tools
              <ExternalLink className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const ToolCard = ({ tool }: { tool: Tool }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group h-full flex flex-col">
      <Link to={`/tools/${tool.slug}`} className="block">
        <div className="aspect-video relative overflow-hidden">
          <img 
            src={tool.imageUrl} 
            alt={tool.name} 
            className="object-cover w-full h-full transition-transform group-hover:scale-105" 
          />
          <Badge className="absolute top-3 right-3" variant="secondary">
            {tool.pricing}
          </Badge>
        </div>
      </Link>
      
      <div className="p-5 flex-grow flex flex-col">
        <Link to={`/tools/${tool.slug}`}>
          <h3 className="font-semibold text-lg group-hover:text-brand-purple transition-colors">
            {tool.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mt-2 flex-grow line-clamp-2">
          {tool.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mt-4">
          {tool.tags.slice(0, 3).map(tag => (
            <Badge key={tag.id} variant="outline" className="text-xs">
              {tag.name}
            </Badge>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
              <img 
                src={tool.author.avatar} 
                alt={tool.author.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs text-gray-600">{tool.author.name}</span>
          </div>
          
          <Link to={`/tools/${tool.slug}`}>
            <Button size="sm" variant="outline">
              Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTools;
