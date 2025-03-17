
import { useTools } from "@/context/ToolsContext";
import ToolCard from "./ToolCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { useState } from "react";

const ToolsList = () => {
  const { filteredTools, searchQuery, setSearchQuery, resetFilters } = useTools();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10"
          />
        </div>
        
        <div className="flex gap-3 self-end sm:self-auto">
          <Button 
            variant="outline" 
            size="sm"
            className="lg:hidden"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          {(searchQuery || showMobileFilters) && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={resetFilters}
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      
      {filteredTools.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No tools found</h3>
          <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={resetFilters}
          >
            Reset filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ToolsList;
