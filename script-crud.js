const addTaskBtt = document.querySelector(".app__button--add-task");
const formAddTask = document.querySelector(".app__form-add-task ");
const textareaTask = document.querySelector(".app__form-textarea");


const deleteTaskBtt = document.querySelector(".app__form-footer__button--delete");
const cancelTaskBtt = document.querySelector(".app__form-footer__button--cancel");
const saveTaskBtt = document.querySelector(".app__form-footer__button--confirm");

const tasksList = [];

addTaskBtt.addEventListener("click", () =>{
    formAddTask.classList.toggle("hidden");

});

formAddTask.addEventListener("submit", (event) =>{
    event.preventDefault();

    const task = {
        description:textareaTask.value
    }

    tasksList.push(task);

    const tasksListInText = JSON.stringify(tasksList);
    localStorage.setItem ("tasks", tasksListInText);

    textareaTask.value = "";
    formAddTask.classList.add("hidden");
});

