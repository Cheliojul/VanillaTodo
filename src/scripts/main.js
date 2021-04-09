'use strict';

const list = document.querySelector('.Todo-board');
const button = document.querySelector('#Add');
const todoList = [
  {
    date: '21 Jan 2021',
    text: 'DFvcvcvoodfdlffdf',
    isCompleted: false,
  },
];

function renderList() {
  todoList.map(singleTodo => {
    const ListElement = document.createElement('li');

    ListElement.class = 'Todo-board__Todo';

    ListElement.innerHTML = `
    <div class="Todo-board__todo">
      
      <span  class="Todo-board__heading">
      <span class="Todo-board__status"></span>
        <span class="Todo-board__date">${singleTodo.date}</span>
        <img class="Todo-board__edit" />
        <img class="Todo-board__delete" />
      </span>
      
      
      <textarea
        class="Todo-board__text"
        placeholder="Please enter task description"
      >${singleTodo.text}</textarea>
    </div>`;
    list.append(ListElement);
  });
}

renderList();

button.addEventListener('click', () => {
  todoList.push({
    date: '',
    text: '',
    isCompleted: false,
  });

  const elements = document.querySelectorAll('.Todo-board__todo');

  elements.forEach(element => element.remove());

  renderList();
});
