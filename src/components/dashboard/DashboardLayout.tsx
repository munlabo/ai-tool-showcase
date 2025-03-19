
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  LayoutDashboard, 
  Wrench, 
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
  Star,
  ListPlus,
  Shield
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut, isAdmin, isDeveloper } = useAuth();
  
  useEffect(() => {
    // Close mobile sidebar when route changes
    setIsMobileSidebarOpen(false);
  }, [location.pathname]);

  // Define nav items based on user role
  const getNavItems = () => {
    const baseNavItems = [
      { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { name: "Favorites", path: "/dashboard/favorites", icon: Heart },
      { name: "Settings", path: "/dashboard/settings", icon: Settings },
      { name: "Help & Support", path: "/dashboard/help", icon: HelpCircle },
    ];
    
    // Add developer-specific items
    if (isDeveloper || isAdmin) {
      baseNavItems.splice(1, 0, 
        { name: "My Tools", path: "/dashboard/tools", icon: Wrench },
        { name: "Messages", path: "/dashboard/messages", icon: MessageSquare }
      );
    }
    
    // Add admin-specific items
    if (isAdmin) {
      baseNavItems.splice(baseNavItems.length - 2, 0,
        { name: "Community", path: "/dashboard/community", icon: Users },
        { name: "Admin Panel", path: "/dashboard/admin", icon: Shield }
      );
    }
    
    return baseNavItems;
  };

  const navItems = getNavItems();

  const isActive = (path: string) => {
    if (path === "/dashboard" && location.pathname === "/dashboard") {
      return true;
    }
    return location.pathname.startsWith(path) && path !== "/dashboard";
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar - Desktop */}
      <aside 
        className={`fixed inset-y-0 z-50 hidden md:flex flex-col border-r bg-white dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="p-4 flex items-center justify-between h-16 border-b dark:border-gray-700">
          {isSidebarOpen ? (
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-brand-purple rounded-full flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <span className="font-bold dark:text-white">Validity</span>
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
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}
                  transition-colors
                `}
              >
                <item.icon className={`h-5 w-5 ${!isSidebarOpen && "mx-auto"}`} />
                {isSidebarOpen && <span className="ml-3">{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t dark:border-gray-700">
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
                <AvatarImage src={profile?.avatar || "https://i.pravatar.cc/150?img=1"} />
                <AvatarFallback>{profile?.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium dark:text-white">{profile?.name || 'User'}</p>
                <p className="text-xs text-muted-foreground dark:text-gray-400">
                  {profile?.role === 'admin' ? 'Admin' : profile?.role === 'developer' ? 'Developer' : 'User'}
                </p>
              </div>
            </div>
          )}
        </div>
      </aside>
      
      {/* Mobile Sidebar */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 py-4 overflow-y-auto">
            <div className="px-4 flex items-center justify-between h-16 border-b dark:border-gray-700 mb-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-brand-purple rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">AI</span>
                </div>
                <span className="font-bold dark:text-white">Validity</span>
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
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}
                    transition-colors
                  `}
                  onClick={() => setIsMobileSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="ml-3">{item.name}</span>
                </Link>
              ))}
            </nav>
            
            <div className="px-4 mt-4 pt-4 border-t dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profile?.avatar || "https://i.pravatar.cc/150?img=1"} />
                  <AvatarFallback>{profile?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium dark:text-white">{profile?.name || 'User'}</p>
                  <p className="text-xs text-muted-foreground dark:text-gray-400">
                    {profile?.role === 'admin' ? 'Admin' : profile?.role === 'developer' ? 'Developer' : 'User'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isSidebarOpen ? "md:ml-64" : "md:ml-16"}`}>
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b dark:border-gray-700 h-16 px-4 flex items-center">
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
                className="pl-10 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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

            {isDeveloper && (
              <Button variant="default" size="sm" asChild className="mr-2">
                <Link to="/dashboard/tools/new">
                  <ListPlus className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Add Tool</span>
                </Link>
              </Button>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.avatar || "https://i.pravatar.cc/150?img=1"} alt="User" />
                    <AvatarFallback>{profile?.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 dark:bg-gray-800 dark:border-gray-700">
                <DropdownMenuLabel className="dark:text-white">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="dark:border-gray-700" />
                <DropdownMenuItem asChild className="dark:text-gray-300 dark:focus:bg-gray-700">
                  <Link to="/dashboard/profile" className="flex items-center">
                    <CircleUser className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                {(isDeveloper || isAdmin) && (
                  <DropdownMenuItem asChild className="dark:text-gray-300 dark:focus:bg-gray-700">
                    <Link to="/dashboard/tools" className="flex items-center">
                      <Wrench className="mr-2 h-4 w-4" />
                      <span>My Tools</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild className="dark:text-gray-300 dark:focus:bg-gray-700">
                  <Link to="/dashboard/favorites" className="flex items-center">
                    <Star className="mr-2 h-4 w-4" />
                    <span>Favorites</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="dark:text-gray-300 dark:focus:bg-gray-700">
                  <Link to="/dashboard/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="dark:border-gray-700" />
                <DropdownMenuItem 
                  onClick={handleSignOut}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
