import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  imagePreview: string | null;
  isLoading: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImageUpload, 
  imagePreview,
  isLoading 
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0]);
    }
  }, [onImageUpload]);

  const { 
    getRootProps, 
    getInputProps, 
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp', '.tiff', '.dicom', '.dcm']
    },
    multiple: false,
    disabled: isLoading
  });

  const dropzoneClassName = `
    mt-2 flex justify-center rounded-lg border border-dashed px-6 py-10
    transition-all duration-200 ease-in-out
    ${isDragActive ? 'border-primary-400 bg-primary-50' : 'border-gray-300'}
    ${isDragAccept ? 'border-green-500 bg-green-50' : ''}
    ${isDragReject ? 'border-red-500 bg-red-50' : ''}
    ${imagePreview ? 'border-primary-300 bg-primary-50' : ''}
    ${isLoading ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}
  `;

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#1F3C6E] mb-2" style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>Upload Brain Scan</h2>
      <p className="text-gray-500 mb-4 text-sm" style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>
        Upload a clear image of the brain scan (JPEG, PNG, or DICOM format)
      </p>

      <div
        {...getRootProps()}
        className={dropzoneClassName}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          {imagePreview ? (
            <div className="space-y-4">
              <div className="w-full max-h-64 overflow-hidden rounded-lg mx-auto">
                <motion.img 
                  src={imagePreview}
                  alt="Brain scan preview"
                  className="w-full h-full object-contain"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-sm text-primary-600 font-medium">
                Click or drag to replace this image
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <motion.div 
                className="mx-auto h-12 w-12 text-gray-400"
                animate={isDragActive ? { 
                  y: [0, -5, 0],
                  scale: [1, 1.1, 1]
                } : {}}
                transition={{ repeat: isDragActive ? Infinity : 0, duration: 1 }}
              >
                {isDragActive ? (
                  <Upload className="h-12 w-12 text-primary-500" />
                ) : (
                  <ImageIcon className="h-12 w-12" />
                )}
              </motion.div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-700" style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>
                  {isDragActive ? "Drop the image here" : "Drag and drop brain scan image"}
                </p>
                <p className="text-xs text-gray-500" style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>
                  or <span className="text-primary-600">browse files</span>
                </p>
              </div>
              <p className="text-xs text-gray-500" style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>
                Supports JPEG, PNG, GIF, DICOM formats
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};