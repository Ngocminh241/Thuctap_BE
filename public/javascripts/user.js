const url = 'http://localhost:3000/api/v1/user';

let tbody = document.querySelector('tbody');
let dialog = document.getElementById('bgr-dialog');
let dialogbody = document.getElementById('dialog-content');
let preloader = document.getElementById('preloader');
let pageNumber = document.getElementById('page-number');
let tang = document.getElementById('ic-tang');
let giam = document.getElementById('ic-giam');

let numberPage = 1;
let totalPages;

const fetchAPI_Page = async (currentPage) => {
    try {
        const response = await fetch(`${url}/get-user-by-page?page=${currentPage}&limit=5`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const html = data.data.users.map(items => `
            <tr>
                <td>
                    <img style="width:30px;height:30px;object-fit:cover" src="${items.profile_picture}" alt="Avatar"/>
                </td>
                <td>${items.username}</td>
                <td>${items.role === 1 ? 'User' : 'Admin'}</td>
                <td >${items.email}</td>
                <td>${items.phoneNumber}</td>
                <td style="gap: 20px; font-size: 20px">
                    <i onclick="BtnChiTiet('${items._id}','${items.profile_picture}','${items.username}','${items.email}','${items.phoneNumber}')" class="bi bi-eye"></i>
                    <i onclick="BtnSua('${items._id}')" class="bi bi-pen"></i>
                    <i onclick="BtnXoa('${items._id}')" class="bi bi-trash3"></i>
                </td>
            </tr>`).join('');
        preloader.style.display = 'none';
        tbody.innerHTML = html;
        pageNumber.value = numberPage;
        totalPages = data.data.totalPages;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};


fetchAPI_Page(numberPage);

const BtnChiTiet = (_id, profile_picture, username, email, phoneNumber) => {
    dialog.style.display = 'flex';
    let html = /*html*/`
        <div class="bgr-dialog-chitiet-content" style="
            width:100%;
            height:100%;
        ">
            <div class="bgr-dialog-chitiet-content-title text-center">
                <h2>THÔNG TIN NGƯỜI DÙNG</h2>
            </div>
            <div class="bgr-dialog-chitiet-content-body">
                <div class="bgr-dialog-chitiet-content-body-image d-flex flex-row justify-content-center" style="
                    width:100%;
                    margin: 20px;
                ">
                    <img width="150px" height="200px" 
                        style="
                            object-fit: cover;
                            align-self: center;
                            border-radius: 10px;
                        " src="${profile_picture}" alt="">
                </div>
                <div class="bgr-dialog-chitiet-content-body-category">
                    <p style="
                        background-color: white;
                        margin: 0;
                        padding: 0 20px;
                        font-weight: bold;
                    ">ID người dùng: ${_id}</p>
                    <div class="d-flex justify-content-between">
                        <p style="
                            background-color: white;
                            margin: 0;
                            padding: 0px 40px;
                        ">Tên người dùng: ${username}</p>
                    </div>
                    <p style="
                        background-color: white;
                        margin: 0;
                        padding: 0px 40px;
                    ">Email: ${email}</p>
                    <p style="
                        background-color: white;
                        margin: 0;
                        padding: 0px 40px;
                    ">Số điện thoại: ${phoneNumber}</p>
                </div>
            </div>
            <div class="bgr-dialog-chitiet-content-button text-center">
                <button style="
                    width: 30%;
                    height: 55px;
                    background-color: #404E67;
                    color: white;
                    outline: none;
                    border: none;
                    border-radius: 5px;
                    margin-top: 20px;
                " type="button" onclick="closeDialog()">OK</button>
            </div>
        </div>`;
    dialogbody.innerHTML = html;
};

const closeDialog = () => {
    dialog.style.display = 'none';
};

tang.addEventListener('click', event => {
    event.preventDefault();
    if (numberPage < totalPages) {
        numberPage++;
        fetchAPI_Page(numberPage);
    }
});

giam.addEventListener('click', event => {
    event.preventDefault();
    if (numberPage > 1) {
        numberPage--;
        fetchAPI_Page(numberPage);
    }
});

const BtnAdd = () => {
    dialog.style.display = 'flex';
    let html = /*html*/`
        <div class="dialog-add w-100 h-100">
            <h2 class="title-dialog text-center">Thêm User</h2>
            <form id="form-user" method="post" enctype="multipart/form-data">
                <div class="form-group">
                    <span class="title" id="inputGroup-sizing-default">Tên:</span>
                    <input id="name-user" type="text" class="form-control" name="username" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                </div>
                <div class="form-group">
                    <span class="title" id="inputGroup-sizing-default">Hình ảnh: </span>
                    <input type="file" class="form-control" id="profile_picture" name="profile_picture" aria-describedby="inputGroupFileAddon04" aria-label="Upload" accept="image/*">
                </div>
                <div class="form-group">
                    <span class="title" id="inputGroup-sizing-default">Email:</span>
                    <input id="email" type="email" class="form-control" name="email" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                </div>
                <div class="form-group">
                    <span class="title" id="inputGroup-sizing-default">Password:</span>
                    <input id="password" type="password" class="form-control" name="password" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                </div>
                <div class="form-group">
                    <span class="title" id="inputGroup-sizing-default">Số điện thoại:</span>
                    <input id="phone-number" type="text" class="form-control" name="phoneNumber" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                </div>
                <div class="d-flex justify-content-center">
                    <button class="btn btn-primary mx-5 w-25" type="submit">Lưu</button>
                    <button class="btn btn-outline-primary mx-5 w-25" type="button" onclick="closeDialog()">Hủy</button>
                </div>
            </form>
        </div>`;
    dialogbody.innerHTML = html;
    const form = document.getElementById('form-user');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        BtnLuu(formData);
    });
};

const BtnLuu = async (formData) => {
    try {
        const response = await fetch(`${url}/register`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const result = await response.json();
        console.log(result);

        if (result.status === 200) {
            alert('Thêm thành công');
            document.getElementById('form-user').reset();
            fetchAPI_Page(numberPage);
            dialog.style.display = 'none';
        } else {
            alert('Thêm thất bại: ' + result.message);
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Có lỗi xảy ra: ' + error.message);
    }
};

let oldPassword; // Lưu mật khẩu cũ

const BtnSua = (_id) => {
    dialog.style.display = 'flex';

    // Fetch user data to populate the form
    fetch(`${url}/get-user-by-id/${_id}`)
        .then(response => response.json())
        .then(userData => {
            oldPassword = userData.data.password; // Lưu mật khẩu cũ
            let html = /*html*/`
                <div class="dialog-add w-100 h-100">
                    <h2 class="title-dialog text-center">SỬA NGƯỜI DÙNG</h2>
                    <form id="form-user" method="post">
                        <div class="form-group">
                            <span class="title" id="inputGroup-sizing-default">Role:</span>
                            <select id="role" class="form-control" name="role">
                                <option value="0" ${userData.data.role === 0 ? 'selected' : ''}>Admin</option>
                                <option value="1" ${userData.data.role === 1 ? 'selected' : ''}>User</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <span class="title" id="inputGroup-sizing-default">Mật khẩu:</span>
                            <input id="password" type="password" class="form-control" name="password"
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                        </div>
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-primary mx-5 w-25" type="submit">Lưu</button>
                            <button class="btn btn-outline-primary mx-5 w-25" type="button" onclick="closeDialog()">Hủy</button>
                        </div>
                    </form>
                </div>
            `;
            dialogbody.innerHTML = html;
            const form = document.getElementById('form-user');
            form.addEventListener('submit', function (event) {
                event.preventDefault();
            
                // Thu thập dữ liệu từ form
                const roleValue = Number(document.getElementById('role').value);
                const passwordValue = document.getElementById('password').value || oldPassword; // Nếu mật khẩu không nhập, dùng mật khẩu cũ
            
                // Chuẩn bị dữ liệu JSON
                const data = {
                    role: roleValue,
                    password: passwordValue
                };
            
                // Gửi dữ liệu cập nhật dưới dạng JSON
                BtnUpdate(userId, data);
            });
            
        })
        .catch(error => console.error('Error fetching user data:', error));
}

const BtnUpdate = async (_id, data) => {
    try {
        console.log('Data being sent:', data); // Kiểm tra dữ liệu trước khi gửi

        const response = await fetch(`${url}/update-info/${_id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json' // Gửi dữ liệu dưới dạng JSON
            },
            body: JSON.stringify(data) // Chuyển đổi đối tượng thành JSON string
        });

        const result = await response.json();
        console.log('API response:', result); // Thêm log để kiểm tra phản hồi từ API
        if (response.ok) {
            alert('Cập nhật thành công');
            document.getElementById('form-user').reset();
            dialog.style.display = 'none';
            fetchAPI_Page(numberPage);
        } else {
            alert('Cập nhật thất bại: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi: ' + error.message);
    }
};



const BtnXoa = (_id) => {
    if (confirm('Bạn có chắc chắn muốn xóa?')) {
        fetch(`${url}/delete-user/${_id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(result => {
                if (result.status === 200) {
                    alert('Xóa thành công');
                    fetchAPI_Page(numberPage);
                } else {
                    alert('Xóa thất bại: ' + result.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Có lỗi xảy ra: ' + error.message);
            });
    }
};
