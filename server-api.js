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
    case 'GET':
      break;
    case 'PUT': {
      taskId++;
      const newTask = { text: req.body.text, id: taskId };
      items.push(newTask);
      console.log('items: ', items);
      res.json(newTask);
      return;
    }
    case 'POST': {
      const task = items.find(item => item.id === req.body.id);
      if (task !== null) {
        task.text = req.body.text;
      } else {
        res.sendStatus(404);
      }
      break;
    }
    case 'DELETE': {
      const filtredTaskList = items.filter(item => item.id !== req.body.id);
      if (items.length !== filtredTaskList.length) {
        items = filtredTaskList;
      } else {
        res.sendStatus(404);
      }
      break;
    }
    default:
      console.log('error request', req.method, req.url);
  }
  console.log('items: ', items);
  res.json(items);
});

app.listen(3000, function () {
  console.log('ExpressJs server run on 3000 port');
});
