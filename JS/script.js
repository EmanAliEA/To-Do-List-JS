const addBtn = document.querySelector(".addBtn");
const inputBox = document.querySelector(".inputBox");
const input = document.querySelector(".input");
const list = document.querySelector(".list");
const itemsLeft = document.querySelector(".itemsLeft");
const allBtn = document.querySelector(".all");
const activeBtn = document.querySelector(".active");
const completeBtn = document.querySelector(".completed");
const clearBtn = document.querySelector(".clearBtn");

let tasks = [];
let leftItems = 0;
function getTask() {
  const nameTask = input.value;
  if (!nameTask) alert("please enter name of your task");
  else {
    input.value = "";
    if (!tasks.some((task) => task.name === nameTask)) {
      list.classList.remove("hidden");
      const newTask = { name: nameTask, completed: false };
      createTask(newTask);
      tasks.push(newTask);
      renderLeftItems();
    } else alert("This task already exists");
  }
}

function renderLeftItems() {
  leftItems = tasks.filter((task) => task.completed === false).length;
  itemsLeft.textContent = `${leftItems} items left`;
}

let count = 1;
function createTask(task) {
  const htmlElement = `
        <li class="item" data-id=${task.name}>
          <div class="task ${task.completed ? "complete" : ""}">
            <div class="checkMark ${
              task.completed ? "check" : ""
            }"><i class="fa-solid fa-check ${
    task.completed ? "" : "hidden"
  } mark"></i></div>
            <p>${task.name}</p>
          </div>
          <span class="close">&times;</span>
        </li>`;
  list.insertAdjacentHTML("beforeend", htmlElement);
}

function renderList(list) {
  list.forEach((task) => createTask(task));
}

addBtn.addEventListener("click", getTask);
input.addEventListener("keydown", (e) => {
  // e.defaultPrevented;
  if (e.key === "Enter") getTask();
});

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("task")) {
    const parent = e.target;
    parent.classList.toggle("complete");
    parent.children[0].classList.toggle("check");
    parent.children[0].children[0].classList.toggle("hidden");
    tasks = tasks.map((task) =>
      task.name === parent.closest(".item").dataset.id
        ? { ...task, completed: !task.completed }
        : task
    );
    renderLeftItems();
  }
  if (e.target.classList.contains("close")) {
    const currItem = e.target.closest(".item");
    const items = Array.from(e.target.closest(".list").children);
    items.find((item) => item.dataset.id === currItem.dataset.id).remove();
    tasks = tasks.filter((item) => item.name !== currItem.dataset.id);
    console.log(tasks);
    if (tasks.length === 0) {
      list.classList.add("hidden");
    }
    renderLeftItems();
  }
});

allBtn.addEventListener("click", () => {
  list.innerHTML = "";
  console.log(tasks);
  renderList(tasks);
});

activeBtn.addEventListener("click", () => {
  const activeList = tasks.filter((task) => task.completed === false);
  console.log(activeList);
  list.innerHTML = "";
  renderList(activeList);
});

completeBtn.addEventListener("click", () => {
  list.innerHTML = "";
  const completeList = tasks.filter((task) => task.completed === true);
  renderList(completeList);
});

clearBtn.addEventListener("click", () => {
  tasks = tasks.filter((task) => task.completed === false);
  list.innerHTML = "";
  renderList(tasks);
});
