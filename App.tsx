
import React, { useState, useEffect } from 'react';
import { Page, Project, ProjectSection } from './types';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Certifications from './pages/Certifications';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import CtfWriteups from './pages/CtfWriteups';
import Admin from './pages/Admin';
import { MarkdownRenderer } from './components/MarkdownRenderer';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  }, [currentPage, selectedProject]);

  const navItems: { label: string; id: Page }[] = [
    { label: 'Home', id: 'home' },
    { label: 'Projects', id: 'projects' },
    { label: 'CTF Writeups', id: 'ctf' },
    { label: 'Certifications', id: 'certifications' },
    { label: 'Experience', id: 'experience' },
    { label: 'Contact', id: 'contact' },
  ];

  const renderPage = () => {
    if (selectedProject) {
      return (
        <ProjectDetail 
          project={selectedProject} 
          onBack={() => setSelectedProject(null)} 
        />
      );
    }

    switch (currentPage) {
      case 'home': return <Home onNavigate={setCurrentPage} onSelectProject={setSelectedProject} />;
      case 'projects': return <Projects onSelectProject={setSelectedProject} />;
      case 'ctf': return <CtfWriteups />;
      case 'certifications': return <Certifications />;
      case 'experience': return <Experience />;
      case 'contact': return <Contact />;
      case 'admin': return <Admin />;
      default: return <Home onNavigate={setCurrentPage} onSelectProject={setSelectedProject} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-black selection:text-white">
      {/* Header Bar */}
      <header className="fixed top-0 w-full z-[100] bg-black text-white h-14 border-b border-black flex items-center">
        <div className="w-full px-4 md:px-6 flex justify-between items-center overflow-hidden">
          <div 
            className="flex items-center gap-3 md:gap-4 cursor-pointer min-w-0"
            onClick={() => { setCurrentPage('home'); setSelectedProject(null); }}
          >
            <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-600 shrink-0"></div>
            <span className="mono font-bold tracking-tighter text-[10px] sm:text-xs md:text-sm truncate uppercase tracking-widest">KIM CHANYEOP // PORTFOLIO</span>
          </div>
          
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden lg:flex items-center gap-2 mono text-[10px] text-slate-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Secure Connection Active
            </div>
            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col gap-1 w-6 py-2"
              aria-label="Toggle Menu"
            >
              <div className={`h-0.5 bg-white transition-all w-full ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`h-0.5 bg-white transition-all w-full ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`h-0.5 bg-white transition-all w-full ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-[90] bg-white pt-14 transition-transform duration-300 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 space-y-4 overflow-y-auto h-full">
          <p className="mono text-[10px] text-slate-400 mb-4 font-bold tracking-[0.2em] uppercase border-b border-slate-100 pb-2">Navigation Directory</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setCurrentPage(item.id); setSelectedProject(null); }}
              className={`w-full text-left px-4 py-4 border-2 transition-all mono text-sm font-black flex items-center justify-between uppercase ${
                currentPage === item.id && !selectedProject 
                  ? 'bg-black text-white border-black' 
                  : 'bg-slate-50 text-slate-600 border-slate-100'
              }`}
            >
              <span className="truncate">{item.label}</span>
              <span className={`w-2 h-2 shrink-0 ${currentPage === item.id ? 'bg-blue-600' : 'bg-slate-300'}`}></span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout - Root Level Scrolling */}
      <div className="flex-grow flex pt-14">
        {/* Sidebar Nav (Desktop Only) - Fixed Pinned */}
        <nav className="fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-64 border-r-2 border-black bg-white hidden md:flex flex-col p-6 z-50">
          <div className="flex-grow space-y-2">
            <p className="mono text-[10px] text-slate-400 mb-6 font-bold tracking-[0.2em] uppercase">Control Panel</p>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setCurrentPage(item.id); setSelectedProject(null); }}
                className={`w-full text-left px-4 py-3 border-2 transition-all mono text-xs font-bold flex items-center justify-between group uppercase ${
                  currentPage === item.id && !selectedProject 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-slate-600 border-transparent hover:border-black hover:text-black'
                }`}
              >
                <span className="truncate mr-2">{item.label}</span>
                <span className={`w-1.5 h-1.5 shrink-0 ${currentPage === item.id ? 'bg-blue-600' : 'bg-slate-200 group-hover:bg-black'}`}></span>
              </button>
            ))}
          </div>
          <div className="pt-6 border-t border-slate-100">
            <button 
              onClick={() => setCurrentPage('admin')}
              className="mono text-[10px] font-bold text-slate-300 hover:text-black transition-colors uppercase"
            >
              Lab Manager
            </button>
          </div>
        </nav>

        {/* Content Flow Area */}
        <main className="flex-grow md:ml-64 flex flex-col min-h-[calc(100vh-3.5rem)] min-w-0">
          <div className="flex-grow min-w-0">
            {renderPage()}
          </div>
          
          {/* Integrated Footer - Pins to bottom via flex-grow on container */}
          <footer className="border-t-2 border-black bg-white p-6 md:p-8 shrink-0 mt-auto">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="mono text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                &copy; {new Date().getFullYear()} // Security Portfolio v5.1.1
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-1.5 md:w-8 md:h-2 bg-black"></div>
                <div className="w-6 h-1.5 md:w-8 md:h-2 bg-blue-600"></div>
                <div className="w-6 h-1.5 md:w-8 md:h-2 bg-orange-500"></div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

const ProjectDetail: React.FC<{ project: Project; onBack: () => void }> = ({ project, onBack }) => {
  const [zoomedImg, setZoomedImg] = useState<string | null>(null);

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

  return (
    <div className="p-4 sm:p-8 md:p-16 max-w-6xl w-full mx-auto animate-in fade-in duration-500 min-w-0">
      <button 
        onClick={onBack}
        className="mono text-[10px] md:text-xs font-bold text-slate-500 hover:text-black flex items-center gap-2 mb-8 md:mb-12 uppercase"
      >
        <span className="text-lg">←</span> Back to Directory
      </button>

      <div className="border-2 border-black bg-white hard-shadow p-6 sm:p-10 md:p-16 space-y-12 md:space-y-20 mb-12 min-w-0">
        {/* Lab Header */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 mono text-[9px] md:text-[11px] text-blue-600 font-bold flex-wrap uppercase">
            <span className="px-3 py-1 border-2 border-blue-600 whitespace-nowrap">{project.category} Report</span>
            <span className="whitespace-nowrap">Intelligence Ref: #{project.id}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-slate-900 leading-[1] uppercase tracking-tighter break-words">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-bold max-w-3xl border-l-4 border-black pl-6 py-2 leading-tight">
            {project.description}
          </p>
        </div>

        {/* Dynamic Sections Content */}
        <div className="space-y-12 min-w-0">
          {project.sections ? (
            project.sections.map((section, idx) => (
              <ProjectSectionRenderer 
                key={idx} 
                section={section} 
                onImageClick={setZoomedImg}
              />
            ))
          ) : (
             /* Fallback for old content structure if needed */
             <MarkdownRenderer content={project.content || ''} />
          )}
        </div>
      </div>

      {zoomedImg && (
        <div 
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 cursor-zoom-out animate-in fade-in duration-200"
          onClick={() => setZoomedImg(null)}
        >
          <div className="relative max-w-7xl max-h-full w-full flex items-center justify-center h-full">
             <img 
               src={zoomedImg} 
               className="max-w-full max-h-full object-contain hard-shadow animate-in zoom-in-95 duration-300 border-2 border-white/20" 
               alt="Zoomed"
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
};

// Slideshow Component
const SlideshowSection: React.FC<{ 
  images: string[]; 
  title?: string;
  onImageClick: (url: string) => void; 
}> = ({ images, title, onImageClick }) => {
  const [idx, setIdx] = useState(0);
  
  const next = () => setIdx((prev) => (prev + 1) % images.length);
  const prev = () => setIdx((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="animate-in slide-in-from-bottom-2 duration-700 my-8">
      {title && (
          <h2 className="mono text-[10px] font-black bg-slate-100 text-slate-500 px-3 py-1 inline-block uppercase tracking-widest mb-6">
            {title}
          </h2>
      )}
      
      <div className="border-2 border-black bg-slate-50 p-2">
        {/* Main Image Stage */}
        <div className="relative aspect-video bg-black/5 flex items-center justify-center overflow-hidden group">
           <img 
             src={images[idx]} 
             className="w-full h-full object-contain cursor-zoom-in"
             onClick={() => onImageClick(images[idx])}
             alt={`Slide ${idx + 1}`}
           />
           
           {/* Controls */}
           <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-600 hard-shadow-sm font-bold text-xl pb-1">←</button>
           <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-600 hard-shadow-sm font-bold text-xl pb-1">→</button>
           
           {/* Counter */}
           <div className="absolute bottom-4 right-4 bg-black/80 text-white px-2 py-1 mono text-[10px] font-bold">
             {idx + 1} / {images.length}
           </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 overflow-x-auto p-2 border-t-2 border-black/10 mt-2 pb-2">
          {images.map((img, i) => (
            <div 
              key={i} 
              onClick={() => setIdx(i)}
              className={`w-20 h-12 flex-shrink-0 border-2 cursor-pointer transition-all ${i === idx ? 'border-blue-600 opacity-100' : 'border-transparent opacity-50 hover:opacity-100 bg-black/5'}`}
            >
              <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${i+1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const ProjectSectionRenderer: React.FC<{ 
  section: ProjectSection; 
  onImageClick: (url: string) => void;
}> = ({ section, onImageClick }) => {
  
  const renderTitle = () => {
    if (!section.title) return null;
    return (
      <h2 className="mono text-[10px] font-black bg-slate-100 text-slate-500 px-3 py-1 inline-block uppercase tracking-widest mb-6">
        {section.title}
      </h2>
    );
  };

  switch (section.type) {
    case 'text':
      return (
        <div className="animate-in slide-in-from-bottom-2 duration-700">
          {renderTitle()}
          <MarkdownRenderer content={section.content || ''} />
        </div>
      );
    
    case 'code':
      // Reuse MarkdownRenderer for consistent code styling
      const codeContent = `\`\`\`${section.language || 'text'}\n${section.code}\n\`\`\``;
      return (
        <div className="animate-in slide-in-from-bottom-2 duration-700">
          {renderTitle()}
          <MarkdownRenderer content={codeContent} />
        </div>
      );

    case 'list':
      return (
        <div className="animate-in slide-in-from-bottom-2 duration-700">
          {renderTitle()}
          <ul className="grid gap-2">
            {section.items?.map((item, i) => (
              <li key={i} className="flex gap-4 items-start text-slate-700 font-medium leading-relaxed bg-slate-50 border-2 border-black/5 p-4 hover:border-black/20 transition-colors">
                <span className="mono font-black text-blue-600 shrink-0 mt-1 text-xs">[0{i+1}]</span>
                <span className="break-words w-full">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case 'image':
      return (
        <div className="animate-in slide-in-from-bottom-2 duration-700 my-8">
           {renderTitle()}
           <figure className="space-y-4">
             <div 
               className="border-2 border-black bg-slate-50 p-2 overflow-hidden cursor-zoom-in group relative"
               onClick={() => section.imageUrl && onImageClick(section.imageUrl)}
             >
               <img 
                 src={section.imageUrl} 
                 alt={section.caption || 'Project visual'} 
                 className="w-full h-auto object-contain max-h-[600px] transition-transform duration-500 group-hover:scale-[1.01]" 
               />
               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
             </div>
             {section.caption && (
               <figcaption className="mono text-center text-[10px] font-black text-slate-400 uppercase break-words px-4">
                 // FIG: {section.caption}
               </figcaption>
             )}
           </figure>
        </div>
      );
    
    case 'video':
      // Basic YouTube detection
      let isYoutube = false;
      let embedSrc = '';
      
      if (section.videoUrl) {
        if (section.videoUrl.includes('youtube.com') || section.videoUrl.includes('youtu.be')) {
           isYoutube = true;
           // Extract video ID safely
           const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
           const match = section.videoUrl.match(regExp);
           const videoId = (match && match[2].length === 11) ? match[2] : null;
           
           if (videoId) {
             embedSrc = `https://www.youtube.com/embed/${videoId}`;
           } else {
             // Fallback if regex fails but strictly contains basic patterns
             isYoutube = false; 
           }
        }
      }

      return (
        <div className="animate-in slide-in-from-bottom-2 duration-700 my-8">
           {renderTitle()}
           <figure className="space-y-4">
             <div className="border-2 border-black bg-slate-50 p-2 relative">
               {isYoutube ? (
                 <div className="relative pt-[56.25%] bg-black">
                   <iframe 
                      className="absolute top-0 left-0 w-full h-full"
                      src={embedSrc}
                      title={section.caption || "YouTube video"}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                   ></iframe>
                 </div>
               ) : (
                 <video 
                   controls 
                   className="w-full h-auto max-h-[600px] outline-none bg-black"
                   src={section.videoUrl}
                 >
                   Your browser does not support the video tag.
                 </video>
               )}
             </div>
             {section.caption && (
               <figcaption className="mono text-center text-[10px] font-black text-slate-400 uppercase break-words px-4">
                 // VIDEO: {section.caption}
               </figcaption>
             )}
           </figure>
        </div>
      );

    case 'flow':
      return (
        <div className="animate-in slide-in-from-bottom-2 duration-700">
           {renderTitle()}
           <div className="relative border-l-2 border-black ml-4 md:ml-6 space-y-8 py-4">
             {section.flow?.map((step, i) => (
               <div key={i} className="relative pl-8 md:pl-12 group">
                 {/* Timeline Node */}
                 <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-2 border-black group-hover:bg-blue-600 transition-colors z-10"></div>
                 
                 <div className="space-y-2">
                   <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <span className="mono text-[10px] font-black bg-black text-white px-2 py-0.5 inline-block w-fit">STEP {step.step}</span>
                      <span className="mono text-xs font-black text-slate-900 uppercase tracking-widest">{step.label}</span>
                   </div>
                   <p className="text-slate-600 font-medium leading-relaxed border-2 border-transparent bg-slate-50 p-4 hover:border-black/10 transition-all">
                     {step.details}
                   </p>
                 </div>
               </div>
             ))}
           </div>
        </div>
      );

    case 'slideshow':
      if (!section.images || section.images.length === 0) return null;
      return (
        <SlideshowSection 
          images={section.images} 
          title={section.title}
          onImageClick={onImageClick} 
        />
      );

    default:
      return null;
  }
};

export default App;
