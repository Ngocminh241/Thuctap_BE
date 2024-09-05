const express = require('express');
const router = express.Router();
const ResultController = require('../../controllers/ResultController');

// Result routes
router.post('/create', new ResultController().postCreateResult); // Thay đổi tên phương thức
router.get('/get-all', new ResultController().getAllResults); // Thêm phương thức getAllResults vào controller và service
router.get('/get-by-id/:id', new ResultController().getResultByID);
router.delete('/delete/:id', new ResultController().deleteResult);

module.exports = router;
