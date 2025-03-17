
import { useTools } from "@/context/ToolsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Tag, Folder, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const ToolsFilter = () => {
  const { 
    tags, 
    categories, 
    selectedTags, 
    selectedCategories, 
    toggleTag, 
    toggleCategory,
    resetFilters
  } = useTools();

  const hasActiveFilters = selectedTags.length > 0 || selectedCategories.length > 0;

  return (
    <div className="bg-card rounded-xl border p-5 sticky top-20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Filters</h3>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFilters}
            className="h-8 px-2"
          >
            <X className="h-4 w-4 mr-1" /> Clear all
          </Button>
        )}
      </div>
      
      <Accordion type="multiple" defaultValue={["categories", "tags"]} className="space-y-4">
        <AccordionItem value="categories" className="border-none">
          <AccordionTrigger className="py-2 hover:no-underline">
            <div className="flex items-center gap-2">
              <Folder className="h-4 w-4 text-muted-foreground" />
              <span>Categories</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className={selectedCategories.length === 0 ? "bg-accent text-accent-foreground" : ""}
                onClick={resetFilters}
              >
                Show all
              </Button>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {categories.map(category => (
                  <Toggle
                    key={category.id}
                    pressed={selectedCategories.includes(category.id)}
                    onPressedChange={() => toggleCategory(category.id)}
                    variant="outline"
                    size="sm"
                    className="text-xs h-8"
                  >
                    {category.name}
                  </Toggle>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="tags" className="border-none">
          <AccordionTrigger className="py-2 hover:no-underline">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span>Tags</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className={selectedTags.length === 0 ? "bg-accent text-accent-foreground" : ""}
                onClick={resetFilters}
              >
                Show all
              </Button>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map(tag => (
                  <Toggle
                    key={tag.id}
                    pressed={selectedTags.includes(tag.id)}
                    onPressedChange={() => toggleTag(tag.id)}
                    variant="outline"
                    size="sm"
                    className="text-xs h-8"
                  >
                    {tag.name}
                  </Toggle>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ToolsFilter;
