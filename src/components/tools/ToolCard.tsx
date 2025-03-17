
import { Tool } from "@/types/tools";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ToolCardProps {
  tool: Tool;
}

const ToolCard = ({ tool }: ToolCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md h-full flex flex-col">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={tool.imageUrl}
          alt={tool.name}
          className="object-cover w-full h-full transition-transform hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary">{tool.pricing}</Badge>
        </div>
      </div>
      
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{tool.name}</h3>
        </div>
        <div className="flex items-center mt-2 text-sm text-muted-foreground">
          <Badge variant="outline" className="mr-2">{tool.category.name}</Badge>
          <span className="text-xs">• {formatDate(tool.createdAt)}</span>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-3">
          {tool.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {tool.tags.map(tag => (
            <Badge key={tag.id} variant="secondary" className="text-xs font-normal">
              {tag.name}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={tool.author.avatar} alt={tool.author.name} />
            <AvatarFallback>{tool.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{tool.author.name}</span>
        </div>
        
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="flex items-center gap-1 text-xs">
            <Eye className="h-3 w-3" />
            <span>{tool.viewCount}</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Heart className="h-3 w-3" />
            <span>{tool.likeCount}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ToolCard;
