"""
Searching Algorithms Implementation for DSA Visualizer
Includes step-by-step recording of states, comparisons, and pointers for:
1. Linear Search
2. Binary Search
"""

from typing import List, Dict, Any, Tuple


def is_array_sorted(arr: List[int]) -> bool:
    """Checks if the array is sorted in non-decreasing order."""
    for i in range(len(arr) - 1):
        if arr[i] > arr[i + 1]:
            return False
    return True


def linear_search(arr: List[int], target: int) -> Tuple[List[Dict[str, Any]], bool, int]:
    """
    Executes Linear Search and records each step.
    Returns: (steps, found, found_index)
    """
    steps = []
    comparisons = 0
    n = len(arr)

    steps.append({
        "array": arr.copy(),
        "current": -1,
        "found": False,
        "found_index": -1,
        "comparisons": comparisons,
        "action": "Starting Linear Search",
        "details": f"Searching for target value {target} in array of {n} elements"
    })

    if n == 0:
        steps.append({
            "array": arr.copy(),
            "current": -1,
            "found": False,
            "found_index": -1,
            "comparisons": 0,
            "action": "Empty Array",
            "details": "Array is empty; target cannot be found"
        })
        return steps, False, -1

    for i in range(n):
        comparisons += 1
        is_match = (arr[i] == target)

        steps.append({
            "array": arr.copy(),
            "current": i,
            "found": is_match,
            "found_index": i if is_match else -1,
            "comparisons": comparisons,
            "action": f"Checking index {i}",
            "details": f"Comparing arr[{i}] = {arr[i]} with target {target}"
        })

        if is_match:
            steps.append({
                "array": arr.copy(),
                "current": i,
                "found": True,
                "found_index": i,
                "comparisons": comparisons,
                "action": "Target Found!",
                "details": f"Target {target} located at index {i} after {comparisons} comparison(s)"
            })
            return steps, True, i

    steps.append({
        "array": arr.copy(),
        "current": -1,
        "found": False,
        "found_index": -1,
        "comparisons": comparisons,
        "action": "Target Not Found",
        "details": f"Target {target} is not present in the array after checking all {n} elements"
    })
    return steps, False, -1


def binary_search(arr: List[int], target: int) -> Tuple[List[Dict[str, Any]], bool, int]:
    """
    Executes Binary Search on a sorted array and records each step.
    Returns: (steps, found, found_index)
    """
    steps = []
    comparisons = 0
    n = len(arr)

    steps.append({
        "array": arr.copy(),
        "low": 0 if n > 0 else -1,
        "mid": -1,
        "high": (n - 1) if n > 0 else -1,
        "current": -1,
        "found": False,
        "found_index": -1,
        "comparisons": comparisons,
        "action": "Starting Binary Search",
        "details": f"Searching for target {target} in sorted array of {n} elements"
    })

    if n == 0:
        steps.append({
            "array": arr.copy(),
            "low": -1,
            "mid": -1,
            "high": -1,
            "current": -1,
            "found": False,
            "found_index": -1,
            "comparisons": 0,
            "action": "Empty Array",
            "details": "Array is empty; target cannot be found"
        })
        return steps, False, -1

    low = 0
    high = n - 1

    while low <= high:
        mid = (low + high) // 2
        comparisons += 1

        steps.append({
            "array": arr.copy(),
            "low": low,
            "mid": mid,
            "high": high,
            "current": mid,
            "found": False,
            "found_index": -1,
            "comparisons": comparisons,
            "action": f"Checking Mid Index {mid}",
            "details": f"Low={low}, Mid={mid}, High={high}. Comparing arr[{mid}] = {arr[mid]} with target {target}"
        })

        if arr[mid] == target:
            steps.append({
                "array": arr.copy(),
                "low": low,
                "mid": mid,
                "high": high,
                "current": mid,
                "found": True,
                "found_index": mid,
                "comparisons": comparisons,
                "action": "Target Found!",
                "details": f"Target {target} found at index {mid} after {comparisons} comparison(s)"
            })
            return steps, True, mid
        elif arr[mid] < target:
            steps.append({
                "array": arr.copy(),
                "low": low,
                "mid": mid,
                "high": high,
                "current": mid,
                "found": False,
                "found_index": -1,
                "comparisons": comparisons,
                "action": "Search Right Subarray",
                "details": f"arr[{mid}] = {arr[mid]} < {target}. Target must be in right half. Setting low = {mid + 1}"
            })
            low = mid + 1
        else:
            steps.append({
                "array": arr.copy(),
                "low": low,
                "mid": mid,
                "high": high,
                "current": mid,
                "found": False,
                "found_index": -1,
                "comparisons": comparisons,
                "action": "Search Left Subarray",
                "details": f"arr[{mid}] = {arr[mid]} > {target}. Target must be in left half. Setting high = {mid - 1}"
            })
            high = mid - 1

    steps.append({
        "array": arr.copy(),
        "low": low,
        "mid": -1,
        "high": high,
        "current": -1,
        "found": False,
        "found_index": -1,
        "comparisons": comparisons,
        "action": "Target Not Found",
        "details": f"Low ({low}) crossed High ({high}). Target {target} is not in the array."
    })

    return steps, False, -1
