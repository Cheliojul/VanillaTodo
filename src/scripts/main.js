const { localStorage } = window;
const list = document.querySelector('.Todo-board');
const addButtons = document.querySelectorAll('.plus__container, .button');
let localTodos = JSON.parse(localStorage.getItem('todos'));
const scopeCount = document.querySelector('.counter__scope');
const activeCount = document.querySelector('.counter__active');
const completedCount = document.querySelector('.counter__completed');

renderList();

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

function handleEdit(button) {
  button.addEventListener('click', (e) => {
    const currentTextInput = e.target.offsetParent.nextElementSibling;

    if (currentTextInput.hasAttribute(`disabled`)) {
      currentTextInput.removeAttribute(`disabled`);
    } else {
      currentTextInput.setAttribute(`disabled`, `disabled`);
    }
  });
}

function getTodayDate() {
  const monthList = ['Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth());
  const yyyy = today.getFullYear();

  return dd + ' ' + monthList[mm] + ' ' + yyyy;
}

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

    currentTodo.isCompleted = !currentTodo.isCompleted;
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

function createTodo(todo) {
  const ListElement = document.createElement('li');

  ListElement.class = 'Todo-board__Todo';

  ListElement.innerHTML = `
  <div key="${todo.id}" class="Todo-board__todo">
    
    <span class="Todo-board__heading">
      <input
        type="checkbox"
        id="status-${todo.id}"
        name="status"
        ${todo.isCompleted ? `checked="${todo.isCompleted}"` : ``}
        class="Todo-board__status custom-checkbox"
      >
      <label for="status-${todo.id}"></label>
      <span class="Todo-board__date">${todo.date}</span>
      <div class="Todo-board__edit"> </div>
      <div class="Todo-board__delete"> </div>
    </span>
    
    
    <textarea
      id="Text"
      ${todo.isCompleted ? `style="text-decoration:line-through;"` : ``}
      class="Todo-board__text"
      placeholder="Please enter task description"
      required
      min="1"
      max="256"
      disabled
    >${todo.text}</textarea>
  </div>`;
  list.append(ListElement);
};

function renderList() {
  if (localTodos.length < 1) {
    const element = document.createElement('div');

    element.className = `Todo-board__empty`;
    element.innerHTML = `Create new task by clicking the button below`;
    list.append(element);
  } else {
    if (document.querySelector('.Todo-board__empty')) {
      document.querySelector('.Todo-board__empty').remove();
    }
  }

  localTodos.map(singleTodo => createTodo(singleTodo));

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
  const editButtons = document.querySelectorAll('.Todo-board__edit');

  deleteButtons.forEach(button => handleDelete(button));
  statusCheckboxes.forEach(checkbox => handleStatus(checkbox));
  textInputs.forEach(input => handleTextInputs(input));
  editButtons.forEach(button => handleEdit(button));

  localStorage.setItem('todos', JSON.stringify(localTodos));
}
