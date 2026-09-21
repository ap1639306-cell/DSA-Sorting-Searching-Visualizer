import { SortingStep } from '../types';

export function runBubbleSort(arr: number[]): SortingStep[] {
  const a = [...arr];
  const n = a.length;
  const steps: SortingStep[] = [];
  let comparisons = 0;
  let swaps = 0;
  let sortedIndices: number[] = [];

  steps.push({
    array: [...a],
    comparing: [],
    swapping: [],
    sorted: [...sortedIndices],
    action: 'Starting Bubble Sort',
    comparisons,
    swaps,
    details: `Initial array of ${n} elements`,
  });

  if (n <= 1) {
    steps.push({
      array: [...a],
      comparing: [],
      swapping: [],
      sorted: n === 1 ? [0] : [],
      action: 'Already sorted',
      comparisons: 0,
      swaps: 0,
      details: 'Array with ≤ 1 element is trivially sorted',
    });
    return steps;
  }

  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      steps.push({
        array: [...a],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sortedIndices],
        action: 'Comparing elements',
        comparisons,
        swaps,
        details: `Comparing ${a[j]} and ${a[j + 1]}`,
      });

      if (a[j] > a[j + 1]) {
        const temp = a[j];
        a[j] = a[j + 1];
        a[j + 1] = temp;
        swaps++;
        swapped = true;
        steps.push({
          array: [...a],
          comparing: [],
          swapping: [j, j + 1],
          sorted: [...sortedIndices],
          action: 'Swap required',
          comparisons,
          swaps,
          details: `Swapped ${a[j + 1]} and ${a[j]} (${a[j + 1]} > ${a[j]})`,
        });
      } else {
        steps.push({
          array: [...a],
          comparing: [j, j + 1],
          swapping: [],
          sorted: [...sortedIndices],
          action: 'No swap needed',
          comparisons,
          swaps,
          details: `${a[j]} <= ${a[j + 1]}, order is correct`,
        });
      }
    }

    sortedIndices.push(n - i - 1);
    steps.push({
      array: [...a],
      comparing: [],
      swapping: [],
      sorted: [...sortedIndices],
      action: 'Element placed in sorted position',
      comparisons,
      swaps,
      details: `Element ${a[n - i - 1]} at index ${n - i - 1} is now in final sorted position`,
    });

    if (!swapped) {
      sortedIndices = Array.from({ length: n }, (_, k) => k);
      steps.push({
        array: [...a],
        comparing: [],
        swapping: [],
        sorted: [...sortedIndices],
        action: 'Early termination',
        comparisons,
        swaps,
        details: 'No swaps occurred during this pass; array is completely sorted',
      });
      break;
    }
  }

  steps.push({
    array: [...a],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    action: 'Sorting Completed',
    comparisons,
    swaps,
    details: 'All elements successfully sorted',
  });

  return steps;
}

export function runSelectionSort(arr: number[]): SortingStep[] {
  const a = [...arr];
  const n = a.length;
  const steps: SortingStep[] = [];
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices: number[] = [];

  steps.push({
    array: [...a],
    comparing: [],
    swapping: [],
    sorted: [...sortedIndices],
    action: 'Starting Selection Sort',
    comparisons,
    swaps,
    details: `Array of ${n} elements`,
  });

  for (let i = 0; i < n; i++) {
    let minIdx = i;
    steps.push({
      array: [...a],
      comparing: [minIdx],
      swapping: [],
      sorted: [...sortedIndices],
      action: 'Finding minimum element',
      comparisons,
      swaps,
      details: `Initial candidate minimum for pass ${i + 1} is ${a[minIdx]} at index ${minIdx}`,
    });

    for (let j = i + 1; j < n; j++) {
      comparisons++;
      steps.push({
        array: [...a],
        comparing: [minIdx, j],
        swapping: [],
        sorted: [...sortedIndices],
        action: 'Comparing with current minimum',
        comparisons,
        swaps,
        details: `Comparing candidate ${a[j]} with current minimum ${a[minIdx]}`,
      });

      if (a[j] < a[minIdx]) {
        minIdx = j;
        steps.push({
          array: [...a],
          comparing: [minIdx],
          swapping: [],
          sorted: [...sortedIndices],
          action: 'New minimum found',
          comparisons,
          swaps,
          details: `New minimum value is ${a[minIdx]} at index ${minIdx}`,
        });
      }
    }

    if (minIdx !== i) {
      const temp = a[i];
      a[i] = a[minIdx];
      a[minIdx] = temp;
      swaps++;
      steps.push({
        array: [...a],
        comparing: [],
        swapping: [i, minIdx],
        sorted: [...sortedIndices],
        action: 'Swap required',
        comparisons,
        swaps,
        details: `Swapping minimum ${a[i]} with element at index ${i}`,
      });
    } else {
      steps.push({
        array: [...a],
        comparing: [i],
        swapping: [],
        sorted: [...sortedIndices],
        action: 'Element already in place',
        comparisons,
        swaps,
        details: `Element ${a[i]} is already at the correct position ${i}`,
      });
    }

    sortedIndices.push(i);
  }

  steps.push({
    array: [...a],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    action: 'Sorting Completed',
    comparisons,
    swaps,
    details: 'Selection Sort completed',
  });

  return steps;
}

export function runInsertionSort(arr: number[]): SortingStep[] {
  const a = [...arr];
  const n = a.length;
  const steps: SortingStep[] = [];
  let comparisons = 0;
  let swaps = 0;
  let sortedIndices: number[] = n > 0 ? [0] : [];

  steps.push({
    array: [...a],
    comparing: [],
    swapping: [],
    sorted: [...sortedIndices],
    action: 'Starting Insertion Sort',
    comparisons,
    swaps,
    details: `First element ${a[0] ?? ''} is considered sorted`,
  });

  for (let i = 1; i < n; i++) {
    const key = a[i];
    let j = i - 1;

    steps.push({
      array: [...a],
      comparing: [i],
      swapping: [],
      sorted: [...sortedIndices],
      action: 'Selecting key element',
      comparisons,
      swaps,
      details: `Inserting key = ${key} from index ${i} into sorted subarray [0..${i - 1}]`,
    });

    while (j >= 0) {
      comparisons++;
      steps.push({
        array: [...a],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sortedIndices],
        action: 'Comparing with sorted element',
        comparisons,
        swaps,
        details: `Comparing key ${key} with ${a[j]}`,
      });

      if (a[j] > key) {
        a[j + 1] = a[j];
        swaps++;
        steps.push({
          array: [...a],
          comparing: [],
          swapping: [j, j + 1],
          sorted: [...sortedIndices],
          action: 'Shift required',
          comparisons,
          swaps,
          details: `Shifted ${a[j]} right to index ${j + 1}`,
        });
        j--;
      } else {
        break;
      }
    }

    a[j + 1] = key;
    sortedIndices = Array.from({ length: i + 1 }, (_, k) => k);
    steps.push({
      array: [...a],
      comparing: [],
      swapping: [j + 1],
      sorted: [...sortedIndices],
      action: 'Key inserted',
      comparisons,
      swaps,
      details: `Inserted key ${key} at position ${j + 1}`,
    });
  }

  steps.push({
    array: [...a],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    action: 'Sorting Completed',
    comparisons,
    swaps,
    details: 'Insertion Sort completed',
  });

  return steps;
}

export function runMergeSort(arr: number[]): SortingStep[] {
  const a = [...arr];
  const n = a.length;
  const steps: SortingStep[] = [];
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices: number[] = [];

  steps.push({
    array: [...a],
    comparing: [],
    swapping: [],
    sorted: [...sortedIndices],
    action: 'Starting Merge Sort',
    comparisons,
    swaps,
    details: `Divide and conquer on array of size ${n}`,
  });

  function mergeHelper(start: number, end: number) {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);

    steps.push({
      array: [...a],
      comparing: [start, mid, end],
      swapping: [],
      sorted: [...sortedIndices],
      action: 'Dividing subarray',
      comparisons,
      swaps,
      details: `Dividing range [${start}..${end}] at mid index ${mid}`,
    });

    mergeHelper(start, mid);
    mergeHelper(mid + 1, end);

    const left = a.slice(start, mid + 1);
    const right = a.slice(mid + 1, end + 1);
    let i = 0;
    let j = 0;
    let k = start;

    steps.push({
      array: [...a],
      comparing: Array.from({ length: end - start + 1 }, (_, idx) => start + idx),
      swapping: [],
      sorted: [...sortedIndices],
      action: 'Merging subarrays',
      comparisons,
      swaps,
      details: `Merging left [${start}..${mid}] and right [${mid + 1}..${end}]`,
    });

    while (i < left.length && j < right.length) {
      comparisons++;
      steps.push({
        array: [...a],
        comparing: [start + i, mid + 1 + j],
        swapping: [],
        sorted: [...sortedIndices],
        action: 'Comparing subarray elements',
        comparisons,
        swaps,
        details: `Comparing left element ${left[i]} and right element ${right[j]}`,
      });

      if (left[i] <= right[j]) {
        a[k] = left[i];
        i++;
      } else {
        a[k] = right[j];
        j++;
      }
      swaps++;

      steps.push({
        array: [...a],
        comparing: [],
        swapping: [k],
        sorted: [...sortedIndices],
        action: 'Merged element placed',
        comparisons,
        swaps,
        details: `Placed ${a[k]} at index ${k}`,
      });
      k++;
    }

    while (i < left.length) {
      a[k] = left[i];
      i++;
      k++;
      swaps++;
      steps.push({
        array: [...a],
        comparing: [],
        swapping: [k - 1],
        sorted: [...sortedIndices],
        action: 'Remaining left element placed',
        comparisons,
        swaps,
        details: `Placed remaining left element ${a[k - 1]} at index ${k - 1}`,
      });
    }

    while (j < right.length) {
      a[k] = right[j];
      j++;
      k++;
      swaps++;
      steps.push({
        array: [...a],
        comparing: [],
        swapping: [k - 1],
        sorted: [...sortedIndices],
        action: 'Remaining right element placed',
        comparisons,
        swaps,
        details: `Placed remaining right element ${a[k - 1]} at index ${k - 1}`,
      });
    }

    if (start === 0 && end === n - 1) {
      for (let idx = 0; idx < n; idx++) sortedIndices.push(idx);
    }
  }

  if (n > 1) {
    mergeHelper(0, n - 1);
  }

  steps.push({
    array: [...a],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    action: 'Sorting Completed',
    comparisons,
    swaps,
    details: 'Merge Sort completed successfully',
  });

  return steps;
}

export function runQuickSort(arr: number[]): SortingStep[] {
  const a = [...arr];
  const n = a.length;
  const steps: SortingStep[] = [];
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices: number[] = [];

  steps.push({
    array: [...a],
    comparing: [],
    swapping: [],
    sorted: [...sortedIndices],
    action: 'Starting Quick Sort',
    comparisons,
    swaps,
    details: `Quick Sort on array of size ${n}`,
  });

  function partition(low: number, high: number): number {
    const pivot = a[high];

    steps.push({
      array: [...a],
      comparing: [high],
      swapping: [],
      sorted: [...sortedIndices],
      action: 'Pivot chosen',
      comparisons,
      swaps,
      details: `Chosen pivot ${pivot} at index ${high} for range [${low}..${high}]`,
    });

    let i = low - 1;
    for (let j = low; j < high; j++) {
      comparisons++;
      steps.push({
        array: [...a],
        comparing: [j, high],
        swapping: [],
        sorted: [...sortedIndices],
        action: 'Comparing with pivot',
        comparisons,
        swaps,
        details: `Comparing element ${a[j]} with pivot ${pivot}`,
      });

      if (a[j] <= pivot) {
        i++;
        if (i !== j) {
          const temp = a[i];
          a[i] = a[j];
          a[j] = temp;
          swaps++;
          steps.push({
            array: [...a],
            comparing: [],
            swapping: [i, j],
            sorted: [...sortedIndices],
            action: 'Swap required',
            comparisons,
            swaps,
            details: `Swapping ${a[i]} and ${a[j]} to position smaller element left`,
          });
        }
      }
    }

    const temp = a[i + 1];
    a[i + 1] = a[high];
    a[high] = temp;
    swaps++;

    steps.push({
      array: [...a],
      comparing: [],
      swapping: [i + 1, high],
      sorted: [...sortedIndices],
      action: 'Pivot placed at partition index',
      comparisons,
      swaps,
      details: `Placed pivot ${pivot} at final partitioned index ${i + 1}`,
    });

    sortedIndices.push(i + 1);
    return i + 1;
  }

  function quickSortHelper(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    } else if (low === high && !sortedIndices.includes(low)) {
      sortedIndices.push(low);
    }
  }

  if (n > 1) {
    quickSortHelper(0, n - 1);
  }

  steps.push({
    array: [...a],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    action: 'Sorting Completed',
    comparisons,
    swaps,
    details: 'Quick Sort completed successfully',
  });

  return steps;
}
