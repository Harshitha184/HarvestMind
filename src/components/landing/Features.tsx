import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, Camera, CloudRain, BarChart3, Shield, Globe } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: <Sprout className="h-8 w-8 text-primary" />,
      title: "Crop Yield Prediction",
      description: "AI-powered predictions based on soil, weather, and historical data to optimize your harvest."
    },
    {
      icon: <Camera className="h-8 w-8 text-primary" />,
      title: "Disease Detection",
      description: "Upload crop images for instant disease identification and treatment recommendations."
    },
    {
      icon: <CloudRain className="h-8 w-8 text-primary" />,
      title: "Weather Integration",
      description: "Real-time weather data and forecasts tailored to your farm location in Odisha."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: "Data Analytics",
      description: "Comprehensive insights and trends to make informed agricultural decisions."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Expert Recommendations",
      description: "Evidence-based advice on fertilizers, irrigation, and pest management."
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Multilingual Support",
      description: "Available in English and Odia for better accessibility across Odisha."
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Revolutionizing Agriculture in Odisha
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive AI-powered tools designed specifically for Odisha's agricultural needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};