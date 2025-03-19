
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Cta = () => {
  return (
    <section className="py-16 px-4 bg-brand-purple bg-gradient-to-r from-purple-900 to-brand-purple text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Sign up for your free 14 day trial now!
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          Join our community of AI innovators and enthusiasts. Create, showcase, and monetize your tools with comprehensive analytics.
        </p>
        <Link to="/register">
          <Button size="lg" className="bg-white text-brand-purple hover:bg-gray-100">
            Start your 14 day free trial
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Cta;
