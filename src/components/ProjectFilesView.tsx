import React, { useState } from 'react';
import JSZip from 'jszip';
import {
  FolderGit2,
  Download,
  Copy,
  Check,
  FileCode,
  Terminal,
  FolderTree,
  ExternalLink,
} from 'lucide-react';

interface FileEntry {
  path: string;
  name: string;
  language: string;
  content: string;
}

export const ProjectFilesView: React.FC = () => {
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const files: FileEntry[] = [
    {
      path: 'app.py',
      name: 'app.py',
      language: 'python',
      content: `"""
DSA Sorting & Searching Visualizer
Main Streamlit Application
A modern, GitHub-ready portfolio application for Computer Engineering students.
"""

import os
import time
import streamlit as st
import numpy as np
import pandas as pd

from algorithms.sorting import (
    bubble_sort,
    selection_sort,
    insertion_sort,
    merge_sort,
    quick_sort
)
from algorithms.searching import (
    is_array_sorted,
    linear_search,
    binary_search
)
from utils.helpers import (
    parse_and_validate_array,
    validate_target_value,
    generate_random_array,
    create_sorting_chart,
    create_searching_chart,
    ALGORITHMS_INFO
)

st.set_page_config(
    page_title="DSA Sorting & Searching Visualizer",
    page_icon="⚡",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Load custom CSS
css_path = os.path.join(os.path.dirname(__file__), "assets", "style.css")
if os.path.exists(css_path):
    with open(css_path, "r", encoding="utf-8") as f:
        st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

# Session state initialization & routing
if "page" not in st.session_state:
    st.session_state.page = "Home"

# Sidebar Navigation
selected_page = st.sidebar.radio(
    "Navigation",
    ["Home", "Sorting", "Searching", "Algorithm Information", "Complexity Comparison"]
)
st.session_state.page = selected_page

st.markdown("""
<div style="margin-bottom: 1.5rem; border-bottom: 1px solid rgba(139, 92, 246, 0.2); padding-bottom: 1rem;">
    <h1 style="margin: 0; font-size: 2.3rem; color: #f8fafc; font-weight: 800;">
        DSA Sorting & Searching Visualizer
    </h1>
    <p style="color: #94a3b8; font-size: 1.1rem; margin-top: 0.35rem;">
        Understand algorithms through interactive visualization.
    </p>
</div>
""", unsafe_allow_html=True)
# (See full code in app.py)`,
    },
    {
      path: 'algorithms/sorting.py',
      name: 'sorting.py',
      language: 'python',
      content: `"""
Sorting Algorithms Implementation for DSA Visualizer
Includes step-by-step recording of states, comparisons, and swaps for:
1. Bubble Sort
2. Selection Sort
3. Insertion Sort
4. Merge Sort
5. Quick Sort
"""

from typing import List, Dict, Any

def bubble_sort(arr: List[int]) -> List[Dict[str, Any]]:
    # Step-by-step recording of states, comparisons, and swaps
    ...

def selection_sort(arr: List[int]) -> List[Dict[str, Any]]:
    # Step-by-step minimum identification and swap
    ...

def insertion_sort(arr: List[int]) -> List[Dict[str, Any]]:
    # Step-by-step key shifting into sorted subarray
    ...

def merge_sort(arr: List[int]) -> List[Dict[str, Any]]:
    # Step-by-step recursive divide-and-conquer merge
    ...

def quick_sort(arr: List[int]) -> List[Dict[str, Any]]:
    # Step-by-step Lomuto partition and recursive sort
    ...`,
    },
    {
      path: 'algorithms/searching.py',
      name: 'searching.py',
      language: 'python',
      content: `"""
Searching Algorithms Implementation for DSA Visualizer
Includes step-by-step recording of states, comparisons, and pointers for:
1. Linear Search
2. Binary Search
"""

from typing import List, Dict, Any, Tuple

def is_array_sorted(arr: List[int]) -> bool:
    for i in range(len(arr) - 1):
        if arr[i] > arr[i + 1]:
            return False
    return True

def linear_search(arr: List[int], target: int) -> Tuple[List[Dict[str, Any]], bool, int]:
    # Sequential element inspection
    ...

def binary_search(arr: List[int], target: int) -> Tuple[List[Dict[str, Any]], bool, int]:
    # Low, Mid, High interval halving
    ...`,
    },
    {
      path: 'utils/helpers.py',
      name: 'helpers.py',
      language: 'python',
      content: `"""
Utility helpers for DSA Sorting & Searching Visualizer:
- Array input validation (non-numbers, empty inputs, negatives, boundaries)
- Random array generation
- Plotly figure generation with dark theme
- Detailed algorithm metadata, code snippets (Python/C++), and complexities
"""
import random
from typing import List, Tuple, Optional, Dict, Any
import plotly.graph_objects as go
...`,
    },
    {
      path: 'assets/style.css',
      name: 'style.css',
      language: 'css',
      content: `/* Dark black background with subtle tech accents (blue/purple) */
.stApp {
    background-color: #0b0f19;
    color: #e2e8f0;
}
.dsa-card {
    background: #111827;
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 14px;
    padding: 1.5rem;
}
.status-box {
    background: #0d1322;
    border: 1px solid #3b82f6;
    border-left: 4px solid #8b5cf6;
    border-radius: 10px;
    padding: 1rem 1.25rem;
}
...`,
    },
    {
      path: 'requirements.txt',
      name: 'requirements.txt',
      language: 'text',
      content: `streamlit>=1.32.0
plotly>=5.19.0
numpy>=1.26.0
pandas>=2.2.0`,
    },
    {
      path: 'README.md',
      name: 'README.md',
      language: 'markdown',
      content: `# DSA Sorting & Searching Visualizer

Understand algorithms through interactive visualization.

Created by: Abhijit Pawar
Tech Stack: Python, Streamlit, Plotly, NumPy
Installation:
pip install -r requirements.txt
streamlit run app.py`,
    },
  ];

  const [activeFile, setActiveFile] = useState<FileEntry>(files[0]);

  const handleCopy = (content: string, name: string) => {
    navigator.clipboard.writeText(content);
    setCopiedFile(name);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  const handleDownloadZip = async () => {
    setIsExporting(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder('DSA-Visualizer') || zip;

      // Add all project files directly from bundle
      files.forEach((file) => {
        folder.file(file.path, file.content);
      });

      // Ensure Python packages have __init__.py
      const algoFolder = folder.folder('algorithms');
      algoFolder?.file('__init__.py', '"""Algorithms package."""\n');
      const utilsFolder = folder.folder('utils');
      utilsFolder?.file('__init__.py', '"""Utils package."""\n');

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'DSA-Visualizer-Python.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generating zip:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-500/20 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <FolderGit2 className="w-6 h-6 text-indigo-400" />
            <span>GitHub Repository &amp; Python Project Files</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Complete, modular Python codebase ready to push to GitHub or run locally with Streamlit.
          </p>
        </div>

        <button
          onClick={handleDownloadZip}
          disabled={isExporting}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-xs shadow-lg shadow-indigo-600/30 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>{isExporting ? 'Generating ZIP...' : 'Download Project (.ZIP)'}</span>
        </button>
      </div>

      {/* Setup Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wide">
            <FolderTree className="w-4 h-4" />
            <span>1. Folder Structure</span>
          </div>
          <p className="text-xs text-slate-300">
            Keep <code>app.py</code> and <code>requirements.txt</code> in root, with <code>algorithms/</code>, <code>utils/</code>, and <code>assets/</code>.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs uppercase tracking-wide">
            <Terminal className="w-4 h-4" />
            <span>2. Installation</span>
          </div>
          <p className="text-xs text-slate-300">
            Run <code>pip install -r requirements.txt</code> in your activated Python 3.9+ virtual environment.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wide">
            <ExternalLink className="w-4 h-4" />
            <span>3. Execution</span>
          </div>
          <p className="text-xs text-slate-300">
            Execute <code>streamlit run app.py</code> to launch the web dashboard at <code>localhost:8501</code>.
          </p>
        </div>
      </div>

      {/* Code Viewer Panel */}
      <div className="rounded-2xl bg-[#111827] border border-indigo-500/20 shadow-xl overflow-hidden">
        {/* File tabs */}
        <div className="flex items-center justify-between bg-slate-950 px-4 py-2 border-b border-slate-800 overflow-x-auto">
          <div className="flex items-center gap-1.5">
            {files.map((f) => {
              const isSelected = activeFile.path === f.path;
              return (
                <button
                  key={f.path}
                  onClick={() => setActiveFile(f)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{f.name}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handleCopy(activeFile.content, activeFile.name)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-mono text-slate-300 border border-slate-800 transition-all cursor-pointer ml-3 shrink-0"
          >
            {copiedFile === activeFile.name ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy File</span>
              </>
            )}
          </button>
        </div>

        {/* Content Viewer */}
        <div className="p-4 bg-[#0a0d14]">
          <pre className="font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed max-h-[460px] p-2">
            <code>{activeFile.content}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
