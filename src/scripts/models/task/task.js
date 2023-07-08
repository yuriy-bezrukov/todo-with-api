export class Task {
  constructor(task) {
    this.id = task.id;
    this.text = task.text;
    this.date = task.date;
  }

  delete() {
    document.querySelector(this.#getSelector()).remove();
  }

  create() {
    const taskListElement = document.querySelector('.task-list');
    const htmlTemplate = this.getTaskTemplateHtml();
    taskListElement.innerHTML = htmlTemplate + taskListElement.innerHTML;
  }

  #getSelector() {
    return `.task[data-id="${this.id}"]`;
  }

  getTaskTemplateHtml() {
    return ` 
      <div class="task" data-id="${this.id}"> 
        <input class="task__text" value="${this.text}" disabled> 
        <div class="task__actions">
          <button class="task__cancel-edit">cancel</button> 
          <button class="task__update">update</button> 
        </div>
        <button class="task__delete">x</button>
        <div class="task__date">${this.#getDateString(this.date)}</div>
      </div> 
      `;
  }

  #getDateString(date) {
    return `${date.getFullYear()}.${date.getMonth()}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  }
}
