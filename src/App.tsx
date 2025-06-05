import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BrainScanAnalyzer } from './components/BrainScanAnalyzer';
import React, { useEffect, useRef, useState } from 'react';
import { useModelPrediction } from './hooks/useModelPrediction';

declare global {
  interface Window {
    puter?: any;
  }
}

function App({ onDarkModeToggle }: { onDarkModeToggle?: () => void }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello, how may I assist you today?' },
  ]);
  const [input, setInput] = useState('');
  const chatboxRef = useRef<HTMLDivElement>(null);
  // Get latest diagnosis result from BrainScanAnalyzer's hook
  const { results } = useModelPrediction();

  useEffect(() => {
    if (open && chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [open, messages]);

  const sendMessage = () => {
    if (input.trim() === '') return;
    setMessages((msgs) => [...msgs, { from: 'user', text: input }]);
    setInput('');
    // Compose context for AI
    let prompt = input;
    if (results && results.classification != null && results.confidence != null) {
      prompt = `My brain scan was analyzed and the result is: ${results.classification} tumor detected with ${results.confidence}% confidence. ${input}`;
    }
    // Integrate with puter.ai.chat
    if (window.puter && window.puter.ai && typeof window.puter.ai.chat === 'function') {
      window.puter.ai.chat(prompt)
        .then((response: any) => {
          // Try to extract a useful string from puter.ai.chat response
          let text = '';
          if (typeof response === 'string') {
            text = response;
          } else if (response && typeof response === 'object') {
            // Try to extract OpenAI-style response
            if (response.message && response.message.content) {
              text = response.message.content;
            } else if (response.content) {
              text = response.content;
            } else {
              text = JSON.stringify(response);
            }
          } else {
            text = String(response);
          }
          setMessages((msgs) => [...msgs, { from: 'bot', text }]);
        })
        .catch(() => {
          setMessages((msgs) => [...msgs, { from: 'bot', text: 'Sorry, I could not get a response from the AI.' }]);
        });
    } else {
      setTimeout(() => {
        setMessages((msgs) => [...msgs, { from: 'bot', text: 'This is a response from the chatbot.' }]);
      }, 500);
    }
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
        <Header onDarkModeToggle={onDarkModeToggle} />
        <main className="flex-grow flex items-center justify-center">
          <div className="mb-20">
            <BrainScanAnalyzer />
          </div>
        </main>
        <Footer />
        {/* Floating open chat button */}
        <div className="fixed bottom-0 right-0 mb-4 mr-4 z-[9999] sm:mb-4 sm:mr-4 sm:w-auto w-full px-2 flex justify-end drop-shadow-2xl">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-[15px] hover:bg-blue-600 transition duration-300 flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 w-full sm:w-auto"
            onClick={() => setOpen(true)}
            aria-label="Open Admin Chatbot"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Ask AI
          </button>
        </div>
        {/* Chatbox modal */}
        {open && (
          <div className="fixed bottom-16 right-0 sm:right-4 w-full sm:w-96 z-[9999] animate-fade-in px-2 sm:px-0 flex justify-end drop-shadow-2xl">
            <div className="bg-white shadow-md rounded-lg max-w-lg w-full sm:w-96">
              <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
                <p className="text-lg font-semibold">Ask Your AI</p>
                <button
                  className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
                  aria-label="Close Admin Chatbot"
                  onClick={() => setOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div ref={chatboxRef} className="p-4 h-80 overflow-y-auto bg-white">
                {messages.map((msg, i) => (
                  <div key={i} className={`mb-2 ${msg.from === 'user' ? 'text-right' : ''}`}>
                    <p className={`${msg.from === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-lg py-2 px-4 inline-block`}>{msg.text}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t flex bg-white rounded-b-lg">
                <input
                  type="text"
                  placeholder="Type a message"
                  className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
                  aria-label="Type a message to Admin Bot"
                />
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
                  onClick={sendMessage}
                  aria-label="Send message"
                >Send</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;