const input = document.getElementById("todo-input");
const button = document.getElementById("add-button");
const list = document.getElementById("todo-list");

let tasks = [];

function createTaskElement(taskText, isChecked) {
  const listItem = document.createElement("li");
  listItem.textContent = taskText;
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isChecked;

  deleteButton.addEventListener("click", function (event) {
    event.stopPropagation();
    listItem.remove();
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i][0] === taskText) {
        tasks.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      listItem.style.textDecoration = "line-through";
    } else {
      listItem.style.textDecoration = "none";
    }
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i][0] === taskText) {
        tasks[i][1] = checkbox.checked;
        break;
      }
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  listItem.appendChild(checkbox);
  listItem.appendChild(deleteButton);

  return listItem;
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
  for (let i = 0; i < tasks.length; i++) {
    const listItem = createTaskElement(tasks[i][0], tasks[i][1]);
    list.appendChild(listItem);
  }
}

loadTasks();

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    button.click();
  }
});

button.addEventListener("click", function () {
  const taskText = input.value;

  if (taskText === "") {
    return;
  }

  tasks.push([taskText, false]);

  const listItem = createTaskElement(taskText, false);

  list.appendChild(listItem);

  input.value = "";

  localStorage.setItem("tasks", JSON.stringify(tasks));
});