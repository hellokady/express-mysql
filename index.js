const express = require('express')
const app = express()
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3307,
  password: '123456',
  database: 'test'
})
const port = 3000

connection.connect(() => {
  console.log('connect mysql server to port: 3307 successfully');
})

app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users/:id', (req, res) => {
  connection.query(`SELECT * FROM user WHERE id=${req.params.id}`, {
    conn: true,
  }, (err, rows, fields) => {
    if (err) {
      return res.send(err);
    }

    res.send(rows);
  })
})

app.post('/users', (req, res) => {
  connection.query(`INSERT INTO user (name, age) VALUES('${req.body.name}',${req.body.age})`, (err, rows, fields) => {
    if (err) {
      return res.send(err);
    }

    res.send(rows);
  })
})

app.put('/users/:id', (req, res) => {
  connection.query(`UPDATE user SET name='${req.body.name}',age=${req.body.age} WHERE id=${req.params.id}`, (err, rows, fields) => {
    if (err) {
      return res.send(err);
    }

    res.send(rows);
  })
})

app.delete('/users/:id', (req, res) => {
  connection.query(`DELETE FROM user WHERE id=${req.params.id}`, (err, rows, fields) => {
    if (err) {
      return res.send(err);
    }

    res.send(rows);
  })
})

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM user', (err, rows, fields) => {
    if (err) {
      return res.send(err);
    }

    res.send(rows);
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})