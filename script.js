let todoArray = [];
const text = document.getElementById("text");
const addTaskButton = document.getElementById("add-task-btn");
const saveTaskButton = document.getElementById("save-todo-btn");
const listBox = document.getElementById("listBox");
const saveInd = document.getElementById("saveIndex");

displayTodo();

addTaskButton.addEventListener("click", (e) => {
  e.preventDefault();
  addItem();
});

text.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addItem();
    addTaskButton.style.display = "block";
    saveTaskButton.style.display = "none";
  }
});

function addItem() {
  let todo = localStorage.getItem("todo");

  if (todo === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(todo);
  }

  if (text.value === "") {
    alert("Please Add Something To The To-Do List");
    return false;
  }

  if (text.value === "") {
    alert("Please Add Something To The To-Do List");
    return false;
  }

  todoArray.push(text.value);
  text.value = "";
  localStorage.setItem("todo", JSON.stringify(todoArray));
  displayTodo();
}

function displayTodo() {
  let todo = localStorage.getItem("todo");
  if (todo === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(todo);
  }
  let htmlCode = "";
  todoArray.forEach((list, ind) => {
    htmlCode += `<div class='flex mb-4 items-center'>
          <p class='w-full text-white font-bold'>${list}</p>
          <button onclick='edit(${ind})' class='flex-no-shrink p-2 ml-4 mr-2 rounded text-white text-grey bg-green-600'>Edit</button>
          <button onclick='deleteTodo(${ind})' class='flex-no-shrink p-2 ml-2 rounded text-white bg-red-500'>Delete</button>
       </div>`;
  });
  listBox.innerHTML = htmlCode;
}

function deleteTodo(ind) {
  let todo = localStorage.getItem("todo");

  todoArray = JSON.parse(todo);
  todoArray.splice(ind, 1);
  localStorage.setItem("todo", JSON.stringify(todoArray));
  displayTodo();
}

function edit(ind) {
  saveInd.value = ind;
  let todo = localStorage.getItem("todo");

  todoArray = JSON.parse(todo);
  text.value = todoArray[ind];
  addTaskButton.style.display = "none";
  saveTaskButton.style.display = "block";
}

saveTaskButton.addEventListener("click", () => {
  let todo = localStorage.getItem("todo");
  todoArray = JSON.parse(todo);

  let id = saveInd.value;
  addTaskButton.style.display = "block";
  saveTaskButton.style.display = "none";
  todoArray[id] = text.value;
  text.value = "";
  localStorage.setItem("todo", JSON.stringify(todoArray));
  displayTodo();
});
