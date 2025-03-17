
const IntegrationLogos = () => {
  const logos = [
    { name: 'Slack', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Slack_Technologies_Logo.svg/2560px-Slack_Technologies_Logo.svg.png' },
    { name: 'Dropbox', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Dropbox_logo_%282013-2020%29.svg/2560px-Dropbox_logo_%282013-2020%29.svg.png' },
    { name: 'Zoom', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Zoom_logo.svg/2560px-Zoom_logo.svg.png' },
    { name: 'Notion', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Notion-logo.svg/2560px-Notion-logo.svg.png' },
    { name: 'Figma', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/800px-Figma-logo.svg.png' },
  ];

  return (
    <div className="mt-12 md:mt-16">
      <h3 className="text-center text-gray-500 text-sm font-medium mb-6">TRUSTED BY LEADING COMPANIES</h3>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
        {logos.map((logo) => (
          <div key={logo.name} className="grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
            <img 
              src={logo.src} 
              alt={`${logo.name} logo`} 
              className="h-6 md:h-8 object-contain" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntegrationLogos;
