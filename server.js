// ======================================================================
// SET UP Dependency
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');

const app = express();
const dbPath = path.join(__dirname, '/data/users.json');

// ======================================================================
// CONFIGURATION
// handlebars
app.engine('handlebars', exphbs({ defaultLayout: false }));
app.set('view engine', 'handlebars');
// Static File Service
app.use(express.static('public'));
// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// ======================================================================
// ROUTES

// index
app.get('/', (req, res) => res.render('index'));

// app.get('/user-list', (req, res) => res.render('user-list'));

// 사용자 인증 요청
app.post('/auth', (req, res) => {
  const result = {};

  const { userid, password } = req.body;

  if (!userid || !password) {
    result.success = false;
    result.message = 'invalid request';
    res.json(result);
    return;
  }

  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) throw err;

    const { users } = JSON.parse(data);
    result.success = users.some(item => (item.userid === userid) && (item.password === password));

    res.json(result);
  });
});

// GET Users
app.get('/users', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) throw err;

    const { users } = JSON.parse(data);
    res.json(users);
  });
});

// GET User
app.get('/users/:userid', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) throw err;

    const result = {};
    const json = JSON.parse(data);
    const [user] = json.users.filter(({ userid }) => userid === req.params.userid);

    // 조회 대상 없음
    if (!user) {
      result.success = false;
      result.message = '조회 대상 없음';
      res.json(result);
      return;
    }

    res.json(user);
  });
});

// CREATE User
app.post('/users', (req, res) => {
  const result = {};
  const { userid, password } = req.body;

  // Check request body
  if (!userid || !password) {
    result.success = false;
    result.message = 'invalid request';
    res.json(result);
    return;
  }

  // Load users & Check duplication
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) throw err;

    const json = JSON.parse(data);
    const [user] = json.users.filter(user => user.userid === userid);

    // 사용자 아이디 중복
    if (user) {
      result.success = false;
      result.message = '사용자 아이디 중복';
      res.json(result);
      return;
    }

    // Add data
    json.users.push(req.body);

    // Create user
    fs.writeFile(dbPath, JSON.stringify(json, null, 2), 'utf8', err => {
      if (err) throw err;

      result.success = true;
      res.json(result);
    });
  });
});

// Update user
app.put('/users/:id', (req, res) => {
  const result = {};
  const id = req.params.id * 1;

  // Check userid & request body
  if (!id || !req.body) {
    result.success = false;
    result.message = 'invalid request';
    res.json(result);
    return;
  }

  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) throw err;

    const json = JSON.parse(data);

    // 갱신 대상 없음
    if (!json.users.some(user => user.id === id)) {
      result.success = false;
      result.message = '갱신 대상 없음';
      res.json(result);
      return;
    }

    // Update data
    json.users = json.users.map(user => {
      if (user.id === id) user = req.body;
      return user;
    });

    // Update JSON File
    fs.writeFile(dbPath, JSON.stringify(json, null, 2), 'utf8', err => {
      if (err) throw err;

      result.success = true;
      res.json(result);
    });
  });
});

// DELETE User
app.delete('/users/:id', (req, res) => {
  const result = {};
  const id = req.params.id * 1;

  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) throw err;

    const json = JSON.parse(data);

    // 삭제 대상 없음
    if (!json.users.some(user => user.id === id)) {
      result.success = false;
      result.message = '삭제 대상 없음';
      res.json(result);
      return;
    }

    // DELETE data
    json.users = json.users.filter(user => user.id !== id);

    // DELETE JSON File
    fs.writeFile(dbPath, JSON.stringify(json, null, 2), 'utf8', err => {
      result.success = true;
      res.json(result);
    });
  });
});

app.listen(3000, () => console.log('Example app listening on http://localhost:3000'));
