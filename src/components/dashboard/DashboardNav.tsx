
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Settings, 
  User, 
  Wrench, 
  FileText,
  MessageSquare 
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
};

export function DashboardNav() {
  const { pathname } = useLocation();
  const { isAdmin } = useAuth();
  
  const navItems: NavItem[] = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      title: "My Tools",
      href: "/dashboard/tools",
      icon: <Wrench className="mr-2 h-4 w-4" />,
    },
    {
      title: "My Blogs",
      href: "/dashboard/blogs",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      title: "Messages",
      href: "/dashboard/messages",
      icon: <MessageSquare className="mr-2 h-4 w-4" />,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: <User className="mr-2 h-4 w-4" />,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ];

  // Add admin items conditionally
  if (isAdmin) {
    navItems.push({
      title: "Manage Blogs",
      href: "/admin/blog",
      icon: <FileText className="mr-2 h-4 w-4" />,
      adminOnly: true,
    });
  }

  return (
    <nav className="grid gap-1">
      {navItems.map((item) => {
        // Skip admin-only items for non-admins
        if (item.adminOnly && !isAdmin) return null;
        
        return (
          <Link key={item.href} to={item.href}>
            <Button
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn("w-full justify-start", 
                pathname === item.href ? "bg-secondary" : "",
                item.adminOnly ? "border-l-4 border-primary" : ""
              )}
            >
              {item.icon}
              {item.title}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}
