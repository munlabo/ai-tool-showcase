
import { useTools } from "@/context/ToolsContext";
import { Button } from "@/components/ui/button";
import { Folder, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Toggle } from "@/components/ui/toggle";

const ToolsFilter = () => {
  const { 
    categories, 
    selectedCategories, 
    toggleCategory,
    resetFilters
  } = useTools();

  const hasActiveFilters = selectedCategories.length > 0;

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
      
      <Accordion type="multiple" defaultValue={["categories"]} className="space-y-4">
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
      </Accordion>
    </div>
  );
};

export default ToolsFilter;
