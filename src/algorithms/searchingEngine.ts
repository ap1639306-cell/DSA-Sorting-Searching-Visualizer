import { SearchingStep } from '../types';

export function isArraySorted(arr: number[]): boolean {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) return false;
  }
  return true;
}

export function runLinearSearch(arr: number[], target: number): { steps: SearchingStep[]; found: boolean; foundIndex: number } {
  const steps: SearchingStep[] = [];
  const n = arr.length;
  let comparisons = 0;

  steps.push({
    array: [...arr],
    current: -1,
    found: false,
    foundIndex: -1,
    comparisons: 0,
    action: 'Starting Linear Search',
    details: `Searching for target value ${target} in array of ${n} elements sequentially`,
  });

  if (n === 0) {
    steps.push({
      array: [...arr],
      current: -1,
      found: false,
      foundIndex: -1,
      comparisons: 0,
      action: 'Empty Array',
      details: 'Array is empty; target cannot be found',
    });
    return { steps, found: false, foundIndex: -1 };
  }

  for (let i = 0; i < n; i++) {
    comparisons++;
    const isMatch = arr[i] === target;

    steps.push({
      array: [...arr],
      current: i,
      found: isMatch,
      foundIndex: isMatch ? i : -1,
      comparisons,
      action: `Checking index ${i}`,
      details: `Comparing arr[${i}] = ${arr[i]} with target ${target}`,
    });

    if (isMatch) {
      steps.push({
        array: [...arr],
        current: i,
        found: true,
        foundIndex: i,
        comparisons,
        action: 'Target Found!',
        details: `Target ${target} located at index ${i} after ${comparisons} comparison(s)`,
      });
      return { steps, found: true, foundIndex: i };
    }
  }

  steps.push({
    array: [...arr],
    current: -1,
    found: false,
    foundIndex: -1,
    comparisons,
    action: 'Target Not Found',
    details: `Target ${target} was not found after checking all ${n} elements`,
  });

  return { steps, found: false, foundIndex: -1 };
}

export function runBinarySearch(arr: number[], target: number): { steps: SearchingStep[]; found: boolean; foundIndex: number } {
  const steps: SearchingStep[] = [];
  const n = arr.length;
  let comparisons = 0;

  steps.push({
    array: [...arr],
    current: -1,
    low: n > 0 ? 0 : -1,
    mid: -1,
    high: n > 0 ? n - 1 : -1,
    found: false,
    foundIndex: -1,
    comparisons: 0,
    action: 'Starting Binary Search',
    details: `Searching for target ${target} in sorted array of ${n} elements`,
  });

  if (n === 0) {
    steps.push({
      array: [...arr],
      current: -1,
      low: -1,
      mid: -1,
      high: -1,
      found: false,
      foundIndex: -1,
      comparisons: 0,
      action: 'Empty Array',
      details: 'Array is empty; target cannot be found',
    });
    return { steps, found: false, foundIndex: -1 };
  }

  let low = 0;
  let high = n - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    comparisons++;

    steps.push({
      array: [...arr],
      current: mid,
      low,
      mid,
      high,
      found: false,
      foundIndex: -1,
      comparisons,
      action: `Checking Mid Index ${mid}`,
      details: `Low=${low}, Mid=${mid}, High=${high}. Comparing arr[${mid}] = ${arr[mid]} with target ${target}`,
    });

    if (arr[mid] === target) {
      steps.push({
        array: [...arr],
        current: mid,
        low,
        mid,
        high,
        found: true,
        foundIndex: mid,
        comparisons,
        action: 'Target Found!',
        details: `Target ${target} found at index ${mid} after ${comparisons} comparison(s)`,
      });
      return { steps, found: true, foundIndex: mid };
    } else if (arr[mid] < target) {
      steps.push({
        array: [...arr],
        current: mid,
        low,
        mid,
        high,
        found: false,
        foundIndex: -1,
        comparisons,
        action: 'Search Right Subarray',
        details: `arr[${mid}] = ${arr[mid]} < ${target}. Setting Low = ${mid + 1}`,
      });
      low = mid + 1;
    } else {
      steps.push({
        array: [...arr],
        current: mid,
        low,
        mid,
        high,
        found: false,
        foundIndex: -1,
        comparisons,
        action: 'Search Left Subarray',
        details: `arr[${mid}] = ${arr[mid]} > ${target}. Setting High = ${mid - 1}`,
      });
      high = mid - 1;
    }
  }

  steps.push({
    array: [...arr],
    current: -1,
    low,
    mid: -1,
    high,
    found: false,
    foundIndex: -1,
    comparisons,
    action: 'Target Not Found',
    details: `Low (${low}) exceeded High (${high}). Target ${target} is not in the array`,
  });

  return { steps, found: false, foundIndex: -1 };
}
