
import React, { useState } from 'react';

const Admin: React.FC = () => {
  const [labTitle, setLabTitle] = useState('New Security Lab');
  const [labDesc, setLabDesc] = useState('Demonstrating a specific vulnerability or technique.');
  const [labCategory, setLabCategory] = useState<string>('Lab');

  const [markdownContent, setMarkdownContent] = useState(`## Overview

Details about the lab environment...

## Technical Analysis

- Point 1
- Point 2

## Code Evidence

\`\`\`python
print("Hello World")
\`\`\`
`);

  // Simple escape for backticks in the generated output to prevent template literal breakage
  const escapedContent = markdownContent.replace(/`/g, '\\`');

  const generatedFullCode = `{
  id: '${labTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}',
  title: '${labTitle}',
  description: '${labDesc}',
  category: '${labCategory}',
  content: \`
${markdownContent}
  \`
}`;

  return (
    <div className="p-6 md:p-16 max-w-6xl mx-auto space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Lab Builder</h1>
        <p className="text-slate-500 font-bold">Use this tool to generate the standardized markdown configuration for your next security laboratory report.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Editor */}
        <div className="space-y-8 bg-white border-2 border-black p-8 hard-shadow">
          <div className="space-y-4">
             <label className="mono text-[10px] font-black uppercase tracking-widest text-slate-400">Lab Identity</label>
             <input 
              value={labTitle}
              onChange={(e) => setLabTitle(e.target.value)}
              className="w-full border-2 border-black p-4 font-black text-xl outline-none focus:bg-blue-50"
              placeholder="Title"
             />
             <textarea 
              value={labDesc}
              onChange={(e) => setLabDesc(e.target.value)}
              className="w-full border-2 border-black p-4 font-bold text-slate-600 outline-none focus:bg-blue-50 h-24"
              placeholder="Short description..."
             />
             <select 
              value={labCategory}
              onChange={(e: any) => setLabCategory(e.target.value)}
              className="w-full border-2 border-black p-4 font-black mono text-xs uppercase"
             >
               <option value="Lab">Laboratory</option>
               <option value="Vulnerability">Vulnerability Report</option>
               <option value="Demonstration">Technical Demonstration</option>
               <option value="Application">Application</option>
               <option value="School Project">School Project</option>
               <option value="Security Testing">Security Testing</option>
             </select>
          </div>

          <div className="space-y-4">
             <label className="mono text-[10px] font-black uppercase tracking-widest text-slate-400">Markdown Content</label>
             <textarea 
              value={markdownContent}
              onChange={(e) => setMarkdownContent(e.target.value)}
              className="w-full border-2 border-black p-4 font-mono text-sm bg-slate-900 text-emerald-400 outline-none h-96 leading-relaxed"
              placeholder="# Header..."
             />
             <p className="mono text-[10px] text-slate-400">Supported: ## Headers, - Lists, ```Code```, ![Alt](Url)</p>
          </div>
        </div>

        {/* Output */}
        <div className="space-y-8">
           <div className="space-y-4">
             <div className="flex justify-between items-center">
               <label className="mono text-[10px] font-black uppercase tracking-widest text-slate-400">Code Output for data.ts</label>
               <button 
                onClick={() => {
                  navigator.clipboard.writeText(generatedFullCode);
                  alert('Lab code copied!');
                }}
                className="mono text-[10px] font-black bg-black text-white px-3 py-1 hover:bg-blue-600 transition-colors uppercase"
               >
                 Copy Code
               </button>
             </div>
             <pre className="border-2 border-black bg-white p-6 overflow-x-auto max-h-[600px] text-xs font-mono text-slate-700 leading-relaxed whitespace-pre-wrap break-all">
               {generatedFullCode}
             </pre>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
