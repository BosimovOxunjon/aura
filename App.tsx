import React, { useState } from 'react';
import { AppView } from './types';
import { ChatView } from './views/ChatView';
import { ImageView } from './views/ImageView';
import { ProModal } from './components/ProModal';
import { DonationModal } from './components/DonationModal';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.CHAT);
  const [showPro, setShowPro] = useState(false);
  const [showDonate, setShowDonate] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-900 text-slate-200 font-sans selection:bg-indigo-500/30">
      
      {/* Sidebar Navigation */}
      <nav className="w-20 md:w-64 flex-shrink-0 border-r border-slate-800 bg-slate-950/50 flex flex-col justify-between py-6">
        <div>
          <div className="flex items-center justify-center md:justify-start md:px-6 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
               <i className="fa-solid fa-wind text-white text-lg"></i>
            </div>
            <span className="hidden md:block ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Aura.algo
            </span>
          </div>

          <div className="space-y-2 px-3">
            <button 
              onClick={() => setActiveView(AppView.CHAT)}
              className={`w-full flex items-center p-3 rounded-xl transition-all group ${
                activeView === AppView.CHAT 
                ? 'bg-indigo-600/10 text-indigo-400' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <i className="fa-regular fa-comments text-xl w-6 text-center"></i>
              <span className="hidden md:block ml-3 font-medium">Chat</span>
            </button>

            <button 
              onClick={() => setActiveView(AppView.IMAGE)}
              className={`w-full flex items-center p-3 rounded-xl transition-all group ${
                activeView === AppView.IMAGE
                ? 'bg-fuchsia-600/10 text-fuchsia-400' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <i className="fa-regular fa-image text-xl w-6 text-center"></i>
              <span className="hidden md:block ml-3 font-medium">Generate</span>
            </button>
          </div>
        </div>

        <div className="px-3 space-y-2">
          <button 
            onClick={() => setShowPro(true)}
            className="w-full flex items-center p-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-all"
          >
            <i className="fa-solid fa-crown text-xl w-6 text-center"></i>
            <span className="hidden md:block ml-3 font-medium">Go Pro</span>
          </button>
          
          <button 
             onClick={() => setShowDonate(true)}
             className="w-full flex items-center p-3 rounded-xl text-slate-400 hover:text-pink-400 transition-colors"
          >
            <i className="fa-solid fa-heart text-xl w-6 text-center"></i>
            <span className="hidden md:block ml-3 font-medium">Support</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden flex flex-col bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5980?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center">
        {/* Dark Overlay for background image readability */}
        <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm z-0"></div>
        
        {/* Header (Mobile Only / Title) */}
        <header className="md:hidden flex items-center justify-between p-4 z-10 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
           <div className="font-bold text-lg text-white">
             {activeView === AppView.CHAT ? 'Chat' : 'Imagine'}
           </div>
           <div className="flex gap-3">
             <button onClick={() => setShowPro(true)} className="text-amber-400"><i className="fa-solid fa-crown"></i></button>
           </div>
        </header>

        {/* View Content */}
        <div className="relative z-10 flex-1 overflow-hidden">
          {activeView === AppView.CHAT ? <ChatView /> : <ImageView />}
        </div>
      </main>

      {/* Modals */}
      <ProModal isOpen={showPro} onClose={() => setShowPro(false)} />
      <DonationModal isOpen={showDonate} onClose={() => setShowDonate(false)} />
    </div>
  );
};

export default App;