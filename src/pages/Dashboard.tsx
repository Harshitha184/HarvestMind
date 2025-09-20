import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Sprout, CloudRain, Camera, Upload, TrendingUp, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();

  const yieldData = [
    { month: "Jan", yield: 2800 },
    { month: "Feb", yield: 3100 },
    { month: "Mar", yield: 2950 },
    { month: "Apr", yield: 3400 },
    { month: "May", yield: 3200 },
    { month: "Jun", yield: 3600 }
  ];

  const weatherData = [
    { day: "Mon", temp: 28, rainfall: 5 },
    { day: "Tue", temp: 30, rainfall: 0 },
    { day: "Wed", temp: 29, rainfall: 12 },
    { day: "Thu", temp: 27, rainfall: 8 },
    { day: "Fri", temp: 31, rainfall: 0 },
    { day: "Sat", temp: 29, rainfall: 15 },
    { day: "Sun", temp: 28, rainfall: 3 }
  ];

  const recentAlerts = [
    { id: 1, type: "weather", message: "Heavy rainfall expected in your district", severity: "medium" },
    { id: 2, type: "pest", message: "Brown planthopper activity detected", severity: "high" },
    { id: 3, type: "fertilizer", message: "Time for nitrogen application", severity: "low" }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-muted-foreground mt-2">
                {user?.role === "farmer" && "Monitor your crops and get AI-powered insights"}
                {user?.role === "government" && "Oversee agricultural data and policy insights"}
                {user?.role === "researcher" && "Access research data and analytics"}
              </p>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <p>Role: <span className="capitalize font-medium">{user?.role}</span></p>
              {user?.profile?.district && (
                <p>District: <span className="font-medium">{user.profile.district}</span></p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/predictions">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Sprout className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold">Yield Prediction</h3>
                  <p className="text-sm text-muted-foreground">Predict crop yields</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/disease-detection">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Camera className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold">Disease Detection</h3>
                  <p className="text-sm text-muted-foreground">Identify crop diseases</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/data-upload">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Upload className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold">Upload Data</h3>
                  <p className="text-sm text-muted-foreground">Upload datasets</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/research">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold">Analytics</h3>
                  <p className="text-sm text-muted-foreground">View insights</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Yield Trends */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Yield Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={yieldData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="yield" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  Recent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}
                  >
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs mt-1 opacity-75 capitalize">{alert.type} alert</p>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  View All Alerts
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Weather & Statistics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CloudRain className="h-5 w-5 text-primary" />
                  7-Day Weather Forecast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={weatherData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="temp" stroke="hsl(var(--primary))" name="Temperature (°C)" />
                    <Line type="monotone" dataKey="rainfall" stroke="hsl(var(--secondary))" name="Rainfall (mm)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <h3 className="text-2xl font-bold text-primary">3.2</h3>
                    <p className="text-sm text-muted-foreground">Avg Yield (tons/ha)</p>
                  </div>
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <h3 className="text-2xl font-bold text-primary">85%</h3>
                    <p className="text-sm text-muted-foreground">Prediction Accuracy</p>
                  </div>
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <h3 className="text-2xl font-bold text-primary">12</h3>
                    <p className="text-sm text-muted-foreground">Diseases Detected</p>
                  </div>
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <h3 className="text-2xl font-bold text-primary">28°C</h3>
                    <p className="text-sm text-muted-foreground">Current Temp</p>
                  </div>
                </div>
                
                {user?.profile?.farmSize && (
                  <div className="mt-4 p-4 bg-gradient-primary/10 rounded-lg">
                    <h4 className="font-medium">Your Farm Details</h4>
                    <p className="text-sm text-muted-foreground">
                      Size: {user.profile.farmSize} hectares
                    </p>
                    {user.profile.crops && (
                      <p className="text-sm text-muted-foreground">
                        Crops: {user.profile.crops.join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;