export const validateFileType = (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'image/png',
      'image/jpeg',
      'image/tiff'
    ];
  
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and image files are allowed.'));
    }
  };
  
  export const handleError = (error, res) => {
    console.error('Error:', error);
  
    const errorResponses = {
      'No file uploaded': {
        status: 400,
        message: 'Please upload a file'
      },
      'Invalid file type': {
        status: 415,
        message: 'Invalid file type. Only PDF and image files are allowed'
      },
      'File too large': {
        status: 413,
        message: 'File size exceeds limit (10MB)'
      },
      'Failed to generate summary': {
        status: 500,
        message: 'Error generating document summary'
      }
    };
  
    const errorResponse = errorResponses[error.message] || {
      status: 500,
      message: 'Internal server error'
    };
  
    res.status(errorResponse.status).json({
      error: errorResponse.message
    });
  };