
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { ThemeProvider } from 'next-themes';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
