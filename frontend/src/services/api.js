const API_BASE_URL = import.meta.env.VITE_API_URL;

export const apiService = {
  analyzeDocument: async (file, summaryLength) => {
    try {
      const formData = new FormData();
      formData.append('document', file);
      formData.append('summaryLength', summaryLength);

      const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to process document');
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Error processing document');
    }
  }
};