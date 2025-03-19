
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  linkText?: string;
  linkUrl?: string;
}

const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon, 
  linkText = "Learn More", 
  linkUrl = "#" 
}: FeatureCardProps) => {
  return (
    <div className="feature-card bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-brand-purple/50">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-brand-purple/20">
        <Icon className="h-6 w-6 text-brand-purple-light" />
      </div>
      
      <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
      
      <p className="mb-4 text-gray-300">{description}</p>
      
      <a 
        href={linkUrl} 
        className="inline-flex items-center text-brand-purple-light hover:underline font-medium text-sm"
      >
        {linkText}
      </a>
    </div>
  );
};

export default FeatureCard;
