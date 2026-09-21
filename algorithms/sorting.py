"""
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
    """
    Executes Bubble Sort and records every step of execution.
    Returns a list of step dictionaries.
    """
    a = arr.copy()
    n = len(a)
    steps = []
    comparisons = 0
    swaps = 0
    sorted_indices = []

    # Initial state
    steps.append({
        "array": a.copy(),
        "comparing": [],
        "swapping": [],
        "sorted": sorted_indices.copy(),
        "action": "Starting Bubble Sort",
        "comparisons": comparisons,
        "swaps": swaps,
        "details": f"Initial array of {n} elements"
    })

    if n <= 1:
        steps.append({
            "array": a.copy(),
            "comparing": [],
            "swapping": [],
            "sorted": list(range(n)),
            "action": "Already sorted",
            "comparisons": 0,
            "swaps": 0,
            "details": "Single-element array is trivially sorted"
        })
        return steps

    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            comparisons += 1
            # Comparison step
            steps.append({
                "array": a.copy(),
                "comparing": [j, j + 1],
                "swapping": [],
                "sorted": sorted_indices.copy(),
                "action": "Comparing elements",
                "comparisons": comparisons,
                "swaps": swaps,
                "details": f"Comparing {a[j]} and {a[j + 1]}"
            })

            if a[j] > a[j + 1]:
                # Swap required
                a[j], a[j + 1] = a[j + 1], a[j]
                swaps += 1
                swapped = True
                steps.append({
                    "array": a.copy(),
                    "comparing": [],
                    "swapping": [j, j + 1],
                    "sorted": sorted_indices.copy(),
                    "action": "Swap required",
                    "comparisons": comparisons,
                    "swaps": swaps,
                    "details": f"Swapped {a[j + 1]} and {a[j]} ({a[j + 1]} > {a[j]})"
                })
            else:
                steps.append({
                    "array": a.copy(),
                    "comparing": [j, j + 1],
                    "swapping": [],
                    "sorted": sorted_indices.copy(),
                    "action": "No swap needed",
                    "comparisons": comparisons,
                    "swaps": swaps,
                    "details": f"{a[j]} <= {a[j + 1]}, order is correct"
                })

        # The element at n - i - 1 is now in its final sorted position
        sorted_indices.append(n - i - 1)
        steps.append({
            "array": a.copy(),
            "comparing": [],
            "swapping": [],
            "sorted": sorted_indices.copy(),
            "action": "Element placed in sorted position",
            "comparisons": comparisons,
            "swaps": swaps,
            "details": f"Element {a[n - i - 1]} at index {n - i - 1} is now sorted"
        })

        if not swapped:
            # Array is completely sorted early
            sorted_indices = list(range(n))
            steps.append({
                "array": a.copy(),
                "comparing": [],
                "swapping": [],
                "sorted": sorted_indices.copy(),
                "action": "Early termination",
                "comparisons": comparisons,
                "swaps": swaps,
                "details": "No swaps occurred in this pass; array is fully sorted"
            })
            break

    # Final completed step
    steps.append({
        "array": a.copy(),
        "comparing": [],
        "swapping": [],
        "sorted": list(range(n)),
        "action": "Sorting Completed",
        "comparisons": comparisons,
        "swaps": swaps,
        "details": "All elements successfully sorted"
    })

    return steps


def selection_sort(arr: List[int]) -> List[Dict[str, Any]]:
    """
    Executes Selection Sort and records every step of execution.
    """
    a = arr.copy()
    n = len(a)
    steps = []
    comparisons = 0
    swaps = 0
    sorted_indices = []

    steps.append({
        "array": a.copy(),
        "comparing": [],
        "swapping": [],
        "sorted": sorted_indices.copy(),
        "action": "Starting Selection Sort",
        "comparisons": comparisons,
        "swaps": swaps,
        "details": f"Array of {n} elements"
    })

    if n <= 1:
        steps.append({
            "array": a.copy(),
            "comparing": [],
            "swapping": [],
            "sorted": list(range(n)),
            "action": "Sorting Completed",
            "comparisons": 0,
            "swaps": 0,
            "details": "Array is sorted"
        })
        return steps

    for i in range(n):
        min_idx = i
        steps.append({
            "array": a.copy(),
            "comparing": [min_idx],
            "swapping": [],
            "sorted": sorted_indices.copy(),
            "action": "Finding minimum element",
            "comparisons": comparisons,
            "swaps": swaps,
            "details": f"Initial minimum for pass {i + 1} is {a[min_idx]} at index {min_idx}"
        })

        for j in range(i + 1, n):
            comparisons += 1
            steps.append({
                "array": a.copy(),
                "comparing": [min_idx, j],
                "swapping": [],
                "sorted": sorted_indices.copy(),
                "action": "Comparing with current minimum",
                "comparisons": comparisons,
                "swaps": swaps,
                "details": f"Comparing candidate {a[j]} with current minimum {a[min_idx]}"
            })

            if a[j] < a[min_idx]:
                min_idx = j
                steps.append({
                    "array": a.copy(),
                    "comparing": [min_idx],
                    "swapping": [],
                    "sorted": sorted_indices.copy(),
                    "action": "New minimum found",
                    "comparisons": comparisons,
                    "swaps": swaps,
                    "details": f"New minimum value is {a[min_idx]} at index {min_idx}"
                })

        if min_idx != i:
            a[i], a[min_idx] = a[min_idx], a[i]
            swaps += 1
            steps.append({
                "array": a.copy(),
                "comparing": [],
                "swapping": [i, min_idx],
                "sorted": sorted_indices.copy(),
                "action": "Swap required",
                "comparisons": comparisons,
                "swaps": swaps,
                "details": f"Swapping minimum {a[i]} with element at index {i}"
            })
        else:
            steps.append({
                "array": a.copy(),
                "comparing": [i],
                "swapping": [],
                "sorted": sorted_indices.copy(),
                "action": "Element already in place",
                "comparisons": comparisons,
                "swaps": swaps,
                "details": f"Element {a[i]} is already at the correct position {i}"
            })

        sorted_indices.append(i)

    steps.append({
        "array": a.copy(),
        "comparing": [],
        "swapping": [],
        "sorted": list(range(n)),
        "action": "Sorting Completed",
        "comparisons": comparisons,
        "swaps": swaps,
        "details": "Selection Sort completed"
    })

    return steps


def insertion_sort(arr: List[int]) -> List[Dict[str, Any]]:
    """
    Executes Insertion Sort and records every step of execution.
    """
    a = arr.copy()
    n = len(a)
    steps = []
    comparisons = 0
    swaps = 0
    sorted_indices = [0] if n > 0 else []

    steps.append({
        "array": a.copy(),
        "comparing": [],
        "swapping": [],
        "sorted": sorted_indices.copy(),
        "action": "Starting Insertion Sort",
        "comparisons": comparisons,
        "swaps": swaps,
        "details": f"First element {a[0] if n > 0 else ''} is considered sorted"
    })

    for i in range(1, n):
        key = a[i]
        j = i - 1

        steps.append({
            "array": a.copy(),
            "comparing": [i],
            "swapping": [],
            "sorted": sorted_indices.copy(),
            "action": "Selecting key element",
            "comparisons": comparisons,
            "swaps": swaps,
            "details": f"Inserting key = {key} from index {i} into sorted subarray [0..{i-1}]"
        })

        while j >= 0:
            comparisons += 1
            steps.append({
                "array": a.copy(),
                "comparing": [j, j + 1],
                "swapping": [],
                "sorted": sorted_indices.copy(),
                "action": "Comparing with sorted element",
                "comparisons": comparisons,
                "swaps": swaps,
                "details": f"Comparing key {key} with {a[j]}"
            })

            if a[j] > key:
                a[j + 1] = a[j]
                swaps += 1
                steps.append({
                    "array": a.copy(),
                    "comparing": [],
                    "swapping": [j, j + 1],
                    "sorted": sorted_indices.copy(),
                    "action": "Shift required",
                    "comparisons": comparisons,
                    "swaps": swaps,
                    "details": f"Shifted {a[j]} right to index {j + 1}"
                })
                j -= 1
            else:
                break

        a[j + 1] = key
        sorted_indices = list(range(i + 1))
        steps.append({
            "array": a.copy(),
            "comparing": [],
            "swapping": [j + 1],
            "sorted": sorted_indices.copy(),
            "action": "Key inserted",
            "comparisons": comparisons,
            "swaps": swaps,
            "details": f"Inserted key {key} at position {j + 1}"
        })

    steps.append({
        "array": a.copy(),
        "comparing": [],
        "swapping": [],
        "sorted": list(range(n)),
        "action": "Sorting Completed",
        "comparisons": comparisons,
        "swaps": swaps,
        "details": "Insertion Sort completed"
    })

    return steps


def merge_sort(arr: List[int]) -> List[Dict[str, Any]]:
    """
    Executes Merge Sort and records every step of execution.
    """
    a = arr.copy()
    n = len(a)
    steps = []
    comparisons = 0
    swaps = 0  # In merge sort, writes/overwrites count towards movements/swaps
    sorted_indices = []

    steps.append({
        "array": a.copy(),
        "comparing": [],
        "swapping": [],
        "sorted": sorted_indices.copy(),
        "action": "Starting Merge Sort",
        "comparisons": comparisons,
        "swaps": swaps,
        "details": f"Divide and conquer on array of size {n}"
    })

    if n <= 1:
        steps.append({
            "array": a.copy(),
            "comparing": [],
            "swapping": [],
            "sorted": list(range(n)),
            "action": "Sorting Completed",
            "comparisons": 0,
            "swaps": 0,
            "details": "Single-element array is sorted"
        })
        return steps

    def merge_sort_helper(start: int, end: int):
        nonlocal comparisons, swaps
        if start >= end:
            return

        mid = (start + end) // 2
        steps.append({
            "array": a.copy(),
            "comparing": [start, mid, end],
            "swapping": [],
            "sorted": sorted_indices.copy(),
            "action": "Dividing subarray",
            "comparisons": comparisons,
            "swaps": swaps,
            "details": f"Dividing range [{start}..{end}] at mid index {mid}"
        })

        merge_sort_helper(start, mid)
        merge_sort_helper(mid + 1, end)

        # Merge step
        left = a[start:mid + 1]
        right = a[mid + 1:end + 1]
        i = 0
        j = 0
        k = start

        steps.append({
            "array": a.copy(),
            "comparing": list(range(start, end + 1)),
            "swapping": [],
            "sorted": sorted_indices.copy(),
            "action": "Merging subarrays",
            "comparisons": comparisons,
            "swaps": swaps,
            "details": f"Merging [{start}..{mid}] ({left}) and [{mid+1}..{end}] ({right})"
        })

        while i < len(left) and j < len(right):
            comparisons += 1
            steps.append({
                "array": a.copy(),
                "comparing": [start + i, mid + 1 + j],
                "swapping": [],
                "sorted": sorted_indices.copy(),
                "action": "Comparing subarray elements",
                "comparisons": comparisons,
                "swaps": swaps,
                "details": f"Comparing left element {left[i]} and right element {right[j]}"
            })

            if left[i] <= right[j]:
                a[k] = left[i]
                i += 1
            else:
                a[k] = right[j]
                j += 1
            swaps += 1

            steps.append({
                "array": a.copy(),
                "comparing": [],
                "swapping": [k],
                "sorted": sorted_indices.copy(),
                "action": "Merged element placed",
                "comparisons": comparisons,
                "swaps": swaps,
                "details": f"Placed {a[k]} at index {k}"
            })
            k += 1

        while i < len(left):
            a[k] = left[i]
            i += 1
            k += 1
            swaps += 1
            steps.append({
                "array": a.copy(),
                "comparing": [],
                "swapping": [k - 1],
                "sorted": sorted_indices.copy(),
                "action": "Remaining left element placed",
                "comparisons": comparisons,
                "swaps": swaps,
                "details": f"Placed remaining left element {a[k-1]} at index {k-1}"
            })

        while j < len(right):
            a[k] = right[j]
            j += 1
            k += 1
            swaps += 1
            steps.append({
                "array": a.copy(),
                "comparing": [],
                "swapping": [k - 1],
                "sorted": sorted_indices.copy(),
                "action": "Remaining right element placed",
                "comparisons": comparisons,
                "swaps": swaps,
                "details": f"Placed remaining right element {a[k-1]} at index {k-1}"
            })

        if start == 0 and end == n - 1:
            sorted_indices.extend(list(range(n)))

    merge_sort_helper(0, n - 1)

    steps.append({
        "array": a.copy(),
        "comparing": [],
        "swapping": [],
        "sorted": list(range(n)),
        "action": "Sorting Completed",
        "comparisons": comparisons,
        "swaps": swaps,
        "details": "Merge Sort completed successfully"
    })

    return steps


def quick_sort(arr: List[int]) -> List[Dict[str, Any]]:
    """
    Executes Quick Sort using Lomuto partition scheme and records every step.
    """
    a = arr.copy()
    n = len(a)
    steps = []
    comparisons = 0
    swaps = 0
    sorted_indices = []

    steps.append({
        "array": a.copy(),
        "comparing": [],
        "swapping": [],
        "sorted": sorted_indices.copy(),
        "action": "Starting Quick Sort",
        "comparisons": comparisons,
        "swaps": swaps,
        "details": f"Quick Sort on array of size {n}"
    })

    if n <= 1:
        steps.append({
            "array": a.copy(),
            "comparing": [],
            "swapping": [],
            "sorted": list(range(n)),
            "action": "Sorting Completed",
            "comparisons": 0,
            "swaps": 0,
            "details": "Array is sorted"
        })
        return steps

    def partition(low: int, high: int) -> int:
        nonlocal comparisons, swaps
        pivot = a[high]
        pivot_idx = high

        steps.append({
            "array": a.copy(),
            "comparing": [pivot_idx],
            "swapping": [],
            "sorted": sorted_indices.copy(),
            "action": "Pivot chosen",
            "comparisons": comparisons,
            "swaps": swaps,
            "details": f"Chosen pivot {pivot} at index {high} for range [{low}..{high}]"
        })

        i = low - 1
        for j in range(low, high):
            comparisons += 1
            steps.append({
                "array": a.copy(),
                "comparing": [j, high],
                "swapping": [],
                "sorted": sorted_indices.copy(),
                "action": "Comparing with pivot",
                "comparisons": comparisons,
                "swaps": swaps,
                "details": f"Comparing element {a[j]} with pivot {pivot}"
            })

            if a[j] <= pivot:
                i += 1
                if i != j:
                    a[i], a[j] = a[j], a[i]
                    swaps += 1
                    steps.append({
                        "array": a.copy(),
                        "comparing": [],
                        "swapping": [i, j],
                        "sorted": sorted_indices.copy(),
                        "action": "Swap required",
                        "comparisons": comparisons,
                        "swaps": swaps,
                        "details": f"Swapping {a[i]} and {a[j]} to move smaller element left"
                    })

        # Place pivot at correct position
        a[i + 1], a[high] = a[high], a[i + 1]
        swaps += 1
        steps.append({
            "array": a.copy(),
            "comparing": [],
            "swapping": [i + 1, high],
            "sorted": sorted_indices.copy(),
            "action": "Pivot placed at partition index",
            "comparisons": comparisons,
            "swaps": swaps,
            "details": f"Placed pivot {pivot} at final partitioned index {i + 1}"
        })
        sorted_indices.append(i + 1)
        return i + 1

    def quick_sort_helper(low: int, high: int):
        if low < high:
            pi = partition(low, high)
            quick_sort_helper(low, pi - 1)
            quick_sort_helper(pi + 1, high)
        elif low == high and low not in sorted_indices:
            sorted_indices.append(low)

    quick_sort_helper(0, n - 1)

    steps.append({
        "array": a.copy(),
        "comparing": [],
        "swapping": [],
        "sorted": list(range(n)),
        "action": "Sorting Completed",
        "comparisons": comparisons,
        "swaps": swaps,
        "details": "Quick Sort completed successfully"
    })

    return steps
