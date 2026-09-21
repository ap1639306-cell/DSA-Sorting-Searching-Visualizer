import { AlgorithmMeta, ComplexityEntry } from '../types';

export const ALGORITHMS_DATA: Record<string, AlgorithmMeta> = {
  'Bubble Sort': {
    type: 'sorting',
    name: 'Bubble Sort',
    description:
      "Bubble Sort is a straightforward comparison-based sorting algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Larger elements progressively 'bubble up' to the high end of the array with each pass.",
    working: [
      '1. Start at index 0 and compare arr[0] with arr[1].',
      '2. If arr[0] > arr[1], swap them; otherwise, keep their positions.',
      '3. Move to the next pair (arr[1], arr[2]) and repeat through the unsorted array.',
      '4. At the end of the pass, the largest element is placed in its permanent sorted spot at the end.',
      '5. Repeat for remaining unsorted elements until a pass finishes with zero swaps.',
    ],
    bestTime: 'O(n)',
    avgTime: 'O(n²)',
    worstTime: 'O(n²)',
    space: 'O(1)',
    pseudocode: `procedure bubbleSort(A : list of sortable items)
    n = length(A)
    repeat
        swapped = false
        for i = 1 to n-1 inclusive do
            if A[i-1] > A[i] then
                swap(A[i-1], A[i])
                swapped = true
            end if
        end for
        n = n - 1
    until not swapped
end procedure`,
    pythonCode: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,
    cppCode: `#include <iostream>
#include <vector>

void bubbleSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
  },
  'Selection Sort': {
    type: 'sorting',
    name: 'Selection Sort',
    description:
      'Selection Sort divides the array into a sorted prefix and an unsorted suffix. In each iteration, it finds the smallest element in the unsorted suffix and swaps it with the first unsorted element, gradually growing the sorted subarray by one position.',
    working: [
      '1. Designate index 0 as the beginning of the unsorted segment.',
      '2. Scan through all unsorted elements to identify the minimum value.',
      '3. Swap the discovered minimum element with the element at the beginning of the unsorted section.',
      '4. Increment the boundary of the sorted subarray.',
      '5. Repeat until every element is in its rightful place.',
    ],
    bestTime: 'O(n²)',
    avgTime: 'O(n²)',
    worstTime: 'O(n²)',
    space: 'O(1)',
    pseudocode: `procedure selectionSort(A : list of sortable items)
    n = length(A)
    for i = 0 to n - 2 do
        min_idx = i
        for j = i + 1 to n - 1 do
            if A[j] < A[min_idx] then
                min_idx = j
            end if
        end for
        if min_idx != i then
            swap(A[i], A[min_idx])
        end if
    end for
end procedure`,
    pythonCode: `def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
    cppCode: `#include <iostream>
#include <vector>

void selectionSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        std::swap(arr[i], arr[min_idx]);
    }
}`,
  },
  'Insertion Sort': {
    type: 'sorting',
    name: 'Insertion Sort',
    description:
      'Insertion Sort builds the final sorted array one element at a time, similarly to sorting playing cards in hand. It takes an unsorted element (the key) and repeatedly shifts larger elements in the sorted prefix to the right until the key finds its correct location.',
    working: [
      '1. Consider the first element (index 0) trivially sorted.',
      '2. Select the next unsorted element as the key.',
      '3. Compare the key with elements in the sorted segment from right to left.',
      '4. Shift each element that is greater than the key one index to the right.',
      '5. Insert the key into the resulting open slot.',
    ],
    bestTime: 'O(n)',
    avgTime: 'O(n²)',
    worstTime: 'O(n²)',
    space: 'O(1)',
    pseudocode: `procedure insertionSort(A : list of sortable items)
    for i = 1 to length(A) - 1 do
        key = A[i]
        j = i - 1
        while j >= 0 and A[j] > key do
            A[j + 1] = A[j]
            j = j - 1
        end while
        A[j + 1] = key
    end for
end procedure`,
    pythonCode: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
    cppCode: `#include <iostream>
#include <vector>

void insertionSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
  },
  'Merge Sort': {
    type: 'sorting',
    name: 'Merge Sort',
    description:
      'Merge Sort is a classic divide-and-conquer algorithm. It recursively splits the input array into two equal halves until each subarray holds only one element, then combines and merges the sorted subarrays back together in linear time.',
    working: [
      '1. Calculate the midpoint to divide the array into left and right halves.',
      '2. Recursively apply Merge Sort to the left half.',
      '3. Recursively apply Merge Sort to the right half.',
      '4. Merge the two sorted halves into a combined sorted sequence using two pointers.',
      '5. Copy the sorted merged items back into the main array.',
    ],
    bestTime: 'O(n log n)',
    avgTime: 'O(n log n)',
    worstTime: 'O(n log n)',
    space: 'O(n)',
    pseudocode: `procedure mergeSort(A : list, start, end)
    if start < end then
        mid = (start + end) / 2
        mergeSort(A, start, mid)
        mergeSort(A, mid + 1, end)
        merge(A, start, mid, end)
    end if
end procedure`,
    pythonCode: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    merged = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1
    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged`,
    cppCode: `#include <iostream>
#include <vector>

void merge(std::vector<int>& arr, int l, int m, int r) {
    std::vector<int> left(arr.begin() + l, arr.begin() + m + 1);
    std::vector<int> right(arr.begin() + m + 1, arr.begin() + r + 1);
    int i = 0, j = 0, k = l;
    while (i < left.size() && j < right.size()) {
        if (left[i] <= right[j]) arr[k++] = left[i++];
        else arr[k++] = right[j++];
    }
    while (i < left.size()) arr[k++] = left[i++];
    while (j < right.size()) arr[k++] = right[j++];
}

void mergeSort(std::vector<int>& arr, int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
  },
  'Quick Sort': {
    type: 'sorting',
    name: 'Quick Sort',
    description:
      'Quick Sort is an exceptionally fast divide-and-conquer algorithm. It picks a pivot element and partitions the array so that items less than the pivot sit to the left, and items greater sit to the right, then recursively sorts both partitions.',
    working: [
      '1. Choose a pivot element (e.g., the last element of the range).',
      '2. Scan the subarray, swapping smaller elements to the left partition.',
      '3. Place the pivot into its final partitioned index.',
      '4. Recursively apply Quick Sort to the left partition [low..pivot-1].',
      '5. Recursively apply Quick Sort to the right partition [pivot+1..high].',
    ],
    bestTime: 'O(n log n)',
    avgTime: 'O(n log n)',
    worstTime: 'O(n²)',
    space: 'O(log n)',
    pseudocode: `procedure quickSort(A : list, low, high)
    if low < high then
        pi = partition(A, low, high)
        quickSort(A, low, pi - 1)
        quickSort(A, pi + 1, high)
    end if
end procedure`,
    pythonCode: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[-1]
    left = [x for x in arr[:-1] if x <= pivot]
    right = [x for x in arr[:-1] if x > pivot]
    return quick_sort(left) + [pivot] + quick_sort(right)`,
    cppCode: `#include <iostream>
#include <vector>

int partition(std::vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            std::swap(arr[i], arr[j]);
        }
    }
    std::swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
  },
  'Linear Search': {
    type: 'searching',
    name: 'Linear Search',
    description:
      'Linear Search is a fundamental search technique that checks each element sequentially from index 0 to n-1. It requires no preprocessing and operates equally well on unsorted and sorted datasets.',
    working: [
      '1. Start at index 0.',
      '2. Compare arr[i] with the target value.',
      '3. If arr[i] == target, return index i as Found.',
      '4. If not matching, advance to index i + 1.',
      '5. If the end of the array is reached, conclude Target Not Found.',
    ],
    bestTime: 'O(1)',
    avgTime: 'O(n)',
    worstTime: 'O(n)',
    space: 'O(1)',
    pseudocode: `procedure linearSearch(A : list, target)
    for i = 0 to length(A) - 1 do
        if A[i] == target then
            return i
        end if
    end for
    return -1
end procedure`,
    pythonCode: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
    cppCode: `#include <iostream>
#include <vector>

int linearSearch(const std::vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}`,
  },
  'Binary Search': {
    type: 'searching',
    name: 'Binary Search',
    description:
      'Binary Search is a logarithmic search algorithm that operates exclusively on sorted sequences. It checks the middle item; if target is smaller, it eliminates the upper half; if larger, it eliminates the lower half.',
    working: [
      '1. Set pointers Low = 0 and High = array.length - 1.',
      '2. Calculate Mid = Math.floor((Low + High) / 2).',
      '3. If arr[Mid] == target, return Mid (Found).',
      '4. If arr[Mid] < target, update Low = Mid + 1 to search the right half.',
      '5. If arr[Mid] > target, update High = Mid - 1 to search the left half.',
      '6. Repeat while Low <= High. If Low > High, target is Not Found.',
    ],
    bestTime: 'O(1)',
    avgTime: 'O(log n)',
    worstTime: 'O(log n)',
    space: 'O(1)',
    pseudocode: `procedure binarySearch(A : sorted list, target)
    low = 0
    high = length(A) - 1
    while low <= high do
        mid = (low + high) / 2
        if A[mid] == target then
            return mid
        else if A[mid] < target then
            low = mid + 1
        else
            high = mid - 1
        end if
    end while
    return -1
end procedure`,
    pythonCode: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
    cppCode: `#include <iostream>
#include <vector>

int binarySearch(const std::vector<int>& arr, int target) {
    int low = 0;
    int high = arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
  },
};

export const COMPLEXITY_TABLE_DATA: ComplexityEntry[] = [
  {
    algorithm: 'Bubble Sort',
    type: 'Sorting',
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    stable: 'Yes',
  },
  {
    algorithm: 'Selection Sort',
    type: 'Sorting',
    best: 'O(n²)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    stable: 'No',
  },
  {
    algorithm: 'Insertion Sort',
    type: 'Sorting',
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    stable: 'Yes',
  },
  {
    algorithm: 'Merge Sort',
    type: 'Sorting',
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
    space: 'O(n)',
    stable: 'Yes',
  },
  {
    algorithm: 'Quick Sort',
    type: 'Sorting',
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n²)',
    space: 'O(log n)',
    stable: 'No',
  },
  {
    algorithm: 'Heap Sort',
    type: 'Sorting',
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
    space: 'O(1)',
    stable: 'No',
  },
  {
    algorithm: 'Linear Search',
    type: 'Searching',
    best: 'O(1)',
    average: 'O(n)',
    worst: 'O(n)',
    space: 'O(1)',
    stable: 'N/A',
  },
  {
    algorithm: 'Binary Search',
    type: 'Searching',
    best: 'O(1)',
    average: 'O(log n)',
    worst: 'O(log n)',
    space: 'O(1)',
    stable: 'N/A',
  },
];
