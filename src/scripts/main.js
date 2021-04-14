'use strict';

const { localStorage } = window;
const list = document.querySelector('.Todo-board');
const addButtons = document.querySelectorAll('.button');
let localTodos = JSON.parse(localStorage.getItem('todos'));

const initialTodoList = [
  {
    id: 1,
    date: '21 Jan 2021',
    text: 'initialState',
    isCompleted: false,
  },
];
const scopeCount = document.querySelector('.counter__scope');
const activeCount = document.querySelector('.counter__active');
const completedCount = document.querySelector('.counter__completed');

if (localTodos === null) {
  localTodos = initialTodoList;
}

function renderList() {
  if (localTodos.length < 1) {
    const element = document.createElement('div');

    element.className = `Todo-board__empty`;
    element.innerHTML = `Create new task by clicking the button below`;
    list.append(element);
  }
  document.querySelector('.Todo-board').firstChild.remove();

  localTodos.map(singleTodo => {
    const ListElement = document.createElement('li');

    ListElement.class = 'Todo-board__Todo';

    ListElement.innerHTML = `
    <div key="${singleTodo.id}" class="Todo-board__todo">
      
      <span class="Todo-board__heading">
        <input
          type="checkbox"
          id="status-${singleTodo.id}"
          name="status"
          cheked="${singleTodo.isCompleted}"
          class="Todo-board__status custom-checkbox"
        >
        <label for="status-${singleTodo.id}"></label>
        <span class="Todo-board__date">${singleTodo.date}</span>
        <div class="Todo-board__edit"> </div>
        <div class="Todo-board__delete"> </div>
      </span>
      
      
      <textarea
        id="Text"
        class="Todo-board__text"
        placeholder="Please enter task description"
        required
        min="1"
        max="256"
        maxlength="256"
      >${singleTodo.text}</textarea>
    </div>`;
    list.append(ListElement);
  });

  completedCount.innerHTML = localTodos
    .reduce((acc, todo) => {
      if (todo.isCompleted) {
        return acc + 1;
      }

      return acc;
    }, 0);
  scopeCount.innerHTML = localTodos.length;
  activeCount.innerHTML = localTodos.length - completedCount.innerHTML;

  const deleteButtons = document.querySelectorAll('.Todo-board__delete');
  const statusCheckboxes = document.querySelectorAll('.Todo-board__status');
  const textInputs = document.querySelectorAll('.Todo-board__text');
  // const buttonEdit = document.querySelectorAll('#Edit');

  deleteButtons.forEach(button => handleDelete(button));
  statusCheckboxes.forEach(checkbox => handleStatus(checkbox));
  textInputs.forEach(input => handleTextInputs(input));

  localStorage.setItem('todos', JSON.stringify(localTodos));
}

renderList();

// buttonEdit.forEach(button => button.addEventListener('click', (e) => {
//   let todoKey = e.target.closest('div[key]').getAttribute('key');
//   let targetInput = localTodos.find(todo => todo.id === +todoKey);
//   targetInput.text = e.target.value
// }));

function getTodayDate() {
  const monthList = ['Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth());
  const yyyy = today.getFullYear();

  return dd + ' ' + monthList[mm] + ' ' + yyyy;
}

addButtons.forEach(button => {
  button.addEventListener('click', () => {
    const elements = document.querySelectorAll('.Todo-board__todo');
    const todoTemplate = {
      id: 0,
      date: getTodayDate(),
      text: '',
      isCompleted: false,
    };

    if (!localTodos.length) {
      localTodos.push(todoTemplate);
    } else {
      todoTemplate.id = localTodos[localTodos.length - 1].id + 1;
      localTodos.push(todoTemplate);
    }

    elements.forEach(element => element.remove());
    renderList();
  });
});

function handleDelete(button) {
  button.addEventListener('click', (e) => {
    const currentTodoKey = e.target.closest('div[key]').getAttribute('key');

    localTodos = localTodos.filter(todo =>
      todo.id !== +currentTodoKey);

    const elements = document.querySelectorAll('.Todo-board__todo');

    elements.forEach(element => element.remove());
    renderList();
  });
};

function handleStatus(box) {
  box.addEventListener('click', (e) => {
    const currentTodoKey = e.target.closest('div[key]').getAttribute('key');
    const currentTodo = localTodos.find(todo => todo.id === +currentTodoKey);
    const elements = document.querySelectorAll('.Todo-board__todo');
    const currentTextArea = e.target.offsetParent.nextElementSibling;

    currentTodo.isCompleted = !currentTodo.isCompleted;

    if (currentTodo.isCompleted) {
      currentTextArea.setAttribute('readonly', 'readonly');
    } else {
      currentTextArea.removeAttribute('readonly');
    }
    elements.forEach(element => element.remove());
    renderList();
  });
}

function handleTextInputs(inputElement) {
  inputElement.addEventListener('focusout', (e) => {
    const todoKey = e.target.closest('div[key]').getAttribute('key');
    const targetInput = localTodos.find(todo => todo.id === Number(todoKey));
    const elements = document.querySelectorAll('.Todo-board__todo');

    targetInput.text = e.target.value;
    elements.forEach(element => element.remove());
    renderList();
  });
}
