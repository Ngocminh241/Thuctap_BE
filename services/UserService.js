const User = require("../models/User");
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRETKEY = "KIDLEARN";

class UserService {
       // Đăng nhập người dùng
       login = async (email, password) => {
        try {
            // Tìm người dùng theo email
            const user = await User.findOne({ email });
    
            if (user) {
                // So sánh mật khẩu đã mã hóa
                const match = await bcrypt.compare(password, user.password);
    
                if (match) {
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
    register = async (file, username, email, password, phoneNumber, roles, urlsImage) => {
        try {
            // Kiểm tra đầu vào
            if (!email || !password || !username || !phoneNumber) {
                return {
                    status: -3,
                    message: "Thiếu thông tin bắt buộc",
                    data: []
                };
            }

            if (!file) {
                urlsImage = "default_image_url"; // Thay thế bằng đường dẫn ảnh mặc định
            }

            const existingUser = await User.findOne({ phoneNumber: phoneNumber });
            if (existingUser) {
                return {
                    status: -2,
                    message: "Số điện thoại đã được sử dụng",
                    data: []
                };
            }

            const hashedPassword = await bcrypt.hash(password, 10); // Mã hóa mật khẩu
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                phoneNumber,
                role: roles,
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
    
            // Mã hóa mật khẩu mới trước khi lưu
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
            
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

        // Lấy tất cả người dùng
    getAllUsers = async () => {
        try {
            const users = await User.find();
            return {
                status: 200,
                message: "Danh sách tất cả người dùng",
                data: users
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

    // Gửi email để đặt lại mật khẩu
    sendResetPasswordEmail = async (email) => {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return {
                    status: 404,
                    message: 'Email không tồn tại',
                    data: []
                };
            }

            // Tạo mã token đặt lại mật khẩu
            const token = crypto.randomBytes(32).toString('hex');
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 30 * 60 * 1000; // Token hết hạn sau 30 phút
            await user.save();

            // Gửi email với token
            const transporter = nodemailer.createTransport({
                service: 'gmail', // Hoặc một dịch vụ SMTP khác
                auth: {
                    user: 'your-email@gmail.com',
                    pass: 'your-email-password'
                }
            });

            const resetLink = `http://localhost:3000/reset-password?token=${token}`;
            const mailOptions = {
                from: 'your-email@gmail.com',
                to: email,
                subject: 'Đặt lại mật khẩu',
                text: `Bạn đã yêu cầu đặt lại mật khẩu. Nhấn vào liên kết này để đặt lại mật khẩu: ${resetLink}`
            };

            await transporter.sendMail(mailOptions);

            return {
                status: 200,
                message: 'Email đặt lại mật khẩu đã được gửi',
                data: []
            };

        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: 'Có lỗi xảy ra',
                data: []
            };
        }
    }

    // Đặt lại mật khẩu
    resetPassword = async (token, newPassword) => {
        try {
            const user = await User.findOne({
                resetPasswordToken: token,
                resetPasswordExpires: { $gt: Date.now() } // Kiểm tra token còn hiệu lực không
            });

            if (!user) {
                return {
                    status: 400,
                    message: 'Token không hợp lệ hoặc đã hết hạn',
                    data: []
                };
            }

            // Mã hóa mật khẩu mới và lưu
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();

            return {
                status: 200,
                message: 'Mật khẩu đã được đặt lại thành công',
                data: []
            };

        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: 'Có lỗi xảy ra',
                data: []
            };
        }
    }
    updateUserInfoAndPassword = async (id, username, phoneNumber, newPassword) => {
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
    
            if (newPassword) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(newPassword, salt);
            }
    
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
    
}

module.exports = UserService;
