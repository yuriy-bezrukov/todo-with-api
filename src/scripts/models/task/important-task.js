import { Task } from './task.js';

export class ImportantTask extends Task {
  constructor(task) {
    super(task);
  }

  getTaskTemplateHtml() {
    return ` 
          <div class="task task--important" data-id="${this.id}"> 
            <input class="task__text" value="${this.text}" disabled> 
            <div class="task__actions">
              <button class="task__cancel-edit">cancel</button> 
              <button class="task__update">update</button> 
            </div>
            <button class="task__delete">x</button>
            <div class="task__date">${this.getDateString(this.date)}</div>
          </div> 
          `;
  }

  delete() {
    super.delete();

    alert('Удалили очень важную задачу....');
  }
}
