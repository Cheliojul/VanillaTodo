'use strict';

const { localStorage } = window;

// localStorage.clear();

const list = document.querySelector('.Todo-board');
const buttonAdd = document.querySelector('#Add');
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

  const element = document.createElement('div');

  element.class = `No-tasks`;
  element.innerHTML = `Create new task by clicking the button below`;
  list.append(element);
}

function renderList() {
  localTodos.map(singleTodo => {
    const ListElement = document.createElement('li');

    ListElement.class = 'Todo-board__Todo';

    ListElement.innerHTML = `
    <div key="${singleTodo.id}" class="Todo-board__todo">
      
      <span class="Todo-board__heading">
      <input type="checkbox" id="Complete" class="Todo-board__status">
        <span class="Todo-board__date">${singleTodo.date}</span>
        <img id="Edit" class="Todo-board__edit" />
        <img id="Delete" class="Todo-board__delete" />
      </span>
      
      
      <textarea
        id="Text"
        class="Todo-board__text"
        placeholder=""
      >${singleTodo.text}</textarea>
    </div>`;
    list.append(ListElement);
  });

  scopeCount.innerHTML = localTodos.length;
  activeCount.innerHTML = localTodos.length;
  completedCount.innerHTML = localTodos.length;

  const buttonDelete = document.querySelectorAll('.Todo-board__delete');

  // const buttonEdit = document.querySelectorAll('#Edit');
  // const buttonComplete = document.querySelectorAll('#Complete');

  buttonDelete.forEach(button => handleDelete(button));

  localStorage.setItem('todos', JSON.stringify(localTodos));
}

renderList();

const textInput = document.querySelectorAll('#Text');

textInput.forEach(button => button.addEventListener('focusout', (e) => {
  const todoKey = e.target.closest('div[key]').getAttribute('key');
  const targetInput = localTodos.find(todo => todo.id === Number(todoKey));

  targetInput.text = e.target.value;

  const elements = document.querySelectorAll('.Todo-board__todo');

  elements.forEach(element => element.remove());

  renderList();
}));

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

buttonAdd.addEventListener('click', () => {
  if (!localTodos.length) {
    localTodos.push({
      id: 0,
      date: getTodayDate(),
      text: 'Please enter task description',
      isCompleted: false,
    });
  } else {
    localTodos.push({
      id: localTodos[localTodos.length - 1].id + 1,
      date: getTodayDate(),
      text: 'Please enter task description',
      isCompleted: false,
    });
  }
  // localStorage.setItem('todos', JSON.stringify(localTodos));

  const elements = document.querySelectorAll('.Todo-board__todo');

  elements.forEach(element => element.remove());

  renderList();
});

function handleDelete(button) {
  button.addEventListener('click', (e) => {
    const currentTodoKey = e.target.closest('div[key]').getAttribute('key');

    localTodos = localTodos.filter(todo =>
      todo.id !== +currentTodoKey);

    // localTodos = filteredTodos;

    const elements = document.querySelectorAll('.Todo-board__todo');

    elements.forEach(element => element.remove());
    renderList();
    localStorage.setItem('todos', JSON.stringify(localTodos));
  });
};
