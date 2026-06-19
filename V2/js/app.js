const PipingApp = {
    init() {
        this.populateAllDropdowns();
        
        const btnGen = document.getElementById("btnGenerate");
        if (btnGen) {
            btnGen.addEventListener("click", () => this.generateCode());
        }
    },

    populateAllDropdowns() {
        const fillData = (id, dataObj) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.innerHTML = "";
            dataObj.forEach(item => {
                const option = new Option(`${item.name} [${item.id}]`, JSON.stringify(item));
                el.add(option);
            });
        };

        fillData("f1_comp", PipingDB.components);
        fillData("f2_stype", PipingDB.stypes);
        fillData("f3_catstd", PipingDB.catStds);
        fillData("f4_endconn", PipingDB.endConns);
        fillData("f5_rating", PipingDB.ratings);
        fillData("f6_varqual", PipingDB.varQuals);
        fillData("f7_material", PipingDB.materials);
        fillData("f8_size1", PipingDB.sizes);
        fillData("f9_size2", PipingDB.sizes);
        fillData("f10_sch1", PipingDB.schedules);
        fillData("f11_sch2", PipingDB.schedules);
    },

    generateCode() {
        try {
            const getVal = (id) => JSON.parse(document.getElementById(id).value);
            
            const f1 = getVal("f1_comp");
            const f2 = getVal("f2_stype");
            const f3 = getVal("f3_catstd");
            const f4 = getVal("f4_endconn");
            const f5 = getVal("f5_rating");
            const f6 = getVal("f6_varqual");
            const f7 = getVal("f7_material");
            const f8 = getVal("f8_size1");
            const f9 = getVal("f9_size2");
            const f10 = getVal("f10_sch1");
            const f11 = getVal("f11_sch2");

            const itemCode = `${f1.id}${f2.id}${f3.id}${f4.id}${f5.id}${f6.id}${f7.id}-${f8.id}${f9.id}${f10.id}${f11.id}`;
            
            const descArr = [
                f1.desc,
                f2.desc,
                f3.desc,
                f4.desc,
                f5.desc,
                f6.desc,
                f7.desc,
                `Size1:${f8.desc}`,
                `Size2:${f9.desc}`,
                f10.desc,
                f11.desc
            ];
            const description = descArr.join("; ");

            document.getElementById("outItemCode").innerText = itemCode;
            document.getElementById("outDescription").innerText = description;
        } catch (err) {
            console.error("Lỗi trích xuất dữ liệu: ", err);
            alert("Lỗi dữ liệu đầu vào, vui lòng kiểm tra lại cấu hình Data.");
        }
    }
};

// Khởi động module tạo code khi HTML đã load xong
document.addEventListener("DOMContentLoaded", () => {
    PipingApp.init();
});