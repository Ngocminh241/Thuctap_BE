const jwt = require('jsonwebtoken');

// Middleware để xác thực token
const authenticateToken = (req, res, next) => {
    // Lấy token từ header Authorization
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.sendStatus(401); // Nếu không có header Authorization, trả về mã lỗi 401
    }

    // Tách token từ header Authorization
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Nếu không có token, trả về mã lỗi 401
    }

    // Xác thực token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Token không hợp lệ, trả về mã lỗi 403
        }
        // Gán thông tin người dùng vào đối tượng req
        req.user = user;
        next(); // Tiếp tục xử lý yêu cầu
    });
};

module.exports = authenticateToken;
