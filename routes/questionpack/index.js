const express = require('express');
const router = express.Router();
const QuestionPackController = require('../../controllers/QuestionPackController');

// QuestionPack routes
router.post('/create', new QuestionPackController().postCreatePack); // Thay đổi tên phương thức
router.get('/get-all', new QuestionPackController().getAllQuestionPacks);
router.get('/get-by-id/:id', new QuestionPackController().getPackByID);
router.delete('/delete/:id', new QuestionPackController().deletePack);

module.exports = router;
