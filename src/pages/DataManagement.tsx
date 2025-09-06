import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Upload, 
  Download, 
  RefreshCw, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Trash2,
  Eye
} from 'lucide-react';

interface DataManagementProps {
  updateStatus: (message: string, loading?: boolean) => void;
}

const DataManagement: React.FC<DataManagementProps> = ({ updateStatus }) => {
  const [datasets, setDatasets] = useState([
    { name: 'Crop Recommendation', samples: 1000, features: 7, status: 'Active', lastUpdated: '2024-01-15' },
    { name: 'Fertilizer Data', samples: 850, features: 8, status: 'Active', lastUpdated: '2024-01-14' },
    { name: 'Yield Prediction', samples: 650, features: 6, status: 'Active', lastUpdated: '2024-01-13' },
    { name: 'Weather Data', samples: 2500, features: 12, status: 'Syncing', lastUpdated: '2024-01-12' }
  ]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isTraining, setIsTraining] = useState(false);

  useEffect(() => {
    updateStatus('Data management interface loaded');
  }, [updateStatus]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      updateStatus(`File selected: ${file.name}`);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      updateStatus('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    updateStatus(`Uploading ${selectedFile.name}...`, true);

    // Simulate upload
    setTimeout(() => {
      const newDataset = {
        name: selectedFile.name.replace('.csv', '').replace(/[-_]/g, ' '),
        samples: Math.floor(Math.random() * 1000) + 500,
        features: Math.floor(Math.random() * 10) + 5,
        status: 'Active',
        lastUpdated: new Date().toISOString().split('T')[0]
      };

      setDatasets(prev => [...prev, newDataset]);
      setSelectedFile(null);
      setIsUploading(false);
      updateStatus(`File uploaded successfully: ${selectedFile.name}`);
    }, 3000);
  };

  const handleExport = (datasetName: string) => {
    updateStatus(`Exporting ${datasetName}...`, true);
    setTimeout(() => {
      updateStatus(`${datasetName} exported successfully`);
    }, 1500);
  };

  const handleDelete = (datasetName: string) => {
    setDatasets(prev => prev.filter(dataset => dataset.name !== datasetName));
    updateStatus(`${datasetName} deleted successfully`);
  };

  const handleRetrainModels = () => {
    setIsTraining(true);
    updateStatus('Retraining all models with current data...', true);
    
    setTimeout(() => {
      setIsTraining(false);
      updateStatus('All models retrained successfully');
    }, 5000);
  };

  const handleView = (datasetName: string) => {
    updateStatus(`Viewing ${datasetName} data preview`);
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Database className="w-8 h-8 text-red-100" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Data Management Center</h1>
            <p className="text-red-100 text-lg">Manage datasets, train models, and export results</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Data Upload Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Upload className="w-5 h-5 text-blue-600" />
                <span>Upload Data</span>
              </h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept=".csv,.xlsx,.json"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">Click to select file</p>
                  <p className="text-sm text-gray-500 mt-1">CSV, XLSX, or JSON</p>
                </label>
              </div>

              {selectedFile && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">{selectedFile.name}</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Size: {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className="w-full mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Upload File</span>
                  </>
                )}
              </button>
            </div>

            {/* Model Training */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-md font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 text-green-600" />
                <span>Model Training</span>
              </h3>
              
              <p className="text-sm text-gray-600 mb-4">
                Retrain all models with the latest data to improve accuracy
              </p>
              
              <button
                onClick={handleRetrainModels}
                disabled={isTraining}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isTraining ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Training...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    <span>Retrain Models</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Dataset Overview */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <Database className="w-5 h-5 text-purple-600" />
                <span>Dataset Overview</span>
              </h2>
              <p className="text-gray-600 text-sm mt-1">Manage your agricultural datasets</p>
            </div>

            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Dataset</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Samples</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Features</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datasets.map((dataset, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{dataset.name}</p>
                            <p className="text-sm text-gray-500">Updated: {dataset.lastUpdated}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-700">{dataset.samples.toLocaleString()}</td>
                        <td className="py-4 px-4 text-gray-700">{dataset.features}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            {dataset.status === 'Active' ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-yellow-500" />
                            )}
                            <span className={`text-sm font-medium ${
                              dataset.status === 'Active' ? 'text-green-600' : 'text-yellow-600'
                            }`}>
                              {dataset.status}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleView(dataset.name)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View data"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleExport(dataset.name)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Export data"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(dataset.name)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete dataset"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* System Statistics */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{datasets.length}</div>
              <div className="text-sm text-gray-600">Total Datasets</div>
            </div>
            
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {datasets.reduce((acc, dataset) => acc + dataset.samples, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Records</div>
            </div>
            
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">94.2%</div>
              <div className="text-sm text-gray-600">Model Accuracy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataManagement;