const express = require('express');
const router = express.Router();
const DifficultyLevelController = require('../../controllers/DifficultyLevelController');

const difficultyLevelController = new DifficultyLevelController();

// Difficulty level routes
router.post('/create', difficultyLevelController.postCreateLevel); // Đổi tên phương thức từ createDifficultyLevel thành postCreateLevel
router.get('/get-by-id/:id', difficultyLevelController.getLevelByID); // Đổi tên phương thức từ getDifficultyLevelByID thành getLevelByID
router.delete('/delete/:id', difficultyLevelController.deleteLevel); // Đổi tên phương thức từ deleteDifficultyLevel thành deleteLevel

module.exports = router;
