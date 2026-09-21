import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  SortingAlgorithmType,
  SortingStep,
} from '../types';
import {
  runBubbleSort,
  runSelectionSort,
  runInsertionSort,
  runMergeSort,
  runQuickSort,
} from '../algorithms/sortingEngine';
import { ALGORITHMS_DATA } from '../data/algorithmsData';
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Sparkles,
  CheckCircle,
  Code2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export const SortingVisualizer: React.FC = () => {
  // Array state
  const [arrayInput, setArrayInput] = useState<string>('64, 25, 12, 22, 11');
  const [currentArray, setCurrentArray] = useState<number[]>([64, 25, 12, 22, 11]);
  const [inputError, setInputError] = useState<string | null>(null);

  // Random array generator state
  const [randomSize, setRandomSize] = useState<number>(8);
  const [randomMin, setRandomMin] = useState<number>(5);
  const [randomMax, setRandomMax] = useState<number>(99);

  // Algorithm choice
  const [selectedAlgo, setSelectedAlgo] = useState<SortingAlgorithmType>('Bubble Sort');

  // Animation execution state
  const [steps, setSteps] = useState<SortingStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedDelay, setSpeedDelay] = useState<number>(350); // milliseconds

  // Code view tabs
  const [activeCodeTab, setActiveCodeTab] = useState<'python' | 'cpp'>('python');
  const [showCodeModal, setShowCodeModal] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate steps whenever array or algorithm changes
  const computeSteps = (arr: number[], algo: SortingAlgorithmType) => {
    let generatedSteps: SortingStep[] = [];
    switch (algo) {
      case 'Bubble Sort':
        generatedSteps = runBubbleSort(arr);
        break;
      case 'Selection Sort':
        generatedSteps = runSelectionSort(arr);
        break;
      case 'Insertion Sort':
        generatedSteps = runInsertionSort(arr);
        break;
      case 'Merge Sort':
        generatedSteps = runMergeSort(arr);
        break;
      case 'Quick Sort':
        generatedSteps = runQuickSort(arr);
        break;
    }
    setSteps(generatedSteps);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  // Initialize steps on mount
  useEffect(() => {
    computeSteps(currentArray, selectedAlgo);
  }, [selectedAlgo]);

  // Handle Play Animation loop
  useEffect(() => {
    if (isPlaying) {
      if (currentStepIdx < steps.length - 1) {
        timerRef.current = setTimeout(() => {
          setCurrentStepIdx((prev) => {
            const next = prev + 1;
            if (next === steps.length - 1) {
              setIsPlaying(false);
              confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.8 },
              });
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
  }, [isPlaying, currentStepIdx, steps.length, speedDelay]);

  // Apply manual array
  const handleApplyManual = () => {
    setInputError(null);
    if (!arrayInput.trim()) {
      setInputError('Input is empty. Please enter numbers separated by commas.');
      return;
    }
    const items = arrayInput.split(',').map((x) => x.trim()).filter(Boolean);
    if (items.length === 0) {
      setInputError('Invalid input. Please enter numbers separated by commas.');
      return;
    }
    const parsed: number[] = [];
    for (const item of items) {
      const num = Number(item);
      if (isNaN(num) || !Number.isInteger(num)) {
        setInputError(`Invalid input '${item}'. Please enter valid integers separated by commas.`);
        return;
      }
      parsed.push(num);
    }
    if (parsed.length > 35) {
      setInputError('For optimal visualization display, please enter 35 or fewer numbers.');
      return;
    }
    setCurrentArray(parsed);
    computeSteps(parsed, selectedAlgo);
  };

  // Generate random array
  const handleGenerateRandom = () => {
    setInputError(null);
    const min = Math.min(randomMin, randomMax);
    const max = Math.max(randomMin, randomMax);
    const newArr: number[] = [];
    for (let i = 0; i < randomSize; i++) {
      newArr.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    setCurrentArray(newArr);
    setArrayInput(newArr.join(', '));
    computeSteps(newArr, selectedAlgo);
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
      if (nextIdx === steps.length - 1) {
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
    comparing: [],
    swapping: [],
    sorted: [],
    action: 'Ready',
    comparisons: 0,
    swaps: 0,
    details: 'Press Start or Next Step to begin visualization',
  };

  const isCompleted = currentStepIdx === steps.length - 1 && steps.length > 0;
  const meta = ALGORITHMS_DATA[selectedAlgo];

  // Visual bar height math
  const maxVal = Math.max(...currentStep.array, 10);
  const minVal = Math.min(...currentStep.array, 0);
  const range = maxVal - Math.min(0, minVal);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title & Explanations */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-500/20 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Sorting Algorithms Visualizer</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Step-by-step state animations with real-time comparisons and swap counters.
          </p>
        </div>
        <button
          onClick={() => setShowCodeModal(!showCodeModal)}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-medium cursor-pointer transition-all self-start sm:self-auto"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>{showCodeModal ? 'Hide Code' : 'View Implementation'}</span>
        </button>
      </div>

      {/* Code Modal Accordion */}
      {showCodeModal && (
        <div className="p-5 rounded-2xl bg-slate-900 border border-indigo-500/30 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-white">
              {selectedAlgo} Source Implementation
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveCodeTab('python')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  activeCodeTab === 'python'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Python
              </button>
              <button
                onClick={() => setActiveCodeTab('cpp')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  activeCodeTab === 'cpp'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                C++
              </button>
            </div>
          </div>
          <pre className="p-4 rounded-xl bg-black/60 font-mono text-xs text-indigo-200 overflow-x-auto border border-slate-800 leading-relaxed">
            <code>
              {activeCodeTab === 'python' ? meta.pythonCode : meta.cppCode}
            </code>
          </pre>
        </div>
      )}

      {/* Array Configuration Box */}
      <div className="p-5 rounded-2xl bg-[#111827] border border-indigo-500/20 shadow-md space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
          {/* Manual Input */}
          <div className="lg:col-span-6 space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Input Array (Comma Separated)</span>
              <span className="text-[11px] text-slate-500 font-normal lowercase">e.g. 64, 25, 12, 22, 11</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={arrayInput}
                onChange={(e) => setArrayInput(e.target.value)}
                placeholder="64, 25, 12, 22, 11"
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white font-mono text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                onClick={handleApplyManual}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs cursor-pointer transition-all shadow-xs"
              >
                Apply Array
              </button>
            </div>
          </div>

          {/* Random Array Generator */}
          <div className="lg:col-span-6 space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Generate Random Array
            </label>
            <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center">
              <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700/80 text-xs">
                <span className="text-slate-400">Size:</span>
                <input
                  type="number"
                  min={4}
                  max={25}
                  value={randomSize}
                  onChange={(e) => setRandomSize(Number(e.target.value))}
                  className="w-12 bg-transparent text-white font-mono text-center focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700/80 text-xs">
                <span className="text-slate-400">Min:</span>
                <input
                  type="number"
                  value={randomMin}
                  onChange={(e) => setRandomMin(Number(e.target.value))}
                  className="w-12 bg-transparent text-white font-mono text-center focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700/80 text-xs">
                <span className="text-slate-400">Max:</span>
                <input
                  type="number"
                  value={randomMax}
                  onChange={(e) => setRandomMax(Number(e.target.value))}
                  className="w-12 bg-transparent text-white font-mono text-center focus:outline-none"
                />
              </div>
              <button
                onClick={handleGenerateRandom}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-200 font-medium text-xs cursor-pointer transition-all whitespace-nowrap"
              >
                Generate Random
              </button>
            </div>
          </div>
        </div>

        {/* Input Validation Error */}
        {inputError && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{inputError}</span>
          </div>
        )}

        {/* Input Array Preview Card */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <span className="text-indigo-400 font-semibold uppercase">Input:</span>
          <span>[{currentArray.join(', ')}]</span>
        </div>
      </div>

      {/* Algorithm Selector & Asymptotic Quick Glance */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-5 space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Select Sorting Algorithm
          </label>
          <select
            value={selectedAlgo}
            onChange={(e) => setSelectedAlgo(e.target.value as SortingAlgorithmType)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-indigo-500/30 text-white font-medium text-sm focus:outline-none focus:border-indigo-400 transition-colors cursor-pointer"
          >
            <option value="Bubble Sort">Bubble Sort</option>
            <option value="Selection Sort">Selection Sort</option>
            <option value="Insertion Sort">Insertion Sort</option>
            <option value="Merge Sort">Merge Sort</option>
            <option value="Quick Sort">Quick Sort</option>
          </select>
        </div>

        {/* Complexity Pills */}
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

      {/* Visualization Canvas Area */}
      <div className="p-6 rounded-2xl bg-[#0f1422] border border-indigo-500/25 shadow-xl space-y-5">
        {/* Dynamic Status Box */}
        <div className="p-4 rounded-xl bg-slate-950/80 border-l-4 border-l-indigo-500 border border-slate-800 shadow-inner grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">
              Current Step
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
            <span className="text-[11px] font-semibold text-pink-400 uppercase tracking-wider">
              Swaps / Shifts
            </span>
            <div className="text-base font-bold text-pink-300 mt-0.5">
              {currentStep.swaps}
            </div>
          </div>
        </div>

        {/* Detailed step description */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
          <HelpCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span className="font-mono text-indigo-200">{currentStep.details}</span>
        </div>

        {/* Bars Container */}
        <div className="h-64 sm:h-72 w-full flex items-end justify-center gap-1.5 sm:gap-2.5 pt-8 px-2 border-b border-slate-800 pb-2 overflow-x-auto">
          {currentStep.array.map((val, idx) => {
            const isComparing = currentStep.comparing.includes(idx);
            const isSwapping = currentStep.swapping.includes(idx);
            const isSorted = currentStep.sorted.includes(idx);

            // Compute relative height percentage
            const positiveVal = Math.max(val - minVal + 5, 5);
            const heightPercent = Math.min(Math.max((positiveVal / (range + 10)) * 100, 12), 92);

            let barColor = 'bg-gradient-to-t from-indigo-800 to-indigo-500 border-indigo-400';
            let labelBadge = '';

            if (isSwapping) {
              barColor = 'bg-gradient-to-t from-rose-800 to-rose-500 border-rose-400 animate-pulse';
              labelBadge = 'SWAP';
            } else if (isComparing) {
              barColor = 'bg-gradient-to-t from-amber-700 to-amber-400 border-amber-300';
              labelBadge = 'COMPARE';
            } else if (isSorted) {
              barColor = 'bg-gradient-to-t from-emerald-800 to-emerald-500 border-emerald-400';
            }

            return (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center justify-end h-full max-w-[55px] min-w-[28px] transition-all duration-200"
              >
                {/* Pointer indicator badge */}
                {labelBadge && (
                  <span className="text-[9px] font-mono font-bold text-amber-300 bg-amber-950/80 px-1 py-0.5 rounded border border-amber-600/60 mb-1 whitespace-nowrap">
                    {labelBadge}
                  </span>
                )}

                {/* Numerical Value above bar */}
                <span className="text-[11px] sm:text-xs font-mono font-bold text-white mb-1">
                  {val}
                </span>

                {/* Vertical Bar */}
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full rounded-t-lg border-t-2 border-x ${barColor} shadow-md transition-all duration-200 flex items-center justify-center`}
                />

                {/* Index label below bar */}
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
            <span>Default</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-amber-400 border border-amber-300"></span>
            <span>Comparing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-rose-500 border border-rose-400"></span>
            <span>Swapping / Shifting</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-emerald-500 border border-emerald-400"></span>
            <span>Sorted Position</span>
          </div>
        </div>

        {/* Playback Controls & Speed Slider */}
        <div className="pt-2 border-t border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {!isPlaying ? (
                <button
                  onClick={handleStart}
                  disabled={isCompleted}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:pointer-events-none text-white font-medium text-xs transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start</span>
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs transition-all shadow-md shadow-amber-600/20 cursor-pointer"
                >
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pause</span>
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
                min={80}
                max={900}
                step={20}
                value={1000 - speedDelay}
                onChange={(e) => setSpeedDelay(1000 - Number(e.target.value))}
                className="w-24 sm:w-32 accent-indigo-500 cursor-pointer"
              />
              <span className="text-[11px] text-slate-500">Slow</span>
            </div>
          </div>

          {/* Step Timeline Scrubber */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>Progress Scrub</span>
              <span>
                {currentStepIdx + 1} of {steps.length}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={Math.max(steps.length - 1, 0)}
              value={currentStepIdx}
              onChange={(e) => {
                setIsPlaying(false);
                setCurrentStepIdx(Number(e.target.value));
              }}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Sorting Completed Result Panel */}
      {isCompleted && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-emerald-950/40 border border-emerald-500/40 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span>Sorting Completed</span>
            <Sparkles className="w-4 h-4 text-emerald-300 ml-1" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="space-y-1.5 font-mono">
              <div>
                <span className="text-slate-400">Input Array:</span>{' '}
                <span className="text-white">[{currentArray.join(', ')}]</span>
              </div>
              <div>
                <span className="text-slate-400">Sorted Array:</span>{' '}
                <span className="text-emerald-300 font-bold">
                  [{currentStep.array.join(', ')}]
                </span>
              </div>
            </div>
            <div className="space-y-1.5 font-mono">
              <div>
                <span className="text-slate-400">Algorithm:</span>{' '}
                <span className="text-indigo-300 font-semibold">{selectedAlgo}</span>
              </div>
              <div>
                <span className="text-slate-400">Comparisons:</span>{' '}
                <span className="text-amber-400 font-bold">{currentStep.comparisons}</span>{' '}
                <span className="text-slate-600">|</span>{' '}
                <span className="text-slate-400">Swaps:</span>{' '}
                <span className="text-pink-400 font-bold">{currentStep.swaps}</span>
              </div>
              <div>
                <span className="text-slate-400">Time:</span>{' '}
                <span className="text-sky-300">{meta.avgTime}</span>{' '}
                <span className="text-slate-600">|</span>{' '}
                <span className="text-slate-400">Space:</span>{' '}
                <span className="text-purple-300">{meta.space}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
