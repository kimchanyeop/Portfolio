
import React, { useEffect, useState } from 'react';
import { PROJECTS } from '../data';
import { Project } from '../types';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  // Define the strict order for categories
  const categoryOrder = ['Security Testing', 'Lab', 'School Project'];

  // Get unique categories from data
  const uniqueCategories = Array.from(new Set(PROJECTS.map(p => p.category)));

  // Sort categories based on the defined order
  const sortedCategories = uniqueCategories.sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    
    // If both are in the order list, sort by their index
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    
    // If only A is in list, it comes first
    if (indexA !== -1) return -1;
    
    // If only B is in list, it comes first
    if (indexB !== -1) return 1;
    
    // If neither, sort alphabetically
    return a.localeCompare(b);
  });

  // Scroll Spy for Sidebar
  const [activeCategory, setActiveCategory] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      // Find which section is currently in view
      const sections = sortedCategories.map(cat => document.getElementById(`cat-${cat}`));
      
      let current = '';
      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          // 200px offset determines when a section is considered "active"
          if (rect.top <= 200) {
            current = section.id.replace('cat-', '');
          }
        }
      }
      if (current) setActiveCategory(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sortedCategories]);

  const scrollToCategory = (cat: string) => {
    const element = document.getElementById(`cat-${cat}`);
    if (element) {
      // Offset for the fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="p-6 md:p-16 max-w-7xl mx-auto min-w-0 relative">
      <div className="flex flex-col xl:flex-row gap-12">
        
        {/* Main Content Area */}
        <div className="flex-grow min-w-0">
          <div className="max-w-4xl mb-12 md:mb-20 space-y-4">
            <p className="mono text-[10px] md:text-xs font-black text-blue-600 tracking-[0.2em] uppercase underline underline-offset-4 decoration-1">
              Recent Works
            </p>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-black leading-none uppercase technical-break">
              Project Gallery
            </h1>
          </div>

          <div className="space-y-24">
            {sortedCategories.map((category) => {
              const categoryProjects = PROJECTS.filter(p => p.category === category);
              const count = categoryProjects.length;
              
              return (
                <section id={`cat-${category}`} key={category} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 scroll-mt-32">
                  <div className="flex items-center gap-4">
                    <h2 className="mono text-sm font-black bg-black text-white px-4 py-2 uppercase tracking-widest border-2 border-black">
                      {category}
                    </h2>
                    <div className="h-0.5 bg-black flex-grow opacity-20"></div>
                    <span className="mono text-xs font-bold text-slate-400">[{count}]</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                    {categoryProjects.map((project) => (
                      <div 
                        key={project.id} 
                        className="bg-white p-6 md:p-8 border-2 border-black hard-shadow-sm group hover:bg-black hover:text-white transition-all cursor-pointer flex flex-col justify-between overflow-hidden relative min-h-[280px]"
                        onClick={() => onSelectProject(project)}
                      >
                        <div className="space-y-4">
                          <div className="flex justify-between items-start gap-4">
                            <span className="mono text-[9px] font-black px-2 py-0.5 border-2 border-black group-hover:border-white uppercase shrink-0">
                              {project.category}
                            </span>
                            <span className="mono text-[9px] text-slate-300 group-hover:text-slate-500 truncate uppercase tracking-widest">Ref: {project.id}</span>
                          </div>
                          
                          <h3 className="text-xl md:text-2xl font-black leading-[1.1] uppercase tracking-tighter group-hover:text-blue-500 transition-colors technical-break">
                            {project.title}
                          </h3>
                          <p className="text-sm font-medium leading-relaxed opacity-60 line-clamp-3">
                            {project.description}
                          </p>
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-slate-100 group-hover:border-slate-800 flex justify-between items-center shrink-0">
                          <span className="mono text-[10px] font-black uppercase truncate">View Project</span>
                          <span className="text-2xl group-hover:translate-x-2 transition-transform shrink-0">→</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar Menu - Visible on XL screens */}
        <div className="hidden xl:block w-48 shrink-0 relative">
          <div className="sticky top-32 space-y-6 border-l-2 border-slate-100 pl-6">
             <p className="mono text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">
               Category Index
             </p>
             <nav className="flex flex-col space-y-3">
               {sortedCategories.map(cat => (
                 <button
                   key={cat}
                   onClick={() => scrollToCategory(cat)}
                   className={`text-left mono text-[10px] font-bold uppercase transition-all duration-300 flex items-center gap-2 group ${
                     activeCategory === cat 
                       ? 'text-blue-600 translate-x-1' 
                       : 'text-slate-400 hover:text-black hover:translate-x-1'
                   }`}
                 >
                   <span className={`w-1.5 h-1.5 rounded-full transition-colors ${activeCategory === cat ? 'bg-blue-600' : 'bg-slate-300 group-hover:bg-black'}`}></span>
                   {cat}
                 </button>
               ))}
             </nav>
             
             {/* Indicator for more content */}
             <div className="pt-8 mt-8 border-t border-slate-100 opacity-60">
                <p className="mono text-[9px] text-slate-400 font-medium leading-tight mb-2">
                  <span className="animate-pulse">↓</span> MORE CATEGORIES BELOW
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
