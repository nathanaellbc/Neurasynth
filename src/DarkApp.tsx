import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BrainScanAnalyzer } from './components/BrainScanAnalyzer';

function DarkApp() {
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => document.documentElement.classList.remove('dark');
  }, []);

  // Redirect to / when light mode is toggled
  const handleLightModeToggle = () => {
    window.location.href = '/';
  };

  return (
    <>
      <iframe
        src="https://my.spline.design/flowingribbon-HaNQSbjhxZrmLplD5BI0FoOg/"
        style={{
          position: 'absolute',
          top: 0,
          left: -50,
          width: '120%',
          height: '120%',
          minWidth: '100vw',
          minHeight: '100vh',
          border: 'none',
          zIndex: -1,
          pointerEvents: 'none',
        }}
        title="Spline Background"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="min-h-screen flex flex-col">
        <Header onDarkModeToggle={handleLightModeToggle} />
        <main className="flex-grow flex items-center justify-center">
          <div className="mb-20">
            <BrainScanAnalyzer />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default DarkApp;
