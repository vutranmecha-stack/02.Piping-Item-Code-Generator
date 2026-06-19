/**
 * DATABASE MODULE: Lưu trữ toàn bộ mapping code và description.
 * Cấu trúc: { id: "Mã định danh/Code", desc: "Tên hiển thị trong Description", name: "Tên hiển thị UI" }
 */
const PipingDB = {
    // 1. COMPONENTS
    components: [
        { id: "P", desc: "PIPE", name: "Pipe" },
        { id: "E", desc: "ELBOW", name: "Elbow" },
        { id: "T", desc: "TEE", name: "Tee" }
    ],
    // 2. STYPE (Sub-type)
    stypes: [
        { id: "A", desc: "SMLS", name: "Seamless" },
        { id: "W", desc: "WELDED", name: "Welded" }
    ],
    // 3. CATEGORY STANDARD
    catStds: [
        { id: "AA", desc: "ASME B36.10M", name: "ASME B36.10M" },
        { id: "AB", desc: "ASME B16.11", name: "ASME B16.11" }
    ],
    // 4. END CONNECTION
    endConns: [
        { id: "1", desc: "PE", name: "Plain End (PE)" },
        { id: "2", desc: "BW", name: "Buttweld (BW)" },
        { id: "3", desc: "SW", name: "Socket Weld (SW)" },
        { id: "0", desc: "-", name: "NA" }
    ],
    // 5. RATING
    ratings: [
        { id: "0", desc: "-", name: "NA" },
        { id: "B", desc: "CL.150", name: "#150" },
        { id: "3", desc: "#3000", name: "#3000" }
    ],
    // 6. VARIATION OR QUALIFIER
    varQuals: [
        { id: "0", desc: "-", name: "NA" },
        { id: "A", desc: "Galv", name: "Galvanized" }
    ],
    // 7. MATERIAL
    materials: [
        { id: "1AA0", desc: "A106 Gr.B", name: "A106 Gr.B" },
        { id: "2AA0", desc: "A105", name: "A105" },
        { id: "2AD0", desc: "A234 Gr.WPB", name: "A234 Gr.WPB" }
    ],
    // 8 & 9. SIZES (Kích thước dùng chung cho Size 1 và Size 2)
    sizes: [
        { id: "D", desc: "15", name: '15 (1/2")' },
        { id: "E", desc: "20", name: '20 (3/4")' },
        { id: "F", desc: "25", name: '25 (1")' },
        { id: "L", desc: "80", name: '80 (3")' },
        { id: "N", desc: "100", name: '100 (4")' }
    ],
    // 10 & 11. SCHEDULE / THICKNESS
    schedules: [
        { id: "Q", desc: "SCH STD", name: "SCH STD" },
        { id: "G", desc: "SCH 40", name: "SCH 40" },
        { id: "K", desc: "SCH 80", name: "SCH 80" },
        { id: "P", desc: "SCH 160", name: "SCH 160" },
        { id: "0", desc: "-", name: "NA" } // Mã 0 dành cho NA theo chuẩn file Excel
    ]
};