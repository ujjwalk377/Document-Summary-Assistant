import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload } from 'lucide-react';

const DocumentUpload = ({ onFileUpload, isProcessing, onLengthChange, currentLength }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.tiff']
    },
    disabled: isProcessing,
    multiple: false
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-4">
        <label className="text-sm font-medium">Summary Length:</label>
        <Select value={currentLength} onValueChange={onLengthChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select length" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="short">Short</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="long">Long</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="space-y-2">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="text-lg font-medium">
            {isDragActive ? 'Drop the file here' : 'Drag & drop a document here'}
          </p>
          <p className="text-sm text-gray-500">or</p>
          <Button
            type="button"
            disabled={isProcessing}
            variant="outline"
          >
            Browse Files
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            Supported formats: PDF, PNG, JPG, JPEG, TIFF
          </p>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;