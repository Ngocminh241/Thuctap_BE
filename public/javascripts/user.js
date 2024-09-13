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

const fetchAPI_Page = (currentPage) => {
    fetch(`${url}/get-user-by-page?page=${currentPage}&limit=5`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let html = data.data.users.map(items => {
                return /*html*/` 
                <tr>
                    <td>
                        <p style="
                            width: 70px;
                            color: red;   
                            white-space: nowrap; 
                            overflow: hidden;
                            text-overflow: ellipsis;">${items._id}</p>
                    </td>
                    <td>
                        <img style="width:30px;height:30px;object-fit:cover" src="${items.profile_picture}" alt="Avatar"/>
                    </td>               
                    <td>${items.username}</td>
                    <td>${items.gender === 0 ? 'Nam' : 'Nữ'}</td>
                    <td>${items.email}</td>
                    <td>${items.phoneNumber}</td>
                    <td style="gap: 20px; font-size: 20px" class="d-flex justify-content-end">
                        <i onclick="BtnChiTiet('${items._id}','${items.profile_picture}','${items.username}','${items.email}','${items.phoneNumber}')" class="bi bi-eye"></i>
                        <i onclick="BtnSua('${items._id}')" class="bi bi-pen"></i>
                        <i onclick="BtnXoa('${items._id}')" class="bi bi-trash3"></i>
                    </td>
                </tr>
            `;
            }).join('');
            preloader.style.display = 'none';
            tbody.innerHTML = html;
            pageNumber.value = numberPage;
            totalPages = data.data.totalPages;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
};

fetchAPI_Page(numberPage);

const BtnChiTiet = (_id, avatar, username, email, phoneNumber) => {
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
                        " src="${avatar}" alt="">
                </div>
                <div class="bgr-dialog-chitiet-content-body-category">
                    <p  style="
                        background-color: white;
                        margin: 0;
                        padding: 0 20px;
                        font-weight: bold;
                        " >ID người dùng: ${_id}
                    </p>
                    <div class="d-flex justify-content-between">
                    <p  style="
                        background-color: white;
                        margin: 0;
                        padding: 0px 40px;
                        " >Tên người dùng: ${username}
                    </p>
                        
                    </div>
                    <p  style="
                        background-color: white;
                        margin: 0;
                        padding: 0px 40px;
                        " >Email: ${email}
                    </p>
                    <p  style="
                        background-color: white;
                        margin: 0;
                        padding: 0px 40px;
                        " >Số điện thoại: ${phoneNumber}
                    </p>
                    
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
        </div>
    `;
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
                    <input type="file" class="form-control" id="image" name="profile_picture" aria-describedby="inputGroupFileAddon04" aria-label="Upload" accept="image/*">
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
        </div>
    `;
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
            body: formData
        });
        const result = await response.json();
        if (result.status === 200) {
            alert('Thêm thành công');
            document.getElementById('form-user').reset();
            fetchAPI_Page(numberPage);
            dialog.style.display = 'none';
        } else {
            alert('Thêm thất bại');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

const BtnSua = (_id) => {
    dialog.style.display = 'flex';
    fetch(`${url}/get-user/${_id}`)
        .then(response => response.json())
        .then(data => {
            let html = /*html*/`
                <div class="dialog-add w-100 h-100">
                    <h2 class="title-dialog text-center">Cập nhật User</h2>
                    <form id="form-user-update" method="post" enctype="multipart/form-data">
                        <input type="hidden" id="user-id" value="${_id}">
                        <div class="form-group">
                            <span class="title" id="inputGroup-sizing-default">Tên:</span>
                            <input id="name-user" type="text" class="form-control" name="username" value="${data.username}" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                        </div>
                        <div class="form-group">
                            <span class="title" id="inputGroup-sizing-default">Hình ảnh: </span>
                            <input type="file" class="form-control" id="image" name="profile_picture" aria-describedby="inputGroupFileAddon04" aria-label="Upload" accept="image/*">
                        </div>
                        <div class="form-group">
                            <span class="title" id="inputGroup-sizing-default">Email:</span>
                            <input id="email" type="email" class="form-control" name="email" value="${data.email}" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                        </div>
                        <div class="form-group">
                            <span class="title" id="inputGroup-sizing-default">Số điện thoại:</span>
                            <input id="phone-number" type="text" class="form-control" name="phoneNumber" value="${data.phoneNumber}" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                        </div>
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-primary mx-5 w-25" type="submit">Cập nhật</button>
                            <button class="btn btn-outline-primary mx-5 w-25" type="button" onclick="closeDialog()">Hủy</button>
                        </div>
                    </form>
                </div>
            `;
            dialogbody.innerHTML = html;
            const form = document.getElementById('form-user-update');
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                const formData = new FormData(form);
                BtnUpdate(_id, formData);
            });
        });
};

const BtnUpdate = async (_id, formData) => {
    try {
        const response = await fetch(`${url}/update-user/${_id}`, {
            method: "PUT",
            body: formData
        });
        const result = await response.json();
        if (result.status === 200) {
            alert('Cập nhật thành công');
            fetchAPI_Page(numberPage);
            dialog.style.display = 'none';
        } else {
            alert('Cập nhật thất bại');
        }
    } catch (error) {
        console.error('Error:', error);
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
                    alert('Xóa thất bại');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
};