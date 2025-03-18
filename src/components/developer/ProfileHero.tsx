
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Users, MapPin } from "lucide-react";

interface ProfileHeroProps {
  developer: {
    name: string;
    avatar: string;
    location: string;
    longDescription: string;
  };
}

const ProfileHero = ({ developer }: ProfileHeroProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="md:col-span-2">
        <CardContent className="p-6 flex flex-col md:flex-row gap-6">
          <Avatar className="h-24 w-24 border-4 border-muted">
            <AvatarImage src={developer.avatar} alt={developer.name} />
            <AvatarFallback>{developer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold">{developer.name}</h1>
              <div className="flex items-center text-muted-foreground mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{developer.location}</span>
              </div>
            </div>
            
            <p className="text-muted-foreground">{developer.longDescription}</p>
            
            <div className="flex flex-wrap gap-2">
              <Button>
                <Mail className="mr-2 h-4 w-4" /> Contact
              </Button>
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" /> Follow
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileHero;
