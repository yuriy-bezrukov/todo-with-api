export const tasksSrvice = {
  baseHref: 'http://127.0.0.1:3000/item',
  getTasks: function () {
    return fetch(this.baseHref, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        return res.map((task) => {
          return mapToTask(task);
        });
      });
  },
  deleteTask: function (id) {
    return fetch(this.baseHref, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ id: id }),
    }).then((res) => res.json());
  },
  createTask: function (text) {
    return fetch(this.baseHref, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ text: text }),
    })
      .then((x) => x.json())
      .then((x) => {
        return mapToTask(x);
      });
  },
  updateTask: function (task) {
    return fetch(this.baseHref, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(task),
    });
  },
};

function mapToTask(taskDTO) {
  let newTask = {
    ...taskDTO,
    id: Number(taskDTO.id),
    date: new Date(taskDTO.date),
  };
  return newTask;
}
