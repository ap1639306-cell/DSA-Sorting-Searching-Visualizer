export type PageTab =
  | 'home'
  | 'sorting'
  | 'searching'
  | 'algorithm-info'
  | 'complexity-comparison'
  | 'project-files';

export type SortingAlgorithmType =
  | 'Bubble Sort'
  | 'Selection Sort'
  | 'Insertion Sort'
  | 'Merge Sort'
  | 'Quick Sort';

export type SearchingAlgorithmType = 'Linear Search' | 'Binary Search';

export interface SortingStep {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
  action: string;
  comparisons: number;
  swaps: number;
  details: string;
}

export interface SearchingStep {
  array: number[];
  current: number;
  low?: number;
  mid?: number;
  high?: number;
  found: boolean;
  foundIndex: number;
  comparisons: number;
  action: string;
  details: string;
}

export interface AlgorithmMeta {
  type: 'sorting' | 'searching';
  name: string;
  description: string;
  working: string[];
  bestTime: string;
  avgTime: string;
  worstTime: string;
  space: string;
  pseudocode: string;
  pythonCode: string;
  cppCode: string;
}

export interface ComplexityEntry {
  algorithm: string;
  type: string;
  best: string;
  average: string;
  worst: string;
  space: string;
  stable: string;
}
