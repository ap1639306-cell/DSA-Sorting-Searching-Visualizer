import React, { useState } from 'react';
import { ALGORITHMS_DATA } from '../data/algorithmsData';
import { BookOpen, CheckCircle2, Code2 } from 'lucide-react';

export const AlgorithmInfoView: React.FC = () => {
  const algoKeys = Object.keys(ALGORITHMS_DATA);
  const [selectedKey, setSelectedKey] = useState<string>(algoKeys[0]);
  const [activeCodeTab, setActiveCodeTab] = useState<'python' | 'cpp' | 'pseudo'>('python');

  const meta = ALGORITHMS_DATA[selectedKey];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b border-indigo-500/20 pb-4">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-indigo-400" />
          <span>Algorithm Information Catalog</span>
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
          Detailed descriptions, step-by-step mechanics, pseudocode, Python/C++ implementations, and Big-O bounds.
        </p>
      </div>

      {/* Select algorithm tabs */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-800">
        {algoKeys.map((name) => {
          const isSelected = selectedKey === name;
          return (
            <button
              key={name}
              onClick={() => setSelectedKey(name)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {name}
            </button>
          );
        })}
      </div>

      {/* Main Algorithm Detail Card */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#111827] border border-indigo-500/20 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-semibold">
              {meta.type.toUpperCase()} ALGORITHM
            </span>
            <h3 className="text-2xl font-bold text-white mt-0.5">{meta.name}</h3>
          </div>
          {/* Complexity metric pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[11px]">Best</span>
              <div className="text-emerald-400 font-mono font-bold">{meta.bestTime}</div>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[11px]">Average</span>
              <div className="text-amber-400 font-mono font-bold">{meta.avgTime}</div>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[11px]">Worst</span>
              <div className="text-rose-400 font-mono font-bold">{meta.worstTime}</div>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[11px]">Space</span>
              <div className="text-indigo-400 font-mono font-bold">{meta.space}</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Description
          </h4>
          <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            {meta.description}
          </p>
        </div>

        {/* Working step by step */}
        <div>
          <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Working (Step-by-Step)
          </h4>
          <div className="space-y-2">
            {meta.working.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/60 text-xs text-slate-300"
              >
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Code Tabs */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span>Source &amp; Pseudocode</span>
            </h4>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveCodeTab('python')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activeCodeTab === 'python'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                Python
              </button>
              <button
                onClick={() => setActiveCodeTab('cpp')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activeCodeTab === 'cpp'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                C++
              </button>
              <button
                onClick={() => setActiveCodeTab('pseudo')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activeCodeTab === 'pseudo'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                Pseudocode
              </button>
            </div>
          </div>

          <pre className="p-4 rounded-xl bg-black/70 font-mono text-xs text-indigo-200 overflow-x-auto border border-slate-800 leading-relaxed shadow-inner">
            <code>
              {activeCodeTab === 'python' && meta.pythonCode}
              {activeCodeTab === 'cpp' && meta.cppCode}
              {activeCodeTab === 'pseudo' && meta.pseudocode}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
