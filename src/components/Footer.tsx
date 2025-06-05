import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <motion.footer 
      className="bg-white/80 backdrop-blur-sm border-t border-[#1F3C6E]/10 mt-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="container mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <h3 className="text-lg font-bold text-[#1F3C6E] flex items-baseline" style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>
                NEURASYNTH
                <span
                  className="ml-0.5 px-0 py-0.5 text-[10px] font-extralight tracking-wider bg-gradient-to-r from-[#5c24dd] to-[#5900ff] text-transparent bg-clip-text rounded-[10px] align-super"
                  style={{
                    WebkitTextStroke: '1px',
                    WebkitTextStrokeColor: 'currentColor',
                    backgroundClip: 'text',
                    color: 'transparent',
                    opacity: 1,
                    boxSizing: 'border-box',
                    display: 'inline-block',
                    lineHeight: 1.2,
                    position: 'relative',
                    top: '-8px',
                    left: '0.05em',
                    fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif'
                  }}
                >
                  BETA
                </span>
              </h3>
            </div>
            <p className="text-[#1F3C6E]/70 mb-6 max-w-md" style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>
              Advanced brain tumor detection using YOLOv11 technology. Upload brain scan images for accurate and fast diagnosis assistance.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                className="text-[#1F3C6E]/60 hover:text-[#1F3C6E] transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-[#1F3C6E]/60 hover:text-[#1F3C6E] transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-[#1F3C6E]/60 hover:text-[#1F3C6E] transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-[#1F3C6E] uppercase tracking-wider mb-4" style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#1F3C6E]/70 hover:text-[#1F3C6E] transition-colors duration-200" style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>Documentation</a></li>
              <li><a href="#" className="text-[#1F3C6E]/70 hover:text-[#1F3C6E] transition-colors duration-200" style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>API Reference</a></li>
              <li><a href="#" className="text-[#1F3C6E]/70 hover:text-[#1F3C6E] transition-colors duration-200" style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>Tutorials</a></li>
              <li><a href="#" className="text-[#1F3C6E]/70 hover:text-[#1F3C6E] transition-colors duration-200" style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>Research Papers</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-[#1F3C6E] uppercase tracking-wider mb-4" style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#1F3C6E]/70 hover:text-[#1F3C6E] transition-colors duration-200" style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>Privacy Policy</a></li>
              <li><a href="#" className="text-[#1F3C6E]/70 hover:text-[#1F3C6E] transition-colors duration-200" style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>Terms of Service</a></li>
              <li><a href="#" className="text-[#1F3C6E]/70 hover:text-[#1F3C6E] transition-colors duration-200" style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>Data Policy</a></li>
              <li><a href="#" className="text-[#1F3C6E]/70 hover:text-[#1F3C6E] transition-colors duration-200" style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#1F3C6E]/10 mt-10 pt-8 text-center">
          <p className="text-[#1F3C6E]/60 text-sm" style={{ fontFamily: 'TT Norms Pro, Nunito, system-ui, sans-serif' }}>
            © {new Date().getFullYear()} NEURASYNTH. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};