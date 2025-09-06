import React, { useState } from 'react';
import { TrendingUp, MapPin, Calendar, Wheat, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface YieldPredictionProps {
  updateStatus: (message: string, loading?: boolean) => void;
}

const YieldPrediction: React.FC<YieldPredictionProps> = ({ updateStatus }) => {
  const [formData, setFormData] = useState({
    state: '',
    district: '',
    season: '',
    crop: '',
    area: '',
    production: ''
  });

  const [prediction, setPrediction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const states = ['Punjab', 'Haryana', 'UP', 'Bihar', 'West Bengal'];
  const seasons = ['Kharif', 'Rabi', 'Whole Year'];
  const crops = ['Rice', 'Wheat', 'Cotton', 'Sugarcane'];
  
  const districtMapping = {
    'Punjab': ['Amritsar', 'Ludhiana', 'Jalandhar', 'Patiala'],
    'Haryana': ['Gurgaon', 'Faridabad', 'Hisar', 'Rohtak'],
    'UP': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra'],
    'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur'],
    'West Bengal': ['Kolkata', 'Howrah', 'Burdwan', 'Murshidabad']
  };

  const yieldRecommendations = {
    'Rice': [
      "Maintain optimal water levels throughout growing period",
      "Apply fertilizers in split doses for better efficiency",
      "Monitor for pest attacks, especially stem borers",
      "Ensure proper spacing for maximum yield potential"
    ],
    'Wheat': [
      "Ensure adequate drainage to prevent waterlogging",
      "Apply phosphorus at sowing time for root development",
      "Monitor for rust diseases and apply fungicides if needed",
      "Harvest at right moisture content (12-14%)"
    ],
    'Cotton': [
      "Regular pest monitoring required, especially bollworm",
      "Maintain proper plant spacing for optimal growth",
      "Apply potash adequately for fiber quality",
      "Ensure good drainage and avoid waterlogging"
    ],
    'Sugarcane': [
      "Maintain consistent soil moisture throughout season",
      "Apply nitrogen in multiple doses for sustained growth",
      "Control weeds effectively in early growth stages",
      "Monitor for red rot disease and take preventive measures"
    ]
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Reset district when state changes
    if (name === 'state') {
      setFormData(prev => ({
        ...prev,
        district: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    const requiredFields = Object.keys(formData);
    const emptyFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (emptyFields.length > 0) {
      updateStatus(`Please fill in all fields`);
      return;
    }

    setIsLoading(true);
    updateStatus("Analyzing agricultural data and predicting yield...", true);

    // Simulate prediction
    setTimeout(() => {
      const area = parseFloat(formData.area);
      const baseYield = Math.random() * 3 + 2; // 2-5 tons per hectare base yield
      
      // Adjust yield based on crop type
      let cropMultiplier = 1;
      switch (formData.crop) {
        case 'Rice': cropMultiplier = 1.2; break;
        case 'Wheat': cropMultiplier = 1.0; break;
        case 'Cotton': cropMultiplier = 0.8; break;
        case 'Sugarcane': cropMultiplier = 15; break; // Sugarcane has much higher yield
      }

      const predictedYieldPerHectare = baseYield * cropMultiplier;
      const totalPredictedProduction = predictedYieldPerHectare * area;
      const confidence = (Math.random() * 0.25 + 0.75) * 100; // 75-100% confidence

      setPrediction({
        yieldPerHectare: predictedYieldPerHectare.toFixed(2),
        totalProduction: totalPredictedProduction.toFixed(2),
        confidence: confidence.toFixed(1),
        recommendations: yieldRecommendations[formData.crop as keyof typeof yieldRecommendations] || []
      });

      setIsLoading(false);
      updateStatus(`Yield prediction completed: ${predictedYieldPerHectare.toFixed(2)} tons/hectare`);
    }, 3000);
  };

  const availableDistricts = formData.state ? districtMapping[formData.state as keyof typeof districtMapping] || [] : [];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-orange-100" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Yield Prediction System</h1>
            <p className="text-orange-100 text-lg">Forecast crop yields with advanced AI analytics</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-orange-600" />
              <span>Crop Information</span>
            </h2>
            <p className="text-gray-600 text-sm mt-2">Enter location, crop details and cultivation data</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Location Information */}
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-gray-900 flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span>Location Details</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">State</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                    required
                  >
                    <option value="">Select state</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">District</label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    disabled={!formData.state}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors disabled:bg-gray-100"
                    required
                  >
                    <option value="">Select district</option>
                    {availableDistricts.map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Crop Information */}
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-gray-900 flex items-center space-x-2">
                <Wheat className="w-4 h-4 text-green-500" />
                <span>Crop Details</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>Season</span>
                  </label>
                  <select
                    name="season"
                    value={formData.season}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                    required
                  >
                    <option value="">Select season</option>
                    {seasons.map(season => (
                      <option key={season} value={season}>{season}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Wheat className="w-4 h-4 text-gray-500" />
                    <span>Crop Type</span>
                  </label>
                  <select
                    name="crop"
                    value={formData.crop}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                    required
                  >
                    <option value="">Select crop</option>
                    {crops.map(crop => (
                      <option key={crop} value={crop}>{crop}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Cultivation Data */}
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-gray-900 flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-purple-500" />
                <span>Cultivation Data</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Area (hectares)</label>
                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    placeholder="e.g., 10.5"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                    step="0.1"
                    min="0"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Expected Production (tons)</label>
                  <input
                    type="number"
                    name="production"
                    value={formData.production}
                    onChange={handleInputChange}
                    placeholder="e.g., 45.2"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                    step="0.1"
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Predicting...</span>
                </>
              ) : (
                <>
                  <TrendingUp className="w-5 h-5" />
                  <span>Predict Yield</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {prediction ? (
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-200 rounded-xl shadow-lg">
              <div className="p-6 border-b border-green-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Yield Prediction Results</span>
                  </h2>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Confidence</div>
                    <div className="text-2xl font-bold text-green-600">{prediction.confidence}%</div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white bg-opacity-60 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Yield per Hectare</h3>
                    <div className="text-3xl font-bold text-green-700">{prediction.yieldPerHectare}</div>
                    <div className="text-sm text-green-600">tons/hectare</div>
                  </div>
                  
                  <div className="bg-white bg-opacity-60 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Total Production</h3>
                    <div className="text-3xl font-bold text-green-700">{prediction.totalProduction}</div>
                    <div className="text-sm text-green-600">tons</div>
                  </div>
                </div>

                {prediction.recommendations.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Yield Optimization Tips</h4>
                    <ul className="space-y-3">
                      {prediction.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Prediction Yet</h3>
              <p className="text-gray-600">Fill in the location and crop details to get your yield prediction</p>
            </div>
          )}

          {/* Information Panel */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center space-x-2">
              <Info className="w-5 h-5" />
              <span>Prediction Factors</span>
            </h3>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li>• Historical yield data for the region</li>
              <li>• Climate patterns and seasonal variations</li>
              <li>• Soil conditions and crop suitability</li>
              <li>• Agricultural practices and technology adoption</li>
              <li>• Market trends and farmer behavior</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldPrediction;