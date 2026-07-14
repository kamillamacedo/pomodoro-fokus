const addTaskBtt = document.querySelector(".app__button--add-task");
const formAddTask = document.querySelector(".app__form-add-task ");
const formTaskLabel = document.querySelector(".app__form-label");
const textareaTask = document.querySelector(".app__form-textarea");
const tasksListDisplay = document.querySelector(".app__section-task-list");
const taskDescriptionParagraph = document.querySelector(
  ".app__section-active-task-description",
);
const deleteTaskBtt = document.querySelector(
  ".app__form-footer__button--delete",
);
const cancelTaskBtt = document.querySelector(
  ".app__form-footer__button--cancel",
);
const saveTaskBtt = document.querySelector(
  ".app__form-footer__button--confirm",
);

let tasksList = JSON.parse(localStorage.getItem("tasks")) || [];
let selectedTask = null;
let liSelectedTask = null;
let activeTask = null;

addTaskBtt.addEventListener("click", () => {
  formAddTask.classList.toggle("hidden");
  textareaTask.value = "";
  formTaskLabel.innerText = "Adding task:";
  selectedTask = null;
});

formAddTask.addEventListener("submit", (event) => {
  event.preventDefault();

  const task = {
    description: textareaTask.value,
    completed: false,
  };
  if (selectedTask === null) {
    tasksList.push(task);
  } else {
    selectedTask.description = textareaTask.value;
  }

  const tasksListInText = JSON.stringify(tasksList);
  localStorage.setItem("tasks", tasksListInText);

  clearForm();

  renderTasksList();
});

cancelTaskBtt.addEventListener("click", clearForm);

deleteTaskBtt.addEventListener("click", () => {
  tasksList = tasksList.filter((task) => task !== selectedTask);
  const tasksListInText = JSON.stringify(tasksList);
  localStorage.setItem("tasks", tasksListInText);
  clearForm();
  renderTasksList();
});

function createTaskElement(task) {
  const li = document.createElement("li");
  li.classList.add("app__section-task-list-item");

  const svg = document.createElement("svg");
  svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `;
  const paragraph = document.createElement("p");
  paragraph.textContent = task.description;
  paragraph.classList.add("app__section-task-list-item-description");

  const button = document.createElement("button");
  button.classList.add("app_button-edit");

  button.onclick = () => {
    textareaTask.value = task.description;
    formAddTask.classList.remove("hidden");
    formTaskLabel.innerText = "Editing task:";
    selectedTask = task;
  };

  const buttonImg = document.createElement("img");
  buttonImg.src = "./images/edit.png";
  button.append(buttonImg);

  li.append(svg);
  li.append(paragraph);
  li.append(button);

  li.onclick = () => {
    const activeElement = document.querySelector(
      ".app__section-task-list-item-active",
    );
    if (activeElement === li) {
      activeElement.classList.remove("app__section-task-list-item-active");
      taskDescriptionParagraph.textContent = "";
      liSelectedTask = null;
      activeTask = null;
      return;
    }

    if (activeElement) {
      activeElement.classList.remove("app__section-task-list-item-active");
    }
    taskDescriptionParagraph.textContent = task.description;
    liSelectedTask = li;
    activeTask = task;
    li.classList.add("app__section-task-list-item-active");
  };

  if (task.completed === true) {
    li.classList.remove("app__section-task-list-item-active");
    li.classList.add("app__section-task-list-item-complete");
    button.setAttribute("disabled", "disabled");
  }

  return li;
}

function renderTasksList() {
  tasksListDisplay.innerHTML = "";
  tasksList.forEach((task) => {
    const taskElement = createTaskElement(task);
    tasksListDisplay.append(taskElement);
  });
}

renderTasksList();

function clearForm() {
  textareaTask.value = "";
  selectedTask = null;
  formAddTask.classList.add("hidden");
}

document.addEventListener("focusEnd", () => {
  if (liSelectedTask) {
    
    activeTask.completed = true;
    const tasksListInText = JSON.stringify(tasksList);
    localStorage.setItem("tasks", tasksListInText);
    renderTasksList();
  }
});
