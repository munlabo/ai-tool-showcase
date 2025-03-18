
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ToolCard from "@/components/tools/ToolCard";
import { Tool as ToolType } from "@/types/tools";

interface ProfileTabsProps {
  toolsCount: number;
  developerTools?: ToolType[];
  isLoadingTools: boolean;
  developer?: any; // Added to match the props passed in DeveloperProfile
}

const ProfileTabs = ({ toolsCount, developerTools, isLoadingTools }: ProfileTabsProps) => {
  return (
    <Tabs defaultValue="tools" className="w-full mt-8">
      <TabsList className="mb-6">
        <TabsTrigger value="tools">Tools ({toolsCount})</TabsTrigger>
        <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        <TabsTrigger value="comments">Comments</TabsTrigger>
      </TabsList>
      
      <TabsContent value="tools">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoadingTools ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-64 rounded-lg bg-gray-100 animate-pulse"></div>
            ))
          ) : developerTools?.length ? (
            developerTools.map((tool: ToolType) => (
              <ToolCard key={tool.id} tool={tool} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-muted-foreground">No tools found.</p>
            </div>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="activity">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="border-l-2 border-brand-purple pl-4 py-2">
                <p className="text-sm text-muted-foreground">2 days ago</p>
                <p>Updated <span className="font-medium">AI Text Summarizer</span> with new features</p>
              </div>
              <div className="border-l-2 border-muted pl-4 py-2">
                <p className="text-sm text-muted-foreground">1 week ago</p>
                <p>Released new tool <span className="font-medium">Language Detector AI</span></p>
              </div>
              <div className="border-l-2 border-muted pl-4 py-2">
                <p className="text-sm text-muted-foreground">2 weeks ago</p>
                <p>Commented on <span className="font-medium">ImageGen AI</span></p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="comments">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">Jane Smith</h4>
                    <span className="text-xs text-muted-foreground">3 days ago</span>
                  </div>
                  <p className="text-sm mt-1">Your AI Text Summarizer tool is amazing! It's saved me hours of work already.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://i.pravatar.cc/150?img=23" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">Robert Chen</h4>
                    <span className="text-xs text-muted-foreground">1 week ago</span>
                  </div>
                  <p className="text-sm mt-1">Would love to see an API for the Image Generator tool. Any plans for that?</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
