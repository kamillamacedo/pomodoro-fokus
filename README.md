### ⏱️ Fokus - Pomodoro Timer & Task Manager

A responsive, smart, and fully interactive Pomodoro timer and task manager designed to optimize productivity, featuring dynamic context switching, a custom CRUD system, decoupled cross-script communication, and a highly polished user experience.

### 🚀 About the Project

This project was originally developed as a challenge during a front-end programming course. However, instead of just following the baseline instructions, I took ownership of the code to deeply understand the logic, refactor the application architecture, and implement significant usability (UX), state management, and clean code improvements entirely on my own.

The goal is to provide a clean and immersive environment where users can seamlessly switch between Focus, Short Break, and Long Break modes, track their intervals with real-time feedback, and **fully manage their task execution pipeline through an integrated, state-driven To-Do list.**

### 🧠 What I Practiced & Improved

*   **Event Delegation & Memory Optimization:** Refactored the entire user interaction engine within the timer component. Instead of binding individual listeners to every single button, I implemented a single event listener on the parent container (`timerCard`). This leverages native **Event Bubbling** to intercept clicks via `event.target.closest()`, drastically reducing browser memory consumption and cleaning up global DOM selector variables.
*   **Architectural Decoupling with Dispatch Tables:** Replaced old conditional execution patterns (`switch/case` and `if/else`) with a clean, object-based **Dispatch Table** (`timerActions`). Clicks are dynamically routed by extracting the HTML5 `data-action` attribute string and firing the matched named function instantly, making the core event loop highly scalable.
*   **Centralized State Management (Single Source of Truth):** Designed a unified data dictionary (`contextConfigs`) that acts as the application's local database. It encapsulates factory configurations, active UI texts, and dynamic remaining times (`currentTime`) for every single mode. This removes loose global counters and allows functions like `handleReset` to update the active state deterministically in a single line.
*   **Decoupled Event-Driven Communication:** Built a bidirectional "broadcast" system using native custom events (`CustomEvent`). The timer and the task manager live in completely isolated scripts but communicate asynchronously, dispatching events to lock/unlock task selections and update status across scripts without tight coupling.
*   **Custom CRUD Architecture by Reference:** Designed a highly dynamic task management system that handles task creation, real-time editing via custom forms (replacing native prompt behaviors), and filtering. Utilized JavaScript object references as memory pointers (`selectedTask`, `activeTask`), allowing the app to mutate specific database objects natively before syncing with `localStorage`.
*   **State Lifecycle Alignment:** Resolved complex edge cases by ensuring internal states flatten to factory defaults before the UI rendering engines drive visual updates, preventing race conditions or visual desynchronization when cycles hit zero.
*   **Semantic State Control:** Migrated custom visibility toggles to the native HTML5 `:disabled` button state combined with CSS3 pseudo-selectors, ensuring the application blocks impossible user actions (like editing a completed task or switching tasks during an active countdown) while maintaining semantic accessibility.

### ⚙️ Features

*   Dynamic environment switching (Focus, Short Break, and Long Break) with automatic background, text, and asset transitions.
*   Isolated multi-timer memory that keeps track of the remaining time across different tabs independently.
*   **Complete Task Manager (CRUD):** A dedicated system to add, list, edit text in-place, delete individual tasks, clear completed tasks, or wipe out the entire pipeline.
*   **Centralized Context Configs:** A data structure that dynamically tracks user progress per mode, ensuring paused intervals are retained safely even when flipping tabs.
*   **Smart Task Switching Guard:** Blocks the user from changing focus tasks if the timer is actively counting down. If the timer is paused mid-way, it opens a window confirmation dialog allowing a programmatic timer reset upon shifting focus.
*   Native button locking (`disabled`) with elegant CSS visual feedback (`cursor: not-allowed` and custom opacity) when a session finishes or a task is archived.
*   Integrated audio system handling background focus music and non-blocking sound effects for play, pause, reset, and cycle completion with automatic sound damping (volume control).

### 🛠️ Technologies

*   HTML5 (Custom Data Attributes)
*   CSS3 (Pseudo-selectors, attribute selectors, and modern layout structures)
*   JavaScript (ES6+ Template Strings, Event Delegation, Dispatch Tables, State Dictionaries, Custom Event API, Array Iterators, and native Web Audio API)

### 📌 Why This Project Matters to Me

This project represents a huge milestone in my autonomy as a developer. By questioning original implementation patterns—moving from standard event structures to an advanced event delegation architecture, designing a centralized state engine, and managing bidirectional communication channels—I moved from a passive student to an active software designer. Mastering how data flows through a client-side application and designing strict lifecycle validations proved to me that I can think, debug, and build like an engineer.

### 📈 Next Steps

I will continue to push beyond guided exercise baselines, treating every project as an opportunity to implement clean code, strict state synchronization, and elite-level user experiences.

Feel free to check the code and share any feedback!

