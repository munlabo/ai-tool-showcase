
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ModeToggle } from "./ModeToggle";
import { UserNav } from "./UserNav";
import { useEffect, useState } from "react";
import { MenuIcon, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold">AI Tools Directory</Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/tools" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
            Tools
          </Link>
          <Link to="/developers" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
            Developers
          </Link>
          <Link to="/community" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
            Community
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
          
          <ModeToggle />
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <MenuIcon />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t animate-in slide-in-from-top">
          <div className="container mx-auto max-w-7xl px-4 py-3 flex flex-col space-y-3">
            <Link 
              to="/tools" 
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Tools
            </Link>
            <Link 
              to="/developers" 
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Developers
            </Link>
            <Link 
              to="/community" 
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
            <div className="flex items-center gap-2 mt-2 pt-2 border-t">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                <Button size="sm">Sign up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
