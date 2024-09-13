const User = require("../models/User");
const UserService = require("../services/UserService");

class UserController {
    postLogin = async (req, res) => {
        const { email, password } = req.body;
        try {
            const data = await new UserService().login(email, password);
            if (data.status === 200) {
                res.json({
                    status: data.status,
                    message: data.message,
                    data: data.data,
                    token: data.token,
                    refreshToken: data.refreshToken
                });
            } else {
                res.status(data.status).json({
                    status: data.status,
                    message: data.message,
                    data: data.data
                });
            }
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ status: 500, message: "Có lỗi xảy ra" });
        }
    }
    
    

    postRegister = async (req, res) => {
        try {
            const file = req.file;
            const { username, email, password, phoneNumber, roles } = req.body;
            let urlsImage = "";
    
            if (file) {
                urlsImage = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
            }
    
            const data = await new UserService().register(file, username, email, password, phoneNumber, roles, urlsImage);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            });
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({ status: 500, message: "Có lỗi xảy ra" });
        }
    }
    

    getAllUser = async (req, res) => {
        try {
            const data = await User.find();
            res.json({
                status: 200,
                message: "Danh sách người dùng",
                data: data
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "Có lỗi xảy ra" });
        }
    }

    getUserByPage = async (req, res) => {
        const { page, limit } = req.query;
        try {
            const data = await new UserService().getUserByPage(page, limit);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "Có lỗi xảy ra" });
        }
    }

    getUserByID = async (req, res) => {
        const { id } = req.params;
        try {
            const data = await new UserService().getUserByID(id);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            });
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ status: 500, message: "Có lỗi xảy ra" });
        }
    }

    deleteUser = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await new UserService().deleteUser(id);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "Có lỗi xảy ra" });
        }
    }

    changePassword = async (req, res) => {
        const { id } = req.params;
        const { newPassword } = req.body;
    
        if (!id || !newPassword) {
            return res.status(400).json({ message: 'Invalid request, missing id or newPassword' });
        }
    
        try {
            const result = await new UserService().changePassword(id, newPassword);
            res.status(result.status).json(result);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ status: 500, message: 'Internal server error' });
        }
    }
    

    updateUserInfo = async (req, res) => {
        const userId = req.params.id;
        const { username, phoneNumber } = req.body;

        try {
            const result = await new UserService().updateUserInfo(userId, username, phoneNumber);
            res.status(result.status).json(result);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ status: 500, message: 'Internal server error' });
        }
    }

    updateAvatar = async (req, res) => {
        try {
            const file = req.file;
            const userId = req.params.id;
            let urlsImage = null;

            if (file) {
                if (req.get("host") === "10.0.2.2:3000") {
                    urlsImage = `${req.protocol}://localhost:3000/uploads/${file.filename}`;
                } else {
                    urlsImage = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
                }
            }

            const result = await new UserService().updateAvatar(userId, urlsImage);
            res.status(result.status).json(result);
        } catch (error) {
            console.error("Lỗi khi cập nhật avatar của người dùng:", error);
            res.status(500).json({ status: 500, message: "Đã xảy ra lỗi khi cập nhật avatar của người dùng" });
        }
    }
}

module.exports = UserController;
