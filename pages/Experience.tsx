
import React from 'react';
import { EXPERIENCE } from '../data';

const Experience: React.FC = () => {
  return (
    <div className="p-8 md:p-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-4xl mb-20 space-y-4">
        <p className="mono text-xs font-black text-orange-600 tracking-[0.2em] uppercase underline underline-offset-8 decoration-2">
          Career Timeline
        </p>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-black leading-none uppercase">
          Experience
        </h1>
        <p className="text-xl text-slate-500 font-bold max-w-2xl leading-relaxed">
          A record of my professional roles and contributions in the cybersecurity and industrial infrastructure sectors.
        </p>
      </div>

      <div className="space-y-12">
        {EXPERIENCE.map((item, index) => (
          <div key={item.id} className="relative group">
            {/* Connection Line */}
            {index !== EXPERIENCE.length - 1 && (
              <div className="absolute left-6 top-16 bottom-0 w-1 bg-black/5 hidden md:block"></div>
            )}
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-64 shrink-0">
                <div className="border-2 border-black bg-black text-white p-4 mono text-xs font-bold hard-shadow-sm flex justify-between items-center">
                  <span>DATE:</span>
                  <span>{item.duration}</span>
                </div>
              </div>
              
              <div className="flex-grow border-2 border-black bg-white p-8 md:p-12 hard-shadow space-y-8 relative overflow-hidden group-hover:bg-slate-50 transition-colors">
                <div className="absolute top-0 right-0 p-4 mono text-[10px] text-slate-100 font-black pointer-events-none select-none uppercase">
                  Entry ID: {item.id}
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-3xl md:text-4xl font-black text-black tracking-tighter uppercase leading-none">
                    {item.title}
                  </h3>
                  <p className="mono text-sm font-black text-blue-600 uppercase tracking-widest">
                    {item.organization}
                  </p>
                </div>

                <div className="h-0.5 bg-black/10 w-24"></div>

                <ul className="space-y-4 max-w-2xl">
                  {item.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-4 items-start text-slate-600 font-medium leading-relaxed">
                      <span className="mono text-xs text-black font-black mt-1">[{i+1}]</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-6 flex gap-4">
                   <div className="w-12 h-1 bg-blue-600"></div>
                   <div className="w-12 h-1 bg-black"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
