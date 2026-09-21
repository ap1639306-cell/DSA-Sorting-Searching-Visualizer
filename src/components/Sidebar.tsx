import React from 'react';
import { PageTab } from '../types';
import { Home, BarChart2, Search, BookOpen, Layers, FolderGit2, Sparkles } from 'lucide-react';

interface SidebarProps {
  activeTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpen,
  onCloseMobile,
}) => {
  const navItems = [
    { id: 'home' as PageTab, label: 'Home', icon: Home, badge: null },
    { id: 'sorting' as PageTab, label: 'Sorting', icon: BarChart2, badge: '5 Algos' },
    { id: 'searching' as PageTab, label: 'Searching', icon: Search, badge: '2 Algos' },
    { id: 'algorithm-info' as PageTab, label: 'Algorithm Information', icon: BookOpen, badge: null },
    { id: 'complexity-comparison' as PageTab, label: 'Complexity Comparison', icon: Layers, badge: null },
    { id: 'project-files' as PageTab, label: 'GitHub Project Code & ZIP', icon: FolderGit2, badge: 'Export' },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 bg-[#080b12] border-r border-indigo-500/15 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-indigo-500/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                DSA Visualizer
              </h2>
              <p className="text-xs text-slate-400">Interactive Studio</p>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <div className="px-3 py-1 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
            Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600/20 to-purple-600/10 text-indigo-300 border border-indigo-500/30 shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40 border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-indigo-400' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono uppercase ${
                      isActive
                        ? 'bg-indigo-500/30 text-indigo-200'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Attribution Card */}
        <div className="p-4 m-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400">
          <p className="font-semibold text-slate-300 mb-1 flex items-center gap-1">
            <span>Portfolio Project</span>
          </p>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Computer Engineering portfolio project for learning Data Structures & Algorithms.
          </p>
          <div className="mt-2.5 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Author:</span>
            <span className="text-indigo-400 font-semibold">Abhijit Pawar</span>
          </div>
        </div>
      </aside>
    </>
  );
};
