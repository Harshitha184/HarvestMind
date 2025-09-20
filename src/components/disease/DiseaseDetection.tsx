import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Camera, AlertTriangle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface DiseaseResult {
  disease: string;
  confidence: number;
  treatment: {
    en: string;
    od: string;
  };
  severity: "low" | "medium" | "high";
}

export const DiseaseDetection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiseaseResult | null>(null);
  const [language, setLanguage] = useState<"en" | "od">("en");

  const commonDiseases = [
    {
      disease: "Leaf Blight",
      confidence: 92,
      treatment: {
        en: "Apply Copper-based fungicide spray. Remove affected leaves. Ensure proper drainage.",
        od: "ତାମ୍ର ଆଧାରିତ କବକନାଶକ ସ୍ପ୍ରେ କରନ୍ତୁ। ପ୍ରଭାବିତ ପତ୍ର ହଟାନ୍ତୁ। ଉପଯୁକ୍ତ ନିଷ୍କାସନ ସୁନିଶ୍ଚିତ କରନ୍ତୁ।"
      },
      severity: "high" as const
    },
    {
      disease: "Bacterial Wilt",
      confidence: 87,
      treatment: {
        en: "Use resistant varieties. Apply soil drench with Streptomycin. Avoid waterlogged conditions.",
        od: "ପ୍ରତିରୋଧୀ କିସମ ବ୍ୟବହାର କରନ୍ତୁ। ଷ୍ଟ୍ରେପ୍ଟୋମାଇସିନ୍ ସହିତ ମାଟି ଭିଜାନ୍ତୁ। ଜଳଜମା ଅବସ୍ଥାରୁ ଦୂରେ ରୁହନ୍ତୁ।"
      },
      severity: "high" as const
    },
    {
      disease: "Rust",
      confidence: 94,
      treatment: {
        en: "Apply Mancozeb fungicide. Improve air circulation. Remove infected plant debris.",
        od: "ମ୍ୟାନକୋଜେବ୍ କବକନାଶକ ସ୍ପ୍ରେ କରନ୍ତୁ। ବାୟୁ ସଞ୍ଚାଳନ ଉନ୍ନତ କରନ୍ତୁ। ସଂକ୍ରମିତ ଉଦ୍ଭିଦ ଅବଶିଷ୍ଟାଂଶ ହଟାନ୍ତୁ।"
      },
      severity: "medium" as const
    },
    {
      disease: "Healthy",
      confidence: 96,
      treatment: {
        en: "Your crop appears healthy! Continue current care practices. Monitor regularly for any changes.",
        od: "ଆପଣଙ୍କ ଫସଲ ସୁସ୍ଥ ଦେଖାଯାଉଛି! ବର୍ତ୍ତମାନର ଯତ୍ନ ଅଭ୍ୟାସ ଜାରି ରଖନ୍ତୁ। କୌଣସି ପରିବର୍ତ୍ତନ ପାଇଁ ନିୟମିତ ନଜର ରଖନ୍ତୁ।"
      },
      severity: "low" as const
    }
  ];

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setResult(null);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      toast.error("Please select an image first");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock disease detection result
    const randomResult = commonDiseases[Math.floor(Math.random() * commonDiseases.length)];
    setResult(randomResult);
    setIsAnalyzing(false);
    
    toast.success("Disease analysis completed!");
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-destructive";
      case "medium": return "text-yellow-600";
      case "low": return "text-green-600";
      default: return "text-muted-foreground";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high": return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case "medium": return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case "low": return <CheckCircle className="h-5 w-5 text-green-600" />;
      default: return <AlertTriangle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const texts = {
    en: {
      title: "Crop Disease Detection",
      subtitle: "Upload an image of your crop leaves or plants for AI-powered disease detection",
      uploadButton: "Upload Image",
      analyzeButton: "Analyze Disease",
      analyzing: "Analyzing...",
      confidence: "Confidence",
      treatment: "Treatment Recommendations",
      aiDisclaimer: "⚠️ AI can make mistakes. Please check once before applying advice.",
      switchLanguage: "ଓଡ଼ିଆ",
      noImage: "No image selected",
      selectImage: "Please select an image to analyze"
    },
    od: {
      title: "ଫସଲ ରୋଗ ଚିହ୍ନଟ",
      subtitle: "AI ଚାଳିତ ରୋଗ ଚିହ୍ନଟ ପାଇଁ ଆପଣଙ୍କ ଫସଲର ପତ୍ର କିମ୍ବା ଉଦ୍ଭିଦର ଏକ ଚିତ୍ର ଅପଲୋଡ୍ କରନ୍ତୁ",
      uploadButton: "ଚିତ୍ର ଅପଲୋଡ୍ କରନ୍ତୁ",
      analyzeButton: "ରୋଗ ବିଶ୍ଳେଷଣ କରନ୍ତୁ",
      analyzing: "ବିଶ୍ଳେଷଣ କରୁଛି...",
      confidence: "ବିଶ୍ୱାସ",
      treatment: "ଚିକିତ୍ସା ସୁପାରିଶ",
      aiDisclaimer: "⚠️ AI ଭୁଲ କରିପାରେ। ପରାମର୍ଶ ପ୍ରୟୋଗ କରିବା ପୂର୍ବରୁ ଥରେ ଯାଞ୍ଚ କରନ୍ତୁ।",
      switchLanguage: "English",
      noImage: "କୌଣସି ଚିତ୍ର ଚୟନ କରାଯାଇନାହିଁ",
      selectImage: "ବିଶ୍ଳେଷଣ କରିବାକୁ ଦୟାକରି ଏକ ଚିତ୍ର ଚୟନ କରନ୍ତୁ"
    }
  };

  const t = texts[language];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-muted-foreground mt-2">{t.subtitle}</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setLanguage(language === "en" ? "od" : "en")}
          className="min-w-[100px]"
        >
          {t.switchLanguage}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary" />
              {t.uploadButton}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              {previewUrl ? (
                <div className="space-y-4">
                  <img
                    src={previewUrl}
                    alt="Selected crop"
                    className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                  />
                  <p className="text-sm text-muted-foreground">
                    {selectedImage?.name}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">{t.noImage}</p>
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="w-full"
                id="image-upload"
              />
              
              <Button
                onClick={analyzeImage}
                disabled={!selectedImage || isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? t.analyzing : t.analyzeButton}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Detection Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{result.disease}</h3>
                    {getSeverityIcon(result.severity)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t.confidence}: {result.confidence}%
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">{t.treatment}:</h4>
                  <p className="text-sm leading-relaxed p-3 bg-muted rounded-lg">
                    {result.treatment[language]}
                  </p>
                </div>

                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">{t.aiDisclaimer}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>{t.selectImage}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};