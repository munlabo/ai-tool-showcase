
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Wrench, Calendar } from "lucide-react";

interface ProfileStatsProps {
  likesCount: number;
  followersCount: number;
  toolsCount: number;
  joinedDate: string;
}

const ProfileStats = ({ likesCount, followersCount, toolsCount, joinedDate }: ProfileStatsProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center h-full">
          <Heart className="h-8 w-8 text-brand-purple mb-2" />
          <span className="text-2xl font-bold">{likesCount.toLocaleString()}</span>
          <span className="text-muted-foreground text-sm">Likes</span>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center h-full">
          <Users className="h-8 w-8 text-brand-purple mb-2" />
          <span className="text-2xl font-bold">{followersCount.toLocaleString()}</span>
          <span className="text-muted-foreground text-sm">Followers</span>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center h-full">
          <Wrench className="h-8 w-8 text-brand-purple mb-2" />
          <span className="text-2xl font-bold">{toolsCount}</span>
          <span className="text-muted-foreground text-sm">Tools</span>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center h-full">
          <Calendar className="h-8 w-8 text-brand-purple mb-2" />
          <span className="text-sm font-semibold">Joined</span>
          <span className="text-muted-foreground text-xs text-center">
            {formatDate(joinedDate)}
          </span>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileStats;
