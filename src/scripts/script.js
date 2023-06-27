import { tasksSrvice } from './tasks-service.js';

let taskList = [];

function initTaskList() {
  tasksSrvice
    .getTasks()
    .then((res) => res.json())
    .then((res) => {
      taskList = res;
      render();
    })
    .catch(() => {
      alert('Сетевая ошибка');
    });
}

const elements = {
  taskList: document.querySelector('.task-list'),
  newTask: {
    textInput: document.querySelector('.new-task__input'),
    form: document.querySelector('.new-task'),
  },
  document: document,
};

function getTaskTemplateHtml(task) {
  return ` 
  <div class="task" data-id="${task.id}"> 
    <input class="task__text" value="${task.text}" disabled> 
    <div class="task__actions">
      <button class="task__cancel-edit">cancel</button> 
      <button class="task__update">update</button> 
    </div>
    <button class="task__delete">x</button> 
  </div> 
  `;
}

function render() {
  let htmlTemplate = taskList.reduce(
    (acc, task) => acc + getTaskTemplateHtml(task),
    ''
  );
  document.querySelector('.task-list').innerHTML = htmlTemplate;
}

function onCreateTask(event) {
  event.preventDefault();
  const taskText = elements.newTask.textInput.value;
  tasksSrvice
    .createTask(taskText)
    .then((res) => res.json())
    .then((res) => {
      taskList.push(res);
      elements.newTask.textInput.value = '';
      render();
    });
}

function onDeleteTask(event) {
  let isDeleteButton = event.target.classList.contains('task__delete');
  if (!isDeleteButton) {
    return;
  }
  const taskId = Number(event.target.parentElement.dataset.id);

  tasksSrvice
    .deleteTask(taskId)
    .then((res) => res.json())
    .then(() => {
      taskList = taskList.filter((task) => task.id !== taskId);
      render();
    })
    .catch(() => {
      alert('error on delete task');
    });
}

function setEditableTask(event) {
  let isTextInput = event.target.classList.contains('task__text');
  if (!isTextInput) {
    return;
  }
  const inputElement = event.target;
  inputElement.parentElement.classList.add('task--editing');

  if (inputElement.disabled) {
    inputElement.removeAttribute('disabled');
  }
}

function disableTask(event) {
  let isCancelEdit = event.target.classList.contains('task__cancel-edit');
  if (!isCancelEdit) {
    return;
  }
  const inputElement =
    event.target.parentElement.parentElement.querySelector('.task__text');

  if (!inputElement.disabled) {
    inputElement.setAttribute('disabled', '');
    inputElement.parentElement.classList.remove('task--editing');
  }
}

function onUpdateTask(event) {
  let isUpdateTask = event.target.classList.contains('task__update');
  if (!isUpdateTask) {
    return;
  }
  // задание
  // надо:
  // 1. обновить данные на сервере
  // 2. при успешном ответе обновить данные в массиве
  // 2.1 сделать render
  // 3 при ошибке показать alert('Сетевая ошибка')
  console.warn('Надо выполнить задание выше');
}

function setSubscriptions() {
  elements.newTask.form.addEventListener('submit', onCreateTask);
  elements.taskList.addEventListener('click', onDeleteTask);
  elements.taskList.addEventListener('click', setEditableTask);
  elements.taskList.addEventListener('click', disableTask);
  elements.taskList.addEventListener('click', onUpdateTask);
}

function main() {
  setSubscriptions();
  initTaskList();
}

main();
