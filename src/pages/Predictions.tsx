import { YieldPredictor } from "@/components/yield/YieldPredictor";
import { Navbar } from "@/components/layout/Navbar";

const Predictions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <YieldPredictor />
      </main>
    </div>
  );
};

export default Predictions;