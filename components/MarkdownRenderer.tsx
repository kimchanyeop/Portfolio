
import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
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

  if (!content) return null;
  const lines = content.split('\n');
  const renderedElements: React.ReactNode[] = [];
  let currentParagraph: string[] = [];
  
  // Code Block State
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let language = '';
  let codeFenceLength = 0; // Track length of the opening fence (e.g., 3 for ```, 4 for ````)

  // List State
  let inList = false;
  let listBuffer: string[] = [];

  const flushParagraph = (keyPrefix: string) => {
    if (currentParagraph.length > 0) {
      renderedElements.push(
        <p key={`${keyPrefix}-p-${renderedElements.length}`} className="text-slate-700 leading-relaxed font-normal text-lg mb-6 whitespace-pre-wrap break-words">
          {formatInline(currentParagraph.join(' '))}
        </p>
      );
      currentParagraph = [];
    }
  };

  const flushList = (keyPrefix: string) => {
    if (listBuffer.length > 0) {
        renderedElements.push(
            <ul key={`${keyPrefix}-list-${renderedElements.length}`} className="list-inside mb-8 grid gap-2">
                {listBuffer.map((item, i) => (
                    <li key={i} className="flex gap-4 items-start text-slate-700 font-medium leading-relaxed bg-slate-50 border-2 border-black/5 p-3 hover:border-black/20 transition-colors">
                        <span className="mono font-black text-blue-600 shrink-0 mt-1 text-xs">
                           [0{i+1}]
                        </span>
                        <span className="break-words w-full">{formatInline(item)}</span>
                    </li>
                ))}
            </ul>
        );
        listBuffer = [];
        inList = false;
    }
  };

  lines.forEach((line, index) => {
    // Regex to match code fence: starts with 3 or more backticks
    const codeFenceMatch = line.trim().match(/^(`{3,})(.*)$/);

    // --- Code Blocks ---
    if (codeFenceMatch) {
      const fenceLength = codeFenceMatch[1].length;
      const meta = codeFenceMatch[2].trim();

      if (inCodeBlock) {
        // Only close if we hit a fence of the same length or longer
        if (fenceLength >= codeFenceLength) {
            renderedElements.push(
              <div key={`code-${index}`} className="my-8 rounded-none border-2 border-black bg-slate-950 hard-shadow-sm overflow-hidden min-w-0">
                <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b-2 border-black">
                  <span className="mono text-[9px] font-black text-slate-400 uppercase tracking-widest">{language || 'TERMINAL'}</span>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                  </div>
                </div>
                <div className="overflow-x-auto bg-slate-950 code-scrollbar">
                  <SyntaxHighlighter
                    language={language || 'text'}
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: '1.5rem',
                      background: 'transparent',
                      fontSize: '0.875rem',
                      lineHeight: '1.625',
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                    wrapLongLines={false}
                  >
                    {codeBuffer.join('\n')}
                  </SyntaxHighlighter>
                </div>
              </div>
            );
            codeBuffer = [];
            inCodeBlock = false;
            language = '';
            codeFenceLength = 0;
            return;
        }
        // If inside block but fence is different length (e.g. ``` inside ````), treat as content
        codeBuffer.push(line);
        return;
      } else {
        // Start code block
        flushParagraph(`para-${index}`);
        flushList(`list-${index}`);
        inCodeBlock = true;
        codeFenceLength = fenceLength;
        language = meta;
        return;
      }
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    const trimmed = line.trim();

    // --- Lists ---
    // Matches "- item", "* item"
    const ulMatch = line.match(/^[-*]\s+(.*)$/);
    if (ulMatch) {
        if (!inList) {
            flushParagraph(`pre-list-${index}`);
            inList = true;
        }
        listBuffer.push(ulMatch[1]);
        return;
    }

    if (inList && !ulMatch && trimmed !== '') {
        flushList(`end-list-${index}`);
    } else if (inList && trimmed === '') {
        flushList(`end-list-empty-${index}`);
    }

    // --- Headers ---
    if (line.startsWith('# ')) {
      flushParagraph(`head-${index}`);
      flushList(`head-list-${index}`);
      renderedElements.push(
        <h2 key={`h1-${index}`} className="text-3xl sm:text-5xl font-black text-slate-900 mt-16 mb-8 uppercase tracking-tighter leading-none break-words technical-break">
          {line.replace('# ', '')}
        </h2>
      );
      return;
    } else if (line.startsWith('## ')) {
      flushParagraph(`head2-${index}`);
      flushList(`head2-list-${index}`);
      renderedElements.push(
        <h3 key={`h2-${index}`} className="mono text-xs font-black bg-black text-white px-3 py-1 inline-block uppercase tracking-widest mt-12 mb-6">
          {line.replace('## ', '')}
        </h3>
      );
      return;
    } else if (line.startsWith('### ')) {
      flushParagraph(`head3-${index}`);
      flushList(`head3-list-${index}`);
      renderedElements.push(
         <h4 key={`h3-${index}`} className="mono text-xs font-black text-blue-600 uppercase tracking-widest mt-8 mb-4 border-b border-blue-100 inline-block pb-1">
          // {line.replace('### ', '')}
        </h4>
      );
      return;
    }

    // --- Images ---
    // ![Alt](Url)
    const imageMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imageMatch) {
       flushParagraph(`pre-img-${index}`);
       flushList(`pre-img-list-${index}`);
       const caption = imageMatch[1];
       const url = imageMatch[2];
       renderedElements.push(
        <figure key={`img-${index}`} className="my-10 space-y-4 break-inside-avoid">
          <div 
            className="border-2 border-black bg-slate-100 hard-shadow-sm overflow-hidden cursor-zoom-in group"
            onClick={() => setZoomedImg(url)}
          >
            <img 
              src={url} 
              alt={caption} 
              className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.01]"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
          </div>
          {caption && (
            <figcaption className="mono text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest text-center px-4 leading-normal">
              // FIGURE_{index}: {caption}
            </figcaption>
          )}
        </figure>
       );
       return;
    }

    // --- Paragraphs ---
    if (trimmed === '') {
      flushParagraph(`gap-${index}`);
      flushList(`gap-list-${index}`);
    } else {
      currentParagraph.push(line);
    }
  });

  flushParagraph('final');
  flushList('final-list');

  return (
    <>
      <div className="markdown-body w-full min-w-0">{renderedElements}</div>
      {zoomedImg && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 cursor-zoom-out animate-in fade-in duration-200"
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
    </>
  );
};

const formatInline = (text: string) => {
  let parts: (string | React.ReactNode)[] = [text];

  // Bold
  parts = parts.flatMap((part) => {
    if (typeof part !== 'string') return part;
    const split = part.split(/\*\*(.*?)\*\*/g);
    return split.map((s, i) => i % 2 === 1 ? <strong key={i} className="font-black text-slate-900">{s}</strong> : s);
  });

  // Inline Code
  parts = parts.flatMap((part) => {
    if (typeof part !== 'string') return part;
    // Match single backticks that are NOT part of a code fence
    const split = part.split(/(?<!`)`([^`]+)`(?!`)/g);
    return split.map((s, i) => i % 2 === 1 ? <code key={i} className="px-1.5 py-0.5 bg-slate-100 text-blue-600 font-mono text-[0.9em] rounded border border-slate-200 break-all">{s}</code> : s);
  });

  // URLs (Basic)
  parts = parts.flatMap((part) => {
    if (typeof part !== 'string') return part;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const split = part.split(urlRegex);
    return split.map((s, i) => i % 2 === 1 ? <a key={i} href={s} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline decoration-2 underline-offset-4 break-all">{s}</a> : s);
  });

  return parts;
};
