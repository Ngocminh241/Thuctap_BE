const express = require('express');
const router = express.Router();
const DifficultyLevelController = require('../../controllers/DifficultyLevelController');

const difficultyLevelController = new DifficultyLevelController();

// Routes for difficulty levels
router.post('/create', difficultyLevelController.postCreateLevel); 
router.get('/get-by-id/:id', difficultyLevelController.getLevelByID); 
router.delete('/delete/:id', difficultyLevelController.deleteLevel); 
router.get('/get-level-by-page', difficultyLevelController.getLevelByPage);
router.put('/update/:id', difficultyLevelController.updateLevel); 
router.get('/get-all-level', difficultyLevelController.getAllLevels);


module.exports = router;
