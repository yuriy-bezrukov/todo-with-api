import { tasksService } from './services/tasks-service.js';
import { Task } from './models/task/task.js';
import { ImportantTask } from './models/task/important-task.js';
import { Preloader } from './modules/preloader.js';

let taskList = [];
let idTimeout;
const preloader = new Preloader('.todo');

function getTasks(event) {
  const text = event?.target?.value;

  clearTimeout(idTimeout);

  idTimeout = setTimeout(() => {
    tasksService
      .getTasks(text)
      .then((res) => {
        taskList = res.map((t) => new Task(t));
        render();
      })
      .catch(() => {
        alert('Сетевая ошибка');
      });
  }, 300);
}

const elements = {
  taskList: document.querySelector('.task-list'),
  liveSearch: document.querySelector('.live-search'),
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
    <div class="task__date">${getDateString(task.date)}</div>
  </div> 
  `;
}

function getDateString(date) {
  return `${date.getFullYear()}.${date.getMonth()}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
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

  preloader.show();

  tasksService
    .createTask(taskText)
    .then((res) => {
      const newTask = res.id % 2 === 0 ? new Task(res) : new ImportantTask(res);
      taskList.push(newTask);
      elements.newTask.textInput.value = '';

      newTask.create();
    })
    .finally(() => {
      preloader.hide();
    });
}

function onDeleteTask(event) {
  let isDeleteButton = event.target.classList.contains('task__delete');
  if (!isDeleteButton) {
    return;
  }

  preloader.show();

  const taskId = Number(event.target.parentElement.dataset.id);
  tasksService
    .deleteTask(taskId)
    .then(() => {
      const task = taskList.find((task) => task.id === taskId);

      task.delete();

      taskList = taskList.filter((task) => task.id !== taskId);
    })
    .catch(() => {
      alert('error on delete task');
    })
    .finally(() => {
      preloader.hide();
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
  elements.liveSearch.addEventListener('input', getTasks);
}

function main() {
  setSubscriptions();
  getTasks();
}

main();
