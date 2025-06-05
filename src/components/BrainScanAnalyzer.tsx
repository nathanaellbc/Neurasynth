import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ImageUploader } from './ImageUploader';
import { ResultsDisplay } from './ResultsDisplay';
import { useModelPrediction } from '../hooks/useModelPrediction';
import { InfoSection } from './InfoSection';
import { Brain, AlertCircle } from 'lucide-react';
import { LoadingIndicator } from './LoadingIndicator';
import { TumorClassification } from '../types/tumorTypes';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 16 } },
};

export const BrainScanAnalyzer: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { predict, isLoading, results, error } = useModelPrediction();
  
  const handleImageUpload = (file: File) => {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImagePreview(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handlePrediction = async () => {
    if (selectedImage && imagePreview) {
      await predict(selectedImage);
    }
  };
  
  const resetState = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  return (
    <div className="glass-container rounded-3xl overflow-hidden bg-white/40">
      <div className="p-8 md:p-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
            </motion.div>
          </div>
          <h1 
            className="font-display text-5xl md:text-6xl font-medium mb-3 bg-gradient-to-r from-[#4d25aa] via-[#2c87ff] to-[#270091] bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient-move leading-tight md:leading-[1.15] tracking-tighter"
            style={{ fontFamily: 'TT Norms Pro, Space Grotesk, system-ui, sans-serif', WebkitTextStroke: '0.2px transparent', paddingBottom: '0.1em' }}
          >
            Scan Smarter. Diagnose Faster.
        </h1>

          <p className="text-primary-600/70 max-w-2xl mx-auto text-lg transform -translate-y-3.5" style={{ fontFamily: 'TT Norms Pro, Space Grotesk, system-ui, sans-serif' }}>
            No delays. Just fast, accurate, automated insights
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Upload Card with animation */}
          <motion.div
            className="glass-container rounded-2xl p-6 backdrop-blur-xl bg-white/40"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
              y: -8,
              scale: 1.02,
              boxShadow: '0 12px 32px -8px rgba(44,135,255,0.10)',
              transition: { type: 'spring', stiffness: 260, damping: 18 }
            }}
            transition={{ type: 'spring', stiffness: 80, damping: 16 }}
          >
            <ImageUploader 
              onImageUpload={handleImageUpload}
              imagePreview={imagePreview}
              isLoading={isLoading}
            />

            <div className="mt-6 flex flex-col sm:flex-row justify-center sm:justify-between gap-4">
              <motion.button
                className={`btn ${selectedImage ? 'btn-primary' : 'btn-secondary opacity-50 cursor-not-allowed'} w-full sm:w-auto`}
                disabled={!selectedImage || isLoading}
                onClick={handlePrediction}
                whileHover={selectedImage ? { scale: 1.03 } : {}}
                whileTap={selectedImage ? { scale: 0.97 } : {}}
              >
                {isLoading ? (
                  <>
                    <LoadingIndicator className="mr-2" />
                    Processing...
                  </>
                ) : 'Analyze Scan'}
              </motion.button>
              
              <motion.button
                className="btn btn-secondary w-full sm:w-auto"
                onClick={resetState}
                disabled={isLoading}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Reset
              </motion.button>
            </div>

            {error && (
              <motion.div 
                className="mt-4 p-4 bg-red-50/80 backdrop-blur-sm text-red-700 rounded-xl flex items-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Error processing image</p>
                  <p className="text-sm">{error}</p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Results Card with animation */}
          <motion.div
            className="glass-container rounded-2xl p-6 backdrop-blur-xl bg-white/40"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
              y: -8,
              scale: 1.02,
              boxShadow: '0 12px 32px -8px rgba(44,135,255,0.10)',
              transition: { type: 'spring', stiffness: 260, damping: 18 }
            }}
            transition={{ type: 'spring', stiffness: 80, damping: 16 }}
          >
            <ResultsDisplay 
              imageUrl={imagePreview}
              results={results}
              isLoading={isLoading}
            />
          </motion.div>
        </div>
      </div>
      
      <InfoSection />
    </div>
  );
};