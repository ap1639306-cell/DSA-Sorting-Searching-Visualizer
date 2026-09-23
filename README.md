# 🚀 DSA Sorting & Searching Visualizer

An interactive **Data Structures and Algorithms (DSA) Visualizer** built with Python and Streamlit to demonstrate how common sorting and searching algorithms work step by step.

The project is designed to make DSA concepts easier to understand by visually representing algorithm operations such as **comparisons, swaps, element movement, and search operations**.

---

## 📌 Project Overview

Understanding DSA algorithms only through code and theory can sometimes be difficult.

This project provides an interactive way to experiment with algorithms by allowing users to:

* Enter their own array
* Generate a random array
* Select a sorting or searching algorithm
* Visualize algorithm execution step by step
* Control the execution speed
* Pause and resume visualization
* Move through individual steps
* View the final result
* Track comparisons and swaps

The goal is to connect **DSA theory with practical visualization**.

---

## ✨ Features

### 🔢 Sorting

The visualizer currently supports:

* **Bubble Sort**
* **Selection Sort**
* **Insertion Sort**
* **Merge Sort**
* **Quick Sort**

### 🔍 Searching

* **Linear Search**
* **Binary Search**

### 🎛️ Interactive Controls

* Manual array input
* Random array generation
* Start visualization
* Pause visualization
* Step-by-step execution
* Reset functionality
* Adjustable visualization speed

### 📊 Algorithm Information

The application provides information about:

* Time complexity
* Space complexity
* Number of comparisons
* Number of swaps/operations
* Algorithm-specific behavior

---

## 🧠 Algorithms & Complexity

| Algorithm      |  Best Case | Average Case | Worst Case |     Space |
| -------------- | ---------: | -----------: | ---------: | --------: |
| Bubble Sort    |       O(n) |        O(n²) |      O(n²) |      O(1) |
| Selection Sort |      O(n²) |        O(n²) |      O(n²) |      O(1) |
| Insertion Sort |       O(n) |        O(n²) |      O(n²) |      O(1) |
| Merge Sort     | O(n log n) |   O(n log n) | O(n log n) |      O(n) |
| Quick Sort     | O(n log n) |   O(n log n) |      O(n²) | O(log n)* |

### Searching Algorithms

| Algorithm     | Best Case | Average Case | Worst Case | Requirement          |
| ------------- | --------: | -----------: | ---------: | -------------------- |
| Linear Search |      O(1) |         O(n) |       O(n) | No sorting required  |
| Binary Search |      O(1) |     O(log n) |   O(log n) | Array must be sorted |

* Quick Sort space complexity depends on recursion depth and implementation.

---

## 🖥️ How the Visualizer Works

The application represents the algorithm's intermediate states during execution.

For example, during **Bubble Sort**, the application:

1. Compares adjacent elements.
2. Checks whether they are in the correct order.
3. Swaps them when necessary.
4. Updates the visualization.
5. Continues until the array is sorted.

This allows users to observe the algorithm rather than only seeing the final output.

For **Binary Search**, the application repeatedly divides the search range into two parts and eliminates the half that cannot contain the target.

---

## 🏗️ Project Structure

```text
DSA-Sorting-Searching-Visualizer/
│
├── app.py
│
├── algorithms/
│   ├── sorting.py
│   └── searching.py
│
├── utils/
│   └── helpers.py
│
├── assets/
│   └── style.css
│
├── requirements.txt
└── README.md
```

### File Responsibilities

**`app.py`**

Main Streamlit application responsible for the user interface and connecting the different components.

**`algorithms/sorting.py`**

Contains the sorting algorithm implementations and their visualization states.

**`algorithms/searching.py`**

Contains Linear Search and Binary Search implementations.

**`utils/helpers.py`**

Contains supporting functionality such as input handling, validation, array generation, visualization helpers and algorithm information.

**`assets/style.css`**

Contains custom styling used to improve the appearance of the application.

**`requirements.txt`**

Contains the Python dependencies required to run the project.

---

## 🛠️ Technologies Used

* **Python** – Core programming language
* **Streamlit** – Interactive web application framework
* **Plotly** – Data visualization
* **NumPy** – Numerical and array-related operations
* **Pandas** – Data manipulation
* **CSS** – Interface styling

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/ap1639306-cell/DSA-Sorting-Searching-Visualizer.git
```

### 2. Navigate to the project directory

```bash
cd DSA-Sorting-Searching-Visualizer
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the application

```bash
streamlit run app.py
```

The application will open in your browser.

---

## 📖 Example

Suppose the input array is:

```text
64, 25, 12, 22, 11
```

If **Selection Sort** is selected, the visualizer demonstrates how the algorithm repeatedly finds the smallest element from the unsorted portion and places it in its correct position.

Final result:

```text
11, 12, 22, 25, 64
```

Instead of displaying only the final result, the application helps visualize the intermediate operations.

---

## 🎯 Learning Objectives

This project helped me strengthen my understanding of:

* Sorting algorithms
* Searching algorithms
* Divide and conquer
* Time and space complexity
* Algorithm comparison
* Array manipulation
* Step-by-step algorithm execution
* Python programming
* Building interactive applications
* Connecting DSA concepts with practical software

---

## 🤖 AI-Assisted Development

This project was developed with the assistance of **Google AI Studio** as an AI-assisted development tool.

AI assistance was used during implementation and refinement of the application. I focused on understanding the underlying **DSA concepts, algorithm behavior, project structure, testing, and functionality** while developing and refining the project.

This project is also part of my ongoing learning process in **Python and Data Structures & Algorithms**.

---

## 🚧 Future Improvements

Some features I would like to explore in future versions include:

* Additional sorting algorithms
* Additional searching algorithms
* More detailed algorithm statistics
* Improved animation controls
* Linked List visualization
* Stack and Queue visualization
* Tree visualization
* Graph algorithms
* Algorithm comparison mode
* More detailed performance analysis

---

## 📸 Project Preview

Add screenshots or a short demo GIF/video here to show the visualizer in action.

```text
[Add project screenshot here]
```

---

## 🔗 Repository

**GitHub:**
https://github.com/ap1639306-cell/DSA-Sorting-Searching-Visualizer

---

## 👨‍💻 About the Project

This project was created as a practical learning project to strengthen my understanding of **Data Structures & Algorithms** and explore how algorithms can be represented through interactive visualizations.

More DSA and programming projects will be added as I continue learning and building.

---

## 📄 License

This project is intended primarily for educational and learning purposes.
