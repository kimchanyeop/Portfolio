
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="p-8 md:p-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-4xl mb-20 space-y-4">
        <p className="mono text-xs font-black text-blue-600 tracking-[0.3em] uppercase underline underline-offset-8 decoration-2">
          Contact Details
        </p>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-black leading-none uppercase">
          Get In Touch
        </h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-0 border-2 border-black divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-black bg-white hard-shadow">
        <div className="p-8 md:p-12 space-y-12">
          <div className="space-y-6">
            <h2 className="mono text-xs font-black bg-black text-white px-3 py-1 inline-block uppercase tracking-widest">Connect with me</h2>
          </div>

          <div className="space-y-6">
            <ContactLink 
              label="Email Address"
              value="kimchanyeop123@gmail.com"
            />
            <ContactLink 
              label="LinkedIn Profile"
              value="https://www.linkedin.com/in/chanyeop-kim-a779a9292"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

const ContactLink: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="space-y-1">
    <p className="mono text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}:</p>
    <p className="text-xl font-black text-slate-900 tracking-tight">{value}</p>
  </div>
);

export default Contact;
