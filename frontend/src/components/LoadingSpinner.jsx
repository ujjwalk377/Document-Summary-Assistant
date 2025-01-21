import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      <p className="mt-4 text-gray-600 font-medium">Processing your document...</p>
      <p className="text-sm text-gray-500">This may take a few moments</p>
    </div>
  );
};

export default LoadingSpinner;