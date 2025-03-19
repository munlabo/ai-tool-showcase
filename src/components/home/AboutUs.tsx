
import { Lightbulb, Code, Target, Trophy } from "lucide-react";

const AboutUs = () => {
  const features = [
    {
      icon: <Lightbulb className="h-6 w-6 text-brand-purple-light" />,
      title: "Innovation",
      description: "We pioneer cutting-edge AI tools that transform how people work and create."
    },
    {
      icon: <Code className="h-6 w-6 text-brand-purple-light" />,
      title: "Expertise",
      description: "Our team of AI specialists brings decades of combined experience to every tool."
    },
    {
      icon: <Target className="h-6 w-6 text-brand-purple-light" />,
      title: "Focus",
      description: "We're dedicated to building tools that solve real problems for real users."
    },
    {
      icon: <Trophy className="h-6 w-6 text-brand-purple-light" />,
      title: "Excellence",
      description: "We're committed to the highest standards of quality in everything we create."
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 dark:text-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl">About Us</h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Validity is a community-driven platform connecting innovators and users in the rapidly evolving AI landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Founded in 2023, Validity emerged from a simple observation: the incredible AI tools being created often struggled to find their audience, while users seeking solutions couldn't discover the perfect tools for their needs.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our platform bridges this gap by providing a vibrant marketplace where AI innovations can shine and users can explore tools specifically tailored to their requirements.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              We believe in the power of community and collaboration to drive the future of AI. By bringing together creators, users, and enthusiasts, we're building something greater than the sum of its parts.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition duration-300 dark:hover:border-gray-600">
                <div className="mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
