
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <AuroraBackground className="relative overflow-hidden bg-brand-dark-bg border-b border-gray-800 pt-16 pb-20 md:pt-24 md:pb-32 text-white">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl relative z-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0.0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="space-y-4"
          >
            <div className="inline-block rounded-full bg-brand-purple/20 px-3 py-1 text-sm font-medium text-brand-purple-light">
              AI Tool Community Platform
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance">
              Best <span className="bg-gradient-to-r from-brand-purple-light to-brand-purple bg-clip-text text-transparent">AI tools</span> to manage your business
            </h1>
            
            <p className="text-lg text-gray-300 md:text-xl max-w-prose text-balance">
              Where AI innovators meet early adopters. Create, showcase, and monetize your AI tools while connecting with the community that values them.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <Link to="/register">
                <Button size="lg" className="bg-brand-purple hover:bg-brand-purple-dark text-white">
                  Get started free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/tools">
                <Button size="lg" variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                  Explore tools
                </Button>
              </Link>
            </div>
          </motion.div>
          
          {/* Dashboard Image */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="relative glass-morphism rounded-2xl p-2"
          >
            <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
              <img
                src="/lovable-uploads/e83e1f44-29e2-42d4-bc91-496d4f62d2d7.png"
                alt="AI Analytics Dashboard"
                className="object-cover w-full h-full"
              />
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 text-yellow-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <div className="absolute top-20 right-20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 11L12 14L22 4" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default Hero;
