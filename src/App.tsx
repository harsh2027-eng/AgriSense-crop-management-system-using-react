import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import CropRecommendation from './pages/CropRecommendation';
import FertilizerRecommendation from './pages/FertilizerRecommendation';
import YieldPrediction from './pages/YieldPrediction';
import DataAnalysis from './pages/DataAnalysis';
import DataManagement from './pages/DataManagement';
import Footer from './components/Footer';
import StatusBar from './components/StatusBar';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [statusMessage, setStatusMessage] = useState('System ready');
  const [isLoading, setIsLoading] = useState(false);

  const updateStatus = (message: string, loading = false) => {
    setStatusMessage(message);
    setIsLoading(loading);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
        <Header />
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Dashboard updateStatus={updateStatus} />} />
            <Route path="/crop-recommendation" element={<CropRecommendation updateStatus={updateStatus} />} />
            <Route path="/fertilizer-recommendation" element={<FertilizerRecommendation updateStatus={updateStatus} />} />
            <Route path="/yield-prediction" element={<YieldPrediction updateStatus={updateStatus} />} />
            <Route path="/data-analysis" element={<DataAnalysis updateStatus={updateStatus} />} />
            <Route path="/data-management" element={<DataManagement updateStatus={updateStatus} />} />
          </Routes>
        </main>
        
        <Footer />
        <StatusBar message={statusMessage} isLoading={isLoading} />
      </div>
    </Router>
  );
}

export default App;