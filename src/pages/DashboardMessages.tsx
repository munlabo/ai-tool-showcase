
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

// This is a placeholder component for messages
// In a real application, you'd implement a full messaging system

const DashboardMessages = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  
  useEffect(() => {
    // This is just a placeholder for demonstration
    // In a real app, you'd fetch actual messages
    const mockMessages = [
      { 
        id: '1', 
        sender: 'John Doe', 
        content: 'Hi there! I\'m interested in your AI tool.',
        date: new Date(Date.now() - 3600000).toISOString() 
      },
      { 
        id: '2', 
        sender: 'Jane Smith', 
        content: 'Can you tell me more about the pricing?',
        date: new Date(Date.now() - 86400000).toISOString() 
      },
      { 
        id: '3', 
        sender: 'Alex Brown', 
        content: 'Great work on the latest update!',
        date: new Date(Date.now() - 172800000).toISOString() 
      },
    ];
    
    setMessages(mockMessages);
    setLoading(false);
  }, [user]);
  
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    // For demonstration only
    toast.success('Message feature coming soon!');
    setNewMessage('');
  };
  
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Messages</h1>
        
        {loading ? (
          <div className="space-y-4">
            <div className="h-24 bg-muted animate-pulse rounded" />
            <div className="h-24 bg-muted animate-pulse rounded" />
            <div className="h-24 bg-muted animate-pulse rounded" />
          </div>
        ) : messages.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-12">
              <h3 className="text-lg font-medium mb-2">No messages yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                When someone contacts you about your tools or content, you'll see messages here.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {messages.map((message) => (
              <Card key={message.id}>
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base font-medium">{message.sender}</CardTitle>
                    <span className="text-xs text-muted-foreground">
                      {new Date(message.date).toLocaleString()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p>{message.content}</p>
                  <div className="flex justify-end mt-2">
                    <Button variant="outline" size="sm">Reply</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardMessages;
