
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ToolsList from "@/components/tools/ToolsList";
import ToolsFilter from "@/components/tools/ToolsFilter";
import { ToolsProvider } from "@/context/ToolsContext";

const Tools = () => {
  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">AI Tools</h1>
            <p className="text-muted-foreground text-lg">
              Discover and explore the latest AI tools from our community
            </p>
          </div>
          
          <ToolsProvider>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-64 shrink-0">
                <ToolsFilter />
              </div>
              <div className="flex-1">
                <ToolsList />
              </div>
            </div>
          </ToolsProvider>
        </div>
      </div>
    </Layout>
  );
};

export default Tools;
