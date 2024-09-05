const express = require('express');
const router = express.Router();
const QuestionController = require('../../controllers/QuestionController');

const questionController = new QuestionController();

// Question routes
router.post('/create', questionController.postCreateQuestion); // Đổi tên từ createQuestion thành postCreateQuestion
router.get('/get-by-id/:id', questionController.getQuestionByID); // Đổi tên từ getQuestionByID thành getQuestionByID
router.delete('/delete/:id', questionController.deleteQuestion); // Đổi tên từ deleteQuestion thành deleteQuestion

module.exports = router;
