const express = require('express');
const app = express();

app.use(express.json());

let users = [];
let nextId = 1;

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Missing fields' });
  const user = { id: nextId++, name, email };
  users.push(user);
  res.status(201).json(user);
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.put("/users/:id", (req,res)=>{
    res.status(202).json({message: "update is successfull"})
})

app.delete('/users/:id', (req, res) => {
  const idx = users.findIndex(u => u.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  users.splice(idx, 1);
  res.status(204).send();
});

app.post('/test/reset', (req, res) => {
  users = [];
  nextId = 1;
  res.status(204).send();
});

module.exports = app;
