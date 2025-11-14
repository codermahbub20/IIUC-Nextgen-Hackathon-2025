import { useState, useRef, useEffect } from "react";
import { Loader2, Send, GraduationCap, Briefcase, BookOpen, TrendingUp } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = "https://ehtphzwdjnmrofkzmqdg.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVodHBoendkam5tcm9ma3ptcWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNDI0MzQsImV4cCI6MjA3ODcxODQzNH0.t_CQ-WpimFu5P8Vcy-gf6L2jV9QYaDDsum0RwXrzcOo";
const supabase = createClient(supabaseUrl, supabaseKey);

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTED_QUESTIONS = [
  "Which roles fit my skills in web development?",
  "What should I learn to become a data scientist?",
  "How can I improve my chances of getting an internship?",
  "What certifications are valuable for cloud computing?",
];

export default function Index() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Call Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('career-chat', {
        body: { message: messageText }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to get response from server');
      }

      // Check if data and reply exist
      if (!data || !data.reply) {
        throw new Error('Invalid response format from server');
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Show error message to user
      const errorMessage: Message = {
        role: "assistant",
        content: error instanceof Error 
          ? `Error: ${error.message}. Please try again.`
          : "Sorry, something went wrong. Please check your connection and try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      // CRITICAL: Always set loading to false
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-4 shadow-md">
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            CareerBot
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your personal AI mentor for career guidance, learning paths, and professional growth
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
          <Card className="p-4 border-2 hover:shadow-lg transition-all duration-300 hover:border-primary/50">
            <Briefcase className="w-6 h-6 text-primary mb-2" />
            <h3 className="font-semibold mb-1">Career Paths</h3>
            <p className="text-sm text-muted-foreground">Find roles that match your skills</p>
          </Card>
          <Card className="p-4 border-2 hover:shadow-lg transition-all duration-300 hover:border-secondary/50">
            <BookOpen className="w-6 h-6 text-secondary mb-2" />
            <h3 className="font-semibold mb-1">Learning Guidance</h3>
            <p className="text-sm text-muted-foreground">Discover what to learn next</p>
          </Card>
          <Card className="p-4 border-2 hover:shadow-lg transition-all duration-300 hover:border-accent/50">
            <TrendingUp className="w-6 h-6 text-accent mb-2" />
            <h3 className="font-semibold mb-1">Career Growth</h3>
            <p className="text-sm text-muted-foreground">Tips for internships & jobs</p>
          </Card>
        </div>

        {/* Chat Interface */}
        <Card className="max-w-4xl mx-auto shadow-xl">
          <div className="h-[500px] flex flex-col">
            <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="space-y-4">
                  <p className="text-center text-muted-foreground mb-6">
                    Ask me anything about your career! Here are some ideas:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {SUGGESTED_QUESTIONS.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-auto py-3 px-4 text-left justify-start hover:bg-primary/5 hover:border-primary/50 transition-all"
                        onClick={() => handleSuggestedQuestion(question)}
                        disabled={isLoading}
                      >
                        <span className="text-sm">{question}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex gap-3 ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <Avatar className="w-8 h-8 border-2 border-primary/20 flex-shrink-0">
                          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground text-xs flex items-center justify-center w-full h-full">
                            CB
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                          message.role === "user"
                            ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-md"
                            : "bg-muted border border-border"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                      {message.role === "user" && (
                        <Avatar className="w-8 h-8 border-2 border-muted flex-shrink-0">
                          <AvatarFallback className="bg-muted text-xs flex items-center justify-center w-full h-full">You</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <Avatar className="w-8 h-8 border-2 border-primary/20 flex-shrink-0">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground text-xs flex items-center justify-center w-full h-full">
                          CB
                        </AvatarFallback>
                      </Avatar>
                      <div className="rounded-2xl px-4 py-3 bg-muted border border-border">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t bg-background/50 backdrop-blur">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about your career goals..."
                  disabled={isLoading}
                  className="flex-1 border-2 focus:border-primary transition-colors"
                  maxLength={500}
                />
                <Button
                  onClick={() => sendMessage(input)}
                  disabled={isLoading || !input.trim()}
                  size="icon"
                  className="bg-gradient-to-br from-primary to-secondary hover:opacity-90 transition-opacity shadow-md"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                CareerBot is designed for educational and career guidance purposes only
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}