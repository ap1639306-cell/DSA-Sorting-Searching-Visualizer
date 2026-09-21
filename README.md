# DSA Sorting & Searching Visualizer

Understand algorithms through interactive visualization.

[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Streamlit](https://img.shields.io/badge/Streamlit-1.32+-FF4B4B?style=for-the-badge&logo=streamlit&logoColor=white)](https://streamlit.io)
[![Plotly](https://img.shields.io/badge/Plotly-5.19+-3F4F75?style=for-the-badge&logo=plotly&logoColor=white)](https://plotly.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A modern, interactive web application engineered specifically for Computer Engineering students and software developers learning core Data Structures and Algorithms. The application bridges the gap between theoretical algorithm analysis and practical visual intuition with step-by-step animations, real-time comparison/swap counters, and comprehensive complexity matrices.

---

## 📌 About

Algorithms can feel abstract when presented solely through pseudocode or asymptotic equations. **DSA Sorting & Searching Visualizer** provides an intuitive, interactive environment where every comparison, swap, pivot partition, and range narrowing is visualized step-by-step in real time. 

Built with **Python**, **Streamlit**, and **Plotly**, the application features a dark-themed, responsive dashboard designed according to modern UI/UX engineering principles.

---

## ✨ Features

- **Step-by-Step Visualization**: Watch algorithms execute incrementally with full control (`Start`, `Pause`, `Next Step`, `Reset`, and a `Speed Slider`).
- **Real-Time Diagnostics**: Dynamic status indicators reporting active comparisons, element swaps/shifts, current step ratio, and granular action descriptions.
- **Accurate Mathematical Visuals**: Array elements rendered as vertical bars whose heights accurately scale with their integer values.
- **Color-Coded State Transitions**:
  - 🔵 **Indigo**: Default unvisited element
  - 🟡 **Amber**: Elements currently being compared / inspected
  - 🔴 **Crimson**: Elements being swapped or shifted
  - 🟢 **Emerald**: Elements finalized in their sorted position or target found
- **Custom & Random Array Generation**: Enter arbitrary comma-separated integers or configure automated random array generation with custom size, min, and max ranges.
- **Input Validation**: Robust validation preventing application crashes on empty strings, non-numeric characters, extreme boundaries, and edge cases.
- **Sorted Verification for Binary Search**: Detects whether an array is sorted prior to binary search and offers a one-click automatic sorting feature.
- **Side-by-Side Implementations**: Complete Python and C++ source code provided alongside detailed pseudocode and explanations for every algorithm.
- **Formal Big-O Complexity Matrix**: Complete reference table covering Best, Average, and Worst-case time complexities, auxiliary space, and algorithm stability.

---

## 🚀 Algorithms Implemented

### 1. Sorting Algorithms
- **Bubble Sort**: Pairwise adjacent comparison and bubbling up of maximum elements.
- **Selection Sort**: Iterative scanning and extraction of minimum elements.
- **Insertion Sort**: Incremental shifting of larger elements into an expanding sorted subarray.
- **Merge Sort**: Divide-and-conquer recursive partitioning and linear two-way merging.
- **Quick Sort**: Divide-and-conquer pivot partitioning scheme (Lomuto partition).

### 2. Searching Algorithms
- **Linear Search**: Sequential evaluation across all array indices.
- **Binary Search**: Logarithmic interval halving using Low, Mid, and High pointers on sorted data.

---

## 💻 Tech Stack

- **Core Language**: Python 3.9+
- **Application Framework**: [Streamlit](https://streamlit.io)
- **Interactive Visualization**: [Plotly Graph Objects](https://plotly.com/python/)
- **Numerical Processing**: [NumPy](https://numpy.org) & [Pandas](https://pandas.pydata.org)
- **Custom Styling**: Clean, modern CSS with dark tech aesthetic (`assets/style.css`)
- **Zero Paid Dependencies**: Runs completely offline, free of databases, third-party authentication, or paid APIs.

---

## 📂 Project Structure

```text
DSA-Visualizer/
│
├── app.py                   # Main Streamlit web application & routing
├── requirements.txt         # Project dependencies
├── README.md                # Comprehensive documentation
│
├── algorithms/
│   ├── __init__.py          # Module initialization
│   ├── sorting.py           # Bubble, Selection, Insertion, Merge, Quick Sort implementations
│   └── searching.py         # Linear and Binary Search implementations
│
├── utils/
│   ├── __init__.py          # Module initialization
│   └── helpers.py           # Validation, random generation, Plotly charting, metadata
│
└── assets/
    └── style.css            # Dark technology UI styling
```

---

## ⚙️ Installation

1. **Clone the repository:**
   ```bash
   git clone YOUR_REPOSITORY_URL
   cd DSA-Visualizer
   ```

2. **Create and activate a virtual environment (recommended):**
   ```bash
   # On macOS/Linux
   python3 -m venv venv
   source venv/bin/activate

   # On Windows
   python -m venv venv
   venv\Scripts\activate
   ```

3. **Install required dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Launch the application:**
   ```bash
   streamlit run app.py
   ```

The application will launch in your default web browser at `http://localhost:8501`.

---

## 📖 How to Use

### 1. Sorting Visualizer
1. Navigate to the **Sorting** tab from the sidebar.
2. Choose your input method:
   - **Enter Manually**: Enter comma-separated values (e.g., `64, 25, 12, 22, 11`) and click **Apply Array**.
   - **Generate Random Array**: Choose the array size, minimum value, maximum value, and click **Generate Random**.
3. Select your desired sorting algorithm from the dropdown.
4. Adjust the **Speed slider** according to your preference.
5. Click **▶ Start** to run the animated sort, or click **⏭ Next Step** to step through comparisons one by one.
6. Observe the **Current Step** box, comparisons counter, and swaps counter updating dynamically.
7. Upon completion, review the **Sorting Completed** summary panel with final statistics.

### 2. Searching Visualizer
1. Navigate to the **Searching** tab from the sidebar.
2. Enter an array (or generate a random one) and set your **Target Value**.
3. Select **Linear Search** or **Binary Search**.
   - If Binary Search is selected on an unsorted array, the visualizer prompts you to sort it or enables **☑ Automatically sort before Binary Search**.
4. Click **▶ Start Search** or step forward with **⏭ Next Search Step**.
5. Observe the pointer markers (`CHECKING` for Linear Search; `LOW`, `MID`, `HIGH` with active candidate range for Binary Search).
6. Review the **Search Result** card displaying target presence, index, and total comparisons.

---

## 📸 Screenshots

> *Placeholder: Add your project screenshots here before publishing your portfolio.*

### Landing Dashboard
![Landing Dashboard Placeholder](https://via.placeholder.com/1000x500/0b0f19/818cf8?text=DSA+Sorting+%26+Searching+Visualizer+-+Landing+Dashboard)

### Sorting in Action
![Sorting Visualizer Placeholder](https://via.placeholder.com/1000x500/0b0f19/38bdf8?text=Sorting+Visualization+with+Plotly+and+Real-time+Counters)

### Binary Search Range Division
![Binary Search Placeholder](https://via.placeholder.com/1000x500/0b0f19/10b981?text=Binary+Search+with+Low%2C+Mid%2C+High+Pointers)

---

## 📊 Complexity Table

| Algorithm | Best Case Time | Average Case Time | Worst Case Time | Space Complexity | Stable? |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Bubble Sort** | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes |
| **Selection Sort** | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | No |
| **Insertion Sort** | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes |
| **Merge Sort** | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ | Yes |
| **Quick Sort** | $O(n \log n)$ | $O(n \log n)$ | $O(n^2)$ | $O(\log n)$ | No |
| **Heap Sort** | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(1)$ | No |
| **Linear Search** | $O(1)$ | $O(n)$ | $O(n)$ | $O(1)$ | N/A |
| **Binary Search** | $O(1)$ | $O(\log n)$ | $O(\log n)$ | $O(1)$ | N/A |

---

## 🔮 Future Improvements

While this version focuses intentionally and strictly on Sorting and Searching fundamentals, planned future modules include:

- **Stack Visualizer**: Push, pop, peek, and expression evaluation.
- **Queue Visualizer**: Circular queues, priority queues, and double-ended queues (deque).
- **Linked List Visualizer**: Singly, doubly, and circular linked lists with node insertion/deletion.
- **Tree Visualizer**: Binary search trees (BST), AVL balance rotations, and tree traversals (Inorder, Preorder, Postorder).
- **Graph Visualizer**: Adjacency list/matrix representation and interactive graph canvas.
- **Dijkstra Visualization**: Shortest path step-by-step discovery on weighted graphs.
- **BFS & DFS Visualizations**: Breadth-First and Depth-First search state discovery queues and stacks.

---

## 👤 Author

**Created by: Abhijit Pawar**  
*Computer Engineering Student & Algorithm Enthusiast*

---

## 📄 License

This project is licensed under the MIT License - feel free to use and adapt it for educational and portfolio purposes.
