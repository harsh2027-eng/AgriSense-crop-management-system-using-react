import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wheat, 
  Beaker, 
  TrendingUp, 
  BarChart3, 
  Database,
  ChevronRight
} from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/', color: 'bg-blue-500' },
    { id: 'crop-recommendation', label: 'Crop Recommendation', icon: Wheat, path: '/crop-recommendation', color: 'bg-green-500' },
    { id: 'fertilizer-recommendation', label: 'Fertilizer Guide', icon: Beaker, path: '/fertilizer-recommendation', color: 'bg-purple-500' },
    { id: 'yield-prediction', label: 'Yield Prediction', icon: TrendingUp, path: '/yield-prediction', color: 'bg-orange-500' },
    { id: 'data-analysis', label: 'Data Analysis', icon: BarChart3, path: '/data-analysis', color: 'bg-indigo-500' },
    { id: 'data-management', label: 'Data Management', icon: Database, path: '/data-management', color: 'bg-red-500' },
  ];

  const handleNavClick = (item: any) => {
    setCurrentPage(item.id);
    navigate(item.path);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1 overflow-x-auto py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-lg transition-all duration-300 whitespace-nowrap group ${
                  isActive
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg scale-105'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-green-600 hover:scale-105'
                }`}
              >
                <div className={`p-2 rounded-lg transition-colors duration-300 ${
                  isActive 
                    ? 'bg-white bg-opacity-20' 
                    : `${item.color} bg-opacity-10 group-hover:bg-opacity-20`
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-medium">{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 animate-pulse" />}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;