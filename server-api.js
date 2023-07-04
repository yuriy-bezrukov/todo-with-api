/**
 * API
 *
 * PUT =>    input {text: 'string'}  output { text: 'string', id: 1}
 * GET =>                            output [{text: 'string', id: 1}, ...]
 * DELETE => input {id: 1}           output [{text: 'string', id: 1}, ...]
 */

var items = []; // [{text: string, id: number}]
var taskId = 0;

// eslint-disable-next-line no-undef
var express = require('express');
var app = express();

const jsonParser = express.json();

function resolveCors(res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
}

app.use('/item', jsonParser, function (req, res) {
  resolveCors(res);

  switch (req.method) {
    case 'GET': {
      console.log('search text: ', req.query.search); // надо использовать эту переменную для фильтрации задач
      res.json(items);
      break;
    }
    case 'PUT': {
      taskId++;
      const newTask = {
        id: taskId,
        text: req.body.text,
        date: new Date().toISOString(),
      };
      items.push(newTask);
      console.log('items: ', items);
      res.json(newTask);
      return;
    }
    case 'POST': {
      const task = items.find((item) => item.id === req.body.id);
      if (task !== null) {
        task.text = req.body.text;
        res.statusCode(201);
      } else {
        res.sendStatus(404);
      }
      break;
    }
    case 'DELETE': {
      const filtredTaskList = items.filter((item) => item.id !== req.body.id);
      if (items.length !== filtredTaskList.length) {
        items = filtredTaskList;
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
      break;
    }
    case 'OPTIONS': {
      res.sendStatus(204);
      break;
    }
    default:
      console.log('error request', req.method, req.url);
  }
});

app.listen(3000, function () {
  console.log('ExpressJs server run on 3000 port');
});
