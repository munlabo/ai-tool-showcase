
import { useTools } from "@/context/ToolsContext";
import ToolCard from "./ToolCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const ToolsList = () => {
  const { 
    filteredTools, 
    searchQuery, 
    setSearchQuery, 
    resetFilters,
    categories,
    selectedCategories
  } = useTools();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Get selected categories names for displaying active filters
  const selectedCategoryNames = categories
    .filter(category => selectedCategories.includes(category.id))
    .map(category => category.name);

  const hasActiveFilters = selectedCategories.length > 0 || searchQuery;
  
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
          {searchQuery && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute right-0 top-0 h-full"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
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
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={resetFilters}
            >
              Clear all
            </Button>
          )}
        </div>
      </div>
      
      {/* Active filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 items-center">
          {searchQuery && (
            <Badge variant="outline" className="px-3 py-1 h-8">
              Search: {searchQuery}
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-1 h-4 w-4 p-0" 
                onClick={() => setSearchQuery("")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {selectedCategoryNames.map(name => (
            <Badge key={name} variant="outline" className="px-3 py-1 h-8">
              {name}
            </Badge>
          ))}
        </div>
      )}
      
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
