const url = 'http://localhost:3000/api/v1/difficultylevel'
let dialog = document.getElementById('bgr-dialog')
let dialogbody = document.getElementById('dialog-content')
let tbody = document.querySelector('tbody')
let preloader = document.getElementById('preloader')
let pageNumber = document.getElementById('page-number')
let tang = document.getElementById('ic-tang')
let giam = document.getElementById('ic-giam')

let numberPage = 1;
let totalPages;

const fetchAPI_Page = (currentPage) => {
    fetch(`${url}/get-level-by-page?page=${currentPage}&limit=5`)
        .then(response => response.json())
        .then(data => {
            let html = data.data.difficultyLevels.map(items => {
                return /*html*/`
                <tr>
                    <td>${items.level_name}</td>
                    <td>${items.description}</td>
                    <td style="gap: 20px; font-size: 20px" class="d-flex justify-content-start">
                        <i onclick="BtnSua('${items._id}','${items.level_name}')" class="bi bi-pen"></i> 
                        <i onclick="BtnXoa('${items._id}')" class="bi bi-trash3"></i></td>
                </tr>
            `;
            }).join('');
            preloader.style.display = 'none';
            tbody.innerHTML = html;
            pageNumber.value = numberPage;
            totalPages = data.data.totalPages;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

fetchAPI_Page(numberPage);

const BtnXoa = async (id) => {
    if (confirm('Bạn có muốn xóa')) {
        const response = await fetch(`${url}/delete/${id}`, { method: 'DELETE' });
        const result = await response.json();
        if (result.status === 200) {
            alert(result.message);
            fetchAPI_Page(numberPage);
        } else {
            alert('Xóa thất bại error:' + result.status + result.message);
        }
    }
}

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

const BtnThem = () => {
    dialog.style.display = 'flex';
    dialogbody.innerHTML = /*html*/`
        <div class="dialog-add w-100 h-100">
            <h2 class="title-dialog text-center">THÊM CẤP ĐỘ</h2>
            <form id="form-level" method="post">
                <div class="form-group">
                    <span class="title">Tên cấp độ:</span>
                    <input id="level-name" type="text" class="form-control" name="level_name">
                </div>
                <div class="form-group">
                    <span class="title">Mô tả:</span>
                    <input id="description" type="text" class="form-control" name="description">
                </div>
                <div class="d-flex justify-content-center">
                    <button class="btn btn-primary mx-5 w-25" type="submit">Lưu</button>
                    <button class="btn btn-outline-primary mx-5 w-25" type="button" onclick="closeDialog()">Hủy</button>
                </div>
            </form>
        </div>
    `;
    const form = document.getElementById('form-level');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        BtnLuu(formData);
    });
}

const closeDialog = () => {
    dialog.style.display = 'none';
}

const BtnLuu = async (formData) => {
    try {
        const response = await fetch(`${url}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams(formData).toString()
        });
        const result = await response.json();
        if (result.status === 200) {
            alert(result.message);
            document.getElementById('form-level').reset();
            dialog.style.display = 'none';
            fetchAPI_Page(numberPage);
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi');
    }
}

const BtnSua = (id, level_name) => {
    dialog.style.display = 'flex';
    dialogbody.innerHTML = /*html*/`
        <div class="dialog-add w-100 h-100">
            <h2 class="title-dialog text-center">SỬA CẤP ĐỘ</h2>
            <form id="form-level" method="post">
                <div class="form-group">
                    <span class="title">Tên cấp độ:</span>
                    <input id="level-name" value="${level_name}" type="text" class="form-control" name="level_name">
                </div>
                <div class="form-group">
                    <span class="title">Mô tả:</span>
                    <input id="description" type="text" class="form-control" name="description">
                </div>
                <div class="d-flex justify-content-center">
                    <button class="btn btn-primary mx-5 w-25" type="submit">Lưu</button>
                    <button class="btn btn-outline-primary mx-5 w-25" type="button" onclick="closeDialog()">Hủy</button>
                </div>
            </form>
        </div>
    `;
    const form = document.getElementById('form-level');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        BtnUpdate(id, formData);
    });
}

const BtnUpdate = async (id, formData) => {
    try {
        const response = await fetch(`${url}/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams(formData).toString()
        });
        const result = await response.json();
        if (result.status === 200) {
            alert(result.message);
            document.getElementById('form-level').reset();
            dialog.style.display = 'none';
            fetchAPI_Page(numberPage);
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi');
    }
}
