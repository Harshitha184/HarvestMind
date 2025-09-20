import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Phone, Mail, HelpCircle, Send, Clock, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const Support = () => {
  const [chatMessage, setChatMessage] = useState("");
  const [supportForm, setSupportForm] = useState({
    name: "",
    email: "",
    category: "",
    message: ""
  });

  const faqs = [
    {
      question: "ଫସଲ ଅମଳ ପୂର୍ବାନୁମାନ କେତେ ସଠିକ? (How accurate are crop yield predictions?)",
      answer: "Our AI model achieves 90-95% accuracy based on historical data validation. Predictions are based on weather patterns, soil health, and agricultural practices specific to Odisha. আমাদের AI মডেল ঐতিহাসিক ডেটা যাচাইকরণের ভিত্তিতে 90-95% নির্ভুলতা অর্জন করে।"
    },
    {
      question: "କେଉଁ ପ୍ରକାର ଫସଲ ରୋଗ ଚିହ୍ନଟ କରାଯାଇପାରିବ? (What crop diseases can be detected?)",
      answer: "We can detect 50+ common diseases including leaf blight, bacterial wilt, rust, and viral infections. Our model is trained on authenticated disease datasets from ICAR and agricultural universities."
    },
    {
      question: "ମୋବାଇଲରେ କିପରି ବ୍ୟବହାର କରିବି? (How to use on mobile?)",
      answer: "The platform is fully responsive and works on all devices. You can access all features including image upload for disease detection directly from your smartphone browser."
    },
    {
      question: "ଡାଟା କେତେ ସୁରକ୍ଷିତ? (How secure is my data?)",
      answer: "All your farm data is stored securely with encryption. We follow agricultural data privacy guidelines and never share personal information without consent."
    },
    {
      question: "SMS ଆଲର୍ଟ କିପରି ମିଳିବ? (How to get SMS alerts?)",
      answer: "Register your mobile number in your profile settings. We send weather alerts, pest warnings, and fertilizer reminders via SMS in both English and Odia."
    }
  ];

  const supportChannels = [
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone Support",
      description: "24/7 helpline for farmers",
      contact: "1800-XXX-XXXX",
      availability: "Always Available"
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: "WhatsApp Support",
      description: "Quick assistance via chat",
      contact: "+91-XXXXX-XXXXX",
      availability: "9 AM - 6 PM"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email Support",
      description: "Detailed technical inquiries",
      contact: "support@fasalsathi.in",
      availability: "Response within 24 hours"
    }
  ];

  const handleChatSubmit = () => {
    if (!chatMessage.trim()) return;
    
    toast.success("Message sent! Our team will respond shortly.");
    setChatMessage("");
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Support ticket created! We'll contact you within 24 hours.");
    setSupportForm({ name: "", email: "", category: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Support & Help Center
            </h1>
            <p className="text-muted-foreground mt-2">
              Get help with HarvestMind AI platform • ସହାୟତା ପାଆନ୍ତୁ
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Support Channels */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Contact Us</h2>
              {supportChannels.map((channel, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {channel.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{channel.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {channel.description}
                        </p>
                        <p className="font-medium text-primary">{channel.contact}</p>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {channel.availability}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Live Chat & Contact Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Live Chat */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    Live Chat
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-48 bg-secondary/20 rounded-lg p-4 space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">FS</span>
                      </div>
                      <div className="bg-white p-2 rounded-lg shadow-sm flex-1">
                        <p className="text-sm">Hello! How can I help you today? নমস্কার! আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?</p>
                        <span className="text-xs text-muted-foreground">HarvestMind Support</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message here... ଏଠାରେ ଆପଣଙ୍କ ସନ୍ଦେଶ ଲେଖନ୍ତୁ"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                    />
                    <Button onClick={handleChatSubmit} size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Support Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Submit Support Ticket</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSupportSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={supportForm.name}
                          onChange={(e) => setSupportForm(prev => ({...prev, name: e.target.value}))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={supportForm.email}
                          onChange={(e) => setSupportForm(prev => ({...prev, email: e.target.value}))}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Describe your issue</Label>
                      <Textarea
                        id="message"
                        rows={4}
                        placeholder="Please describe your issue in detail..."
                        value={supportForm.message}
                        onChange={(e) => setSupportForm(prev => ({...prev, message: e.target.value}))}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Submit Ticket
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                Frequently Asked Questions (ବାରମ୍ବାର ପଚରାଯାଉଥିବା ପ୍ରଶ୍ନ)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* AI Disclaimer */}
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-yellow-800 mb-2">
                    AI Disclaimer (AI ଦାବିତ୍ୟାଗ)
                  </h3>
                  <p className="text-sm text-yellow-700">
                    ⚠️ AI can make mistakes. Please check once before applying advice. 
                    আমাদের AI পরামর্শ প্রয়োগ করার আগে অনুগ্রহ করে একবার যাচাই করুন।
                    AI ଭୁଲ କରିପାରେ। ପରାମର୍ଶ ପ୍ରୟୋଗ କରିବା ପୂର୍ବରୁ ଦୟାକରି ଥରେ ଯାଞ୍ଚ କରନ୍ତୁ।
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Support;