import React from 'react';
import { LoadingIndicator } from './LoadingIndicator';
import { TumorClassification } from '../types/tumorTypes';
import { AlertTriangle, Check } from 'lucide-react';

interface ResultsDisplayProps {
  imageUrl: string | null;
  results: TumorClassification | null;
  isLoading: boolean;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ 
  imageUrl, 
  results, 
  isLoading 
}) => {
  // Debug: log results prop
  console.log('ResultsDisplay results:', results);

  // Get the correct color based on tumor type
  const getStatusColor = (tumorType: string | undefined) => {
    if (!tumorType) return 'bg-gray-100 text-gray-800 border-gray-200';
    switch(tumorType.toLowerCase()) {
      case 'normal': return 'bg-green-100 text-green-800 border-green-200';
      case 'glioma': return 'bg-red-100 text-red-800 border-red-200';
      case 'meningioma': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'pituitary': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get the correct border color for the bounding box based on tumor type
  const getBoxColor = (tumorType: string | undefined) => {
    if (!tumorType) return '#a3a3a3'; // gray-400
    switch(tumorType.toLowerCase()) {
      case 'normal': return '#22c55e'; // green-500
      case 'glioma': return '#ef4444'; // red-500
      case 'meningioma': return '#f59e42'; // orange-400
      case 'pituitary': return '#fbbf24'; // amber-400
      default: return '#a3a3a3';
    }
  };

  const getIcon = (tumorType: string | undefined) => {
    if (!tumorType) return <AlertTriangle className="h-5 w-5 text-gray-400" />;
    if (tumorType.toLowerCase() === 'normal') {
      return <Check className="h-5 w-5 text-green-500" />;
    }
    return <AlertTriangle className="h-5 w-5 text-amber-500" />;
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#1F3C6E] mb-2" style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>Analysis Results</h2>
      <p className="text-gray-500 mb-4 text-sm" style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>
        View the AI-powered detection results with highlighted areas of interest
      </p>

      {/* Remove AnimatePresence and motion.div for main results block */}
      {!imageUrl && !isLoading && (
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 flex flex-col items-center justify-center text-center h-64">
          <p className="text-gray-500">Upload a brain scan to see results</p>
        </div>
      )}

      {isLoading && (
        <div className="rounded-lg border-2 border-dashed border-primary-300 bg-primary-50 p-8 flex flex-col items-center justify-center text-center h-64">
          <LoadingIndicator className="h-10 w-10 text-primary-500 mb-4" />
          <p className="text-primary-700" style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>Processing your brain scan...</p>
          <p className="text-primary-500 text-sm mt-2" style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>This may take a few seconds</p>
        </div>
      )}

      {imageUrl && results && !isLoading && (
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <div className="relative">
            <div className="relative h-52 sm:h-64 bg-black flex items-center justify-center overflow-hidden">
              <img 
                src={imageUrl} 
                alt="Analyzed brain scan" 
                className="max-h-full max-w-full object-contain"
              />
              {results.boundingBox && (
  <>
                  {(() => {
                    const size = Math.min(results.boundingBox.width, results.boundingBox.height);
                    const boxColor = getBoxColor(results.classification);
                    return (
                      <>
                        <div
                          className="absolute rounded-sm pointer-events-none"
                          style={{
                            left: `${results.boundingBox.x}%`,
                            top: `${results.boundingBox.y}%`,
                            width: `${size}%`,
                            height: `${size}%`,
                            boxSizing: 'border-box',
                            border: `2px solid ${boxColor}`,
                            background: 'transparent',
                          }}
                        />
                        <div
                          className="-translate-x-1 absolute px-2 py-0.5 text-white text-xs font-light"
                          style={{
                            left: `calc(${results.boundingBox.x}% + 2px)`,
                            top: `calc(${results.boundingBox.y}% - 1.5em)`,
                            zIndex: 10,
                            pointerEvents: 'none',
                            whiteSpace: 'nowrap',
                            fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif',
                            letterSpacing: '0.02em',
                            background: boxColor,
                          }}
                        >
                          {results.classification} {Math.round(results.confidence) / 100}
                        </div>
                      </>
                    );
                  })()}
                </>
              )}

            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center">
                  <span className="font-medium mr-2" style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>Diagnosis:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(results?.classification)}`} style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>
                    {results?.classification || 'Unknown'}
                  </span>
                </div>

                <div className="flex items-center">
                  <span className="font-medium mr-2" style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>Confidence:</span>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary-600 h-2.5 rounded-full" 
                      style={{ width: `${results.confidence}%` }}
                    />
                  </div>
                  <span className="ml-2 text-sm text-gray-600" style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>{results.confidence}%</span>
                </div>

                <div className="flex items-center gap-2">
                  <span>{getIcon(results?.classification)}</span>
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>
                    {results.classification === "Normal" 
                      ? "No tumor detected in this brain scan." 
                      : `${results.classification} tumor detected with ${results.confidence}% confidence.`
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};