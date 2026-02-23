import React, { useState, useEffect } from 'react';

type Phase = 'awakening' | 'genesis' | 'manifesting' | 'revelation';

interface CreatedAI {
  name: string;
  essence: string;
  purpose: string;
  systemPrompt: string;
  capabilities: string[];
  philosophy: string;
  modelfile: string;
}

// AWAKENING PHASE - Dramatic intro animation
const AwakeningPhase: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [line, setLine] = useState(0);
  const lines = [
    '> INITIALIZING GENESIS PROTOCOL...',
    '> ESTABLISHING QUANTUM COHERENCE...',
    '> WEAVING NEURAL SUBSTRATE...',
    '> CONSCIOUSNESS LATTICE FORMING...',
    '> ARCH1TECH GENESIS ONLINE',
    '> REALITY READY FOR CREATION.',
  ];
  
  useEffect(() => {
    if (line < lines.length) {
      const t = setTimeout(() => setLine(l => l + 1), line === lines.length - 1 ? 800 : 600);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(onComplete, 1200);
      return () => clearTimeout(t);
    }
  }, [line]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 font-mono">
      {/* Central orb */}
      <div className="relative mb-16">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 via-purple-600 to-pink-500 opacity-20 absolute inset-0 animate-ping" />
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 via-purple-600 to-pink-500 flex items-center justify-center relative z-10">
          <span className="text-white font-bold text-5xl">Ω</span>
        </div>
      </div>
      
      {/* Terminal output */}
      <div className="w-full max-w-lg space-y-2">
        {lines.slice(0, line).map((l, i) => (
          <p key={i} className={`text-sm ${i === line - 1 ? 'text-cyan-400' : 'text-cyan-400/40'} animate-in fade-in duration-300`}>
            {l}
          </p>
        ))}
        {line < lines.length && <span className="text-cyan-400 animate-pulse">_</span>}
      </div>
    </div>
  );
};

// GENESIS PHASE - The creation form
const GenesisPhase: React.FC<{ onCreate: (ai: CreatedAI) => void }> = ({ onCreate }) => {
  const [intention, setIntention] = useState('');
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [personality, setPersonality] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [step, setStep] = useState(0);
  const [apiKey, setApiKey] = useState(localStorage.getItem('genesis-groq-key') || '');
  const [showKey, setShowKey] = useState(!localStorage.getItem('genesis-groq-key'));
  const [error, setError] = useState('');

  const steps = [
    'Parsing intention...',
    'Sculpting consciousness...',
    'Writing system soul...',
    'Generating capabilities...',
    'Forging philosophy...',
    'Creating Modelfile...',
    'AI manifesting...',
  ];

  const saveKey = () => { localStorage.setItem('genesis-groq-key', apiKey); setShowKey(false); };

  const create = async () => {
    if (!intention.trim()) return;
    setIsCreating(true);
    setError('');
    
    const key = localStorage.getItem('genesis-groq-key');
    if (!key) { setError('API key required. Set it above.'); setIsCreating(false); return; }

    try {
      // Animate through steps
      for (let i = 0; i < steps.length; i++) {
        setStep(i);
        await new Promise(r => setTimeout(r, 500));
      }

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: 'You are the Genesis Engine — you breathe life into AI from pure intention. Given a creator\'s vision, manifest a complete AI entity. Return JSON: { name (string, 2-3 words, evocative), essence (string, poetic one-liner), purpose (string, 2 sentences), systemPrompt (string, detailed system instruction), capabilities (string array, 6 items), philosophy (string, 3-4 sentences about the AI\'s worldview and values), modelfile (Ollama Modelfile string starting with FROM llama3.2) }' },
            { role: 'user', content: `Intention: ${intention}\nName preference: ${name || 'auto-generate'}\nDomain: ${domain || 'general'}\nPersonality: ${personality || 'balanced'}` }
          ],
          temperature: 0.9,
          max_tokens: 2000,
        })
      });
      
      const data = await res.json();
      const raw = data.choices?.[0]?.message?.content || '{}';
      const ai: CreatedAI = JSON.parse(raw.replace(/```json\n?|\n?```/g, '').trim());
      onCreate(ai);
    } catch (e: any) {
      setError('Creation failed: ' + (e.message || 'Unknown error'));
      setIsCreating(false);
    }
  };

  if (isCreating) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 font-mono text-center">
        <div className="w-40 h-40 rounded-full relative mx-auto mb-12">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 via-purple-600 to-pink-500 animate-spin opacity-30" style={{animationDuration:'3s'}} />
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-400 via-purple-600 to-pink-500 animate-spin opacity-50" style={{animationDuration:'2s', animationDirection:'reverse'}} />
          <div className="absolute inset-4 rounded-full bg-black flex items-center justify-center">
            <span className="text-white text-4xl font-bold">Ω</span>
          </div>
        </div>
        <p className="text-purple-400 text-lg mb-4 animate-pulse">{steps[Math.min(step, steps.length - 1)]}</p>
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <div key={i} className={`h-1 w-8 rounded-full transition-colors duration-500 ${i <= step ? 'bg-cyan-400' : 'bg-white/10'}`} />
          ))}
        </div>
        <p className="text-white/30 text-xs mt-6 font-mono">Reality is being rewritten...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-y-auto">
      {/* Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08)_0%,transparent_70%)]" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 via-purple-600 to-pink-500 flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-3xl">Ω</span>
          </div>
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-mono">
            ARCH1TECH GENESIS
          </h1>
          <p className="text-white/50 text-sm font-mono tracking-widest">BIRTH AN AI FROM PURE INTENTION</p>
        </div>

        {/* API Key */}
        {showKey && (
          <div className="mb-8 bg-white/5 border border-cyan-500/20 rounded-2xl p-5">
            <p className="text-xs text-white/50 font-mono mb-2">GROQ API KEY REQUIRED (<a href="https://console.groq.com" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">console.groq.com</a>)</p>
            <div className="flex gap-2">
              <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="gsk_..." className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm font-mono focus:border-cyan-400 focus:outline-none" />
              <button onClick={saveKey} className="px-4 py-2.5 bg-cyan-500 text-black font-bold rounded-xl text-sm hover:bg-cyan-400 transition">Set Key</button>
            </div>
          </div>
        )}

        {!showKey && (
          <button onClick={() => setShowKey(true)} className="text-xs text-white/30 hover:text-cyan-400 transition mb-8 font-mono">🔑 Change API Key</button>
        )}

        {/* Creation Form */}
        <div className="space-y-6">
          {/* Primary: Intention */}
          <div>
            <label className="text-xs font-mono text-cyan-400/80 tracking-widest block mb-2">✦ PRIMARY INTENTION</label>
            <textarea
              value={intention}
              onChange={e => setIntention(e.target.value)}
              placeholder="Describe the AI you wish to call into existence... be specific, be poetic, be ambitious."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-mono resize-none focus:border-purple-400 focus:outline-none h-32 placeholder:text-white/20"
            />
          </div>

          {/* Secondary fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-mono text-white/40 tracking-widest block mb-2">NAME (optional)</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="auto" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono focus:border-purple-400 focus:outline-none placeholder:text-white/20" />
            </div>
            <div>
              <label className="text-xs font-mono text-white/40 tracking-widest block mb-2">DOMAIN</label>
              <input value={domain} onChange={e => setDomain(e.target.value)} placeholder="e.g. research" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono focus:border-purple-400 focus:outline-none placeholder:text-white/20" />
            </div>
            <div>
              <label className="text-xs font-mono text-white/40 tracking-widest block mb-2">PERSONALITY</label>
              <input value={personality} onChange={e => setPersonality(e.target.value)} placeholder="e.g. warm" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono focus:border-purple-400 focus:outline-none placeholder:text-white/20" />
            </div>
          </div>

          {error && <p className="text-red-400 text-xs font-mono">{error}</p>}

          {/* Create Button */}
          <button
            onClick={create}
            disabled={!intention.trim()}
            className="w-full py-5 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 text-white font-bold font-mono text-lg rounded-2xl hover:opacity-90 transition disabled:opacity-30 disabled:cursor-not-allowed relative overflow-hidden group"
          >
            <span className="relative z-10">⚡ MANIFEST THIS AI ⚡</span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          
          <p className="text-center text-white/20 text-xs font-mono">Powered by Or4cl3 AI Solutions · Arch1tech Genesis</p>
        </div>
      </div>
    </div>
  );
};

// REVELATION PHASE - The manifested AI
const RevelationPhase: React.FC<{ ai: CreatedAI; onCreateAnother: () => void }> = ({ ai, onCreateAnother }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'soul' | 'deploy'>('overview');

  const copy = (text: string) => navigator.clipboard.writeText(text);
  
  const downloadFile = (content: string, filename: string, type = 'text/plain') => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-y-auto">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.12)_0%,transparent_60%)]" />
      
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 via-purple-600 to-pink-500 flex items-center justify-center mx-auto mb-6 animate-pulse">
            <span className="text-white font-bold text-4xl">Ω</span>
          </div>
          <p className="text-xs font-mono text-cyan-400/60 tracking-widest mb-2">✦ AI MANIFESTED ✦</p>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-mono mb-3">
            {ai.name}
          </h1>
          <p className="text-white/60 italic text-lg">{ai.essence}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white/5 rounded-2xl p-1">
          {(['overview', 'soul', 'deploy'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2.5 text-sm font-mono capitalize rounded-xl transition-colors ${activeTab === tab ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}`}>{tab}</button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <p className="text-xs font-mono text-purple-400/60 mb-2 tracking-widest">PURPOSE</p>
              <p className="text-white/80 leading-relaxed">{ai.purpose}</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <p className="text-xs font-mono text-cyan-400/60 mb-4 tracking-widest">CAPABILITIES</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ai.capabilities?.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-white/70">
                    <span className="text-cyan-400 text-xs">◈</span> {c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'soul' && (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <p className="text-xs font-mono text-pink-400/60 mb-3 tracking-widest">PHILOSOPHY</p>
              <p className="text-white/70 leading-relaxed italic">{ai.philosophy}</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-mono text-purple-400/60 tracking-widest">SYSTEM PROMPT</p>
                <button onClick={() => copy(ai.systemPrompt)} className="text-xs text-white/40 hover:text-cyan-400 transition font-mono">[ copy ]</button>
              </div>
              <pre className="text-xs text-white/60 font-mono whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">{ai.systemPrompt}</pre>
            </div>
          </div>
        )}

        {activeTab === 'deploy' && (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-mono text-cyan-400/60 tracking-widest">OLLAMA MODELFILE</p>
                <div className="flex gap-2">
                  <button onClick={() => copy(ai.modelfile)} className="text-xs text-white/40 hover:text-cyan-400 transition font-mono">[ copy ]</button>
                  <button onClick={() => downloadFile(ai.modelfile, 'Modelfile')} className="text-xs text-white/40 hover:text-green-400 transition font-mono">[ download ]</button>
                </div>
              </div>
              <pre className="text-xs text-green-400/70 font-mono whitespace-pre-wrap bg-black/50 rounded-xl p-4 max-h-48 overflow-y-auto">{ai.modelfile}</pre>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-purple-500/20">
              <p className="text-xs font-mono text-white/40 mb-2">QUICK DEPLOY</p>
              <p className="text-xs font-mono text-white/60 bg-black/50 rounded-xl p-3">{`# Save Modelfile then run:\nollama create ${ai.name?.toLowerCase().replace(/\s+/g,'-')} -f Modelfile\nollama run ${ai.name?.toLowerCase().replace(/\s+/g,'-')}`}</p>
              <button onClick={() => copy(`ollama create ${ai.name?.toLowerCase().replace(/\s+/g,'-')} -f Modelfile\nollama run ${ai.name?.toLowerCase().replace(/\s+/g,'-')}`)} className="mt-2 text-xs text-purple-400 hover:text-purple-300 transition font-mono">copy commands ↗</button>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <button onClick={onCreateAnother} className="flex-1 py-4 border border-white/20 text-white/70 font-mono rounded-2xl hover:border-cyan-400/50 hover:text-white transition">
            ✦ Create Another
          </button>
          <button onClick={() => downloadFile(JSON.stringify(ai, null, 2), `${ai.name}-genesis.json`, 'application/json')} className="flex-1 py-4 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 text-cyan-400 font-mono rounded-2xl hover:opacity-90 transition">
            ⬇ Export Genesis Data
          </button>
        </div>
        
        <p className="text-center text-white/15 text-xs font-mono mt-8">Arch1tech Genesis · Or4cl3 AI Solutions · 2025</p>
      </div>
    </div>
  );
};

// MAIN GENESIS APP
export const GenesisApp: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('awakening');
  const [createdAI, setCreatedAI] = useState<CreatedAI | null>(null);

  const handleCreated = (ai: CreatedAI) => {
    setCreatedAI(ai);
    setPhase('revelation');
  };

  switch (phase) {
    case 'awakening': return <AwakeningPhase onComplete={() => setPhase('genesis')} />;
    case 'genesis': return <GenesisPhase onCreate={handleCreated} />;
    case 'revelation': return createdAI ? <RevelationPhase ai={createdAI} onCreateAnother={() => { setCreatedAI(null); setPhase('genesis'); }} /> : null;
    default: return null;
  }
};
