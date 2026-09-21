"""
Utility helpers for DSA Sorting & Searching Visualizer:
- Array input validation
- Random array generation
- Plotly figure generation for sorting and searching
- Detailed algorithm metadata, code snippets (Python/C++), and complexities
"""

import random
from typing import List, Tuple, Optional, Dict, Any
import plotly.graph_objects as go


def parse_and_validate_array(input_str: str) -> Tuple[bool, List[int], Optional[str]]:
    """
    Parses comma-separated input string into a list of integers.
    Handles non-numbers, empty inputs, spaces, negatives, duplicates.
    Returns: (is_valid, parsed_array, error_message)
    """
    if not input_str or not input_str.strip():
        return False, [], "Input is empty. Please enter numbers separated by commas."

    raw_items = [item.strip() for item in input_str.split(",") if item.strip()]

    if not raw_items:
        return False, [], "Input is empty. Please enter numbers separated by commas."

    parsed = []
    for item in raw_items:
        try:
            val = int(item)
            parsed.append(val)
        except ValueError:
            return False, [], f"Invalid input '{item}'. Please enter valid numbers separated by commas."

    if len(parsed) > 50:
        return False, [], "Array size is too large for optimal visualization. Please enter 50 or fewer numbers."

    return True, parsed, None


def validate_target_value(target_str: str) -> Tuple[bool, Optional[int], Optional[str]]:
    """
    Validates user entered target value for searching.
    """
    if not target_str or not target_str.strip():
        return False, None, "Please enter a target value to search."
    try:
        val = int(target_str.strip())
        return True, val, None
    except ValueError:
        return False, None, f"Invalid target '{target_str}'. Please enter a valid integer."


def generate_random_array(size: int = 10, min_val: int = 5, max_val: int = 100) -> List[int]:
    """Generates a random list of integers."""
    if min_val > max_val:
        min_val, max_val = max_val, min_val
    return [random.randint(min_val, max_val) for _ in range(size)]


def create_sorting_chart(
    arr: List[int],
    comparing: List[int] = None,
    swapping: List[int] = None,
    sorted_indices: List[int] = None,
    title: str = "Array State"
) -> go.Figure:
    """
    Creates an interactive Plotly bar chart representing array elements.
    Heights reflect values. Colors indicate state (default, comparing, swapping, sorted).
    """
    comparing = comparing or []
    swapping = swapping or []
    sorted_indices = sorted_indices or []

    colors = []
    border_colors = []

    for idx, val in enumerate(arr):
        if idx in swapping:
            # Elements being swapped (Red / Rose)
            colors.append("rgba(239, 68, 68, 0.9)")
            border_colors.append("#dc2626")
        elif idx in comparing:
            # Elements being compared (Yellow / Amber)
            colors.append("rgba(245, 158, 11, 0.95)")
            border_colors.append("#d97706")
        elif idx in sorted_indices:
            # Elements in final sorted position (Green / Emerald)
            colors.append("rgba(16, 185, 129, 0.9)")
            border_colors.append("#059669")
        else:
            # Default state (Tech Indigo / Blue)
            colors.append("rgba(79, 70, 229, 0.8)")
            border_colors.append("#4338ca")

    x_labels = [f"[{i}]<br><b>{val}</b>" for i, val in enumerate(arr)]

    fig = go.Figure(
        data=[
            go.Bar(
                x=x_labels,
                y=arr,
                marker=dict(
                    color=colors,
                    line=dict(color=border_colors, width=2)
                ),
                text=[str(v) for v in arr],
                textposition="outside",
                textfont=dict(color="#f8fafc", size=13, family="monospace"),
                hoverinfo="text",
                hovertext=[f"Index: {i}<br>Value: {v}" for i, v in enumerate(arr)]
            )
        ]
    )

    y_max = max(arr) if arr else 10
    y_min = min(arr) if arr else 0
    padding = max(int(abs(y_max) * 0.25), 5)

    fig.update_layout(
        template="plotly_dark",
        paper_bgcolor="#0b0f19",
        plot_bgcolor="#111827",
        margin=dict(l=30, r=30, t=40, b=40),
        height=380,
        xaxis=dict(
            title="Array Indices & Values",
            titlefont=dict(color="#94a3b8", size=12),
            tickfont=dict(color="#cbd5e1", size=11),
            gridcolor="rgba(148, 163, 184, 0.08)"
        ),
        yaxis=dict(
            title="Element Value",
            titlefont=dict(color="#94a3b8", size=12),
            tickfont=dict(color="#cbd5e1", size=11),
            range=[min(0, y_min - padding), y_max + padding],
            gridcolor="rgba(148, 163, 184, 0.08)"
        ),
        showlegend=False
    )

    return fig


def create_searching_chart(
    arr: List[int],
    current: int = -1,
    low: int = -1,
    mid: int = -1,
    high: int = -1,
    found_index: int = -1,
    target: int = 0
) -> go.Figure:
    """
    Creates an interactive Plotly bar chart for Searching algorithms.
    Shows pointers for Low, Mid, High, current inspection, and found element.
    """
    colors = []
    border_colors = []
    n = len(arr)

    is_binary = (low != -1 and high != -1)

    for idx, val in enumerate(arr):
        if idx == found_index:
            # Target found
            colors.append("rgba(16, 185, 129, 0.95)")
            border_colors.append("#059669")
        elif idx == current or idx == mid:
            # Currently inspected element
            colors.append("rgba(245, 158, 11, 0.95)")
            border_colors.append("#d97706")
        elif is_binary and (idx < low or idx > high):
            # Out of current binary search range
            colors.append("rgba(51, 65, 85, 0.4)")
            border_colors.append("#1e293b")
        else:
            # Active candidate element
            colors.append("rgba(79, 70, 229, 0.75)")
            border_colors.append("#4338ca")

    annotations = []
    for idx in range(n):
        pointer_labels = []
        if is_binary:
            if idx == low:
                pointer_labels.append("LOW")
            if idx == mid:
                pointer_labels.append("MID")
            if idx == high:
                pointer_labels.append("HIGH")
        else:
            if idx == current:
                pointer_labels.append("CHECKING")

        if pointer_labels:
            annotations.append(
                dict(
                    x=idx,
                    y=arr[idx],
                    text="<br>".join(pointer_labels),
                    showarrow=True,
                    arrowhead=2,
                    arrowcolor="#38bdf8",
                    font=dict(color="#38bdf8", size=11, family="monospace"),
                    yshift=20
                )
            )

    x_labels = [f"[{i}]<br><b>{val}</b>" for i, val in enumerate(arr)]

    fig = go.Figure(
        data=[
            go.Bar(
                x=x_labels,
                y=arr,
                marker=dict(color=colors, line=dict(color=border_colors, width=2)),
                text=[str(v) for v in arr],
                textposition="outside",
                textfont=dict(color="#f8fafc", size=13, family="monospace"),
                hoverinfo="text",
                hovertext=[f"Index: {i}<br>Value: {v}" for i, v in enumerate(arr)]
            )
        ]
    )

    y_max = max(arr) if arr else 10
    padding = max(int(abs(y_max) * 0.35), 8)

    fig.update_layout(
        template="plotly_dark",
        paper_bgcolor="#0b0f19",
        plot_bgcolor="#111827",
        margin=dict(l=30, r=30, t=40, b=40),
        height=380,
        annotations=annotations,
        xaxis=dict(
            title=f"Array Elements (Searching for Target = {target})",
            titlefont=dict(color="#94a3b8", size=12),
            tickfont=dict(color="#cbd5e1", size=11),
            gridcolor="rgba(148, 163, 184, 0.08)"
        ),
        yaxis=dict(
            title="Element Value",
            titlefont=dict(color="#94a3b8", size=12),
            range=[0, y_max + padding],
            gridcolor="rgba(148, 163, 184, 0.08)"
        ),
        showlegend=False
    )

    return fig


# Detailed Algorithm Information Catalog
ALGORITHMS_INFO: Dict[str, Dict[str, Any]] = {
    "Bubble Sort": {
        "type": "sorting",
        "name": "Bubble Sort",
        "description": "Bubble Sort is a simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Larger elements gradually 'bubble up' to the end of the array with each pass.",
        "working": [
            "1. Start at the first element (index 0) and compare it with the next element (index 1).",
            "2. If the current element is greater than the next element, swap them.",
            "3. Move to the next pair of elements and repeat the comparison and swap until reaching the end of the unsorted segment.",
            "4. At the end of pass 1, the largest element is placed at the final index.",
            "5. Repeat passes for the remaining unsorted subarray until no swaps are needed (or n-1 passes complete)."
        ],
        "best_time": "O(n)",
        "avg_time": "O(n²)",
        "worst_time": "O(n²)",
        "space": "O(1)",
        "pseudocode": """procedure bubbleSort(A : list of sortable items)
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
end procedure""",
        "python_code": """def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr""",
        "cpp_code": """#include <iostream>
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
}"""
    },
    "Selection Sort": {
        "type": "sorting",
        "name": "Selection Sort",
        "description": "Selection Sort divides the array into a sorted and an unsorted subarray. In every iteration, it finds the smallest element from the unsorted segment and exchanges it with the first unsorted element, expanding the sorted subarray by one.",
        "working": [
            "1. Initialize the boundary of the unsorted subarray to start at index 0.",
            "2. Scan through all elements in the unsorted subarray to find the minimum value.",
            "3. Swap this minimum element with the element at the beginning of the unsorted section.",
            "4. Increment the sorted boundary by one.",
            "5. Repeat until the entire array is sorted."
        ],
        "best_time": "O(n²)",
        "avg_time": "O(n²)",
        "worst_time": "O(n²)",
        "space": "O(1)",
        "pseudocode": """procedure selectionSort(A : list of sortable items)
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
end procedure""",
        "python_code": """def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr""",
        "cpp_code": """#include <iostream>
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
}"""
    },
    "Insertion Sort": {
        "type": "sorting",
        "name": "Insertion Sort",
        "description": "Insertion Sort builds the final sorted array one item at a time. It takes an unsorted element ('key') and shifts all larger elements in the already sorted subarray to the right, inserting the key into its appropriate slot.",
        "working": [
            "1. Treat the first element (index 0) as already sorted.",
            "2. Pick the next element (index i) as the 'key'.",
            "3. Compare the key with elements in the sorted subarray from right to left.",
            "4. Shift any elements greater than the key one position to the right.",
            "5. Insert the key into the vacant position and repeat for all elements."
        ],
        "best_time": "O(n)",
        "avg_time": "O(n²)",
        "worst_time": "O(n²)",
        "space": "O(1)",
        "pseudocode": """procedure insertionSort(A : list of sortable items)
    for i = 1 to length(A) - 1 do
        key = A[i]
        j = i - 1
        while j >= 0 and A[j] > key do
            A[j + 1] = A[j]
            j = j - 1
        end while
        A[j + 1] = key
    end for
end procedure""",
        "python_code": """def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr""",
        "cpp_code": """#include <iostream>
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
}"""
    },
    "Merge Sort": {
        "type": "sorting",
        "name": "Merge Sort",
        "description": "Merge Sort is an efficient, divide-and-conquer, comparison-based algorithm. It repeatedly splits the unsorted list into halves until each sublist has 1 element, then repeatedly merges those sublists to produce a completely sorted array.",
        "working": [
            "1. Divide the unsorted array into two roughly equal halves at the midpoint.",
            "2. Recursively apply Merge Sort to the left half.",
            "3. Recursively apply Merge Sort to the right half.",
            "4. Merge the two sorted halves into a single combined sorted array by comparing front elements.",
            "5. Copy merged elements back to the original array segment."
        ],
        "best_time": "O(n log n)",
        "avg_time": "O(n log n)",
        "worst_time": "O(n log n)",
        "space": "O(n)",
        "pseudocode": """procedure mergeSort(A : list, start, end)
    if start < end then
        mid = (start + end) / 2
        mergeSort(A, start, mid)
        mergeSort(A, mid + 1, end)
        merge(A, start, mid, end)
    end if
end procedure""",
        "python_code": """def merge_sort(arr):
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
    return merged""",
        "cpp_code": """#include <iostream>
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
}"""
    },
    "Quick Sort": {
        "type": "sorting",
        "name": "Quick Sort",
        "description": "Quick Sort is a highly efficient divide-and-conquer algorithm. It selects a 'pivot' element and partitions the array such that all elements smaller than the pivot precede it, and all larger elements follow it, recursively repeating this for subarrays.",
        "working": [
            "1. Choose a pivot element from the array (e.g., the last element in Lomuto partition).",
            "2. Partition: rearrange the array so that elements < pivot are placed to the left, and elements > pivot to the right.",
            "3. Place the pivot into its final partitioned position.",
            "4. Recursively apply Quick Sort to the subarray to the left of the pivot.",
            "5. Recursively apply Quick Sort to the subarray to the right of the pivot."
        ],
        "best_time": "O(n log n)",
        "avg_time": "O(n log n)",
        "worst_time": "O(n²)",
        "space": "O(log n)",
        "pseudocode": """procedure quickSort(A : list, low, high)
    if low < high then
        pi = partition(A, low, high)
        quickSort(A, low, pi - 1)
        quickSort(A, pi + 1, high)
    end if
end procedure""",
        "python_code": """def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[-1]
    left = [x for x in arr[:-1] if x <= pivot]
    right = [x for x in arr[:-1] if x > pivot]
    return quick_sort(left) + [pivot] + quick_sort(right)""",
        "cpp_code": """#include <iostream>
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
}"""
    },
    "Linear Search": {
        "type": "searching",
        "name": "Linear Search",
        "description": "Linear Search is a straightforward search algorithm that checks every element in the list sequentially from the beginning until a match is found or the end of the array is reached. It works on both sorted and unsorted lists.",
        "working": [
            "1. Start from the very first element (index 0).",
            "2. Compare the current array element with the target value.",
            "3. If current element equals target, return current index as 'Found'.",
            "4. If not equal, advance to the next index.",
            "5. If the end of the array is reached without finding target, report 'Not Found'."
        ],
        "best_time": "O(1)",
        "avg_time": "O(n)",
        "worst_time": "O(n)",
        "space": "O(1)",
        "pseudocode": """procedure linearSearch(A : list, target)
    for i = 0 to length(A) - 1 do
        if A[i] == target then
            return i
        end if
    end for
    return -1
end procedure""",
        "python_code": """def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1""",
        "cpp_code": """#include <iostream>
#include <vector>

int linearSearch(const std::vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}"""
    },
    "Binary Search": {
        "type": "searching",
        "name": "Binary Search",
        "description": "Binary Search is a highly efficient search algorithm that finds the position of a target value within a sorted array. It repeatedly divides the search interval in half by comparing the target with the middle element.",
        "working": [
            "1. Ensure the array is sorted in ascending order.",
            "2. Set search boundaries: Low = 0, High = length - 1.",
            "3. Calculate the middle index: Mid = (Low + High) / 2.",
            "4. If element at Mid equals target, search is complete (Target Found).",
            "5. If target is less than Mid element, search the left half by setting High = Mid - 1.",
            "6. If target is greater than Mid element, search the right half by setting Low = Mid + 1.",
            "7. Repeat while Low <= High. If Low > High, target is Not Found."
        ],
        "best_time": "O(1)",
        "avg_time": "O(log n)",
        "worst_time": "O(log n)",
        "space": "O(1)",
        "pseudocode": """procedure binarySearch(A : sorted list, target)
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
end procedure""",
        "python_code": """def binary_search(arr, target):
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
    return -1""",
        "cpp_code": """#include <iostream>
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
}"""
    }
}
