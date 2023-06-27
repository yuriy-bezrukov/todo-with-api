export const tasksSrvice = {
  baseHref: 'http://127.0.0.1:3000/item',
  getTasks: function () {
    return fetch(this.baseHref, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
  },
  deleteTask: function (id) {
    return fetch(this.baseHref, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ id: id }),
    });
  },
  createTask: function (text) {
    return fetch(this.baseHref, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ text: text }),
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
