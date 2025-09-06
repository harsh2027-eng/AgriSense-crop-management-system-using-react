import React, { useState } from 'react';
import { Beaker, Droplets, Thermometer, Leaf, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface FertilizerRecommendationProps {
  updateStatus: (message: string, loading?: boolean) => void;
}

const FertilizerRecommendation: React.FC<FertilizerRecommendationProps> = ({ updateStatus }) => {
  const [formData, setFormData] = useState({
    soilType: '',
    cropType: '',
    temperature: '',
    humidity: '',
    moisture: '',
    nitrogen: '',
    phosphorous: '',
    potassium: ''
  });

  const [prediction, setPrediction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const soilTypes = ['Sandy', 'Loamy', 'Black', 'Red', 'Clayey'];
  const cropTypes = ['Maize', 'Sugarcane', 'Cotton', 'Tobacco', 'Paddy', 'Wheat'];

  const fertilizerInfo = {
    'Urea': {
      composition: 'Nitrogen (46%)',
      benefits: 'Promotes leaf growth and green color',
      application: 'Apply in split doses during growing season',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200'
    },
    'DAP': {
      composition: 'Nitrogen (18%) + Phosphorus (46%)',
      benefits: 'Promotes root development and flowering',
      application: 'Apply at the time of sowing',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-200'
    },
    'MOP': {
      composition: 'Potassium (60%)',
      benefits: 'Improves disease resistance and fruit quality',
      application: 'Apply before flowering stage',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 border-orange-200'
    },
    'NPK': {
      composition: 'Balanced N-P-K nutrients',
      benefits: 'Complete nutrition for overall plant growth',
      application: 'Apply as per soil test recommendations',
      color: 'text-green-600',
      bgColor: 'bg-green-50 border-green-200'
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      updateStatus(`Please fill in all fields`);
      return;
    }

    setIsLoading(true);
    updateStatus("Analyzing soil conditions and crop requirements...", true);

    // Simulate prediction based on nutrient levels
    setTimeout(() => {
      const nitrogen = parseFloat(formData.nitrogen);
      const phosphorous = parseFloat(formData.phosphorous);
      const potassium = parseFloat(formData.potassium);

      let recommendedFertilizer = 'NPK'; // default
      
      if (nitrogen < 40) {
        recommendedFertilizer = 'Urea';
      } else if (phosphorous < 40) {
        recommendedFertilizer = 'DAP';
      } else if (potassium < 40) {
        recommendedFertilizer = 'MOP';
      }

      const confidence = (Math.random() * 0.2 + 0.8) * 100; // 80-100% confidence
      
      setPrediction({
        fertilizer: recommendedFertilizer,
        confidence: confidence.toFixed(1),
        dosage: Math.floor(Math.random() * 50) + 100, // 100-150 kg/hectare
        info: fertilizerInfo[recommendedFertilizer as keyof typeof fertilizerInfo]
      });

      setIsLoading(false);
      updateStatus(`Fertilizer recommendation completed: ${recommendedFertilizer}`);
    }, 2500);
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Beaker className="w-8 h-8 text-purple-100" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Fertilizer Recommendation System</h1>
            <p className="text-purple-100 text-lg">Optimize fertilizer usage with AI-powered recommendations</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <Leaf className="w-5 h-5 text-green-600" />
              <span>Crop & Soil Information</span>
            </h2>
            <p className="text-gray-600 text-sm mt-2">Provide details about your soil and crop for personalized recommendations</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Dropdown Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Soil Type</label>
                <select
                  name="soilType"
                  value={formData.soilType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  required
                >
                  <option value="">Select soil type</option>
                  {soilTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Crop Type</label>
                <select
                  name="cropType"
                  value={formData.cropType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  required
                >
                  <option value="">Select crop type</option>
                  {cropTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Environmental Parameters */}
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-gray-900 flex items-center space-x-2">
                <Thermometer className="w-4 h-4 text-red-500" />
                <span>Environmental Conditions</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Thermometer className="w-4 h-4 text-gray-500" />
                    <span>Temperature (°C)</span>
                  </label>
                  <input
                    type="number"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleInputChange}
                    placeholder="15-40"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    step="0.1"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Droplets className="w-4 h-4 text-gray-500" />
                    <span>Humidity (%)</span>
                  </label>
                  <input
                    type="number"
                    name="humidity"
                    value={formData.humidity}
                    onChange={handleInputChange}
                    placeholder="20-90"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    step="0.1"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span>Soil Moisture (%)</span>
                  </label>
                  <input
                    type="number"
                    name="moisture"
                    value={formData.moisture}
                    onChange={handleInputChange}
                    placeholder="10-80"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    step="0.1"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Nutrient Levels */}
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-gray-900 flex items-center space-x-2">
                <Beaker className="w-4 h-4 text-purple-500" />
                <span>Current Nutrient Levels</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nitrogen Level (ppm)</label>
                  <input
                    type="number"
                    name="nitrogen"
                    value={formData.nitrogen}
                    onChange={handleInputChange}
                    placeholder="0-100"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    step="0.1"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phosphorous Level (ppm)</label>
                  <input
                    type="number"
                    name="phosphorous"
                    value={formData.phosphorous}
                    onChange={handleInputChange}
                    placeholder="0-100"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    step="0.1"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Potassium Level (ppm)</label>
                  <input
                    type="number"
                    name="potassium"
                    value={formData.potassium}
                    onChange={handleInputChange}
                    placeholder="0-100"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    step="0.1"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Beaker className="w-5 h-5" />
                  <span>Get Fertilizer Recommendation</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {prediction ? (
            <div className={`rounded-xl shadow-lg border-2 ${prediction.info?.bgColor || 'bg-gray-50 border-gray-200'}`}>
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Recommended Fertilizer</span>
                  </h2>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Confidence</div>
                    <div className="text-2xl font-bold text-green-600">{prediction.confidence}%</div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h3 className={`text-3xl font-bold ${prediction.info?.color || 'text-gray-900'}`}>
                    {prediction.fertilizer}
                  </h3>
                  <p className="text-gray-600 text-lg mt-1">{prediction.info?.composition}</p>
                  <div className="mt-3 inline-block bg-white bg-opacity-80 px-4 py-2 rounded-lg">
                    <span className="text-sm text-gray-600">Recommended dosage:</span>
                    <span className="font-semibold text-gray-900 ml-2">{prediction.dosage} kg/hectare</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h4>
                    <p className="text-gray-700 leading-relaxed">{prediction.info?.benefits}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Application</h4>
                    <p className="text-gray-700 leading-relaxed">{prediction.info?.application}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Recommendation Yet</h3>
              <p className="text-gray-600">Fill in the soil and crop information to get your fertilizer recommendation</p>
            </div>
          )}

          {/* Tips */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-3 flex items-center space-x-2">
              <Info className="w-5 h-5" />
              <span>Application Guidelines</span>
            </h3>
            <ul className="space-y-2 text-amber-800 text-sm">
              <li>• Always conduct soil testing before fertilizer application</li>
              <li>• Apply fertilizers at the right growth stages</li>
              <li>• Consider weather conditions during application</li>
              <li>• Split applications for better nutrient uptake</li>
              <li>• Follow local agricultural extension recommendations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FertilizerRecommendation;