
import React from 'react';
import { Page, Project } from '../types';
import { PROJECTS } from '../data';

interface HomeProps {
  onNavigate: (page: Page) => void;
  onSelectProject: (project: Project) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, onSelectProject }) => {
  const getProject = (id: string) => PROJECTS.find(p => p.id === id);

  const recommendedIds = [
    { 
        id: 'vuln-xss-cookie', 
        customTitle: 'XSS Vulnerability Search',
        customDesc: null // Use default
    },
    { 
        id: 'chrome-0day-ato', 
        customTitle: null,
        customDesc: "Replication of a vulnerability found by @slonser_ which he posted on Twitter. Investigating Chrome Referer leaks chained with OAuth misconfigurations." 
    },
    { 
        id: 'ot-research', 
        customTitle: 'OT Lab Research',
        customDesc: null // Use default
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="p-6 md:p-12 lg:p-16 border-b-2 border-black bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 mono text-[8px] text-slate-300 font-bold hidden xl:block leading-tight uppercase text-right">
          Portfolio // 2025<br/>
          Singapore<br/>
          Open for Work
        </div>
        
        <div className="max-w-5xl space-y-6 md:space-y-8">
          <div className="mono text-[9px] md:text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 inline-block border border-blue-200 uppercase tracking-widest">
            // Cybersecurity Portfolio
          </div>
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-black leading-[0.9] uppercase break-words">
            KIM<br/>
            <span className="text-blue-600">CHANYEOP</span>
          </h1>

          <div className="space-y-6 max-w-3xl">
             <p className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
              Graduate from <span className="underline decoration-blue-500 underline-offset-4 decoration-4">Nanyang Polytechnic</span>.<br/>
              Cybersecurity Enthusiast.
            </p>
            <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed max-w-2xl">
               Specializing in offensive security and web exploitation. I am passionate about finding vulnerabilities in modern web applications and getting them secured.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 pt-6">
            <button 
              onClick={() => onNavigate('projects')}
              className="px-6 md:px-8 py-3.5 md:py-4 bg-black text-white border-2 border-black font-bold mono text-[10px] md:text-sm hover:bg-white hover:text-black transition-all active:scale-95 hard-shadow-sm uppercase whitespace-nowrap"
            >
              View Projects
            </button>
            <button 
              onClick={() => onNavigate('ctf')}
              className="px-6 md:px-8 py-3.5 md:py-4 bg-white text-black border-2 border-black font-bold mono text-[10px] md:text-sm hover:bg-slate-50 transition-all active:scale-95 uppercase whitespace-nowrap"
            >
              Read Writeups
            </button>
          </div>
        </div>
      </section>

      {/* Intro & Keywords Section */}
      <section className="grid md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-black">
        {/* Recommended Read Column */}
        <div className="flex flex-col bg-white overflow-hidden">
           {/* Section Header */}
           <div className="p-6 sm:p-8 border-b-2 border-black bg-slate-50 flex items-center gap-3">
             <h2 className="mono text-[10px] font-black bg-black text-white px-2 py-1 inline-block uppercase tracking-widest">Recommended Reads</h2>
             <div className="w-5 h-5 bg-blue-600 text-white flex items-center justify-center mono text-[10px] font-black">3</div>
           </div>
           
           {/* Projects List */}
           <div className="divide-y-2 divide-black flex-grow">
              {recommendedIds.map((item) => {
                 const project = getProject(item.id);
                 if (!project) return null;
                 
                 return (
                   <div 
                     key={project.id}
                     className="p-6 sm:p-8 group cursor-pointer hover:bg-slate-50 transition-colors"
                     onClick={() => onSelectProject(project)}
                   >
                      <div className="space-y-4">
                         <div className="flex justify-between items-start">
                             <span className="mono text-[9px] font-black text-blue-600 border border-blue-200 bg-white px-2 py-0.5 uppercase">{project.category}</span>
                             <span className="mono text-[10px] font-bold text-slate-300 group-hover:text-blue-600 transition-colors uppercase">Read Case Study ↗</span>
                         </div>
                         <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-[1] group-hover:text-blue-600 transition-colors">
                            {item.customTitle || project.title}
                         </h3>
                         <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-lg line-clamp-3">
                            {item.customDesc || project.description}
                         </p>
                      </div>
                   </div>
                 );
              })}
           </div>
        </div>

        {/* Skills & Interests Column */}
        <div className="p-6 sm:p-8 md:p-12 lg:p-16 space-y-8 bg-slate-50 overflow-hidden flex flex-col justify-center">
          <h2 className="mono text-[10px] font-black bg-blue-600 text-white px-2 py-1 inline-block uppercase tracking-widest self-start">Skills & Interests</h2>
          
          <div className="flex flex-wrap gap-3">
            {[
              "Web Exploitation",
              "Digital Forensics",
              "OT/ICS Basics",
              "Ethical Hacking",
              "Python Scripting",
              "Vulnerability Assessment",
              "Lab Simulation",
              "Secure Coding",
              "Linux Fundamentals",
              "Prompt Engineering"
            ].map((tag, i) => (
              <span key={i} className="px-3 py-2 border-2 border-black bg-white text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors cursor-default hard-shadow-sm">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t-2 border-black/10 space-y-4">
             <p className="mono text-[10px] text-slate-400 font-bold uppercase tracking-widest">Featured Credential</p>
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-black text-xs border-2 border-black">
                   HTB
                </div>
                <div>
                   <p className="font-black uppercase text-sm leading-tight">Certified Web Exploitation Specialist</p>
                   <p className="mono text-[10px] text-slate-500">Hack The Box // 2026</p>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
