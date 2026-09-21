"""
DSA Sorting & Searching Visualizer
Main Streamlit Application
A modern, GitHub-ready portfolio application for Computer Engineering students.
"""

import os
import time
import streamlit as st
import numpy as np
import pandas as pd

from algorithms.sorting import (
    bubble_sort,
    selection_sort,
    insertion_sort,
    merge_sort,
    quick_sort
)
from algorithms.searching import (
    is_array_sorted,
    linear_search,
    binary_search
)
from utils.helpers import (
    parse_and_validate_array,
    validate_target_value,
    generate_random_array,
    create_sorting_chart,
    create_searching_chart,
    ALGORITHMS_INFO
)

# -----------------------------------------------------------------------------
# Page Configuration & Styles
# -----------------------------------------------------------------------------
st.set_page_config(
    page_title="DSA Sorting & Searching Visualizer",
    page_icon="⚡",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Load custom CSS
css_path = os.path.join(os.path.dirname(__file__), "assets", "style.css")
if os.path.exists(css_path):
    with open(css_path, "r", encoding="utf-8") as f:
        st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)


# -----------------------------------------------------------------------------
# Session State Initialization
# -----------------------------------------------------------------------------
if "page" not in st.session_state:
    st.session_state.page = "Home"

# Sorting State
if "sort_array" not in st.session_state:
    st.session_state.sort_array = [64, 25, 12, 22, 11]
if "sort_steps" not in st.session_state:
    st.session_state.sort_steps = []
if "sort_step_idx" not in st.session_state:
    st.session_state.sort_step_idx = 0
if "sort_running" not in st.session_state:
    st.session_state.sort_running = False

# Searching State
if "search_array" not in st.session_state:
    st.session_state.search_array = [10, 20, 30, 40, 50, 60, 70]
if "search_target" not in st.session_state:
    st.session_state.search_target = 40
if "search_steps" not in st.session_state:
    st.session_state.search_steps = []
if "search_step_idx" not in st.session_state:
    st.session_state.search_step_idx = 0
if "search_running" not in st.session_state:
    st.session_state.search_running = False
if "search_result" not in st.session_state:
    st.session_state.search_result = None


# -----------------------------------------------------------------------------
# Sidebar Navigation
# -----------------------------------------------------------------------------
st.sidebar.markdown("""
<div style="padding: 0.5rem 0 1rem 0;">
    <h2 style="color: #a78bfa; margin-bottom: 0.2rem; font-size: 1.35rem;">⚡ DSA Visualizer</h2>
    <p style="color: #64748b; font-size: 0.85rem; margin-top: 0;">Interactive Algorithm Studio</p>
</div>
""", unsafe_allow_html=True)

nav_options = [
    "Home",
    "Sorting",
    "Searching",
    "Algorithm Information",
    "Complexity Comparison"
]

selected_page = st.sidebar.radio(
    "Navigation",
    nav_options,
    index=nav_options.index(st.session_state.page) if st.session_state.page in nav_options else 0
)
st.session_state.page = selected_page

st.sidebar.markdown("---")
st.sidebar.markdown("""
<div style="padding: 0.5rem 0; font-size: 0.85rem; color: #94a3b8;">
    <p><b>Quick Shortcuts</b></p>
    <ul style="padding-left: 1.2rem; margin-bottom: 0.5rem; line-height: 1.6;">
        <li>Select an algorithm</li>
        <li>Set custom or random array</li>
        <li>Step through or auto-play</li>
        <li>Analyze time/space metrics</li>
    </ul>
    <p style="margin-top: 1rem; color: #64748b; font-size: 0.8rem;">
        Developed for DSA Learners<br>
        Portfolio Project by <b>Abhijit Pawar</b>
    </p>
</div>
""", unsafe_allow_html=True)


# -----------------------------------------------------------------------------
# Common Header
# -----------------------------------------------------------------------------
st.markdown("""
<div style="margin-bottom: 1.5rem; border-bottom: 1px solid rgba(139, 92, 246, 0.2); padding-bottom: 1rem;">
    <h1 style="margin: 0; font-size: 2.3rem; color: #f8fafc; font-weight: 800; letter-spacing: -0.02em;">
        DSA Sorting &amp; Searching Visualizer
    </h1>
    <p style="color: #94a3b8; font-size: 1.1rem; margin-top: 0.35rem; margin-bottom: 0;">
        Understand algorithms through interactive visualization.
    </p>
</div>
""", unsafe_allow_html=True)


# -----------------------------------------------------------------------------
# PAGE 1: HOME PAGE
# -----------------------------------------------------------------------------
if st.session_state.page == "Home":
    st.markdown("### Welcome to the Interactive DSA Studio")
    st.markdown("""
    Explore, visualize, and understand core computer science algorithms step-by-step.
    Designed with intuitive animations, real-time comparisons, swap counters, and complete code implementations.
    """)

    col1, col2, col3 = st.columns(3)

    with col1:
        st.markdown("""
        <div class="dsa-card">
            <div class="dsa-card-title">📊 SORTING</div>
            <div class="dsa-card-desc">
                Visualize how sorting algorithms rearrange data.
                Step through Bubble, Selection, Insertion, Merge, and Quick Sort in real time.
            </div>
        </div>
        """, unsafe_allow_html=True)
        if st.button("Explore Sorting", key="btn_explore_sort", use_container_width=True):
            st.session_state.page = "Sorting"
            st.rerun()

    with col2:
        st.markdown("""
        <div class="dsa-card">
            <div class="dsa-card-title">🔍 SEARCHING</div>
            <div class="dsa-card-desc">
                Understand how searching algorithms find elements.
                Explore sequential inspection in Linear Search and logarithmic divide-and-conquer in Binary Search.
            </div>
        </div>
        """, unsafe_allow_html=True)
        if st.button("Explore Searching", key="btn_explore_search", use_container_width=True):
            st.session_state.page = "Searching"
            st.rerun()

    with col3:
        st.markdown("""
        <div class="dsa-card">
            <div class="dsa-card-title">⚡ COMPLEXITY</div>
            <div class="dsa-card-desc">
                Compare time and space complexity across all algorithms.
                Understand asymptotic Big-O bounds for Best, Average, and Worst cases.
            </div>
        </div>
        """, unsafe_allow_html=True)
        if st.button("Explore Complexity", key="btn_explore_complexity", use_container_width=True):
            st.session_state.page = "Complexity Comparison"
            st.rerun()

    st.markdown("---")
    st.markdown("### Supported Core Algorithms")
    c1, c2 = st.columns(2)
    with c1:
        st.markdown("""
        **Sorting Suite:**
        - **Bubble Sort**: $O(n^2)$ pairwise adjacent comparison & bubble up
        - **Selection Sort**: $O(n^2)$ iterative minimum extraction
        - **Insertion Sort**: $O(n^2)$ incremental shifting into sorted subarray
        - **Merge Sort**: $O(n \\log n)$ recursive divide-and-conquer merge
        - **Quick Sort**: $O(n \\log n)$ pivot partitioning scheme
        """)
    with c2:
        st.markdown("""
        **Searching Suite:**
        - **Linear Search**: $O(n)$ sequential verification across any list
        - **Binary Search**: $O(\\log n)$ midpoint range division on sorted lists
        """)


# -----------------------------------------------------------------------------
# PAGE 2: SORTING SECTION
# -----------------------------------------------------------------------------
elif st.session_state.page == "Sorting":
    st.markdown("## 📊 Sorting Algorithms Visualizer")

    # Input Array & Random Generator Accordion
    with st.expander("🛠️ Configure Input Array", expanded=True):
        input_mode = st.radio(
            "Input Mode",
            ["Enter Manually", "Generate Random Array"],
            horizontal=True
        )

        if input_mode == "Enter Manually":
            curr_str = ", ".join(map(str, st.session_state.sort_array))
            manual_input = st.text_input(
                "Input Array (comma-separated integers):",
                value=curr_str,
                help="Example: 64, 25, 12, 22, 11"
            )
            col_apply, _ = st.columns([1, 4])
            with col_apply:
                if st.button("Apply Array", key="apply_manual_sort"):
                    is_valid, arr, err = parse_and_validate_array(manual_input)
                    if is_valid:
                        st.session_state.sort_array = arr
                        st.session_state.sort_steps = []
                        st.session_state.sort_step_idx = 0
                        st.session_state.sort_running = False
                        st.success(f"Array updated: {arr}")
                    else:
                        st.error(err)
        else:
            col_s1, col_s2, col_s3, col_s4 = st.columns(4)
            with col_s1:
                rand_size = st.slider("Array Size", min_value=5, max_value=25, value=8)
            with col_s2:
                rand_min = st.number_input("Minimum Value", value=5, step=1)
            with col_s3:
                rand_max = st.number_input("Maximum Value", value=99, step=1)
            with col_s4:
                st.write("")
                st.write("")
                if st.button("Generate Random", key="btn_gen_rand_sort", use_container_width=True):
                    arr = generate_random_array(rand_size, int(rand_min), int(rand_max))
                    st.session_state.sort_array = arr
                    st.session_state.sort_steps = []
                    st.session_state.sort_step_idx = 0
                    st.session_state.sort_running = False
                    st.success("New random array generated!")

    # Display Current Input Array
    st.markdown(f"""
    <div style="margin: 0.75rem 0 1.25rem 0;">
        <span style="font-weight: 600; color: #94a3b8; font-size: 0.95rem;">Input Array:</span>
        <div class="array-preview-box">Input: {st.session_state.sort_array}</div>
    </div>
    """, unsafe_allow_html=True)

    # Algorithm Selector & Details
    col_algo, col_speed = st.columns([2, 2])
    with col_algo:
        algo_choice = st.selectbox(
            "Select Sorting Algorithm",
            ["Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort", "Quick Sort"],
            key="sort_algo_choice"
        )
    with col_speed:
        speed_val = st.slider(
            "Speed (Delay between steps)",
            min_value=0.05,
            max_value=1.0,
            value=0.35,
            step=0.05,
            help="Slow ←────────→ Fast"
        )

    # Algorithm Metadata Banner
    meta = ALGORITHMS_INFO[algo_choice]
    with st.expander(f"ℹ️ {algo_choice} Information & Complexity", expanded=False):
        c_m1, c_m2, c_m3, c_m4 = st.columns(4)
        c_m1.metric("Best Case", meta["best_time"])
        c_m2.metric("Average Case", meta["avg_time"])
        c_m3.metric("Worst Case", meta["worst_time"])
        c_m4.metric("Space Complexity", meta["space"])
        st.markdown(f"**Explanation:** {meta['description']}")

        tab_py, tab_cpp = st.tabs(["Python Code", "C++ Code"])
        with tab_py:
            st.code(meta["python_code"], language="python")
        with tab_cpp:
            st.code(meta["cpp_code"], language="cpp")

    # Compute steps if not already generated or array changed
    if not st.session_state.sort_steps:
        target_arr = st.session_state.sort_array
        if algo_choice == "Bubble Sort":
            st.session_state.sort_steps = bubble_sort(target_arr)
        elif algo_choice == "Selection Sort":
            st.session_state.sort_steps = selection_sort(target_arr)
        elif algo_choice == "Insertion Sort":
            st.session_state.sort_steps = insertion_sort(target_arr)
        elif algo_choice == "Merge Sort":
            st.session_state.sort_steps = merge_sort(target_arr)
        elif algo_choice == "Quick Sort":
            st.session_state.sort_steps = quick_sort(target_arr)
        st.session_state.sort_step_idx = 0

    steps = st.session_state.sort_steps
    total_steps = len(steps)
    curr_idx = min(st.session_state.sort_step_idx, total_steps - 1)
    current_step = steps[curr_idx]

    # Controls Row
    ctrl_col1, ctrl_col2, ctrl_col3, ctrl_col4 = st.columns([1, 1, 1, 1])

    with ctrl_col1:
        if st.button("▶ Start", use_container_width=True, disabled=curr_idx >= total_steps - 1):
            st.session_state.sort_running = True
    with ctrl_col2:
        if st.button("⏸ Pause", use_container_width=True):
            st.session_state.sort_running = False
    with ctrl_col3:
        if st.button("⏭ Next Step", use_container_width=True, disabled=curr_idx >= total_steps - 1):
            st.session_state.sort_running = False
            if st.session_state.sort_step_idx < total_steps - 1:
                st.session_state.sort_step_idx += 1
                st.rerun()
    with ctrl_col4:
        if st.button("↻ Reset", use_container_width=True):
            st.session_state.sort_running = False
            st.session_state.sort_step_idx = 0
            st.rerun()

    # Dynamic Step Progress Slider
    step_slider = st.slider(
        "Progress Step",
        min_value=0,
        max_value=total_steps - 1,
        value=curr_idx,
        key="sort_slider_step"
    )
    if step_slider != curr_idx:
        st.session_state.sort_step_idx = step_slider
        st.session_state.sort_running = False
        st.rerun()

    # Step Information Panel & Metrics
    st.markdown(f"""
    <div class="status-box">
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
            <div>
                <span class="status-label">Current Step:</span><br>
                <span class="status-value">{curr_idx + 1} / {total_steps}</span>
            </div>
            <div>
                <span class="status-label">Action:</span><br>
                <span class="status-value" style="color: #38bdf8;">{current_step['action']}</span>
            </div>
            <div>
                <span class="status-label">Details:</span><br>
                <span class="status-value" style="color: #cbd5e1; font-size: 0.95rem;">{current_step['details']}</span>
            </div>
            <div>
                <span class="status-label">Comparisons:</span><br>
                <span class="status-value" style="color: #f59e0b;">{current_step['comparisons']}</span>
            </div>
            <div>
                <span class="status-label">Swaps / Shifts:</span><br>
                <span class="status-value" style="color: #ec4899;">{current_step['swaps']}</span>
            </div>
        </div>
    </div>
    """, unsafe_allow_html=True)

    # Chart Visualization
    chart_placeholder = st.empty()
    chart = create_sorting_chart(
        arr=current_step["array"],
        comparing=current_step["comparing"],
        swapping=current_step["swapping"],
        sorted_indices=current_step["sorted"],
        title=f"{algo_choice} Visualization"
    )
    chart_placeholder.plotly_chart(chart, use_container_width=True)

    # Legend for Colors
    st.markdown("""
    <div style="display: flex; gap: 1.5rem; justify-content: center; font-size: 0.85rem; color: #94a3b8; margin-top: -0.5rem; margin-bottom: 1rem;">
        <span><b style="color: #818cf8;">■</b> Default</span>
        <span><b style="color: #f59e0b;">■</b> Comparing</span>
        <span><b style="color: #ef4444;">■</b> Swapping / Shifting</span>
        <span><b style="color: #10b981;">■</b> Final Sorted Position</span>
    </div>
    """, unsafe_allow_html=True)

    # Execution Loop if Running
    if st.session_state.sort_running and curr_idx < total_steps - 1:
        time.sleep(speed_val)
        st.session_state.sort_step_idx += 1
        st.rerun()

    # Final Result Card on Completion
    if curr_idx >= total_steps - 1:
        st.markdown(f"""
        <div class="result-card">
            <h3 style="color: #10b981; margin-top: 0; font-size: 1.3rem;">🎉 Sorting Completed</h3>
            <p style="margin: 0.4rem 0;"><b>Algorithm:</b> {algo_choice}</p>
            <p style="margin: 0.4rem 0;"><b>Input Array:</b> <code>{st.session_state.sort_array}</code></p>
            <p style="margin: 0.4rem 0;"><b>Sorted Array:</b> <code>{current_step['array']}</code></p>
            <p style="margin: 0.4rem 0;"><b>Total Comparisons:</b> {current_step['comparisons']} | <b>Total Swaps/Shifts:</b> {current_step['swaps']}</p>
            <p style="margin: 0.4rem 0; color: #94a3b8; font-size: 0.9rem;">
                Time Complexity: <b>{meta['avg_time']}</b> | Space Complexity: <b>{meta['space']}</b>
            </p>
        </div>
        """, unsafe_allow_html=True)


# -----------------------------------------------------------------------------
# PAGE 3: SEARCHING SECTION
# -----------------------------------------------------------------------------
elif st.session_state.page == "Searching":
    st.markdown("## 🔍 Searching Algorithms Visualizer")

    # Configure Array and Target
    with st.expander("🛠️ Configure Search Array & Target", expanded=True):
        search_input_mode = st.radio(
            "Array Source",
            ["Enter Manually", "Generate Random Array"],
            horizontal=True,
            key="search_input_mode"
        )

        if search_input_mode == "Enter Manually":
            curr_s_str = ", ".join(map(str, st.session_state.search_array))
            search_manual = st.text_input(
                "Search Array (comma-separated integers):",
                value=curr_s_str,
                help="Example: 10, 20, 30, 40, 50, 60, 70"
            )
            if st.button("Apply Search Array", key="btn_apply_search"):
                is_valid, arr, err = parse_and_validate_array(search_manual)
                if is_valid:
                    st.session_state.search_array = arr
                    st.session_state.search_steps = []
                    st.session_state.search_step_idx = 0
                    st.session_state.search_running = False
                    st.session_state.search_result = None
                    st.success(f"Array updated: {arr}")
                else:
                    st.error(err)
        else:
            col_sr1, col_sr2, col_sr3, col_sr4 = st.columns(4)
            with col_sr1:
                sr_size = st.slider("Array Size", 5, 20, 8, key="sr_size")
            with col_sr2:
                sr_min = st.number_input("Min", value=5, step=1, key="sr_min")
            with col_sr3:
                sr_max = st.number_input("Max", value=95, step=1, key="sr_max")
            with col_sr4:
                st.write("")
                st.write("")
                if st.button("Generate Random", key="btn_gen_search", use_container_width=True):
                    arr = generate_random_array(sr_size, int(sr_min), int(sr_max))
                    st.session_state.search_array = arr
                    st.session_state.search_steps = []
                    st.session_state.search_step_idx = 0
                    st.session_state.search_running = False
                    st.session_state.search_result = None
                    st.success("New search array generated!")

    # Search Algorithm & Target Inputs
    col_s_algo, col_s_target, col_s_speed = st.columns([2, 1.5, 1.5])
    with col_s_algo:
        search_algo = st.selectbox(
            "Search Algorithm",
            ["Linear Search", "Binary Search"],
            key="search_algo_choice"
        )
    with col_s_target:
        target_val = st.number_input(
            "Target Value",
            value=st.session_state.search_target,
            step=1,
            key="target_number_input"
        )
        st.session_state.search_target = int(target_val)
    with col_s_speed:
        search_speed = st.slider(
            "Speed",
            min_value=0.1,
            max_value=1.0,
            value=0.45,
            step=0.05,
            key="search_speed_slider"
        )

    # Check Sorted Requirement for Binary Search
    array_is_sorted = is_array_sorted(st.session_state.search_array)
    auto_sort = False

    if search_algo == "Binary Search" and not array_is_sorted:
        st.warning("⚠️ **Binary Search requires a sorted array.** Please sort the array first or enable automatic sorting.")
        auto_sort = st.checkbox("☑ Automatically sort before Binary Search", value=True)
        if auto_sort:
            st.session_state.search_array = sorted(st.session_state.search_array)
            array_is_sorted = True
            st.info(f"Array automatically sorted: {st.session_state.search_array}")

    # Display Active Array
    st.markdown(f"""
    <div style="margin: 0.5rem 0 1rem 0;">
        <span style="font-weight: 600; color: #94a3b8; font-size: 0.95rem;">Current Array:</span>
        <div class="array-preview-box">Array: {st.session_state.search_array} | Target: <b>{st.session_state.search_target}</b></div>
    </div>
    """, unsafe_allow_html=True)

    # Compute Search Steps
    if not st.session_state.search_steps:
        target = st.session_state.search_target
        arr = st.session_state.search_array
        if search_algo == "Linear Search":
            steps, found, f_idx = linear_search(arr, target)
        else:
            steps, found, f_idx = binary_search(arr, target)
        st.session_state.search_steps = steps
        st.session_state.search_step_idx = 0
        st.session_state.search_result = {"found": found, "index": f_idx}

    s_steps = st.session_state.search_steps
    s_total_steps = len(s_steps)
    s_curr_idx = min(st.session_state.search_step_idx, s_total_steps - 1)
    s_current_step = s_steps[s_curr_idx]

    # Controls
    s_c1, s_c2, s_c3, s_c4 = st.columns(4)
    with s_c1:
        if st.button("▶ Start Search", use_container_width=True, disabled=s_curr_idx >= s_total_steps - 1):
            st.session_state.search_running = True
    with s_c2:
        if st.button("⏸ Pause Search", use_container_width=True):
            st.session_state.search_running = False
    with s_c3:
        if st.button("⏭ Next Search Step", use_container_width=True, disabled=s_curr_idx >= s_total_steps - 1):
            st.session_state.search_running = False
            if st.session_state.search_step_idx < s_total_steps - 1:
                st.session_state.search_step_idx += 1
                st.rerun()
    with s_c4:
        if st.button("↻ Reset Search", use_container_width=True):
            st.session_state.search_running = False
            st.session_state.search_step_idx = 0
            st.rerun()

    # Status Box
    low_val = s_current_step.get("low", -1)
    mid_val = s_current_step.get("mid", -1)
    high_val = s_current_step.get("high", -1)

    st.markdown(f"""
    <div class="status-box">
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
            <div>
                <span class="status-label">Step:</span><br>
                <span class="status-value">{s_curr_idx + 1} / {s_total_steps}</span>
            </div>
            <div>
                <span class="status-label">Action:</span><br>
                <span class="status-value" style="color: #38bdf8;">{s_current_step['action']}</span>
            </div>
            <div>
                <span class="status-label">Details:</span><br>
                <span class="status-value" style="color: #cbd5e1; font-size: 0.95rem;">{s_current_step['details']}</span>
            </div>
            <div>
                <span class="status-label">Comparisons:</span><br>
                <span class="status-value" style="color: #f59e0b;">{s_current_step['comparisons']}</span>
            </div>
            {f'''<div>
                <span class="status-label">Pointers:</span><br>
                <span class="status-value" style="color: #a78bfa; font-size: 0.95rem;">L={low_val} | M={mid_val} | H={high_val}</span>
            </div>''' if search_algo == 'Binary Search' else ''}
        </div>
    </div>
    """, unsafe_allow_html=True)

    # Search Bar Visualization
    s_chart = create_searching_chart(
        arr=st.session_state.search_array,
        current=s_current_step.get("current", -1),
        low=low_val,
        mid=mid_val,
        high=high_val,
        found_index=s_current_step.get("found_index", -1),
        target=st.session_state.search_target
    )
    st.plotly_chart(s_chart, use_container_width=True)

    # Auto animation step
    if st.session_state.search_running and s_curr_idx < s_total_steps - 1:
        time.sleep(search_speed)
        st.session_state.search_step_idx += 1
        st.rerun()

    # Final Search Output
    if s_curr_idx >= s_total_steps - 1:
        res = st.session_state.search_result
        if res and res["found"]:
            st.markdown(f"""
            <div class="result-card">
                <h3 style="color: #10b981; margin-top: 0; font-size: 1.3rem;">🎯 Target Found!</h3>
                <p style="margin: 0.4rem 0;"><b>Algorithm:</b> {search_algo}</p>
                <p style="margin: 0.4rem 0;"><b>Target Value:</b> <code>{st.session_state.search_target}</code></p>
                <p style="margin: 0.4rem 0;"><b>Result:</b> Found</p>
                <p style="margin: 0.4rem 0;"><b>Index:</b> <code>{res['index']}</code></p>
                <p style="margin: 0.4rem 0;"><b>Total Comparisons:</b> {s_current_step['comparisons']}</p>
            </div>
            """, unsafe_allow_html=True)
        else:
            st.markdown(f"""
            <div class="result-card-notfound">
                <h3 style="color: #f43f5e; margin-top: 0; font-size: 1.3rem;">❌ Target Not Found</h3>
                <p style="margin: 0.4rem 0;"><b>Algorithm:</b> {search_algo}</p>
                <p style="margin: 0.4rem 0;"><b>Target Value:</b> <code>{st.session_state.search_target}</code></p>
                <p style="margin: 0.4rem 0;"><b>Result:</b> Not Found in Array</p>
                <p style="margin: 0.4rem 0;"><b>Total Comparisons:</b> {s_current_step['comparisons']}</p>
            </div>
            """, unsafe_allow_html=True)


# -----------------------------------------------------------------------------
# PAGE 4: ALGORITHM INFORMATION
# -----------------------------------------------------------------------------
elif st.session_state.page == "Algorithm Information":
    st.markdown("## 📖 Comprehensive Algorithm Documentation")
    st.markdown("In-depth analysis of core sorting and searching algorithms with step-by-step logic, pseudocode, and code implementations.")

    algo_names = list(ALGORITHMS_INFO.keys())
    chosen_algo = st.selectbox("Select Algorithm to Study:", algo_names)

    info = ALGORITHMS_INFO[chosen_algo]

    st.markdown(f"### {info['name']}")

    # Metrics
    c1, c2, c3, c4 = st.columns(4)
    c1.metric("Best Case", info["best_time"])
    c2.metric("Average Case", info["avg_time"])
    c3.metric("Worst Case", info["worst_time"])
    c4.metric("Space Complexity", info["space"])

    st.markdown("#### Description")
    st.write(info["description"])

    st.markdown("#### Step-by-Step Working")
    for step in info["working"]:
        st.write(step)

    st.markdown("#### Pseudocode")
    st.code(info["pseudocode"], language="text")

    st.markdown("#### Source Implementations")
    code_tab1, code_tab2 = st.tabs(["Python", "C++"])
    with code_tab1:
        st.code(info["python_code"], language="python")
    with code_tab2:
        st.code(info["cpp_code"], language="cpp")


# -----------------------------------------------------------------------------
# PAGE 5: COMPLEXITY COMPARISON
# -----------------------------------------------------------------------------
elif st.session_state.page == "Complexity Comparison":
    st.markdown("## ⚡ Complexity Comparison Matrix")
    st.markdown("""
    Detailed asymptotic analysis comparing time and space complexities across standard algorithms.
    All bounds adhere strictly to formal theoretical DSA definitions.
    """)

    data = [
        {"Algorithm": "Bubble Sort", "Type": "Sorting", "Best": "O(n)", "Average": "O(n²)", "Worst": "O(n²)", "Space": "O(1)", "Stable": "Yes"},
        {"Algorithm": "Selection Sort", "Type": "Sorting", "Best": "O(n²)", "Average": "O(n²)", "Worst": "O(n²)", "Space": "O(1)", "Stable": "No"},
        {"Algorithm": "Insertion Sort", "Type": "Sorting", "Best": "O(n)", "Average": "O(n²)", "Worst": "O(n²)", "Space": "O(1)", "Stable": "Yes"},
        {"Algorithm": "Merge Sort", "Type": "Sorting", "Best": "O(n log n)", "Average": "O(n log n)", "Worst": "O(n log n)", "Space": "O(n)", "Stable": "Yes"},
        {"Algorithm": "Quick Sort", "Type": "Sorting", "Best": "O(n log n)", "Average": "O(n log n)", "Worst": "O(n²)", "Space": "O(log n)", "Stable": "No"},
        {"Algorithm": "Heap Sort", "Type": "Sorting", "Best": "O(n log n)", "Average": "O(n log n)", "Worst": "O(n log n)", "Space": "O(1)", "Stable": "No"},
        {"Algorithm": "Linear Search", "Type": "Searching", "Best": "O(1)", "Average": "O(n)", "Worst": "O(n)", "Space": "O(1)", "Stable": "N/A"},
        {"Algorithm": "Binary Search", "Type": "Searching", "Best": "O(1)", "Average": "O(log n)", "Worst": "O(log n)", "Space": "O(1)", "Stable": "N/A"},
    ]

    df = pd.DataFrame(data)
    st.dataframe(df, use_container_width=True, hide_index=True)

    st.markdown("---")
    st.markdown("### Practical Guidelines for Selection")
    g1, g2 = st.columns(2)
    with g1:
        st.markdown("""
        **When to use which sorting algorithm:**
        - **Small or Nearly Sorted Arrays**: **Insertion Sort** achieves near-linear $O(n)$ time with zero overhead.
        - **Guaranteed Worst-Case Performance**: **Merge Sort** guarantees $O(n \\log n)$ time at the cost of $O(n)$ auxiliary memory.
        - **General In-Place Sorting**: **Quick Sort** is usually fastest in practice due to excellent CPU cache locality.
        - **Educational Demonstration**: **Bubble Sort** and **Selection Sort** excel at teaching swap mechanisms and invariant maintenance.
        """)
    with g2:
        st.markdown("""
        **When to use which searching algorithm:**
        - **Unsorted or Dynamic Arrays**: **Linear Search** requires no preprocessing and works on arbitrary sequences.
        - **Sorted Arrays**: **Binary Search** cuts search intervals in half each step, finding targets in a million items with $\\approx 20$ comparisons.
        """)
