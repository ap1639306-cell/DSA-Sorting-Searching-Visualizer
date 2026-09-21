import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { SearchingAlgorithmType, SearchingStep } from '../types';
import {
  runLinearSearch,
  runBinarySearch,
  isArraySorted,
} from '../algorithms/searchingEngine';
import { ALGORITHMS_DATA } from '../data/algorithmsData';
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  AlertCircle,
  HelpCircle,
  Code2,
} from 'lucide-react';

export const SearchingVisualizer: React.FC = () => {
  // Input array & target
  const [arrayInput, setArrayInput] = useState<string>('10, 20, 30, 40, 50, 60, 70');
  const [currentArray, setCurrentArray] = useState<number[]>([10, 20, 30, 40, 50, 60, 70]);
  const [targetInput, setTargetInput] = useState<string>('40');
  const [targetVal, setTargetVal] = useState<number>(40);
  const [inputError, setInputError] = useState<string | null>(null);

  // Search Algorithm selection
  const [selectedAlgo, setSelectedAlgo] = useState<SearchingAlgorithmType>('Linear Search');

  // Binary search auto-sort option
  const [autoSort, setAutoSort] = useState<boolean>(true);

  // Execution steps
  const [steps, setSteps] = useState<SearchingStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedDelay, setSpeedDelay] = useState<number>(400);
  const [searchResult, setSearchResult] = useState<{ found: boolean; index: number } | null>(null);

  // Code modal
  const [showCode, setShowCode] = useState<boolean>(false);
  const [codeLang, setCodeLang] = useState<'python' | 'cpp'>('python');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Recompute search steps
  const computeSearchSteps = (arr: number[], target: number, algo: SearchingAlgorithmType) => {
    let finalArray = [...arr];
    if (algo === 'Binary Search' && !isArraySorted(finalArray) && autoSort) {
      finalArray.sort((a, b) => a - b);
      setCurrentArray(finalArray);
      setArrayInput(finalArray.join(', '));
    }

    let resultSteps: SearchingStep[] = [];
    let isFound = false;
    let foundIdx = -1;

    if (algo === 'Linear Search') {
      const res = runLinearSearch(finalArray, target);
      resultSteps = res.steps;
      isFound = res.found;
      foundIdx = res.foundIndex;
    } else {
      const res = runBinarySearch(finalArray, target);
      resultSteps = res.steps;
      isFound = res.found;
      foundIdx = res.foundIndex;
    }

    setSteps(resultSteps);
    setCurrentStepIdx(0);
    setIsPlaying(false);
    setSearchResult({ found: isFound, index: foundIdx });
  };

  useEffect(() => {
    computeSearchSteps(currentArray, targetVal, selectedAlgo);
  }, [selectedAlgo, targetVal]);

  // Handle animation loop
  useEffect(() => {
    if (isPlaying) {
      if (currentStepIdx < steps.length - 1) {
        timerRef.current = setTimeout(() => {
          setCurrentStepIdx((prev) => {
            const next = prev + 1;
            if (next === steps.length - 1) {
              setIsPlaying(false);
              if (searchResult?.found) {
                confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
              }
            }
            return next;
          });
        }, speedDelay);
      } else {
        setIsPlaying(false);
      }
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStepIdx, steps.length, speedDelay, searchResult]);

  // Manual Array Apply
  const handleApplyArray = () => {
    setInputError(null);
    if (!arrayInput.trim()) {
      setInputError('Input is empty. Please enter numbers separated by commas.');
      return;
    }
    const items = arrayInput.split(',').map((x) => x.trim()).filter(Boolean);
    const parsed: number[] = [];
    for (const item of items) {
      const n = Number(item);
      if (isNaN(n) || !Number.isInteger(n)) {
        setInputError(`Invalid input '${item}'. Please enter valid numbers separated by commas.`);
        return;
      }
      parsed.push(n);
    }
    const t = Number(targetInput);
    if (isNaN(t) || !Number.isInteger(t)) {
      setInputError(`Invalid target '${targetInput}'. Please enter an integer value.`);
      return;
    }

    setCurrentArray(parsed);
    setTargetVal(t);
    computeSearchSteps(parsed, t, selectedAlgo);
  };

  const handleApplyTarget = (e: React.FormEvent) => {
    e.preventDefault();
    const t = Number(targetInput);
    if (isNaN(t) || !Number.isInteger(t)) {
      setInputError(`Invalid target '${targetInput}'. Please enter an integer value.`);
      return;
    }
    setTargetVal(t);
    computeSearchSteps(currentArray, t, selectedAlgo);
  };

  const handleSortArray = () => {
    const sorted = [...currentArray].sort((a, b) => a - b);
    setCurrentArray(sorted);
    setArrayInput(sorted.join(', '));
    computeSearchSteps(sorted, targetVal, selectedAlgo);
  };

  // Playback handlers
  const handleStart = () => {
    if (currentStepIdx >= steps.length - 1) {
      setCurrentStepIdx(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleNextStep = () => {
    setIsPlaying(false);
    if (currentStepIdx < steps.length - 1) {
      const nextIdx = currentStepIdx + 1;
      setCurrentStepIdx(nextIdx);
      if (nextIdx === steps.length - 1 && searchResult?.found) {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.85 } });
      }
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
  };

  const currentStep = steps[currentStepIdx] || {
    array: currentArray,
    current: -1,
    found: false,
    foundIndex: -1,
    comparisons: 0,
    action: 'Ready',
    details: 'Click Start or Next Step to begin search',
  };

  const isCompleted = currentStepIdx === steps.length - 1 && steps.length > 0;
  const arraySorted = isArraySorted(currentArray);
  const meta = ALGORITHMS_DATA[selectedAlgo];

  // Visual calculations
  const maxVal = Math.max(...currentArray, 10);
  const minVal = Math.min(...currentArray, 0);
  const range = maxVal - Math.min(0, minVal);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title & Implementation code toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-500/20 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Searching Algorithms Visualizer</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Sequential linear inspection and divide-and-conquer binary search with pointer tracing.
          </p>
        </div>
        <button
          onClick={() => setShowCode(!showCode)}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-xs font-medium cursor-pointer transition-all self-start sm:self-auto"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>{showCode ? 'Hide Code' : 'View Implementation'}</span>
        </button>
      </div>

      {/* Code Modal */}
      {showCode && (
        <div className="p-5 rounded-2xl bg-slate-900 border border-purple-500/30 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-white">
              {selectedAlgo} Source Implementation
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCodeLang('python')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  codeLang === 'python'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Python
              </button>
              <button
                onClick={() => setCodeLang('cpp')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  codeLang === 'cpp'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                C++
              </button>
            </div>
          </div>
          <pre className="p-4 rounded-xl bg-black/60 font-mono text-xs text-purple-200 overflow-x-auto border border-slate-800 leading-relaxed">
            <code>
              {codeLang === 'python' ? meta.pythonCode : meta.cppCode}
            </code>
          </pre>
        </div>
      )}

      {/* Configuration Box */}
      <div className="p-5 rounded-2xl bg-[#111827] border border-indigo-500/20 shadow-md space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Array Input */}
          <div className="md:col-span-8 space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Input Array (Comma Separated)
            </label>
            <input
              type="text"
              value={arrayInput}
              onChange={(e) => setArrayInput(e.target.value)}
              placeholder="10, 20, 30, 40, 50, 60, 70"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white font-mono text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Target Value Input */}
          <div className="md:col-span-4 space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Target Value
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white font-mono text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                onClick={handleApplyArray}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs cursor-pointer transition-all whitespace-nowrap shadow-xs"
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {inputError && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{inputError}</span>
          </div>
        )}

        {/* Current Active Array & Target */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-indigo-400 font-semibold uppercase">Array:</span>
            <span>[{currentArray.join(', ')}]</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-400 font-semibold uppercase">Target:</span>
            <span className="text-white font-bold bg-purple-500/20 px-2 py-0.5 rounded border border-purple-500/40">
              {targetVal}
            </span>
          </div>
        </div>
      </div>

      {/* Algorithm Selector & Sorted Warning */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-5 space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Select Searching Algorithm
          </label>
          <select
            value={selectedAlgo}
            onChange={(e) => setSelectedAlgo(e.target.value as SearchingAlgorithmType)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-purple-500/30 text-white font-medium text-sm focus:outline-none focus:border-purple-400 transition-colors cursor-pointer"
          >
            <option value="Linear Search">Linear Search</option>
            <option value="Binary Search">Binary Search</option>
          </select>
        </div>

        {/* Complexity badges */}
        <div className="md:col-span-7 flex flex-wrap gap-2 justify-start md:justify-end items-center text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-1.5">
            <span className="text-slate-400">Best:</span>
            <span className="text-emerald-400 font-mono font-semibold">{meta.bestTime}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-1.5">
            <span className="text-slate-400">Average:</span>
            <span className="text-amber-400 font-mono font-semibold">{meta.avgTime}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-1.5">
            <span className="text-slate-400">Worst:</span>
            <span className="text-rose-400 font-mono font-semibold">{meta.worstTime}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-1.5">
            <span className="text-slate-400">Space:</span>
            <span className="text-indigo-400 font-mono font-semibold">{meta.space}</span>
          </div>
        </div>
      </div>

      {/* Binary Search Sorted Alert */}
      {selectedAlgo === 'Binary Search' && !arraySorted && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-200 text-xs sm:text-sm space-y-2">
          <div className="flex items-center gap-2 font-semibold text-amber-300">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>Binary Search requires a sorted array.</span>
          </div>
          <p className="text-amber-200/90 text-xs leading-relaxed">
            Please sort the array first or enable automatic sorting below.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={handleSortArray}
              className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-100 font-medium text-xs transition-all cursor-pointer"
            >
              Sort Array Now
            </button>
            <label className="flex items-center gap-2 text-xs text-amber-200 cursor-pointer">
              <input
                type="checkbox"
                checked={autoSort}
                onChange={(e) => setAutoSort(e.target.checked)}
                className="accent-amber-500"
              />
              <span>Automatically sort before Binary Search</span>
            </label>
          </div>
        </div>
      )}

      {/* Visualization Canvas */}
      <div className="p-6 rounded-2xl bg-[#0f1422] border border-purple-500/25 shadow-xl space-y-5">
        {/* Dynamic Status Box */}
        <div className="p-4 rounded-xl bg-slate-950/80 border-l-4 border-l-purple-500 border border-slate-800 shadow-inner grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider">
              Step
            </span>
            <div className="text-base font-bold text-white mt-0.5">
              {currentStepIdx + 1} / {steps.length || 1}
            </div>
          </div>
          <div>
            <span className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider">
              Action
            </span>
            <div className="text-sm font-semibold text-sky-300 mt-0.5 truncate">
              {currentStep.action}
            </div>
          </div>
          <div>
            <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
              Comparisons
            </span>
            <div className="text-base font-bold text-amber-300 mt-0.5">
              {currentStep.comparisons}
            </div>
          </div>
          <div>
            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
              {selectedAlgo === 'Binary Search' ? 'Pointers' : 'Status'}
            </span>
            <div className="text-xs font-mono text-slate-300 mt-1 truncate">
              {selectedAlgo === 'Binary Search' ? (
                <span>
                  L:{currentStep.low ?? '-'} | M:{currentStep.mid ?? '-'} | H:
                  {currentStep.high ?? '-'}
                </span>
              ) : currentStep.found ? (
                <span className="text-emerald-400 font-bold">FOUND</span>
              ) : (
                <span className="text-slate-400">SEARCHING</span>
              )}
            </div>
          </div>
        </div>

        {/* Step details message */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
          <HelpCircle className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          <span className="font-mono text-purple-200">{currentStep.details}</span>
        </div>

        {/* Bar Visualization Canvas */}
        <div className="h-64 sm:h-72 w-full flex items-end justify-center gap-1.5 sm:gap-2.5 pt-10 px-2 border-b border-slate-800 pb-2 overflow-x-auto">
          {currentStep.array.map((val, idx) => {
            const isTargetMatch = currentStep.foundIndex === idx;
            const isCurrentlyChecked =
              selectedAlgo === 'Linear Search'
                ? currentStep.current === idx
                : currentStep.mid === idx;

            const isOutOfRange =
              selectedAlgo === 'Binary Search' &&
              currentStep.low !== undefined &&
              currentStep.high !== undefined &&
              (idx < currentStep.low || idx > currentStep.high);

            // Compute relative height
            const positiveVal = Math.max(val - minVal + 5, 5);
            const heightPercent = Math.min(Math.max((positiveVal / (range + 10)) * 100, 15), 90);

            let barColor = 'bg-gradient-to-t from-indigo-800 to-indigo-500 border-indigo-400';
            const pointerPills: string[] = [];

            if (selectedAlgo === 'Binary Search') {
              if (idx === currentStep.low) pointerPills.push('LOW');
              if (idx === currentStep.mid) pointerPills.push('MID');
              if (idx === currentStep.high) pointerPills.push('HIGH');
            } else {
              if (idx === currentStep.current) pointerPills.push('CHECKING');
            }

            if (isTargetMatch) {
              barColor = 'bg-gradient-to-t from-emerald-700 to-emerald-400 border-emerald-300';
            } else if (isCurrentlyChecked) {
              barColor = 'bg-gradient-to-t from-amber-700 to-amber-400 border-amber-300';
            } else if (isOutOfRange) {
              barColor = 'bg-slate-800/40 border-slate-800 opacity-30';
            }

            return (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center justify-end h-full max-w-[55px] min-w-[28px] transition-all duration-200"
              >
                {/* Pointer tags */}
                {pointerPills.length > 0 && (
                  <div className="flex flex-col items-center gap-0.5 mb-1">
                    {pointerPills.map((p, pIdx) => (
                      <span
                        key={pIdx}
                        className={`text-[9px] font-mono font-bold px-1 py-0.5 rounded border whitespace-nowrap ${
                          p === 'MID' || p === 'CHECKING'
                            ? 'bg-amber-950 text-amber-300 border-amber-600/60'
                            : 'bg-indigo-950 text-sky-300 border-sky-600/60'
                        }`}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                )}

                {/* Number label */}
                <span
                  className={`text-[11px] sm:text-xs font-mono font-bold mb-1 ${
                    isOutOfRange ? 'text-slate-600' : 'text-white'
                  }`}
                >
                  {val}
                </span>

                {/* Vertical Bar */}
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full rounded-t-lg border-t-2 border-x ${barColor} shadow-md transition-all duration-200`}
                />

                {/* Index label */}
                <span className="text-[10px] font-mono text-slate-500 mt-2">
                  [{idx}]
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-indigo-500 border border-indigo-400"></span>
            <span>Candidate Range</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-amber-400 border border-amber-300"></span>
            <span>Inspecting</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-emerald-400 border border-emerald-300"></span>
            <span>Target Found</span>
          </div>
          {selectedAlgo === 'Binary Search' && (
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-slate-800 border border-slate-700 opacity-40"></span>
              <span>Eliminated Range</span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="pt-2 border-t border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {!isPlaying ? (
                <button
                  onClick={handleStart}
                  disabled={isCompleted}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:pointer-events-none text-white font-medium text-xs transition-all shadow-md shadow-purple-600/20 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start Search</span>
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs transition-all shadow-md shadow-amber-600/20 cursor-pointer"
                >
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pause Search</span>
                </button>
              )}

              <button
                onClick={handleNextStep}
                disabled={isCompleted || isPlaying}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-200 font-medium text-xs border border-slate-700 transition-all cursor-pointer"
              >
                <SkipForward className="w-3.5 h-3.5" />
                <span>Next Step</span>
              </button>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-slate-700 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Speed Slider */}
            <div className="flex items-center gap-3 text-xs text-slate-400 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
              <span>Speed:</span>
              <span className="text-[11px] text-slate-500">Fast</span>
              <input
                type="range"
                min={100}
                max={900}
                step={20}
                value={1000 - speedDelay}
                onChange={(e) => setSpeedDelay(1000 - Number(e.target.value))}
                className="w-24 sm:w-32 accent-purple-500 cursor-pointer"
              />
              <span className="text-[11px] text-slate-500">Slow</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Result Card */}
      {isCompleted && (
        <div
          className={`p-6 rounded-2xl border shadow-xl space-y-3 ${
            searchResult?.found
              ? 'bg-gradient-to-r from-emerald-950/40 via-slate-900 to-emerald-950/40 border-emerald-500/40'
              : 'bg-gradient-to-r from-rose-950/40 via-slate-900 to-rose-950/40 border-rose-500/40'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-lg">
            {searchResult?.found ? (
              <>
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-400">Target Found!</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-rose-400" />
                <span className="text-rose-400">Target Not Found</span>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm font-mono pt-1">
            <div>
              <span className="text-slate-400">Algorithm:</span>
              <div className="text-indigo-300 font-semibold mt-0.5">{selectedAlgo}</div>
            </div>
            <div>
              <span className="text-slate-400">Target Value:</span>
              <div className="text-white font-bold mt-0.5">{targetVal}</div>
            </div>
            <div>
              <span className="text-slate-400">Result Index:</span>
              <div
                className={`font-bold mt-0.5 ${
                  searchResult?.found ? 'text-emerald-300' : 'text-slate-500'
                }`}
              >
                {searchResult?.found ? `Index [${searchResult.index}]` : 'Not in Array'}
              </div>
            </div>
            <div>
              <span className="text-slate-400">Comparisons:</span>
              <div className="text-amber-400 font-bold mt-0.5">{currentStep.comparisons}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
