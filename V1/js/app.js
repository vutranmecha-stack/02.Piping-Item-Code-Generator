/**
 * MAIN CONTROLLER: Xử lý tương tác giao diện và thuật toán sinh mã
 */
const AppController = {
    // 1. Khởi tạo ứng dụng
    init() {
        // Kiểm tra bản quyền trước tiên
        const license = new LicenseManager(30);
        if (!license.enforce()) return; // Dừng chạy code nếu hết hạn

        // Load toàn bộ dữ liệu vào 11 dropdown
        this.populateDropdowns();
        
        // Gán sự kiện click cho nút Generate
        document.getElementById("btnGenerate").addEventListener("click", () => {
            this.generateItemCode();
        });
    },

    // 2. Hàm đổ dữ liệu (Load Data) từ PipingDB vào UI
    populateDropdowns() {
        // Helper function để đổ data lặp lại nhiều lần
        const populate = (elementId, dataArray) => {
            const select = document.getElementById(elementId);
            select.innerHTML = ''; // Clear cũ
            dataArray.forEach(item => {
                // value chứa object JSON dạng chuỗi để dễ bóc tách khi generate
                select.innerHTML += `<option value='${JSON.stringify(item)}'>${item.name} [${item.id}]</option>`;
            });
        };

        populate("f1_comp", PipingDB.components);
        populate("f2_stype", PipingDB.stypes);
        populate("f3_catstd", PipingDB.catStds);
        populate("f4_endconn", PipingDB.endConns);
        populate("f5_rating", PipingDB.ratings);
        populate("f6_varqual", PipingDB.varQuals);
        populate("f7_material", PipingDB.materials);
        
        // Size 1 và Size 2 dùng chung mảng Data Sizes
        populate("f8_size1", PipingDB.sizes);
        populate("f9_size2", PipingDB.sizes);
        
        // Schedule 1 và 2 dùng chung mảng Data Schedules
        populate("f10_sch1", PipingDB.schedules);
        populate("f11_sch2", PipingDB.schedules);
    },

    // 3. Hàm cốt lõi: Thuật toán ghép chuỗi Item Code & Description
    generateItemCode() {
        try {
            // Đọc và Parse JSON dữ liệu từ 11 fields
            const f1 = JSON.parse(document.getElementById("f1_comp").value);
            const f2 = JSON.parse(document.getElementById("f2_stype").value);
            const f3 = JSON.parse(document.getElementById("f3_catstd").value);
            const f4 = JSON.parse(document.getElementById("f4_endconn").value);
            const f5 = JSON.parse(document.getElementById("f5_rating").value);
            const f6 = JSON.parse(document.getElementById("f6_varqual").value);
            const f7 = JSON.parse(document.getElementById("f7_material").value);
            const f8 = JSON.parse(document.getElementById("f8_size1").value);
            const f9 = JSON.parse(document.getElementById("f9_size2").value);
            const f10 = JSON.parse(document.getElementById("f10_sch1").value);
            const f11 = JSON.parse(document.getElementById("f11_sch2").value);

            // A. TẠO ITEM CODE (Theo đúng ví dụ: PAAA1001AA0-DDP0)
            // Đoạn 1: C + S + CS + E + R + V + Mat
            const part1 = `${f1.id}${f2.id}${f3.id}${f4.id}${f5.id}${f6.id}${f7.id}`;
            // Đoạn 2: Size1 + Size2 + Sch1 + Sch2
            const part2 = `${f8.id}${f9.id}${f10.id}${f11.id}`;
            
            const finalCode = `${part1}-${part2}`;

            // B. TẠO DESCRIPTION (Ví dụ: PIPE;SMLS;ASME B36.10M;PE;-;-;A106 Gr.B;SCH 160;-)
            // Lưu ý: Trong file mẫu của bạn, Size thường không nằm trong description chuỗi nối mà nằm cột riêng. 
            // Ở đây tôi ghép các thuộc tính theo đúng dấu chấm phẩy (;).
            const descArray = [
                f1.desc, f2.desc, f3.desc, f4.desc, 
                f5.desc, f6.desc, f7.desc, f10.desc, f11.desc
            ];
            const finalDesc = descArray.join(";");

            // C. Hiển thị ra màn hình
            document.getElementById("outItemCode").innerText = finalCode;
            document.getElementById("outDescription").innerText = finalDesc;

        } catch (error) {
            alert("Lỗi dữ liệu đầu vào. Vui lòng kiểm tra lại hệ thống Database!");
            console.error(error);
        }
    }
};

// Lắng nghe sự kiện tải trang hoàn tất để khởi động phần mềm
document.addEventListener("DOMContentLoaded", () => {
    AppController.init();
});