var express = require('express');
const fs = require('fs');
const path = require('path');

// Helper để đọc và render partials
const renderPartial = (partialName) => {
  const partialPath = path.join(__dirname, '../views/partials', `${partialName}.hbs`);
  return fs.readFileSync(partialPath, 'utf8');
};

// Import các router con cho từng model
const adminLogRouter = require('./adminlog/index');
const choiceRouter = require('./choice/index');
const difficultyLevelRouter = require('./difficultylevel/index');
const questionRouter = require('./question/index');
const questionPackRouter = require('./questionpack/index');
const quizRouter = require('./quiz/index');
const resultRouter = require('./result/index');
const userRouter = require('./user/index');
const authenticateToken = require('../middlewares/auth');

// Khởi tạo router
const router = express.Router();

// Các route API cho các model
router.use("/api/v1/adminlog", adminLogRouter);
router.use("/api/v1/choice", choiceRouter);
router.use("/api/v1/difficultylevel", difficultyLevelRouter);
router.use("/api/v1/question", questionRouter);
router.use("/api/v1/questionpack", questionPackRouter);
router.use("/api/v1/quiz", quizRouter);
router.use("/api/v1/result", resultRouter);
router.use("/api/v1/user", userRouter);

// Các route để render các trang chính
router.get("/", function(req, res, next) {
  res.render('login', { title: 'LOGIN' });
});
router.get("/login", function(req, res, next) {
  res.render('login', { title: 'LOGIN' });
});

// Route cho trang AdminLog
router.get("/adminlog", function(req, res, next) {
  const content = renderPartial('adminlog');
  res.render('main', { 
      title: 'Admin Log',
      body: content,
  });
});

// Route cho trang Choice
router.get("/choice", function(req, res, next) {
  const content = renderPartial('choice');
  res.render('main', { 
      title: 'Choice',
      body: content,
  });
});

// Route cho trang DifficultyLevel
router.get("/difficultylevel", function(req, res, next) {
  const content = renderPartial('difficultylevel');
  res.render('main', { 
      title: 'Difficulty Level',
      body: content,
  });
});

// Route cho trang Question
router.get("/question", function(req, res, next) {
  const content = renderPartial('question');
  res.render('main', { 
      title: 'Question',
      body: content,
  });
});

// Route cho trang QuestionPack
router.get("/questionpack", function(req, res, next) {
  const content = renderPartial('questionpack');
  res.render('main', { 
      title: 'Question Pack',
      body: content,
  });
});

// Route cho trang Quiz
router.get("/quiz", function(req, res, next) {
  const content = renderPartial('quiz');
  res.render('main', { 
      title: 'Quiz',
      body: content,
  });
});

// Route cho trang Result
router.get("/result", function(req, res, next) {
  const content = renderPartial('result');
  res.render('main', { 
      title: 'Result',
      body: content,
  });
});

// Route cho trang User
router.get("/user", function(req, res, next) {
  const content = renderPartial('user');
  res.render('main', { 
      title: 'User',
      body: content,
  });
});

// Export router để sử dụng trong app chính
module.exports = router;
