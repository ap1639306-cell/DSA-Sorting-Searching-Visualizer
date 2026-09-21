import React from 'react';
import { COMPLEXITY_TABLE_DATA } from '../data/algorithmsData';
import { Layers, Lightbulb, ShieldCheck, Cpu } from 'lucide-react';

export const ComplexityView: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b border-indigo-500/20 pb-4">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Layers className="w-6 h-6 text-indigo-400" />
          <span>Complexity Comparison Matrix</span>
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
          Theoretical asymptotic Big-O runtime bounds and auxiliary space complexity according to formal DSA definitions.
        </p>
      </div>

      {/* Table Card */}
      <div className="rounded-2xl bg-[#111827] border border-indigo-500/20 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-mono border-collapse">
            <thead>
              <tr className="bg-slate-900/90 text-slate-400 text-xs border-b border-slate-800 uppercase tracking-wider">
                <th className="py-3.5 px-4 font-semibold">Algorithm</th>
                <th className="py-3.5 px-3 font-semibold">Type</th>
                <th className="py-3.5 px-3 font-semibold text-emerald-400">Best Case</th>
                <th className="py-3.5 px-3 font-semibold text-amber-400">Average Case</th>
                <th className="py-3.5 px-3 font-semibold text-rose-400">Worst Case</th>
                <th className="py-3.5 px-3 font-semibold text-indigo-400">Space</th>
                <th className="py-3.5 px-3 font-semibold text-slate-300">Stable?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs sm:text-sm">
              {COMPLEXITY_TABLE_DATA.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-indigo-950/20 transition-colors"
                >
                  <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                    {row.algorithm}
                  </td>
                  <td className="py-3 px-3 text-slate-400 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-sans ${
                        row.type === 'Sorting'
                          ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30'
                          : 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                      }`}
                    >
                      {row.type}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-emerald-300 font-semibold whitespace-nowrap">
                    {row.best}
                  </td>
                  <td className="py-3 px-3 text-amber-300 font-semibold whitespace-nowrap">
                    {row.average}
                  </td>
                  <td className="py-3 px-3 text-rose-300 font-semibold whitespace-nowrap">
                    {row.worst}
                  </td>
                  <td className="py-3 px-3 text-indigo-300 font-semibold whitespace-nowrap">
                    {row.space}
                  </td>
                  <td className="py-3 px-3 text-slate-300 whitespace-nowrap">
                    {row.stable}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Practical Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-6 rounded-2xl bg-[#111827] border border-indigo-500/20 shadow-md space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <Lightbulb className="w-4 h-4" />
            <span>When to use which sorting algorithm</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 font-bold">•</span>
              <span>
                <strong className="text-white">Insertion Sort</strong> is optimal for small arrays ($N \le 20$) or nearly-sorted datasets where it executes in near-linear $O(n)$ time with zero recursive call stack.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 font-bold">•</span>
              <span>
                <strong className="text-white">Merge Sort</strong> is the industry standard for stable sorting with guaranteed $O(n \log n)$ performance, commonly used in external sorting and linked lists.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 font-bold">•</span>
              <span>
                <strong className="text-white">Quick Sort</strong> is typically 2-3x faster in practice than Merge Sort due to superb CPU cache locality, making it the default in standard libraries (Dual-Pivot Quicksort, Introsort).
              </span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-[#111827] border border-purple-500/20 shadow-md space-y-3">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
            <Cpu className="w-4 h-4" />
            <span>Search Paradigm Selection</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 font-bold">•</span>
              <span>
                <strong className="text-white">Linear Search</strong> requires zero preprocessing and operates on arbitrary, unsorted sequences or streams where sorting cost would exceed search savings.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 font-bold">•</span>
              <span>
                <strong className="text-white">Binary Search</strong> cuts candidate ranges by 50% at each comparison ($O(\log n)$), locating an element in 1,000,000 items in $\le 20$ comparisons.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 font-bold">•</span>
              <span>
                <strong className="text-white">Rule of Thumb</strong>: If performing multiple queries on a static dataset, sort once in $O(n \log n)$ and then answer subsequent searches in $O(\log n)$.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
