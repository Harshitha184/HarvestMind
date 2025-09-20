import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Sprout, CloudRain, Thermometer, Droplets } from "lucide-react";
import { toast } from "sonner";

interface PredictionResult {
  predictedYield: number;
  confidence: number;
  recommendations: {
    en: string;
    od: string;
  }[];
  factors: Array<{
    name: string;
    impact: number;
    importance: number;
  }>;
}

export const YieldPredictor: React.FC = () => {
  const [language, setLanguage] = useState<"en" | "od">("en");
  const [isPredicting, setIsPredicting] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  
  const [formData, setFormData] = useState({
    district: "",
    crop: "",
    sowingDate: "",
    farmSize: "",
    soilPH: "",
    soilN: "",
    soilP: "",
    soilK: "",
    organicCarbon: "",
    rainfall: "",
    temperature: "",
    humidity: ""
  });

  const odishaDistricts = [
    "Angul", "Balangir", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh",
    "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda",
    "Kalahandi", "Kandhamal", "Kendrapara", "Keonjhar", "Khordha", "Koraput",
    "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri",
    "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh", "Bolangir"
  ];

  const crops = ["rice", "maize", "pulses", "groundnut", "sesame", "sugarcane", "wheat"];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const predictYield = async () => {
    // Validation
    const requiredFields = ["district", "crop", "farmSize"];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsPredicting(true);
    
    // Simulate ML prediction
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock prediction based on crop type
    const baseYields = {
      rice: 2600,
      maize: 1800,
      pulses: 1200,
      groundnut: 1700,
      sesame: 700,
      sugarcane: 65000,
      wheat: 2200
    };
    
    const selectedCrop = formData.crop as keyof typeof baseYields;
    const baseYield = baseYields[selectedCrop] || 2000;
    
    // Add some randomness and factor influence
    const yieldVariation = (Math.random() - 0.5) * 400;
    const predictedYield = Math.round(baseYield + yieldVariation);
    
    const mockResult: PredictionResult = {
      predictedYield,
      confidence: Math.round(85 + Math.random() * 10),
      recommendations: [
        {
          en: `Apply 120 kg Urea + 60 kg DAP per hectare based on soil N levels. Source: ICAR Fertilizer Guidelines 2023`,
          od: `ମାଟି N ସ୍ତର ଆଧାରରେ ହେକ୍ଟର ପ୍ରତି 120 କିଲୋ ୟୁରିଆ + 60 କିଲୋ DAP ପ୍ରୟୋଗ କରନ୍ତୁ। ଉତ୍ସ: ICAR ସାର ଗାଇଡଲାଇନ୍ସ 2023`
        },
        {
          en: `Maintain soil moisture at 80% field capacity during flowering stage. Source: IMD Weather Data Analysis`,
          od: `ଫୁଲ ପର୍ଯ୍ୟାୟରେ ମାଟିର ଆର୍ଦ୍ରତା 80% କ୍ଷେତ୍ର କ୍ଷମତାରେ ବଜାୟ ରଖନ୍ତୁ। ଉତ୍ସ: IMD ପାଣିପାଗ ତଥ୍ୟ ବିଶ୍ଳେଷଣ`
        },
        {
          en: `Monitor for pest attacks during high humidity periods (>85%). Source: Odisha Agriculture Dept Report 2023`,
          od: `ଅଧିକ ଆର୍ଦ୍ରତା ସମୟରେ (>85%) କୀଟପତଙ୍ଗ ଆକ୍ରମଣ ପାଇଁ ନଜର ରଖନ୍ତୁ। ଉତ୍ସ: ଓଡ଼ିଶା କୃଷି ବିଭାଗ ରିପୋର୍ଟ 2023`
        }
      ],
      factors: [
        { name: "Rainfall", impact: 0.25, importance: 85 },
        { name: "Soil Nutrients", impact: 0.22, importance: 78 },
        { name: "Temperature", impact: 0.18, importance: 72 },
        { name: "Humidity", impact: 0.15, importance: 65 },
        { name: "Soil pH", impact: 0.12, importance: 58 },
        { name: "Organic Carbon", impact: 0.08, importance: 45 }
      ]
    };
    
    setPrediction(mockResult);
    setIsPredicting(false);
    toast.success("Yield prediction completed!");
  };

  const texts = {
    en: {
      title: "Crop Yield Prediction",
      subtitle: "Enter your farm details for AI-powered yield prediction and recommendations",
      farmDetails: "Farm Details",
      soilData: "Soil Test Data",
      weatherData: "Weather & Environmental Data",
      predict: "Predict Yield",
      predicting: "Predicting...",
      results: "Prediction Results",
      recommendations: "Recommendations",
      factors: "Key Factors Influencing Yield",
      aiDisclaimer: "⚠️ AI can make mistakes. Please check once before applying advice.",
      switchLanguage: "ଓଡ଼ିଆ",
      district: "District",
      crop: "Crop Type",
      sowingDate: "Sowing Date",
      farmSize: "Farm Size (hectares)",
      soilPH: "Soil pH",
      soilN: "Soil Nitrogen (kg/ha)",
      soilP: "Soil Phosphorus (kg/ha)",
      soilK: "Soil Potassium (kg/ha)",
      organicCarbon: "Organic Carbon (%)",
      rainfall: "Expected Rainfall (mm)",
      temperature: "Average Temperature (°C)",
      humidity: "Humidity (%)",
      predictedYield: "Predicted Yield",
      confidence: "Confidence Level"
    },
    od: {
      title: "ଫସଲ ଅମଳ ପୂର୍ବାନୁମାନ",
      subtitle: "AI ଚାଳିତ ଅମଳ ପୂର୍ବାନୁମାନ ଏବଂ ସୁପାରିଶ ପାଇଁ ଆପଣଙ୍କ ଖତିଆନ ବିବରଣୀ ପ୍ରବେଶ କରନ୍ତୁ",
      farmDetails: "ଖତିଆନ ବିବରଣୀ",
      soilData: "ମାଟି ପରୀକ୍ଷା ତଥ୍ୟ",
      weatherData: "ପାଣିପାଗ ଏବଂ ପରିବେଶ ତଥ୍ୟ",
      predict: "ଅମଳ ପୂର୍ବାନୁମାନ କରନ୍ତୁ",
      predicting: "ପୂର୍ବାନୁମାନ କରୁଛି...",
      results: "ପୂର୍ବାନୁମାନ ଫଳାଫଳ",
      recommendations: "ସୁପାରିଶ",
      factors: "ଅମଳ ପ୍ରଭାବିତ କରୁଥିବା ମୁଖ୍ୟ କାରକ",
      aiDisclaimer: "⚠️ AI ଭୁଲ କରିପାରେ। ପରାମର୍ଶ ପ୍ରୟୋଗ କରିବା ପୂର୍ବରୁ ଥରେ ଯାଞ୍ଚ କରନ୍ତୁ।",
      switchLanguage: "English",
      district: "ଜିଲ୍ଲା",
      crop: "ଫସଲ ପ୍ରକାର",
      sowingDate: "ବୁଣିବା ତାରିଖ",
      farmSize: "ଖତିଆନ ଆକାର (ହେକ୍ଟର)",
      soilPH: "ମାଟି pH",
      soilN: "ମାଟି ନାଇଟ୍ରୋଜେନ୍ (କି.ଗ୍ରା./ହେ.)",
      soilP: "ମାଟି ଫସଫରସ୍ (କି.ଗ୍ରା./ହେ.)",
      soilK: "ମାଟି ପୋଟାସିୟମ୍ (କି.ଗ୍ରା./ହେ.)",
      organicCarbon: "ଜୈବିକ କାର୍ବନ୍ (%)",
      rainfall: "ଆଶା କରାଯାଉଥିବା ବର୍ଷା (ମି.ମି.)",
      temperature: "ହାରାହାରି ତାପମାତ୍ରା (°C)",
      humidity: "ଆର୍ଦ୍ରତା (%)",
      predictedYield: "ପୂର୍ବାନୁମାନିତ ଅମଳ",
      confidence: "ବିଶ୍ୱାସ ସ୍ତର"
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Farm Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sprout className="h-5 w-5 text-primary" />
                {t.farmDetails}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="district">{t.district} *</Label>
                <Select onValueChange={(value) => handleInputChange("district", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {odishaDistricts.map(district => (
                      <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="crop">{t.crop} *</Label>
                <Select onValueChange={(value) => handleInputChange("crop", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {crops.map(crop => (
                      <SelectItem key={crop} value={crop}>
                        {crop.charAt(0).toUpperCase() + crop.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="sowingDate">{t.sowingDate}</Label>
                <Input 
                  type="date" 
                  onChange={(e) => handleInputChange("sowingDate", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="farmSize">{t.farmSize} *</Label>
                <Input 
                  type="number" 
                  placeholder="e.g., 2.5"
                  onChange={(e) => handleInputChange("farmSize", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Soil Data */}
          <Card>
            <CardHeader>
              <CardTitle>{t.soilData}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="soilPH">{t.soilPH}</Label>
                <Input 
                  type="number" 
                  step="0.1"
                  placeholder="e.g., 6.5"
                  onChange={(e) => handleInputChange("soilPH", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="organicCarbon">{t.organicCarbon}</Label>
                <Input 
                  type="number" 
                  step="0.01"
                  placeholder="e.g., 0.8"
                  onChange={(e) => handleInputChange("organicCarbon", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="soilN">{t.soilN}</Label>
                <Input 
                  type="number" 
                  placeholder="e.g., 200"
                  onChange={(e) => handleInputChange("soilN", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="soilP">{t.soilP}</Label>
                <Input 
                  type="number" 
                  placeholder="e.g., 25"
                  onChange={(e) => handleInputChange("soilP", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="soilK">{t.soilK}</Label>
                <Input 
                  type="number" 
                  placeholder="e.g., 150"
                  onChange={(e) => handleInputChange("soilK", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Weather Data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CloudRain className="h-5 w-5 text-primary" />
                {t.weatherData}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="rainfall" className="flex items-center gap-1">
                  <CloudRain className="h-4 w-4" />
                  {t.rainfall}
                </Label>
                <Input 
                  type="number" 
                  placeholder="e.g., 1200"
                  onChange={(e) => handleInputChange("rainfall", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="temperature" className="flex items-center gap-1">
                  <Thermometer className="h-4 w-4" />
                  {t.temperature}
                </Label>
                <Input 
                  type="number" 
                  placeholder="e.g., 28"
                  onChange={(e) => handleInputChange("temperature", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="humidity" className="flex items-center gap-1">
                  <Droplets className="h-4 w-4" />
                  {t.humidity}
                </Label>
                <Input 
                  type="number" 
                  placeholder="e.g., 75"
                  onChange={(e) => handleInputChange("humidity", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={predictYield} 
            disabled={isPredicting}
            className="w-full"
            size="lg"
          >
            {isPredicting ? t.predicting : t.predict}
          </Button>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {prediction ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>{t.results}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 bg-gradient-primary rounded-lg text-white">
                    <h3 className="text-2xl font-bold">{prediction.predictedYield.toLocaleString()}</h3>
                    <p className="opacity-90">kg/hectare</p>
                    <p className="text-sm opacity-75 mt-2">
                      {t.confidence}: {prediction.confidence}%
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">{t.factors}</h4>
                    <div className="space-y-2">
                      {prediction.factors.map((factor, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span>{factor.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full" 
                                style={{width: `${factor.importance}%`}}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground w-8">
                              {factor.importance}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>{t.recommendations}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {prediction.recommendations.map((rec, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg">
                      <p className="text-sm leading-relaxed">
                        {rec[language]}
                      </p>
                    </div>
                  ))}
                  
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mt-4">
                    <p className="text-sm text-yellow-800">{t.aiDisclaimer}</p>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="text-center py-12 text-muted-foreground">
                <Sprout className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter farm details and click predict to see results</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};