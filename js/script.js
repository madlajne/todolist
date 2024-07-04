{
    let tasks = [];

    let hideDone = false;


    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };


    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const setAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const listenSetAllDoneButtonEvent = () => {
        const setAllDone = document.querySelector(".js-setAllDone");

        setAllDone.addEventListener("click", setAllTasksDone);
    };

    const hideDoneTasks = () => {
        hideDone = !hideDone;
        render();
    };

    const listenHideDoneButtonEvent = () => {
        const toggleHideDone = document.querySelector(".js-toggleHideDone");

        toggleHideDone.addEventListener("click", hideDoneTasks);
    };


    const renderFormButtons = () => {
        const buttonsContainer = document.querySelector(".js-buttonsContainer");

        if (tasks.length === 0) {
            buttonsContainer.innerHTML = "";
            return;
        }
        buttonsContainer.innerHTML =
            `<button class="js-toggleHideDone buttonsArea__button">
                ${hideDone ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button ${tasks.every(({ done }) => done) ? "disabled" : ""} class="js-setAllDone buttonsArea__button">
                Ukończ wszystkie
            </button>`
            
        listenHideDoneButtonEvent();
        listenSetAllDoneButtonEvent();
    };



    const listenListButtonsEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };


    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="tasks__item js-task">
            <button class="js-done task__button task__button--toggleDone">
            ${task.done ? "&#x2713;" : ""}
            </button>
            <span class="task__content ${task.done ? "task__content--done" : ""}">
            ${task.content}
           </span>
           <button class="task__button task__button--remove js-remove">
           &#128465;
           </button>
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        listenListButtonsEvents();
    };

    const render = () => {
        renderTasks();
        renderFormButtons();
    };


    const onFormSumbit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        newTaskElement.focus();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        };

    };

    const listenFormSumbit = () => {
        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSumbit);
    };

    const init = () => {
        render();
        listenFormSumbit();
    };

    init();

}