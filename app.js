var createError = require('http-errors');
const express = require('express');
const multer = require('multer');
const path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const exphbs = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user/index');

const database = require('./config/db');

const app = express();

// Cấu hình multer
const upload = multer({ dest: 'public/uploads/' }); // Thay đổi đường dẫn nếu cần

// view engine setup
app.engine('hbs', exphbs.engine({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', userRouter);

app.use(session({
  secret: 'KIDLEARN',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

database.connect();

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// Đường dẫn upload avatar
app.post('/api/v1/user/register', upload.single('profile_picture'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const { username, email, password, phoneNumber } = req.body;

    if (!username || !email || !password || !phoneNumber) {
      return res.status(400).send('Thiếu dữ liệu người dùng.');
    }

    const imageUrl = req.file.path;

    res.json({ status: 200, message: 'Người dùng đã được đăng ký thành công', imageUrl });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).send('Đã xảy ra lỗi trên server');
  }
});

app.post('/api/v1/user/login', (req, res) => {
  const { email, password } = req.body;
  // Xử lý đăng nhập ở đây
  res.json({ status: 200, message: 'Đăng nhập thành công!' });
});

app.put('/api/v1/user/update-info/:id', async (req, res) => {
  try {
      const userId = req.params.userId;
      const updateData = req.body;

      // Cập nhật người dùng trong cơ sở dữ liệu
      const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

      if (!updatedUser) {
          return res.status(404).json({ status: 404, message: 'Người dùng không tìm thấy' });
      }

      res.status(200).json({ status: 200, data: updatedUser });
  } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
  }
});

// Ví dụ với multer
app.put('/api/v1/user/update-info/:id', upload.none(), async (req, res) => {
  const role = Number(req.body.role); // Ép kiểu lại về number ở phía server
  console.log('Role received on server:', role); // Kiểm tra giá trị role nhận được
  // Tiếp tục cập nhật dữ liệu
});


module.exports = app;
