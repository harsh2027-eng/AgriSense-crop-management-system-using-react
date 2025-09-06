import React, { useState } from 'react';
import { Wheat, Thermometer, Droplets, Zap, AlertCircle, CheckCircle, Info } from 'lucide-react';

interface CropRecommendationProps {
  updateStatus: (message: string, loading?: boolean) => void;
}

const CropRecommendation: React.FC<CropRecommendationProps> = ({ updateStatus }) => {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: ''
  });

  const [prediction, setPrediction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const cropInfo = {
    rice: {
      recommendations: [
        "Ensure adequate water supply",
        "Monitor for pests regularly", 
        "Apply nitrogen in split doses",
        "Maintain proper field drainage"
      ],
      color: "text-blue-600",
      bgColor: "bg-blue-50 border-blue-200"
    },
    wheat: {
      recommendations: [
        "Ensure good drainage",
        "Apply phosphorus at sowing",
        "Monitor for rust diseases",
        "Optimal sowing time is crucial"
      ],
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 border-yellow-200"
    },
    cotton: {
      recommendations: [
        "Maintain proper spacing",
        "Regular pest monitoring",
        "Adequate potash application",
        "Deep plowing recommended"
      ],
      color: "text-pink-600",
      bgColor: "bg-pink-50 border-pink-200"
    },
    maize: {
      recommendations: [
        "Ensure adequate nitrogen",
        "Maintain soil moisture",
        "Monitor for stem borers",
        "Ridge planting preferred"
      ],
      color: "text-orange-600",
      bgColor: "bg-orange-50 border-orange-200"
    },
    coffee: {
      recommendations: [
        "Provide adequate shade",
        "Maintain acidic soil pH",
        "Regular pruning required",
        "Proper drainage essential"
      ],
      color: "text-brown-600",
      bgColor: "bg-amber-50 border-amber-200"
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    const requiredFields = Object.keys(formData);
    const emptyFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (emptyFields.length > 0) {
      updateStatus(`Please fill in all fields: ${emptyFields.join(', ')}`);
      return;
    }

    setIsLoading(true);
    updateStatus("Analyzing soil and weather parameters...", true);

    // Simulate prediction
    setTimeout(() => {
      const crops = ['rice', 'wheat', 'cotton', 'maize', 'coffee'];
      const predictedCrop = crops[Math.floor(Math.random() * crops.length)];
      const confidence = (Math.random() * 0.3 + 0.7) * 100; // 70-100% confidence

      setPrediction({
        crop: predictedCrop,
        confidence: confidence.toFixed(1),
        suitabilityScore: Math.floor(confidence),
        recommendations: cropInfo[predictedCrop as keyof typeof cropInfo]?.recommendations || []
      });

      setIsLoading(false);
      updateStatus(`Crop recommendation completed: ${predictedCrop.charAt(0).toUpperCase() + predictedCrop.slice(1)}`);
    }, 2000);
  };

  const inputFields = [
    { name: 'nitrogen', label: 'Nitrogen (N)', unit: 'ppm', icon: Zap, placeholder: '0-140' },
    { name: 'phosphorus', label: 'Phosphorus (P)', unit: 'ppm', icon: Zap, placeholder: '5-145' },
    { name: 'potassium', label: 'Potassium (K)', unit: 'ppm', icon: Zap, placeholder: '5-205' },
    { name: 'temperature', label: 'Temperature', unit: '°C', icon: Thermometer, placeholder: '8-44' },
    { name: 'humidity', label: 'Humidity', unit: '%', icon: Droplets, placeholder: '14-100' },
    { name: 'ph', label: 'pH Level', unit: 'pH', icon: Info, placeholder: '3.5-9.9' },
    { name: 'rainfall', label: 'Rainfall', unit: 'mm', icon: Droplets, placeholder: '20-300' }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Wheat className="w-8 h-8 text-green-100" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Crop Recommendation System</h1>
            <p className="text-green-100 text-lg">Get AI-powered crop suggestions based on soil and climate conditions</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <Info className="w-5 h-5 text-blue-600" />
              <span>Soil & Weather Parameters</span>
            </h2>
            <p className="text-gray-600 text-sm mt-2">Enter the current soil nutrient levels and weather conditions</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inputFields.map((field) => {
                const Icon = field.icon;
                return (
                  <div key={field.name} className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                      <Icon className="w-4 h-4 text-gray-500" />
                      <span>{field.label}</span>
                      <span className="text-gray-400">({field.unit})</span>
                    </label>
                    <input
                      type="number"
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleInputChange}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                      step="0.1"
                      required
                    />
                  </div>
                );
              })}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Wheat className="w-5 h-5" />
                  <span>Get Crop Recommendation</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {prediction ? (
            <div className={`rounded-xl shadow-lg border-2 ${cropInfo[prediction.crop as keyof typeof cropInfo]?.bgColor || 'bg-gray-50 border-gray-200'}`}>
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Recommended Crop</span>
                  </h2>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Confidence</div>
                    <div className="text-2xl font-bold text-green-600">{prediction.confidence}%</div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h3 className={`text-3xl font-bold capitalize ${cropInfo[prediction.crop as keyof typeof cropInfo]?.color || 'text-gray-900'}`}>
                    {prediction.crop}
                  </h3>
                  <div className="mt-2">
                    <div className="text-sm text-gray-600 mb-1">Suitability Score</div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${prediction.suitabilityScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Cultivation Recommendations</h4>
                  <ul className="space-y-3">
                    {prediction.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Prediction Yet</h3>
              <p className="text-gray-600">Fill in the soil and weather parameters to get your crop recommendation</p>
            </div>
          )}

          {/* Additional Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center space-x-2">
              <Info className="w-5 h-5" />
              <span>Tips for Better Accuracy</span>
            </h3>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li>• Use recent soil test results for NPK values</li>
              <li>• Consider seasonal weather patterns</li>
              <li>• Account for local farming conditions</li>
              <li>• Consult with local agricultural experts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropRecommendation;