
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import IntegrationLogos from "@/components/home/IntegrationLogos";
import Testimonial from "@/components/home/Testimonial";
import Integrations from "@/components/home/Integrations";
import Faq from "@/components/home/Faq";
import Cta from "@/components/home/Cta";
import AboutUs from "@/components/home/AboutUs";
import FeaturedTools from "@/components/home/FeaturedTools";
import BlogSection from "@/components/home/BlogSection";
import ContactForm from "@/components/home/ContactForm";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <IntegrationLogos />
      <AboutUs />
      <FeaturedTools />
      <Features />
      <Testimonial />
      <Integrations />
      <Faq />
      <BlogSection />
      <ContactForm />
      <Cta />
    </Layout>
  );
};

export default Index;
