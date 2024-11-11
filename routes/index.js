var express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Cấu hình multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Helper để đọc và render partials
const renderPartial = (partialName) => {
  const partialPath = path.join(__dirname, '../views/partials', `${partialName}.hbs`);
  return fs.readFileSync(partialPath, 'utf8');
};

// Định nghĩa hàm renderPage
const renderPage = (title, viewName) => (req, res) => {
  res.render(viewName, { title: title });
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

// Route cho các trang sử dụng partials
router.get("/adminlog", function(req, res, next) {
  const content = renderPartial('adminlog');
  res.render('main', { 
      title: 'Admin Log',
      body: content,
  });
});

router.get("/choice", function(req, res, next) {
  const content = renderPartial('choice');
  res.render('main', { 
      title: 'Choice',
      body: content,
  });
});

router.get("/difficultylevel", function(req, res, next) {
  const content = renderPartial('difficultylevel');
  res.render('main', { 
      title: 'Quản lý cấp độ',
      body: content,
  });
});

router.get("/question", function(req, res, next) {
  const content = renderPartial('question');
  res.render('main', { 
      title: 'Question',
      body: content,
  });
});

router.get("/questionpack", function(req, res, next) {
  const content = renderPartial('questionpack');
  res.render('main', { 
      title: 'Quản lý gói câu hỏi',
      body: content,
  });
});

router.get("/quiz", function(req, res, next) {
  const content = renderPartial('quiz');
  res.render('main', { 
      title: 'Quiz',
      body: content,
  });
});

router.get("/result", function(req, res, next) {
  const content = renderPartial('result');
  res.render('main', { 
      title: 'Result',
      body: content,
  });
});

router.get("/user", function(req, res, next) {
  const content = renderPartial('user');
  res.render('main', { 
      title: 'Quản lý người dùng',
      body: content,
  });
});

// Route đăng nhập
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Thực hiện kiểm tra thông tin đăng nhập ở đây
  // Giả sử đăng nhập thành công
  
  res.render('user', {
    title: 'Danh sách người dùng',
    users: [] // Thay thế bằng dữ liệu người dùng thực tế
  });
});

// Định nghĩa endpoint với multer
router.post('/register', upload.single('profile_picture'), (req, res) => {
  new UserController().postRegister(req, res);
});

// Middleware xử lý lỗi chung
router.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).send('Internal Server Error');
});

// Export router để sử dụng trong app chính
module.exports = router;
