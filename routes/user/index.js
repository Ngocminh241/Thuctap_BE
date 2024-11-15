const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/UserController');
const Upload = require('../../config/common/upload');

const userController = new UserController();

router.post('/login', userController.postLogin);
router.post('/register', Upload.single('profile_picture'), userController.postRegister);
router.get('/get-user-by-page', userController.getUserByPage);
router.get('/get-user-by-id/:id', userController.getUserByID);
router.get('/get-all-user', userController.getAllUser);
router.delete('/delete-user/:id', userController.deleteUser);
router.put('/change-password/:id', userController.changePassword);
router.put('/update-info/:id', userController.updateUserInfo);
router.put('/update-avatar/:id', Upload.single('profile_picture'), userController.updateAvatar);

module.exports = router;
