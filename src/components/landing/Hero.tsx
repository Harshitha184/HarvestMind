import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Leaf, ArrowRight, Sprout } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-agricultural">
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="flex items-center justify-center mb-8">
          <Leaf className="h-16 w-16 text-white mr-4" />
          <h1 className="text-5xl md:text-7xl font-bold">
            HarvestMind
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
          AI-Powered Crop Yield Prediction & Disease Detection for Odisha Farmers
        </p>
        
        <p className="text-lg mb-12 max-w-2xl mx-auto opacity-90">
          Empowering farmers with data-driven insights, weather forecasts, and smart recommendations 
          to maximize crop yields and minimize losses.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/register">
            <Button size="lg" className="hero text-lg px-8 py-4 bg-white text-primary hover:bg-white/90">
              <Sprout className="mr-2 h-5 w-5" />
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          
          <Link to="/login">
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-white hover:bg-white/10">
              Sign In
            </Button>
          </Link>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">95%</div>
            <div className="text-sm opacity-80">Prediction Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">50+</div>
            <div className="text-sm opacity-80">Disease Types Detected</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">10,000+</div>
            <div className="text-sm opacity-80">Farmers Supported</div>
          </div>
        </div>
      </div>
    </section>
  );
};