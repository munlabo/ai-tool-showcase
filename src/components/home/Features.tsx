
import { BarChart3, Lock, Zap } from 'lucide-react';
import FeatureCard from './FeatureCard';

const Features = () => {
  const features = [
    {
      title: 'Analytics in real time',
      description: 'Get detailed analytics on how users interact with your AI tools. Track engagement, shares, and conversion rates.',
      icon: BarChart3,
      linkText: 'Learn More',
      linkUrl: '#',
    },
    {
      title: 'Encrypted data',
      description: 'All user and tool data is encrypted and securely stored. Your intellectual property remains protected at all times.',
      icon: Lock,
      linkText: 'Learn More',
      linkUrl: '#',
    },
    {
      title: 'Fully automative',
      description: 'Streamline your workflow with automations for tool submission, user engagement, and performance reporting.',
      icon: Zap,
      linkText: 'Learn More',
      linkUrl: '#',
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-brand-dark-bg to-gray-900 text-white">
      <div className="max-w-7xl mx-auto text-center mb-12 md:mb-16">
        <div className="inline-block rounded-full bg-brand-purple/20 px-3 py-1 text-sm font-medium text-brand-purple-light mb-4">
          FEATURES
        </div>
        <h2 className="text-3xl font-bold sm:text-4xl mb-4">
          Explore Our Features
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Our platform offers cutting-edge tools for AI creators and enthusiasts alike. Discover, connect, and collaborate with the best minds in AI.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className={`float-in-delay-${index * 100}`}>
            <FeatureCard {...feature} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
