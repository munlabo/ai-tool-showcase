
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "@/components/layout/Layout";
import { mockTools } from "@/data/mockTools";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Eye, Heart, MessageSquare, ArrowLeft, ExternalLink } from "lucide-react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const ToolDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const tool = mockTools.find(tool => tool.slug === slug);
  
  // Mock screenshots for the carousel
  const [screenshots] = useState([
    { id: 1, url: "/placeholder.svg", alt: "Screenshot 1" },
    { id: 2, url: "/placeholder.svg", alt: "Screenshot 2" },
    { id: 3, url: "/placeholder.svg", alt: "Screenshot 3" },
  ]);

  // Form setup
  type ContactFormValues = {
    name: string;
    email: string;
    message: string;
  };

  const form = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log("Form submitted:", data);
    toast({
      title: "Message sent",
      description: "Your message has been sent to the tool creator."
    });
    form.reset();
  };

  if (!tool) {
    return (
      <Layout>
        <div className="container max-w-7xl mx-auto px-4 py-12">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Tool not found</h1>
            <p className="text-muted-foreground mb-6">The tool you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/tools">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Tools
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="mb-6">
          <Link to="/tools" className="inline-flex items-center text-sm font-medium text-primary">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to all tools
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">{tool.name}</h1>
                <Badge variant="secondary">{tool.pricing}</Badge>
              </div>
              
              <div className="flex items-center mt-3 space-x-4">
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={tool.author.avatar} alt={tool.author.name} />
                    <AvatarFallback>{tool.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">{tool.author.name}</span>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(tool.createdAt)}</span>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{tool.viewCount}</span>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Heart className="h-4 w-4 mr-1" />
                  <span>{tool.likeCount}</span>
                </div>
              </div>
            </div>
            
            {/* Featured image */}
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <img 
                src={tool.imageUrl} 
                alt={tool.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Tool description */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">About this tool</h2>
              <p className="text-muted-foreground">
                {tool.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {tool.tags.map(tag => (
                  <Badge key={tag.id} variant="outline">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Screenshots carousel */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Screenshots</h2>
              <Carousel className="w-full">
                <CarouselContent>
                  {screenshots.map((screenshot) => (
                    <CarouselItem key={screenshot.id}>
                      <div className="aspect-video p-1">
                        <img
                          src={screenshot.url}
                          alt={screenshot.alt}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-4">
                  <CarouselPrevious className="relative static translate-y-0 left-0 mr-2" />
                  <CarouselNext className="relative static translate-y-0 right-0" />
                </div>
              </Carousel>
            </div>
            
            {/* Demo section - placeholder */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Live Demo</h2>
              <div className="bg-muted rounded-lg flex items-center justify-center h-48">
                <p className="text-muted-foreground">
                  Live demo coming soon
                </p>
              </div>
              <div className="flex justify-end">
                <Button variant="outline">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Live Demo
                </Button>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact form */}
            <div className="bg-card rounded-xl border p-6">
              <h2 className="text-xl font-semibold mb-6">Contact Creator</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="Your email" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Write your message here..." 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </Form>
            </div>
            
            {/* Tool information */}
            <div className="bg-card rounded-xl border p-6">
              <h2 className="text-lg font-semibold mb-4">Tool Information</h2>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium">{tool.category.name}</p>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm text-muted-foreground">Pricing</p>
                  <p className="font-medium">{tool.pricing}</p>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm text-muted-foreground">Published</p>
                  <p className="font-medium">{formatDate(tool.createdAt)}</p>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm text-muted-foreground">Creator</p>
                  <div className="flex items-center mt-1">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={tool.author.avatar} alt={tool.author.name} />
                      <AvatarFallback>{tool.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="font-medium">{tool.author.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ToolDetail;
