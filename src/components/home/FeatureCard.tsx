
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
    <div className="feature-card bg-white subtle-shadow">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-brand-purple/10">
        <Icon className="h-6 w-6 text-brand-purple" />
      </div>
      
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      
      <p className="mb-4 text-gray-600">{description}</p>
      
      <a 
        href={linkUrl} 
        className="inline-flex items-center text-brand-purple hover:underline font-medium text-sm"
      >
        {linkText}
      </a>
    </div>
  );
};

export default FeatureCard;
