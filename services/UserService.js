const User = require("../models/User");
const JWT = require('jsonwebtoken');
const SECRETKEY = "KIDLEARN";

class UserService {
    // Đăng nhập người dùng
    login = async (email, password) => {
        try {
            const user = await User.findOne({ email, password });
            if (user) {
                const token = JWT.sign({ id: user._id }, SECRETKEY, { expiresIn: '1h' });
                const refreshToken = JWT.sign({ id: user._id }, SECRETKEY, { expiresIn: '1d' });
                return {
                    status: 200,
                    message: "Đăng nhập thành công",
                    data: user,
                    token: token,
                    refreshToken: refreshToken
                };
            } else {
                return {
                    status: 400,
                    message: "Lỗi, đăng nhập không thành công",
                    data: []
                };
            }
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: "Có lỗi xảy ra",
                data: []
            };
        }
    }

    // Đăng ký người dùng
    register = async (file, username, email, password, phone, roles, urlsImage) => {
        try {
            if (!file) {
                urlsImage = "default_image_url"; // Thay thế bằng đường dẫn ảnh mặc định
            }
            const existingUser = await User.findOne({ phoneNumber: phone });
            if (existingUser) {
                return {
                    status: -2,
                    message: "Số điện thoại đã được sử dụng",
                    data: []
                };
            }

            const newUser = new User({
                username: username,
                email: email,
                password: password,
                phoneNumber: phone,
                profile_picture: urlsImage
            });
            const result = await newUser.save();
            return {
                status: 200,
                message: "Đăng ký thành công",
                data: result
            };
        } catch (error) {
            console.error('Error:', error);
            return {
                status: -1,
                message: 'Internal server error',
                data: null
            };
        }
    }

    // Lấy người dùng theo trang
    getUserByPage = async (page, limit) => {
        try {
            const skip = (parseInt(page) - 1) * parseInt(limit);
            const users = await User.find().skip(skip).limit(parseInt(limit));
            const totalUser = await User.countDocuments();
            const totalPages = Math.ceil(totalUser / parseInt(limit));
            return {
                status: 200,
                message: "Danh sách người dùng",
                data: { users, totalPages }
            };
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: "Có lỗi xảy ra",
                data: []
            };
        }
    }

    // Lấy người dùng theo ID
    getUserByID = async (id) => {
        try {
            const user = await User.findById(id);
            return {
                status: 200,
                message: "Thông tin người dùng",
                data: user
            };
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: "Có lỗi xảy ra",
                data: null
            };
        }
    }

    // Xóa người dùng
    deleteUser = async (id) => {
        try {
            const result = await User.findByIdAndDelete(id);
            if (result) {
                return {
                    status: 200,
                    message: "Xóa thành công",
                    data: result
                };
            } else {
                return {
                    status: 400,
                    message: "Lỗi, xóa không thành công",
                    data: []
                };
            }
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: "Có lỗi xảy ra",
                data: null
            };
        }
    }

    // Thay đổi mật khẩu
    changePassword = async (id, newPassword) => {
        try {
            const user = await User.findById(id);
            if (!user) {
                return {
                    status: 404,
                    message: 'Người dùng không tìm thấy',
                    data: []
                };
            }
            user.password = newPassword;
            const result = await user.save();
            return {
                status: 200,
                message: 'Mật khẩu đã được thay đổi thành công',
                data: result
            };
        } catch (error) {
            console.error('Error:', error);
            return {
                status: 500,
                message: 'Internal server error',
                data: null
            };
        }
    }

    // Cập nhật thông tin người dùng
    updateUserInfo = async (id, username, phoneNumber) => {
        try {
            const user = await User.findById(id);
            if (!user) {
                return {
                    status: 404,
                    message: 'Người dùng không tìm thấy',
                    data: []
                };
            }
            user.username = username || user.username;
            user.phoneNumber = phoneNumber || user.phoneNumber;
            const result = await user.save();
            return {
                status: 200,
                message: 'Thông tin người dùng đã được cập nhật',
                data: result
            };
        } catch (error) {
            console.error('Error:', error);
            return {
                status: 500,
                message: 'Internal server error',
                data: null
            };
        }
    }

    // Cập nhật ảnh đại diện
    updateAvatar = async (id, avatarUrl) => {
        try {
            const user = await User.findById(id);
            if (!user) {
                return {
                    status: 404,
                    message: 'Người dùng không tìm thấy',
                    data: []
                };
            }
            if (avatarUrl) {
                user.profile_picture = avatarUrl;
            }
            const result = await user.save();
            return {
                status: 200,
                message: 'Ảnh đại diện đã được cập nhật thành công',
                data: result
            };
        } catch (error) {
            console.error('Error:', error);
            return {
                status: 500,
                message: 'Internal server error',
                data: null
            };
        }
    }
}

module.exports = UserService;
