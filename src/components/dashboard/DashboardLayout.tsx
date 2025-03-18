
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  LayoutDashboard, 
  Tool, 
  MessageSquare, 
  Users, 
  Heart, 
  Settings, 
  HelpCircle,
  Bell,
  Search,
  Menu,
  X,
  CircleUser,
  LogOut,
  ChevronDown,
  Inbox,
  Star
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "My Tools", path: "/dashboard/tools", icon: Tool },
    { name: "Messages", path: "/dashboard/messages", icon: MessageSquare },
    { name: "Community", path: "/dashboard/community", icon: Users },
    { name: "Favorites", path: "/dashboard/favorites", icon: Heart },
    { name: "Settings", path: "/dashboard/settings", icon: Settings },
    { name: "Help & Support", path: "/dashboard/help", icon: HelpCircle },
  ];

  const isActive = (path: string) => {
    if (path === "/dashboard" && location.pathname === "/dashboard") {
      return true;
    }
    return location.pathname.startsWith(path) && path !== "/dashboard";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside 
        className={`fixed inset-y-0 z-50 hidden md:flex flex-col border-r bg-white transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="p-4 flex items-center justify-between h-16 border-b">
          {isSidebarOpen ? (
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-brand-purple rounded-full flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <span className="font-bold">Validity</span>
            </Link>
          ) : (
            <div className="w-8 h-8 bg-brand-purple rounded-full flex items-center justify-center mx-auto">
              <span className="text-white font-bold">AI</span>
            </div>
          )}
          
          {isSidebarOpen && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSidebarOpen(false)}
              className="ml-auto"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={`
                  flex items-center 
                  ${isSidebarOpen ? "px-3" : "justify-center px-0"} 
                  py-2 rounded-md text-sm font-medium
                  ${isActive(item.path) 
                    ? "bg-brand-purple text-white" 
                    : "text-gray-600 hover:bg-gray-100"}
                  transition-colors
                `}
              >
                <item.icon className={`h-5 w-5 ${!isSidebarOpen && "mx-auto"}`} />
                {isSidebarOpen && <span className="ml-3">{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t">
          {!isSidebarOpen && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSidebarOpen(true)}
              className="w-8 h-8"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          )}
          
          {isSidebarOpen && (
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">Alex Johnson</p>
                <p className="text-xs text-muted-foreground">Developer</p>
              </div>
            </div>
          )}
        </div>
      </aside>
      
      {/* Mobile Sidebar */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white py-4 overflow-y-auto">
            <div className="px-4 flex items-center justify-between h-16 border-b mb-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-brand-purple rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">AI</span>
                </div>
                <span className="font-bold">Validity</span>
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMobileSidebarOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <nav className="px-2 space-y-1">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className={`
                    flex items-center px-3 py-2 rounded-md text-sm font-medium
                    ${isActive(item.path) 
                      ? "bg-brand-purple text-white" 
                      : "text-gray-600 hover:bg-gray-100"}
                    transition-colors
                  `}
                  onClick={() => setIsMobileSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="ml-3">{item.name}</span>
                </Link>
              ))}
            </nav>
            
            <div className="px-4 mt-4 pt-4 border-t">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">Alex Johnson</p>
                  <p className="text-xs text-muted-foreground">Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isSidebarOpen ? "md:ml-64" : "md:ml-16"}`}>
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white border-b h-16 px-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex-1 flex items-center max-w-md ml-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-gray-50"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3 ml-auto">
            <Button variant="ghost" size="icon" className="relative">
              <Inbox className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="User" />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/profile" className="flex items-center">
                    <CircleUser className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/tools" className="flex items-center">
                    <Tool className="mr-2 h-4 w-4" />
                    <span>My Tools</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/favorites" className="flex items-center">
                    <Star className="mr-2 h-4 w-4" />
                    <span>Favorites</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/login" className="flex items-center text-red-500 hover:text-red-600 hover:bg-red-50">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
