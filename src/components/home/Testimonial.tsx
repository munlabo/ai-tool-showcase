
const Testimonial = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden subtle-shadow aspect-[4/3]">
            <img 
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop"
              alt="Team collaborating"
              className="object-cover w-full h-full"
            />
            
            {/* Decorative elements */}
            <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-md flex items-center gap-2">
              <div className="flex -space-x-2">
                <img 
                  src="https://randomuser.me/api/portraits/women/44.jpg" 
                  alt="Team member" 
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <img 
                  src="https://randomuser.me/api/portraits/men/86.jpg" 
                  alt="Team member" 
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <img 
                  src="https://randomuser.me/api/portraits/women/22.jpg" 
                  alt="Team member" 
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              </div>
              <div className="text-sm">
                <p className="font-medium">Active team</p>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-brand-purple inline-flex rounded-full text-xs font-semibold text-white px-3 py-1 mb-6">
              TESTIMONIAL
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Collaborating made easy and efficient
            </h2>
            
            <p className="text-gray-600 mb-8">
              Creating a community-driven platform for AI tools has never been easier. Our platform provides the infrastructure you need to showcase your innovations and connect with potential clients.
            </p>
            
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-5 h-5 bg-brand-purple/10 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                </div>
                <span className="text-gray-700">Make direct connections with AI tool enthusiasts and developers</span>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-5 h-5 bg-brand-purple/10 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                </div>
                <span className="text-gray-700">Effortlessly showcase and monetize your AI innovation</span>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-5 h-5 bg-brand-purple/10 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                </div>
                <span className="text-gray-700">Receive real-time analytics on how users engage with your tools</span>
              </li>
            </ul>
            
            <div className="mt-8 flex items-center gap-4">
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="William Sullivan" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold">William Sullivan</h4>
                <p className="text-gray-500 text-sm">AI Researcher at DeepMind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
