
import React, { useState, useEffect } from 'react';
import { CERTIFICATIONS } from '../data';
import { Certification } from '../types';

const Certifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const featuredCert = CERTIFICATIONS.find(c => c.featured);
  
  const cybersecurity = CERTIFICATIONS.filter(c => c.category === 'Cybersecurity');
  const otIcs = CERTIFICATIONS.filter(c => c.category === 'OT/ICS');
  const aiMl = CERTIFICATIONS.filter(c => c.category === 'AI & Machine Learning');

  return (
    <div className="p-6 sm:p-8 md:p-16 space-y-16 md:space-y-24 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-x-hidden max-w-7xl mx-auto pb-12">
      <div className="max-w-4xl space-y-4">
        <p className="mono text-[10px] md:text-xs font-black text-blue-600 tracking-[0.2em] uppercase underline underline-offset-8 decoration-2 break-words">
          Professional Credentials
        </p>
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-black leading-none uppercase technical-break">
          Certifications
        </h1>
        <p className="text-lg md:text-xl text-slate-500 font-bold max-w-2xl leading-relaxed">
          Validation from industry-leading organizations in cybersecurity and infrastructure protection.
        </p>
      </div>

      {featuredCert && (
        <section className="space-y-8">
          <div className="flex items-center gap-4 overflow-hidden">
            <h2 className="mono text-[10px] font-black bg-blue-600 text-white px-3 py-1 shrink-0 uppercase tracking-widest">Key Credential</h2>
            <div className="flex-grow h-0.5 bg-blue-600/20"></div>
          </div>
          
          <div className="border-2 border-black bg-white hard-shadow flex flex-col lg:flex-row overflow-hidden group">
            <div 
              className="lg:w-2/5 relative bg-slate-50 border-b-2 lg:border-b-0 lg:border-r-2 border-black shrink-0 overflow-hidden cursor-pointer min-h-[300px] flex items-center justify-center"
              onClick={() => setSelectedCert(featuredCert)}
            >
              {featuredCert.imageUrl ? (
                <>
                  <img 
                    src={featuredCert.imageUrl} 
                    alt={featuredCert.name} 
                    className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center pointer-events-none">
                     <span className="bg-white border-2 border-black px-3 py-1 mono text-[10px] font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity hard-shadow-sm">View Details</span>
                  </div>
                </>
              ) : (
                <div className="w-full h-full min-h-[250px] flex items-center justify-center mono text-slate-300 font-bold uppercase">
                  No Preview
                </div>
              )}
            </div>
            
            <div className="lg:w-3/5 p-6 sm:p-8 md:p-12 space-y-6 md:space-y-8 flex flex-col justify-center overflow-hidden">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 items-center">
                  <span className="mono text-[10px] md:text-xs font-black text-blue-600 uppercase tracking-widest break-words">{featuredCert.issuer}</span>
                  <span className="mono text-[9px] md:text-[10px] text-slate-300 whitespace-nowrap">| Issued: {featuredCert.year} |</span>
                </div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] uppercase tracking-tighter technical-break">
                  {featuredCert.name}
                </h3>
                <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed">
                  {featuredCert.description}
                </p>
                <button 
                  onClick={() => setSelectedCert(featuredCert)}
                  className="inline-flex items-center gap-2 mono text-[10px] font-black uppercase text-black hover:text-blue-600 underline underline-offset-4"
                >
                  Verify Credential →
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="space-y-24 md:space-y-32 mb-16">
        {cybersecurity.length > 0 && (
          <CertGridSection title="Security & Hacking" certs={cybersecurity} color="blue" onSelect={setSelectedCert} />
        )}
        {otIcs.length > 0 && (
          <CertGridSection title="Industrial Protection" certs={otIcs} color="orange" onSelect={setSelectedCert} />
        )}
        {aiMl.length > 0 && (
          <CertGridSection title="AI & Machine Learning" certs={aiMl} color="purple" onSelect={setSelectedCert} />
        )}
      </div>

      {/* Detail Modal */}
      {selectedCert && (
        <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
      )}
    </div>
  );
};

const CertGridSection: React.FC<{ 
  title: string; 
  certs: Certification[]; 
  color: string;
  onSelect: (c: Certification) => void;
}> = ({ title, certs, color, onSelect }) => {
  const accentBorder = color === 'blue' ? 'border-blue-600' : 
                       color === 'orange' ? 'border-orange-500' : 
                       color === 'purple' ? 'border-purple-600' : 'border-slate-400';
  
  const shadowClass = color === 'blue' ? 'hard-shadow-blue' : 
                     color === 'orange' ? 'hard-shadow-orange' : 
                     color === 'purple' ? 'hard-shadow-purple' : 'hard-shadow-sm';

  return (
    <section className="space-y-10">
      <div className="flex items-center gap-4 overflow-hidden">
        <h2 className={`mono text-[10px] font-black bg-black text-white px-3 py-1 shrink-0 uppercase tracking-widest`}>
          {title}
        </h2>
        <div className="flex-grow h-0.5 bg-black"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {certs.map((cert) => (
          <div 
            key={cert.id} 
            onClick={() => onSelect(cert)}
            className={`bg-white border-2 border-black flex flex-col group ${shadowClass} transition-all hover:-translate-y-1 hover:shadow-xl duration-300 overflow-hidden cursor-pointer`}
          >
            {cert.imageUrl ? (
              <div className="aspect-[16/10] bg-slate-50 border-b-2 border-black relative overflow-hidden shrink-0 flex items-center justify-center p-6">
                <img 
                  src={cert.imageUrl} 
                  alt={cert.name} 
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ) : (
                <div className="aspect-[16/10] bg-slate-50 border-b-2 border-black flex items-center justify-center">
                    <span className="mono text-xs text-slate-300 font-bold uppercase">No Image</span>
                </div>
            )}
            
            <div className="p-5 md:p-6 flex-grow space-y-4 overflow-hidden flex flex-col">
              <div className="flex justify-between items-start gap-2">
                <span className={`mono text-[9px] font-black uppercase tracking-widest px-2 py-0.5 border-2 border-black truncate ${accentBorder}`}>
                  {cert.issuer}
                </span>
                <span className="mono text-[9px] text-slate-300 font-bold whitespace-nowrap">{cert.year}</span>
              </div>
              <h3 className="text-lg md:text-xl font-black text-slate-900 leading-tight uppercase technical-break flex-grow">
                {cert.name}
              </h3>
              
              <div className="mono text-[9px] font-bold text-slate-400 group-hover:text-black uppercase mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <span>View Credential</span>
                <span className="group-hover:translate-x-1 transition-transform">↗</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const CertModal: React.FC<{ cert: Certification; onClose: () => void }> = ({ cert, onClose }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
          if (isZoomed) {
              setIsZoomed(false);
          } else {
              onClose();
          }
      }
    };
    window.addEventListener('keydown', handleEsc);
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, isZoomed]);

  return (
    <div 
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" 
        onClick={() => !isZoomed && onClose()}
    >
      <div 
        className="bg-white max-w-6xl w-full border-2 border-black hard-shadow max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 md:p-6 border-b-2 border-black bg-slate-50 shrink-0">
             <div className="flex flex-col">
                <span className="mono text-[10px] font-black text-slate-400 uppercase tracking-widest">Credential Detail</span>
                <span className="mono text-xs font-bold text-black uppercase">Ref: {cert.id}</span>
             </div>
             <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center border-2 border-black bg-white hover:bg-black hover:text-white transition-colors mono font-bold"
             >
                ✕
             </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 md:p-10">
            <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
                {/* Image Section - Expanded for better visibility */}
                <div className="lg:w-1/2 shrink-0">
                    <div 
                        className="border-2 border-black bg-slate-100 p-8 flex items-center justify-center min-h-[300px] h-full cursor-zoom-in group relative"
                        onClick={() => cert.imageUrl && setIsZoomed(true)}
                    >
                        {cert.imageUrl ? (
                            <>
                                <img 
                                    src={cert.imageUrl} 
                                    alt={cert.name} 
                                    className="w-full h-auto object-contain max-h-[500px] transition-transform duration-300 group-hover:scale-[1.02]" 
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
                                <div className="absolute bottom-4 right-4 bg-black text-white px-2 py-1 mono text-[10px] font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                                    Click to expand
                                </div>
                            </>
                        ) : (
                            <span className="mono text-slate-300 font-bold">NO PREVIEW</span>
                        )}
                    </div>
                </div>

                {/* Info Section */}
                <div className="lg:w-1/2 space-y-8">
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            <span className="mono text-[10px] font-black bg-black text-white px-2 py-1 uppercase">{cert.category}</span>
                            <span className="mono text-[10px] font-black border-2 border-black px-2 py-1 uppercase">{cert.year}</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black uppercase leading-[1.1] tracking-tight">{cert.name}</h2>
                        <div className="flex items-center gap-2">
                            <div className="h-px w-8 bg-black"></div>
                            <span className="mono text-xs font-black text-blue-600 uppercase tracking-widest">{cert.issuer}</span>
                        </div>
                    </div>

                    <p className="text-lg text-slate-600 font-medium leading-relaxed">
                        {cert.description || "No specific description available for this certification."}
                    </p>

                    <div className="pt-4">
                         {cert.credentialUrl ? (
                            <a 
                                href={cert.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-full md:w-auto px-8 py-4 bg-blue-600 text-white border-2 border-black font-black mono text-sm uppercase hover:bg-blue-700 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-0.5"
                            >
                                Verify Credential <span className="ml-2">↗</span>
                            </a>
                        ) : (
                            <button disabled className="w-full md:w-auto px-8 py-4 bg-slate-100 text-slate-400 border-2 border-slate-200 font-black mono text-sm uppercase cursor-not-allowed">
                                Verification Unavailable
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Full Screen Zoom Overlay */}
      {isZoomed && cert.imageUrl && (
        <div 
            className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-4 md:p-8 cursor-zoom-out animate-in fade-in duration-200"
            onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(false);
            }}
        >
             <div className="relative max-w-7xl max-h-full w-full flex items-center justify-center h-full">
                <img 
                    src={cert.imageUrl} 
                    className="max-w-full max-h-full object-contain animate-in zoom-in-95 duration-300 border-2 border-white/10" 
                    alt={cert.name}
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 text-white mono text-[10px] uppercase backdrop-blur-md rounded-full border border-white/10 hidden md:block">
                    Press ESC to close
                </div>
             </div>
             <button 
                onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomed(false);
                }}
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
};

export default Certifications;
