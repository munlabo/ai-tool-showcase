
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  const faqItems = [
    {
      question: "What is Validity?",
      answer: "Validity is a community-driven platform for AI tool creators and enthusiasts. We provide a space for innovators to showcase their tools and connect with potential users and clients."
    },
    {
      question: "How Validity works?",
      answer: "Creators register and create profiles for their AI tools with descriptions, demos, and pricing. Visitors can browse these tools, register to see full details, and contact creators directly to place orders or inquire about customizations."
    },
    {
      question: "What support and service packages are available?",
      answer: "We offer various support tiers from basic community support to premium packages with dedicated account managers, enhanced analytics, and priority placement in search results."
    },
    {
      question: "How Validity maintains the AI tools?",
      answer: "We don't maintain the tools themselves - creators maintain their own tools. We maintain the platform that showcases them and provides analytics, user management, and communication channels."
    },
    {
      question: "Is Validity giving support for the demos?",
      answer: "We provide support for using the platform features, including how to create effective demos. For specific tool support, users connect directly with the tool creators through our built-in communication system."
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            Frequently asked questions
          </h2>
          <p className="text-gray-600">
            Find answers to common questions about our platform and services.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 py-2">
              <AccordionTrigger className="text-left font-medium text-lg hover:text-brand-purple">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-8 text-center">
          <a 
            href="#" 
            className="inline-flex items-center text-brand-purple hover:text-brand-purple-dark font-medium"
          >
            View all FAQs
          </a>
        </div>
      </div>
    </section>
  );
};

export default Faq;
