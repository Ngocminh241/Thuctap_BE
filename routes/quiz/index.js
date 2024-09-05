const express = require('express');
const router = express.Router();
const QuizController = require('../../controllers/QuizController');

// Quiz routes
router.post('/create', new QuizController().postCreateQuiz); // Thay đổi tên phương thức
router.get('/get-all', new QuizController().getAllQuizzes); // Thêm phương thức getAllQuizzes vào controller và service
router.get('/get-by-id/:id', new QuizController().getQuizByID);
router.delete('/delete/:id', new QuizController().deleteQuiz);

module.exports = router;
