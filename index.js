var tasks = JSON.parse(window.localStorage.getItem("tasks")) || [];

const saveToDB = (obj) => {
  data = JSON.stringify(obj);
  window.localStorage.setItem("tasks", data);
};

const removeTask = function () {
  this.parentNode.remove();
};

const saveTasks = () => {
  tasks = [];
  const tasksDiv = document.querySelectorAll("#task");
  tasksDiv.forEach((ele) => {
    tasks.push({
      task: ele.querySelector("span").innerHTML,
      done: ele.querySelector("input[type=checkbox]").checked || false,
    });
  });
  saveToDB(tasks);
};

const inputTask = document.querySelector("#textValue");
const btnEnter = document.querySelector("#taskSubmit");
const Tasks = document.querySelector("#TaskContainer");

const checkbox = document.querySelector("input[type=checkbox]");

btnEnter.onclick = () => {
  const task = inputTask.value;
  inputTask.value = null;
  const taskSpan = document.createElement("span");
  const btnDel = document.createElement("button");
  const checkbox = document.createElement("input");
  const taskBox = document.createElement("div");

  checkbox.type = "checkbox";
  checkbox.addEventListener("click", () => {
    saveTasks();
  });
  btnDel.id = "#deleteTask";
  taskSpan.innerText = task;
  btnDel.innerText = "Remove";
  btnDel.addEventListener("click", removeTask);
  checkbox.addEventListener("click", () => {
    checkbox.parentNode.classList.toggle("done");
  });

  Tasks.appendChild(taskBox);
  taskBox.id = "task";
  taskBox.appendChild(taskSpan);
  taskBox.appendChild(checkbox);
  taskBox.appendChild(btnDel);
  saveTasks();
};

window.addEventListener("load", () => {
  if (!tasks) return;
  tasks.forEach((task) => {
    const taskSpan = document.createElement("span");
    const btnDel = document.createElement("button");
    const checkbox = document.createElement("input");
    const taskBox = document.createElement("div");

    Tasks.appendChild(taskBox);
    taskBox.id = "task";
    taskBox.appendChild(taskSpan);
    taskBox.appendChild(checkbox);
    taskBox.appendChild(btnDel);

    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("click", () => {
      saveTasks();
    });
    if (task.done) {
      checkbox.parentNode.className = "done";
    }
    checkbox.addEventListener("click", () => {
      checkbox.parentNode.classList.toggle("done");
    });
    btnDel.id = "#deleteTask";
    taskSpan.innerText = task.task;
    btnDel.innerText = "Remove";
    btnDel.addEventListener("click", removeTask);
    btnDel.addEventListener("click", saveTasks);
  });
});

const btnDel = document.querySelectorAll("#deleteTask");
