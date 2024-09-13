const loginForm = document.getElementById('loginForm');
const url = `http://localhost:3000/api/v1/user/login`;

const loginUser = async () => {
    try {
        const formData = new FormData(loginForm);
        const email = formData.get('email');
        const password = formData.get('password');

        if (!email || !password) {
            alert('Email và mật khẩu không thể trống');
            return;
        }

        console.log('Sending data:', { email, password });

        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        // Kiểm tra mã trạng thái HTTP
        console.log('HTTP Status:', response.status);

        const result = await response.json();
        console.log('Server response:', result);

        if (response.ok) {
            if (result.status === 200) {
                alert(result.message);
                window.location.href = '/user'; // Đảm bảo đường dẫn đúng
                loginForm.reset();
            } else {
                alert(result.message);
            }
        } else {
            // Xem chi tiết lỗi từ phản hồi
            const errorText = await response.text();
            alert('Có lỗi xảy ra trong quá trình đăng nhập: ' + errorText);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
};


loginForm.addEventListener('submit', async event => {
    event.preventDefault();
    loginUser();
});
