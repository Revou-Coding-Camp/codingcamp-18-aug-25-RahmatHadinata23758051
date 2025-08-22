const todoInput = document.getElementById("todo-input")
const dateInput = document.getElementById("date-input")
const addBtn = document.getElementById("add-btn")
const filterBtn = document.getElementById("filter-btn")
const deleteAllBtn = document.getElementById("delete-all-btn")
const todoList = document.getElementById("todo-list")

let todos = []

function renderTodos(list) {
  todoList.innerHTML = ""
  if (list.length === 0) {
    todoList.innerHTML = `<tr><td colspan="4" class="py-4 text-gray-400">No task found</td></tr>`
    return
  }
  list.forEach((todo, index) => {
    const row = document.createElement("tr")
    row.className = "hover:bg-gray-50 transition"
    row.innerHTML = `
      <td class="py-3">${todo.task}</td>
      <td>${todo.date}</td>
      <td>
        ${
          todo.done 
          ? `<span class="flex items-center justify-center gap-1 text-green-600 font-medium">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
               </svg> Done
             </span>`
          : `<span class="flex items-center justify-center gap-1 text-yellow-600 font-medium">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
               </svg> Pending
             </span>`
        }
      </td>
      <td class="flex justify-center gap-2 py-2">
        <button class="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded-lg text-xs flex items-center gap-1 transition" onclick="toggleStatus(${index})">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          Toggle
        </button>
        <button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs flex items-center gap-1 transition" onclick="deleteTodo(${index})">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22"/>
          </svg>
          Delete
        </button>
      </td>
    `
    todoList.appendChild(row)
  })
}

function addTodo() {
  const task = todoInput.value.trim()
  const date = dateInput.value
  if (!task || !date) {
    alert("Please enter task and date!")
    return
  }
  todos.push({ task, date, done: false })
  todoInput.value = ""
  dateInput.value = ""
  renderTodos(todos)
}

function toggleStatus(index) {
  todos[index].done = !todos[index].done
  renderTodos(todos)
}

function deleteTodo(index) {
  todos.splice(index, 1)
  renderTodos(todos)
}

function deleteAll() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    todos = []
    renderTodos(todos)
  }
}

function filterTodos() {
  const today = new Date().toISOString().split("T")[0]
  const filtered = todos.filter(todo => todo.date === today)
  renderTodos(filtered)
}

addBtn.addEventListener("click", addTodo)
deleteAllBtn.addEventListener("click", deleteAll)
filterBtn.addEventListener("click", filterTodos)

renderTodos(todos)
