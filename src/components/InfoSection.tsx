import React from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Zap, 
  Layers, 
  Brain 
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 16 } },
};

export const InfoSection: React.FC = () => {
  const features = [
    {
      icon: <Upload className="h-6 w-6 text-primary-600" />, 
      title: "Easy Upload",
      description: "Simply drag and drop your brain scan images or browse your files to upload."
    },
    {
      icon: <Zap className="h-6 w-6 text-primary-600" />,
      title: "Fast Analysis",
      description: "Get results in seconds using our optimized YOLOv11 model for quick detection."
    },
    {
      icon: <Layers className="h-6 w-6 text-primary-600" />,
      title: "Multi-Class Detection",
      description: "Detect and classify glioma, meningioma, pituitary tumors, and normal brain scans."
    },
    {
      icon: <Brain className="h-6 w-6 text-primary-600" />,
      title: "Advanced AI",
      description: "Our model was trained on thousands of medical brain scans for high accuracy."
    }
  ];

  return (
    <motion.div 
      className="bg-gray-50 border-t border-gray-200 px-6 py-10 md:py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-[#1F3C6E] mb-2" style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>
            Our brain tumor detection system uses advanced deep learning to provide quick and accurate results
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/60 p-6 rounded-xl shadow-sm border border-gray-100 flex items-start"
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
              <div className="mr-4 bg-primary-50 p-3 rounded-lg">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-medium text-[#1F3C6E] mb-1" style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>{feature.title}</h3>
                <p className="text-gray-600 text-sm" style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};