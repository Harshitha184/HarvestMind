import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Target, Award } from "lucide-react";

export const About = () => {
  const achievements = [
    {
      icon: <CheckCircle className="h-6 w-6 text-green-600" />,
      text: "Evidence-based recommendations with source citations"
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-green-600" />,
      text: "Trained on authentic Odisha agricultural datasets"
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-green-600" />,
      text: "Integrated with IMD weather data for accuracy"
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-green-600" />,
      text: "Multi-role access for farmers, officials, and researchers"
    }
  ];

  const stats = [
    { icon: <Users className="h-8 w-8" />, number: "15%", label: "Productivity Increase" },
    { icon: <Target className="h-8 w-8" />, number: "95%", label: "Prediction Accuracy" },
    { icon: <Award className="h-8 w-8" />, number: "30+", label: "Districts Covered" }
  ];

  return (
    <section className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Built for Odisha's Agricultural Future
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our AI-powered platform is specifically designed to address the unique challenges 
              faced by farmers in Odisha. Every prediction and recommendation is backed by 
              scientific data and research.
            </p>
            
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3">
                  {achievement.icon}
                  <span className="text-sm">{achievement.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center text-primary mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};