
import { ReactNode, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { ThemeProvider } from 'next-themes';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  // Initialize dark mode
  useEffect(() => {
    // Check user preference
    const isDarkMode = localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <ThemeProvider attribute="class" enableSystem>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-brand-dark-bg dark:to-gray-900 text-foreground">
        <Navbar />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
