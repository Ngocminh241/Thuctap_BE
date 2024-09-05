const express = require('express');
const router = express.Router();
const ChoiceController = require('../../controllers/ChoiceController');

const choiceController = new ChoiceController();

// Choice routes
router.post('/create', choiceController.createChoice);
router.get('/get-all', choiceController.getAllChoices); // Đảm bảo phương thức này tồn tại
router.get('/get-by-id/:id', choiceController.getChoiceByID);
router.delete('/delete/:id', choiceController.deleteChoice);

module.exports = router;
