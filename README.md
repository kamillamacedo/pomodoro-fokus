### ⏱️ Fokus - Pomodoro Timer

A responsive, smart, and fully interactive Pomodoro timer designed to optimize productivity, featuring dynamic context switching, individual mode memory, and a highly polished user experience.

### 🚀 About the Project

This project was originally developed as a challenge during a front-end programming course. However, instead of just following the baseline instructions, I took ownership of the code to deeply understand the logic, refactor the application architecture, and implement significant usability (UX) and clean code improvements entirely on my own.

The goal is to provide a clean and immersive environment where users can seamlessly switch between Focus, Short Break, and Long Break modes, track their intervals with real-time feedback, and control state transitions intuitively.

### 🧠 What I Practiced & Improved

*   **State Architecture & Code Reuse:** Refactored the core logic to centralize visual changes (images, text, active states) inside a single function (`changeContext`), and isolated the interval controls (`stopCountDown`), drastically reducing code duplication (DRY principle).
*   **Independent Mode Memory:** Upgraded the application to support individual relógios/memory for each mode. Switching contexts pauses the current timer and preserves its progress, rather than wiping out the user's state.
*   **Micro-interactions & UX Sincronização:** Fixed a classic visual lag by introducing an immediate trigger that updates the countdown display and shifts button states to "Pause" in 0 milliseconds, aligning perfectly with the background interval engine.
*   **Semantic State Control:** Migrated custom visibility toggles to the native HTML5 `:disabled` button state combined with CSS3 pseudo-selectors, ensuring the application blocks impossible user actions (like starting a zeroed timer) while maintaining semantic accessibility.
*   **Smart Component Visibility:** Designed a contextual Reset button that evaluates states via logical short-circuit operators (`&&`), appearing only when the timer deviates from its factory defaults—even if the countdown is currently paused.

### ⚙️ Features

*   Dynamic environment switching (Focus, Short Break, and Long Break) with automatic background, text, and asset transitions.
*   Isolated multi-timer memory that keeps track of the remaining time across different tabs independently.
*   Context-aware Reset button that remains visible whenever a timer is modified or hits zero, allowing full user recovery.
*   Polished UI controls that instantly flip between "Start" and "Pause" text and icons on click.
*   Native button locking (`disabled`) with elegant CSS visual feedback (`cursor: not-allowed` and custom opacity) when a session finishes.
*   Integrated audio system handling background focus music and non-blocking sound effects for play, pause, and cycle completion with automatic sound damping (volume control).

### 🛠️ Technologies

*   HTML5
*   CSS3 (Pseudo-selectors, transition delays, and modern layout structures)
*   JavaScript (ES6+, asynchronous timing functions, and native Web Audio API)

### 📌 Why This Project Matters to Me

This project represents a huge milestone in my autonomy as a developer. By questioning original implementation patterns and actively hunting down visual glitches and edge-case bugs (like negative timers and UI sync lags), I moved from a passive student to an active software designer. Building the multi-timer memory and mastering logical operators to craft a professional UX made this journey incredibly rewarding and proved that I can think like a engineer.

### 📈 Next Steps

I will continue to push beyond guided exercise baselines, treating every project as an opportunity to implement clean code, strict state synchronization, and elite-level user experiences.

Feel free to check the code and share any feedback!