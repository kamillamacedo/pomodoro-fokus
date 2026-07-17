### ⏱️ Fokus - Pomodoro Timer & Task Manager

A responsive, smart, and fully interactive Pomodoro timer and task manager designed to optimize productivity, featuring dynamic context switching, a custom CRUD system, decoupled cross-script communication, and a highly polished user experience.

### 🚀 About the Project

This project was originally developed as a challenge during a front-end programming course. However, instead of just following the baseline instructions, I took ownership of the code to deeply understand the logic, refactor the application architecture, and implement significant usability (UX), state management, and clean code improvements entirely on my own.

The goal is to provide a clean and immersive environment where users can seamlessly switch between Focus, Short Break, and Long Break modes, track their intervals with real-time feedback, and fully manage their focus task pipeline intuitively.

### 🧠 What I Practiced & Improved

*   **State Architecture & Code Reuse:** Refactored the core logic to centralize visual changes (images, text, active states) inside a single function (`changeContext`), and isolated the interval controls (`stopCountDown`), drastically reducing code duplication (DRY principle).
*   **Decoupled Event-Driven Communication:** Built a bidirectional "broadcast" system using native custom events (`CustomEvent`). The timer and the task manager live in completely isolated scripts but communicate asynchronously, dispatching events to lock/unlock task selections and update status across scripts without tight coupling.
*   **Custom CRUD Architecture by Reference:** Designed a highly dynamic task management system that handles task creation, real-time editing via custom forms (replacing native `prompt` behaviors), and filtering. Utilized JavaScript object references as memory pointers (`selectedTask`, `activeTask`), allowing the app to mutate specific database objects natively before syncing with `localStorage`.
*   **Independent Mode Memory:** Upgraded the application to support individual relógios/memory for each mode. Switching contexts pauses the current timer and preserves its progress, rather than wiping out the user's state.
*   **Micro-interactions & UX Sincronização:** Fixed classic visual lags by introducing immediate triggers that update countdown displays, toggle task highlight modes, and shift button states in 0 milliseconds, aligning perfectly with the background interval engine.
*   **Semantic State Control:** Migrated custom visibility toggles to the native HTML5 `:disabled` button state combined with CSS3 pseudo-selectors, ensuring the application blocks impossible user actions (like editing a completed task or switching tasks during an active countdown) while maintaining semantic accessibility.
*   **Smart Component Visibility & DRY Cleanup:** Centralized heavy repetitive actions into atomic utility functions like `updateLocalStorage()` and `clearForm()`, cleaning up code bloat across click listeners and letting the rendering engine drive UI updates deterministically based on clean array states.

### ⚙️ Features

*   Dynamic environment switching (Focus, Short Break, and Long Break) with automatic background, text, and asset transitions.
*   Isolated multi-timer memory that keeps track of the remaining time across different tabs independently.
*   Complete Task Manager (CRUD) to add, list, edit text in-place, delete individual tasks, clear completed tasks, or wipe out the entire pipeline.
*   Context-aware Reset button that remains visible whenever a timer is modified, resetting audio loops and rebinding standard factory defaults programmatically.
*   Smart Task Switching Guard: Blocks the user from changing focus tasks if the timer is actively counting down. If the timer is paused mid-way, it opens a window confirmation dialog allowing a programmatic timer reset upon shifting focus.
*   Native button locking (`disabled`) with elegant CSS visual feedback (`cursor: not-allowed` and custom opacity) when a session finishes or a task is archived.
*   Integrated audio system handling background focus music and non-blocking sound effects for play, pause, reset, and cycle completion with automatic sound damping (volume control).

### 🛠️ Technologies

*   HTML5
*   CSS3 (Pseudo-selectors, transition delays, and modern layout structures)
*   JavaScript (ES6+, asynchronous timing functions, Custom Event API, Array Iterators, and native Web Audio API)

### 📌 Why This Project Matters to Me

This project represents a huge milestone in my autonomy as a developer. By questioning original implementation patterns—especially replacing simple guided exercises like `prompt` with real state-driven HTML forms and designing a bidirectional event radio—I moved from a passive student to an active software designer. Building the multi-timer memory, mastering data persistence pipelines, and mapping out tight lifecycle synchronization blocks proved to me that I can think, debug, and build like an engineer.

### 📈 Next Steps

I will continue to push beyond guided exercise baselines, treating every project as an opportunity to implement clean code, strict state synchronization, and elite-level user experiences.

Feel free to check the code and share any feedback!
