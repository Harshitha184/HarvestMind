import { DiseaseDetection } from "@/components/disease/DiseaseDetection";
import { Navbar } from "@/components/layout/Navbar";

const DiseaseDetectionPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <DiseaseDetection />
      </main>
    </div>
  );
};

export default DiseaseDetectionPage;