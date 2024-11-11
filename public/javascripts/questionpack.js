const url = 'http://localhost:3000/api/v1/questionpack';
let dialog = document.getElementById('bgr-dialog');
let dialogbody = document.getElementById('dialog-content');
let tbody = document.querySelector('tbody');
let pageNumber = document.getElementById('page-number');
let preloader = document.getElementById('preloader');
let tang = document.getElementById('ic-tang');
let giam = document.getElementById('ic-giam');

let numberPage = 1;
let totalPages;

// Hàm fetch dữ liệu theo trang
const fetchAPI_Page = (currentPage) => {
    fetch(`${url}/get-by-page?page=${currentPage}&limit=5`)
        .then(response => response.json())
        .then(data => {
            console.log('Received data:', data);

            if (data && data.data && Array.isArray(data.data.questionPacks)) {
                let html = data.data.questionPacks.map(items => {
                    return /*html*/`
                        <tr>
                            <td>${items.pack_name}</td>
                            <td>${items.level_id.level_name}</td>
                            <td style="gap: 20px; font-size: 20px" class="d-flex justify-content-start">
                                <i onclick="BtnSua('${items._id}','${items.level_id.level_name}')" class="bi bi-pen"></i>
                                <i onclick="BtnXoa('${items._id}')" class="bi bi-trash3"></i>
                            </td>
                        </tr>
                    `;
                }).join('');
                preloader.style.display = 'none';
                tbody.innerHTML = html;
                pageNumber.value = numberPage;
                totalPages = data.data.totalPages;
            } else {
                console.error('Invalid data structure or empty questionPacks array:', data);
                tbody.innerHTML = '<tr><td colspan="3">No question packs available.</td></tr>';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};

// Lấy dữ liệu lần đầu
fetchAPI_Page(numberPage);

// Hàm fetch danh sách cấp độ
const fetchLevels = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/difficultylevel/get-all-level`);
        const data = await response.json();
        if (data.status === 200) {
            return data.data;
        } else {
            console.error('Không thể lấy danh sách cấp độ');
            return [];
        }
    } catch (error) {
        console.error('Lỗi khi fetch cấp độ:', error);
        return [];
    }
};

// Xóa gói câu hỏi
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
};

// Điều khiển phân trang tăng
tang.addEventListener('click', event => {
    event.preventDefault();
    if (numberPage < totalPages) {
        numberPage++;
        fetchAPI_Page(numberPage);
    }
});

// Điều khiển phân trang giảm
giam.addEventListener('click', event => {
    event.preventDefault();
    if (numberPage > 1) {
        numberPage--;
        fetchAPI_Page(numberPage);
    }
});

// Hàm mở dialog thêm gói câu hỏi
const BtnThem = async () => {
    const levels = await fetchLevels(); // Lấy danh sách cấp độ

    // Tạo danh sách chọn cấp độ
    const levelOptions = levels.map(level => `<option value="${level._id}">${level.level_name}</option>`).join('');

    dialog.style.display = 'flex';
    dialogbody.innerHTML = /*html*/`
        <div class="dialog-add w-100 h-100">
            <h2 class="title-dialog text-center">THÊM GÓI CÂU HỎI</h2>
            <form id="form-questionpack" method="post">
                <div class="form-group">
                    <span class="title">Tên gói câu hỏi:</span>
                    <input id="pack-name" type="text" class="form-control" name="pack_name" required>
                </div>
                <div class="form-group">
                    <span class="title">Cấp độ:</span>
                    <select id="level-id" class="form-control" name="level_id" required>
                        ${levelOptions}
                    </select>
                </div>
                <div class="d-flex justify-content-center">
                    <button class="btn btn-primary mx-5 w-25" type="submit">Lưu</button>
                    <button class="btn btn-outline-primary mx-5 w-25" type="button" onclick="closeDialog()">Hủy</button>
                </div>
            </form>
        </div>
    `;

    const form = document.getElementById('form-questionpack');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        BtnLuu(formData);
    });
};


// Đóng dialog
const closeDialog = () => {
    dialog.style.display = 'none';
};

// Lưu thông tin cấp độ mới
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
            document.getElementById('form-questionpack').reset(); // Sửa lại ID form ở đây
            dialog.style.display = 'none';
            fetchAPI_Page(numberPage);
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi');
    }
};

// Hàm lấy thông tin gói câu hỏi theo ID
const fetchQuestionPackById = async (id) => {
    try {
        const response = await fetch(`${url}/get-by-id/${id}`);
        const data = await response.json();
        if (data.status === 200) {
            return data.data; // Trả về thông tin gói câu hỏi
        } else {
            console.error('Không thể lấy thông tin gói câu hỏi');
            return null;
        }
    } catch (error) {
        console.error('Lỗi khi fetch gói câu hỏi:', error);
        return null;
    }
};

// Hàm sửa gói câu hỏi
const BtnSua = async (id, level_id) => {
    const questionPack = await fetchQuestionPackById(id);
    
    if (!questionPack) {
        alert('Không tìm thấy gói câu hỏi');
        return;
    }

    const { pack_name } = questionPack; // Lấy tên gói câu hỏi từ dữ liệu trả về
    const levels = await fetchLevels(); // Lấy danh sách cấp độ

    // Tạo danh sách chọn cấp độ
    const levelOptions = levels.map(level => `
        <option value="${level._id}" ${level._id === level_id ? 'selected' : ''}>${level.level_name}</option>
    `).join(''); // Dùng join để kết hợp các option lại

    // Mở dialog
    dialog.style.display = 'flex';
    dialogbody.innerHTML = /*html*/`
        <div class="dialog-add w-100 h-100">
            <h2 class="title-dialog text-center">SỬA GÓI CÂU HỎI</h2>
            <form id="form-questionpack" method="post">
                <div class="form-group">
                    <span class="title">Tên gói câu hỏi:</span>
                    <input id="pack-name" type="text" class="form-control" name="pack_name" value="${pack_name}" required>
                </div>
                <div class="form-group">
                    <span class="title">Cấp độ:</span>
                    <select id="level-id" class="form-control" name="level_id" required>
                        ${levelOptions} <!-- Chèn các options đã tạo -->
                    </select>
                </div>
                <div class="d-flex justify-content-center">
                    <button class="btn btn-primary mx-5 w-25" type="submit">Lưu</button>
                    <button class="btn btn-outline-primary mx-5 w-25" type="button" onclick="closeDialog()">Hủy</button>
                </div>
            </form>
        </div>
    `;

    const form = document.getElementById('form-questionpack');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        BtnUpdate(id, formData); // Cập nhật thông tin khi lưu
    });
};


// Cập nhật thông tin cấp độ
const BtnUpdate = async (id, formData) => {
    // Trước khi gửi formData, hãy chắc chắn rằng giá trị của 'pack-name' đã được lấy đúng
    const packName = document.getElementById('pack-name').value;
    console.log('Updated pack name:', packName); // Kiểm tra giá trị của pack-name
    // Cập nhật formData với giá trị mới
    formData.set('pack_name', packName);

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
            document.getElementById('form-questionpack').reset(); // Sửa lại ID form ở đây
            dialog.style.display = 'none';
            fetchAPI_Page(numberPage);
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi');
    }
};
