
import React, { useState, useEffect } from 'react';
import { CTF_EVENTS } from '../data';
import { CtfChallenge, CtfEvent } from '../types';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

const CtfWriteups: React.FC = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<CtfChallenge | null>(null);
  const [activeEventId, setActiveEventId] = useState<string | null>(CTF_EVENTS[0]?.id || null);
  const [zoomedImg, setZoomedImg] = useState<string | null>(null);

  const activeEvent = CTF_EVENTS.find(e => e.id === activeEventId);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomedImg(null);
    };
    if (zoomedImg) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [zoomedImg]);

  if (selectedChallenge) {
    return (
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 animate-in fade-in duration-500">
        <button 
          onClick={() => setSelectedChallenge(null)} 
          className="mono text-[10px] md:text-xs font-black text-slate-400 hover:text-black flex items-center mb-10 truncate uppercase"
        >
          <span className="text-lg mr-2">←</span> Back to Challenges
        </button>

        <article className="border-2 border-black bg-white hard-shadow p-5 sm:p-8 md:p-16 space-y-10 md:space-y-12 mb-16">
          <header className="space-y-6">
            <div className="flex flex-wrap gap-2 md:gap-3">
               <span className="mono text-[10px] font-black bg-black text-white px-2 py-1 uppercase whitespace-nowrap">{selectedChallenge.category}</span>
               <span className={`mono text-[10px] font-black border-2 border-black px-2 py-0.5 uppercase ${getDifficultyTextColor(selectedChallenge.difficulty)} whitespace-nowrap`}>
                 {selectedChallenge.difficulty}
               </span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[1.1] uppercase technical-break">
              {selectedChallenge.name}
            </h1>
            <div className="mono text-[9px] md:text-[10px] text-slate-300 font-bold border-t border-black pt-4 technical-break uppercase">
              Event: {activeEvent?.name} // Ref ID: {selectedChallenge.id}
            </div>
          </header>

          <section className="space-y-4">
            <h2 className="mono text-[10px] font-black bg-slate-100 text-slate-500 px-3 py-1 inline-block uppercase tracking-widest">The Challenge</h2>
            <div className="text-slate-700 text-lg md:text-xl leading-relaxed font-bold break-words">
              {selectedChallenge.description}
            </div>
          </section>

          <div className="h-0.5 bg-black w-full opacity-10"></div>

          <section className="writeup-content">
            <h2 className="mono text-[10px] font-black bg-blue-600 text-white px-3 py-1 inline-block mb-8 uppercase tracking-widest">Solution Walkthrough</h2>
            <MarkdownRenderer content={selectedChallenge.writeup} />
          </section>

          {selectedChallenge.images && selectedChallenge.images.length > 0 && (
            <section className="space-y-10 mt-12">
               <h2 className="mono text-[10px] font-black bg-slate-100 text-slate-500 px-3 py-1 inline-block uppercase tracking-widest">Visual Evidence</h2>
               <div className="grid gap-8">
                {selectedChallenge.images.map((img, idx) => (
                  <figure key={idx} className="space-y-4 border-2 border-black bg-slate-50 p-4 overflow-hidden group">
                    <div 
                        className="overflow-hidden cursor-zoom-in relative"
                        onClick={() => setZoomedImg(img.url)}
                    >
                        <img src={img.url} alt={img.caption} className="w-full h-auto transition-transform duration-700 border border-black/10 group-hover:scale-[1.02]" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
                    </div>
                    {img.caption && (
                      <figcaption className="mono text-center text-[10px] font-black text-slate-400 uppercase break-words px-4">
                        Figure {idx + 1}: {img.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
               </div>
            </section>
          )}

          {selectedChallenge.flag && (
            <div className="mt-16 md:mt-24 pt-12 border-t-2 border-dashed border-black">
              <div className="bg-black text-white p-6 sm:p-8 md:p-12 text-center space-y-6 overflow-hidden">
                <span className="mono text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Exfiltrated Flag</span>
                <div className="mono text-sm sm:text-xl md:text-3xl font-black text-blue-400 technical-break bg-slate-900 px-4 md:px-8 py-4 md:py-6 border border-slate-800 shadow-inner block overflow-hidden">
                  {selectedChallenge.flag}
                </div>
              </div>
            </div>
          )}
        </article>

        {zoomedImg && (
            <div 
                className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 cursor-zoom-out animate-in fade-in duration-200"
                onClick={() => setZoomedImg(null)}
            >
                <div className="relative max-w-7xl max-h-full w-full flex items-center justify-center h-full">
                    <img 
                    src={zoomedImg} 
                    className="max-w-full max-h-full object-contain hard-shadow animate-in zoom-in-95 duration-300 border-2 border-white/20" 
                    alt="Enlarged view"
                    />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 text-white mono text-[10px] uppercase backdrop-blur-md rounded-full border border-white/10 hidden md:block">
                        Press ESC to close
                    </div>
                </div>
                <button 
                    onClick={() => setZoomedImg(null)}
                    className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-blue-400 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 md:p-16 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-x-hidden max-w-7xl mx-auto pb-12">
      <div className="max-w-4xl mb-12 md:mb-16 space-y-4">
        <p className="mono text-[10px] md:text-xs font-black text-blue-600 tracking-[0.2em] uppercase underline underline-offset-8 decoration-2">
          Competition Archive
        </p>
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-black leading-none uppercase technical-break">
          CTF Writeups
        </h1>
        <p className="text-lg md:text-xl text-slate-500 font-bold max-w-2xl leading-relaxed">
          Detailed post-mortems and exploitation walkthroughs from global security competitions.
        </p>
      </div>

      <div className="space-y-16">
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="mono text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-black pb-2">Select Operation</h2>
            <div className="flex-grow h-px bg-slate-100"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CTF_EVENTS.map(event => (
              <button
                key={event.id}
                onClick={() => setActiveEventId(event.id)}
                className={`text-left p-6 border-2 transition-all mono flex flex-col justify-between min-h-[160px] uppercase group relative overflow-hidden ${
                  activeEventId === event.id 
                    ? 'bg-black text-white border-black hard-shadow-sm' 
                    : 'bg-white text-slate-400 border-slate-100 hover:border-black hover:text-black hover:bg-slate-50'
                }`}
              >
                {/* Background Image Effect */}
                {event.coverImages && event.coverImages.length > 0 && activeEventId !== event.id && (
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-10 transition-opacity"
                    style={{ backgroundImage: `url(${event.coverImages[0]})` }}
                  ></div>
                )}

                <div className="relative z-10">
                   <div className="text-xs md:text-sm font-black tracking-tight leading-tight">{event.name}</div>
                   {event.summary && (
                     <div className="text-[9px] mt-2 font-medium opacity-70 normal-case tracking-normal line-clamp-2">
                       {event.summary}
                     </div>
                   )}
                </div>
                <div className="relative z-10 text-[9px] font-bold opacity-60 tracking-widest border-t border-current pt-2 mt-4">
                  {event.date}
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          {activeEvent ? (
            <div className="space-y-12">
              {/* Event Info Section */}
              <div className="border-2 border-black bg-white p-6 md:p-10 hard-shadow">
                <div className="space-y-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-black/10 pb-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                                <span className="mono text-[10px] font-black text-slate-400 uppercase tracking-widest">Operation Intel</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] technical-break">{activeEvent.name}</h2>
                        </div>
                        
                        <div className="flex gap-3 mono text-[10px] font-bold uppercase shrink-0">
                            <div className="border border-black px-3 py-1 bg-slate-50">
                                Date: <span className="text-black">{activeEvent.date}</span>
                            </div>
                            <div className="border border-black px-3 py-1 bg-black text-white">
                                Solves: <span className="text-blue-400">{activeEvent.challenges.length}</span>
                            </div>
                        </div>
                    </div>

                    {/* Images Grid */}
                    {activeEvent.coverImages && activeEvent.coverImages.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {activeEvent.coverImages.map((img, i) => (
                                <div 
                                    key={i} 
                                    className={`border-2 border-black p-2 bg-slate-100 overflow-hidden cursor-zoom-in relative group ${i === 0 && activeEvent.coverImages!.length % 2 !== 0 ? 'md:col-span-2' : ''}`}
                                    onClick={() => setZoomedImg(img)}
                                >
                                    <img 
                                      src={img} 
                                      className="w-full h-auto object-cover max-h-[500px] transition-transform duration-700 group-hover:scale-[1.02]"
                                      alt={`Operation Evidence ${i+1}`}
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-24 bg-slate-50 border-2 border-dashed border-black/20 flex items-center justify-center mono text-xs text-slate-400 uppercase">
                            No visual intelligence available
                        </div>
                    )}
                </div>
              </div>
              
              <div className="space-y-6">
                 <div className="flex items-center gap-4">
                    <h3 className="mono text-xs font-black bg-black text-white px-3 py-1 uppercase tracking-widest">Decryption Logs</h3>
                    <div className="h-0.5 flex-grow bg-black"></div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activeEvent.challenges.map(challenge => (
                      <div 
                        key={challenge.id}
                        onClick={() => setSelectedChallenge(challenge)}
                        className="group bg-white p-6 md:p-10 border-2 border-black hover:bg-black hover:text-white transition-all duration-300 cursor-pointer hard-shadow-sm hover:hard-shadow-blue flex flex-col justify-between min-h-[220px]"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <span className="px-2 py-0.5 border-2 border-black group-hover:border-white mono text-[9px] font-black uppercase">
                              {challenge.category}
                            </span>
                            <span className={`mono text-[9px] font-black uppercase tracking-widest ${getDifficultyTextColor(challenge.difficulty)}`}>
                              {challenge.difficulty}
                            </span>
                          </div>
                          <h4 className="text-2xl md:text-4xl font-black group-hover:text-blue-500 transition-colors uppercase tracking-tighter leading-none">
                            {challenge.name}
                          </h4>
                          <p className="text-sm font-medium opacity-60 leading-relaxed max-w-sm line-clamp-2">
                            {challenge.description}
                          </p>
                        </div>
                        
                        <div className="mt-8 flex justify-between items-center border-t border-slate-100 group-hover:border-slate-800 pt-6">
                          <span className="mono text-[10px] font-bold uppercase">View Decryption Logic</span>
                          <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          ) : (
            <div className="p-20 border-4 border-dashed border-slate-100 text-center">
              <p className="mono text-slate-300 font-black uppercase">Operation data missing</p>
            </div>
          )}
        </section>

        {zoomedImg && (
            <div 
                className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 cursor-zoom-out animate-in fade-in duration-200"
                onClick={() => setZoomedImg(null)}
            >
                <div className="relative max-w-7xl max-h-full w-full flex items-center justify-center h-full">
                    <img 
                    src={zoomedImg} 
                    className="max-w-full max-h-full object-contain hard-shadow animate-in zoom-in-95 duration-300 border-2 border-white/20" 
                    alt="Enlarged view"
                    />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 text-white mono text-[10px] uppercase backdrop-blur-md rounded-full border border-white/10 hidden md:block">
                        Press ESC to close
                    </div>
                </div>
                <button 
                    onClick={() => setZoomedImg(null)}
                    className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-blue-400 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

const getDifficultyTextColor = (diff: string) => {
  switch(diff) {
    case 'Easy': return 'text-emerald-600 group-hover:text-emerald-400';
    case 'Medium': return 'text-amber-600 group-hover:text-amber-400';
    case 'Hard': return 'text-orange-600 group-hover:text-orange-400';
    case 'Insane': return 'text-red-600 group-hover:text-red-400';
    default: return 'text-slate-400';
  }
};

export default CtfWriteups;
