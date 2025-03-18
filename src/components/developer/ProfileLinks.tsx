
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, LinkIcon, Github, Twitter } from "lucide-react";

interface ProfileLinksProps {
  links: {
    website?: string;
    github?: string;
    twitter?: string;
  };
}

const ProfileLinks = ({ links }: ProfileLinksProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Links</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {links.website && (
          <a 
            href={links.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <LinkIcon className="h-4 w-4 mr-2" />
            <span>Personal Website</span>
            <ExternalLink className="h-3 w-3 ml-auto" />
          </a>
        )}
        {links.github && (
          <a 
            href={links.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4 mr-2" />
            <span>GitHub</span>
            <ExternalLink className="h-3 w-3 ml-auto" />
          </a>
        )}
        {links.twitter && (
          <a 
            href={links.twitter} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <Twitter className="h-4 w-4 mr-2" />
            <span>Twitter</span>
            <ExternalLink className="h-3 w-3 ml-auto" />
          </a>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileLinks;
