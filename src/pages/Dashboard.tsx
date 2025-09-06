import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Leaf, 
  Beaker, 
  BarChart3, 
  Users, 
  AlertCircle,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';

interface DashboardProps {
  updateStatus: (message: string, loading?: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ updateStatus }) => {
  const [systemStats, setSystemStats] = useState({
    totalPredictions: 1247,
    activeUsers: 89,
    cropVarieties: 25,
    accuracy: 94.2
  });

  useEffect(() => {
    updateStatus('Dashboard loaded successfully');
  }, [updateStatus]);

  const quickActions = [
    {
      title: 'Crop Recommendation',
      description: 'Get AI-powered crop suggestions based on soil and climate data',
      icon: Leaf,
      color: 'bg-green-500',
      path: '/crop-recommendation'
    },
    {
      title: 'Fertilizer Guide',
      description: 'Optimize fertilizer usage with smart recommendations',
      icon: Beaker,
      color: 'bg-purple-500',
      path: '/fertilizer-recommendation'
    },
    {
      title: 'Yield Prediction',
      description: 'Forecast crop yields with advanced analytics',
      icon: TrendingUp,
      color: 'bg-orange-500',
      path: '/yield-prediction'
    },
    {
      title: 'Data Analysis',
      description: 'Explore agricultural trends and insights',
      icon: BarChart3,
      color: 'bg-indigo-500',
      path: '/data-analysis'
    }
  ];

  const recentActivities = [
    { action: 'Crop prediction completed', time: '2 minutes ago', status: 'success' },
    { action: 'Fertilizer analysis updated', time: '15 minutes ago', status: 'success' },
    { action: 'Data sync in progress', time: '1 hour ago', status: 'pending' },
    { action: 'Weekly report generated', time: '2 hours ago', status: 'success' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome to AgriSense Dashboard</h2>
            <p className="text-green-100 text-lg">
              Your intelligent agricultural companion for smart farming decisions
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Zap className="w-12 h-12 text-green-200" />
            </div>
          </div>
        </div>
      </div>

      {/* System Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Predictions</p>
              <p className="text-3xl font-bold text-gray-900">{systemStats.totalPredictions.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Users</p>
              <p className="text-3xl font-bold text-gray-900">{systemStats.activeUsers}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Crop Varieties</p>
              <p className="text-3xl font-bold text-gray-900">{systemStats.cropVarieties}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Model Accuracy</p>
              <p className="text-3xl font-bold text-gray-900">{systemStats.accuracy}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 group"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{action.title}</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{action.description}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {activity.status === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Clock className="w-5 h-5 text-yellow-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 text-sm font-medium">{activity.action}</p>
                  <p className="text-gray-500 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">System Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">ML Models</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">Operational</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Database</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">Connected</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">API Services</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">Active</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Data Sync</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-yellow-600 font-medium">Syncing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;