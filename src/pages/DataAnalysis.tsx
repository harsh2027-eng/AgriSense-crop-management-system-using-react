import React, { useState, useEffect } from 'react';
import { BarChart3, PieChart, TrendingUp, Download, Filter } from 'lucide-react';

interface DataAnalysisProps {
  updateStatus: (message: string, loading?: boolean) => void;
}

const DataAnalysis: React.FC<DataAnalysisProps> = ({ updateStatus }) => {
  const [activeChart, setActiveChart] = useState('crop-distribution');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    updateStatus('Data analysis dashboard loaded');
  }, [updateStatus]);

  const generateChart = async (chartType: string) => {
    setActiveChart(chartType);
    setIsLoading(true);
    updateStatus(`Generating ${chartType.replace('-', ' ')} visualization...`, true);

    // Simulate chart generation
    setTimeout(() => {
      setIsLoading(false);
      updateStatus(`${chartType.replace('-', ' ')} chart generated successfully`);
    }, 1500);
  };

  const exportChart = () => {
    updateStatus('Chart exported successfully');
  };

  const chartOptions = [
    {
      id: 'crop-distribution',
      title: 'Crop Distribution',
      description: 'Distribution of different crops across regions',
      icon: PieChart,
      color: 'bg-blue-500'
    },
    {
      id: 'yield-trends',
      title: 'Yield Trends',
      description: 'Historical yield patterns over time',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      id: 'fertilizer-usage',
      title: 'Fertilizer Analysis',
      description: 'Fertilizer usage patterns and effectiveness',
      icon: BarChart3,
      color: 'bg-purple-500'
    }
  ];

  const renderCropDistributionChart = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { crop: 'Rice', percentage: 35, color: 'bg-blue-500' },
          { crop: 'Wheat', percentage: 28, color: 'bg-yellow-500' },
          { crop: 'Cotton', percentage: 22, color: 'bg-pink-500' },
          { crop: 'Maize', percentage: 15, color: 'bg-green-500' }
        ].map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className={`w-full h-3 ${item.color} rounded-full mb-3`}></div>
            <h4 className="font-semibold text-gray-900">{item.crop}</h4>
            <p className="text-2xl font-bold text-gray-700">{item.percentage}%</p>
          </div>
        ))}
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <div className="space-y-4">
          {[
            { crop: 'Rice', value: 35, color: 'bg-blue-500' },
            { crop: 'Wheat', value: 28, color: 'bg-yellow-500' },
            { crop: 'Cotton', value: 22, color: 'bg-pink-500' },
            { crop: 'Maize', value: 15, color: 'bg-green-500' }
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-16 text-sm font-medium text-gray-600">{item.crop}</div>
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className={`${item.color} h-4 rounded-full transition-all duration-1000`}
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-12 text-sm font-semibold text-gray-700">{item.value}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderYieldTrendsChart = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { year: '2022', yield: 4.2, trend: 'up' },
          { year: '2023', yield: 4.8, trend: 'up' },
          { year: '2024', yield: 5.1, trend: 'up' }
        ].map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow border border-gray-200 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-2">{item.yield}</div>
            <div className="text-gray-600 mb-2">tons/hectare</div>
            <div className="text-sm text-gray-500">{item.year}</div>
            <div className="mt-3">
              <TrendingUp className={`w-5 h-5 mx-auto ${item.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Yield Trend Analysis</h4>
        <div className="h-64 flex items-end justify-between space-x-2">
          {[3.8, 4.1, 4.2, 4.5, 4.8, 5.1, 5.3].map((height, index) => (
            <div key={index} className="flex-1 bg-gradient-to-t from-green-500 to-green-300 rounded-t-lg transition-all duration-1000" 
                 style={{ height: `${(height / 5.3) * 100}%` }}>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>2018</span>
          <span>2019</span>
          <span>2020</span>
          <span>2021</span>
          <span>2022</span>
          <span>2023</span>
          <span>2024</span>
        </div>
      </div>
    </div>
  );

  const renderFertilizerAnalysisChart = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { fertilizer: 'Urea', usage: 45, color: 'bg-blue-500' },
          { fertilizer: 'DAP', usage: 28, color: 'bg-purple-500' },
          { fertilizer: 'NPK', usage: 20, color: 'bg-green-500' },
          { fertilizer: 'MOP', usage: 7, color: 'bg-orange-500' }
        ].map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow border border-gray-200 text-center">
            <div className={`w-12 h-12 ${item.color} rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold`}>
              {item.usage}%
            </div>
            <h4 className="font-semibold text-gray-900">{item.fertilizer}</h4>
            <p className="text-sm text-gray-600">Usage Rate</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Fertilizer Effectiveness</h4>
        <div className="space-y-4">
          {[
            { fertilizer: 'Urea', effectiveness: 85, color: 'bg-blue-500' },
            { fertilizer: 'DAP', effectiveness: 92, color: 'bg-purple-500' },
            { fertilizer: 'NPK', effectiveness: 88, color: 'bg-green-500' },
            { fertilizer: 'MOP', effectiveness: 76, color: 'bg-orange-500' }
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-16 text-sm font-medium text-gray-600">{item.fertilizer}</div>
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className={`${item.color} h-4 rounded-full transition-all duration-1000`}
                    style={{ width: `${item.effectiveness}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-12 text-sm font-semibold text-gray-700">{item.effectiveness}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderChart = () => {
    if (isLoading) {
      return (
        <div className="bg-white rounded-lg shadow border border-gray-200 p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating visualization...</p>
        </div>
      );
    }

    switch (activeChart) {
      case 'crop-distribution':
        return renderCropDistributionChart();
      case 'yield-trends':
        return renderYieldTrendsChart();
      case 'fertilizer-usage':
        return renderFertilizerAnalysisChart();
      default:
        return renderCropDistributionChart();
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <BarChart3 className="w-8 h-8 text-indigo-100" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Data Analysis Dashboard</h1>
            <p className="text-indigo-100 text-lg">Explore agricultural trends and insights</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chart Selection Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Analysis Options</span>
            </h2>
            
            <div className="space-y-3">
              {chartOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => generateChart(option.id)}
                    className={`w-full p-4 rounded-lg transition-all duration-200 text-left ${
                      activeChart === option.id
                        ? 'bg-indigo-50 border-2 border-indigo-200 shadow-md'
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${option.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{option.title}</h3>
                        <p className="text-xs text-gray-600 mt-1">{option.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={exportChart}
              className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export Chart</span>
            </button>
          </div>
        </div>

        {/* Chart Display Area */}
        <div className="lg:col-span-3">
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {chartOptions.find(opt => opt.id === activeChart)?.title || 'Chart Visualization'}
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Real-time data</span>
              </div>
            </div>
            
            {renderChart()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataAnalysis;