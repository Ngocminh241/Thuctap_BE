const express = require('express');
const router = express.Router();
const AdminLogController = require('../../controllers/AdminLogController');

// Tạo một thể hiện của AdminLogController
const adminLogController = new AdminLogController();

// Các route sử dụng các phương thức của AdminLogController
router.post('/create-log', adminLogController.postCreateLog);
router.get('/all-logs', adminLogController.getAllLogs);

module.exports = router;
