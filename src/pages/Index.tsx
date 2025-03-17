
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import IntegrationLogos from "@/components/home/IntegrationLogos";
import Testimonial from "@/components/home/Testimonial";
import Integrations from "@/components/home/Integrations";
import Faq from "@/components/home/Faq";
import Cta from "@/components/home/Cta";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <IntegrationLogos />
      <Features />
      <Testimonial />
      <Integrations />
      <Faq />
      <Cta />
    </Layout>
  );
};

export default Index;
