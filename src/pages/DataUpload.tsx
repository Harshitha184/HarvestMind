import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Database, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const DataUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [description, setDescription] = useState("");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    setIsUploading(true);
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Save to localStorage for demo
    const uploadData = {
      fileName: selectedFile.name,
      fileSize: selectedFile.size,
      uploadDate: new Date().toISOString(),
      description,
      status: "processed"
    };
    
    const existingUploads = JSON.parse(localStorage.getItem("uploadedFiles") || "[]");
    existingUploads.push(uploadData);
    localStorage.setItem("uploadedFiles", JSON.stringify(existingUploads));
    
    setIsUploading(false);
    setUploadSuccess(true);
    toast.success("File uploaded and processed successfully!");
  };

  const supportedFormats = [
    { extension: "CSV", description: "Agricultural datasets with soil, weather, yield data" },
    { extension: "XLSX", description: "Excel files with structured farm data" },
    { extension: "JSON", description: "Structured data in JSON format" },
    { extension: "TXT", description: "Text files with tabular data" }
  ];

  const sampleDatasets = [
    "Odisha Agriculture Dataset (1650 records)",
    "Soil Health Dataset (500+ samples)",
    "Weather Pattern Dataset (10-year history)",
    "Crop Disease Images (2000+ labeled images)"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Dataset Upload & Management
            </h1>
            <p className="text-muted-foreground mt-2">
              Upload agricultural datasets to improve AI model predictions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upload Section */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-primary" />
                    Upload New Dataset
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    {selectedFile ? (
                      <div className="space-y-4">
                        <FileText className="h-12 w-12 text-primary mx-auto" />
                        <div>
                          <p className="font-medium">{selectedFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(selectedFile.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                        {uploadSuccess && (
                          <div className="flex items-center justify-center gap-2 text-green-600">
                            <CheckCircle className="h-5 w-5" />
                            <span>Upload successful!</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                        <div>
                          <p className="text-lg font-medium">Drop your file here</p>
                          <p className="text-muted-foreground">or click to browse</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <input
                    type="file"
                    accept=".csv,.xlsx,.json,.txt"
                    onChange={handleFileSelect}
                    className="w-full"
                  />
                  
                  <div>
                    <Label htmlFor="description">Dataset Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your dataset (optional)"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  
                  <Button
                    onClick={handleUpload}
                    disabled={!selectedFile || isUploading}
                    className="w-full"
                  >
                    {isUploading ? "Uploading..." : "Upload Dataset"}
                  </Button>
                </CardContent>
              </Card>

              {/* Google Colab Integration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    ML Model Integration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Connect your Google Colab notebook for advanced ML processing
                  </p>
                  
                  <div>
                    <Label htmlFor="colab-link">Google Colab Notebook URL</Label>
                    <Input
                      id="colab-link"
                      placeholder="https://colab.research.google.com/drive/..."
                      className="mt-2"
                    />
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Connect Colab Notebook
                  </Button>
                  
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-blue-800">Your ML Model is Ready</p>
                        <p className="text-blue-700">
                          The crop yield prediction model has been trained and is available for predictions.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Information Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Supported Formats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {supportedFormats.map((format, index) => (
                    <div key={index} className="border-l-4 border-primary pl-3">
                      <p className="font-medium">.{format.extension}</p>
                      <p className="text-sm text-muted-foreground">{format.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Sample Datasets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {sampleDatasets.map((dataset, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-secondary rounded text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>{dataset}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Data Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• Ensure data is clean and properly formatted</p>
                  <p>• Include relevant column headers</p>
                  <p>• Remove sensitive personal information</p>
                  <p>• Maximum file size: 50MB</p>
                  <p>• UTF-8 encoding recommended</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DataUpload;