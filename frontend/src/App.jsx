import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import DocumentUpload from './components/DocumentUpload';
import SummaryView from './components/SummaryView';
import LoadingSpinner from './components/LoadingSpinner';
import { apiService } from './services/api';

const App = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);
  const [summaryLength, setSummaryLength] = useState('medium');

  const handleFileUpload = async (file) => {
    try {
      setIsProcessing(true);
      setError(null);
      
      const summaryResult = await apiService.analyzeDocument(file, summaryLength);
      setSummary(summaryResult);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-6">Document Summary Assistant</h1>
            
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <DocumentUpload 
              onFileUpload={handleFileUpload}
              isProcessing={isProcessing}
              onLengthChange={setSummaryLength}
              currentLength={summaryLength}
            />
            
            {isProcessing && <LoadingSpinner />}
            
            {summary && !isProcessing && (
              <SummaryView summary={summary} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default App;