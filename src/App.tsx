import React, { useState } from 'react';
import { PageTab } from './types';
import { Sidebar } from './components/Sidebar';
import { HomeView } from './components/HomeView';
import { SortingVisualizer } from './components/SortingVisualizer';
import { SearchingVisualizer } from './components/SearchingVisualizer';
import { AlgorithmInfoView } from './components/AlgorithmInfoView';
import { ComplexityView } from './components/ComplexityView';
import { ProjectFilesView } from './components/ProjectFilesView';
import {
  Menu,
  Terminal,
  FolderGit2,
  Sparkles,
  BarChart2,
  Search,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Sidebar (Desktop + Mobile Drawer) */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        isOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-72 transition-all">
        {/* Top Navbar */}
        <header className="sticky top-0 z-20 bg-[#080b12]/90 backdrop-blur-md border-b border-indigo-500/15 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span>DSA Sorting &amp; Searching Visualizer</span>
                <span className="hidden sm:inline-flex items-center text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                  v1.0.0
                </span>
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">
                Understand algorithms through interactive visualization.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('sorting')}
              className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all ${
                activeTab === 'sorting'
                  ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Sorting</span>
            </button>

            <button
              onClick={() => setActiveTab('searching')}
              className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all ${
                activeTab === 'searching'
                  ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-purple-400" />
              <span>Searching</span>
            </button>

            <button
              onClick={() => setActiveTab('project-files')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600/15 hover:bg-indigo-600/25 border border-indigo-500/30 text-indigo-300 text-xs font-medium cursor-pointer transition-all"
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export Python ZIP</span>
              <span className="sm:hidden">Export</span>
            </button>
          </div>
        </header>

        {/* View Switcher Container */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'home' && <HomeView onNavigate={(tab) => setActiveTab(tab)} />}
          {activeTab === 'sorting' && <SortingVisualizer />}
          {activeTab === 'searching' && <SearchingVisualizer />}
          {activeTab === 'algorithm-info' && <AlgorithmInfoView />}
          {activeTab === 'complexity-comparison' && <ComplexityView />}
          {activeTab === 'project-files' && <ProjectFilesView />}
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-slate-800/80 bg-[#080b12] px-4 sm:px-8 py-5 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">DSA Sorting &amp; Searching Visualizer</span>
            <span>•</span>
            <span>Created by: <strong className="text-slate-300">Abhijit Pawar</strong></span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Python &amp; Streamlit &bull; TypeScript &bull; Plotly</span>
            <span>•</span>
            <span className="text-indigo-400">Computer Engineering DSA Portfolio</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
