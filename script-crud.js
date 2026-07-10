const addTaskBtt = document.querySelector(".app__button--add-task");
const formAddTask = document.querySelector(".app__form-add-task ");
const textareaTask = document.querySelector(".app__form-textarea");
const tasksListDisplay = document.querySelector(".app__section-task-list");

const deleteTaskBtt = document.querySelector(
  ".app__form-footer__button--delete",
);
const cancelTaskBtt = document.querySelector(
  ".app__form-footer__button--cancel",
);
const saveTaskBtt = document.querySelector(
  ".app__form-footer__button--confirm",
);

const tasksList = JSON.parse(localStorage.getItem("tasks")) || [];

addTaskBtt.addEventListener("click", () => {
  formAddTask.classList.toggle("hidden");
});

formAddTask.addEventListener("submit", (event) => {
  event.preventDefault();

  const task = {
    description: textareaTask.value,
  };

  tasksList.push(task);

  const tasksListInText = JSON.stringify(tasksList);
  localStorage.setItem("tasks", tasksListInText);

  textareaTask.value = "";
  formAddTask.classList.add("hidden");

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
  const buttonImg = document.createElement("img");
  button.classList.add("app_button-edit");
  buttonImg.src = "./images/edit.png";
  button.append(buttonImg);

  li.append(svg);
  li.append(paragraph);
  li.append(button);

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
