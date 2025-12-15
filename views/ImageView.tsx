import React, { useState } from 'react';
import { generateImage } from '../services/gemini';
import { Button } from '../components/Button';
import { ImageGenerationResult } from '../types';

export const ImageView: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ImageGenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const imageUrl = await generateImage(prompt);
      setResult({
        url: imageUrl,
        prompt: prompt,
        timestamp: Date.now()
      });
    } catch (err) {
      setError("Failed to generate image. Please try a different prompt.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full w-full max-w-4xl mx-auto p-4 md:p-6 flex flex-col items-center">
      <div className="w-full text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Imagine with Aura</h2>
        <p className="text-slate-400">Describe what you want to see, and let the AI paint it.</p>
      </div>

      <div className="w-full glass-panel p-6 rounded-2xl mb-8">
        <div className="flex flex-col gap-4">
          <textarea 
            className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 resize-none h-28"
            placeholder="A futuristic city floating in the clouds, cyberpunk style, cinematic lighting..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="flex justify-end">
             <Button 
                variant="gradient" 
                size="lg"
                onClick={handleGenerate}
                isLoading={isLoading}
                disabled={!prompt.trim()}
                icon="fa-solid fa-wand-magic-sparkles"
             >
               Generate
             </Button>
          </div>
        </div>
      </div>

      {/* Result Area */}
      <div className="w-full flex-1 min-h-[300px] flex items-center justify-center relative">
        {isLoading ? (
          <div className="text-center">
             <div className="inline-block w-16 h-16 border-4 border-fuchsia-500/30 border-t-fuchsia-500 rounded-full animate-spin mb-4"></div>
             <p className="text-slate-400 animate-pulse">Dreaming up your image...</p>
          </div>
        ) : error ? (
          <div className="text-red-400 bg-red-900/20 p-4 rounded-xl border border-red-500/30">
            <i className="fa-solid fa-triangle-exclamation mr-2"></i>
            {error}
          </div>
        ) : result ? (
          <div className="relative group w-full max-w-lg">
            <img 
              src={result.url} 
              alt={result.prompt} 
              className="w-full h-auto rounded-2xl shadow-2xl border border-slate-700"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl gap-4 backdrop-blur-sm">
               <a 
                 href={result.url} 
                 download={`aura-gen-${Date.now()}.png`}
                 className="p-3 bg-white text-slate-900 rounded-full hover:bg-slate-200 transition-colors"
               >
                 <i className="fa-solid fa-download"></i>
               </a>
            </div>
          </div>
        ) : (
          <div className="text-slate-600 flex flex-col items-center">
            <i className="fa-regular fa-image text-6xl mb-4 opacity-50"></i>
            <p>Your creation will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};