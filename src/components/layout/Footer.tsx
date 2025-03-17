
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-brand-purple rounded-full flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <span className="font-bold text-xl">Validity</span>
            </Link>
            <p className="text-gray-600 text-sm mb-4">
              Connect with the best AI tools in the community. Showcase your innovations and discover groundbreaking solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-brand-purple transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-purple transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-purple transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-purple transition-colors">
                <Github size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-brand-purple text-sm">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-brand-purple text-sm">Careers</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-brand-purple text-sm">Blog</Link></li>
              <li><Link to="/press" className="text-gray-600 hover:text-brand-purple text-sm">Press</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-900 mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/tools" className="text-gray-600 hover:text-brand-purple text-sm">Tools</Link></li>
              <li><Link to="/features" className="text-gray-600 hover:text-brand-purple text-sm">Features</Link></li>
              <li><Link to="/community" className="text-gray-600 hover:text-brand-purple text-sm">Community</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-brand-purple text-sm">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-900 mb-4">Join Our Newsletter</h3>
            <p className="text-gray-600 text-sm mb-4">Stay updated with the latest AI tools and community news.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 min-w-0 px-3 py-2 text-sm rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent"
              />
              <button className="px-3 py-2 bg-brand-purple text-white text-sm font-medium rounded-r-md hover:bg-brand-purple-dark focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row md:justify-between items-center">
          <p className="text-gray-500 text-sm">© 2024 Validity. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-500 hover:text-gray-900 text-sm">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 hover:text-gray-900 text-sm">Terms of Service</Link>
            <Link to="/help" className="text-gray-500 hover:text-gray-900 text-sm">Help Center</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
