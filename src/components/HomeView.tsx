import React from 'react';
import { PageTab } from '../types';
import { BarChart2, Search, Layers, ArrowRight, CheckCircle2, Terminal } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: PageTab) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Intro text */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/20 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
            Computer Engineering Algorithm Suite
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
            Understand Algorithms through Interactive Visuals
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
            Designed specifically for Computer Engineering students mastering Data Structures & Algorithms.
            Observe real-time comparisons, swap mechanics, divide-and-conquer partitions, and binary search ranges
            with step-by-step control and Big-O theoretical analysis.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('sorting')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              <BarChart2 className="w-4 h-4" />
              <span>Explore Sorting</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
            <button
              onClick={() => onNavigate('searching')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-200 font-medium text-sm transition-all cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Explore Searching</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
        {/* Subtle decorative glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* 3 Core Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* CARD 1: SORTING */}
        <div className="group p-6 rounded-2xl bg-[#111827] border border-indigo-500/20 hover:border-indigo-500/50 transition-all duration-200 flex flex-col justify-between shadow-lg shadow-black/40">
          <div>
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-105 transition-transform">
              <BarChart2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-wide uppercase mb-2">
              SORTING
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              "Visualize how sorting algorithms rearrange data."
            </p>
            <ul className="space-y-1.5 text-xs text-slate-400 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Bubble Sort, Selection Sort, Insertion Sort</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Merge Sort &amp; Quick Sort</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Real-time comparison and swap tracking</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => onNavigate('sorting')}
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-600/15 hover:bg-indigo-600/25 border border-indigo-500/30 text-indigo-300 font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore Sorting</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* CARD 2: SEARCHING */}
        <div className="group p-6 rounded-2xl bg-[#111827] border border-purple-500/20 hover:border-purple-500/50 transition-all duration-200 flex flex-col justify-between shadow-lg shadow-black/40">
          <div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-105 transition-transform">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-wide uppercase mb-2">
              SEARCHING
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              "Understand how searching algorithms find elements."
            </p>
            <ul className="space-y-1.5 text-xs text-slate-400 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Linear Search ($O(n)$ sequential verification)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Binary Search ($O(\log n)$ Low/Mid/High pointers)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Automatic sort validation guardrails</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => onNavigate('searching')}
            className="w-full py-2.5 px-4 rounded-xl bg-purple-600/15 hover:bg-purple-600/25 border border-purple-500/30 text-purple-300 font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore Searching</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* CARD 3: COMPLEXITY */}
        <div className="group p-6 rounded-2xl bg-[#111827] border border-blue-500/20 hover:border-blue-500/50 transition-all duration-200 flex flex-col justify-between shadow-lg shadow-black/40">
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-105 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-wide uppercase mb-2">
              COMPLEXITY
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              "Compare time and space complexity."
            </p>
            <ul className="space-y-1.5 text-xs text-slate-400 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Best, Average, and Worst Case Big-O</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Auxiliary space requirements analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Stability and practical trade-off guide</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => onNavigate('complexity-comparison')}
            className="w-full py-2.5 px-4 rounded-xl bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/30 text-blue-300 font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore Complexity</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* GitHub Command Box Preview */}
      <div className="p-5 rounded-2xl bg-[#0e1320] border border-slate-800 text-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-slate-300 font-mono text-xs">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span>Python &amp; Streamlit Local Execution</span>
          </div>
          <button
            onClick={() => onNavigate('project-files')}
            className="text-xs text-indigo-400 hover:text-indigo-300 underline font-medium cursor-pointer"
          >
            View Code &amp; Export ZIP
          </button>
        </div>
        <div className="p-3.5 rounded-xl bg-black/60 font-mono text-xs text-emerald-400 border border-slate-800/80 overflow-x-auto">
          <code>pip install -r requirements.txt &amp;&amp; streamlit run app.py</code>
        </div>
      </div>
    </div>
  );
};
