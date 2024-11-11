const express = require('express');
const router = express.Router();
const QuestionPackController = require('../../controllers/QuestionPackController');

// Định nghĩa các route cho QuestionPack
router.post('/create', new QuestionPackController().postCreatePack);
router.get('/get-all', new QuestionPackController().getAllQuestionPacks);
router.get('/get-by-id/:id', new QuestionPackController().getPackByID);
router.get('/get-by-page', new QuestionPackController().getPacksByPage);
router.delete('/delete/:id', new QuestionPackController().deletePack);
router.put('/update/:id', new QuestionPackController().updatePack); 

module.exports = router;
