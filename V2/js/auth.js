const AuthManager = {
    sessionKey: "piping_current_user",

    // Khởi tạo các sự kiện cho màn hình đăng nhập
    init() {
        const btnLogin = document.getElementById("btnLogin");
        const btnLogout = document.getElementById("btnLogout");
        const passInput = document.getElementById("loginPass");

        if (btnLogin) {
            btnLogin.addEventListener("click", () => this.handleLogin());
        }
        
        if (btnLogout) {
            btnLogout.addEventListener("click", () => this.handleLogout());
        }

        // Bắt phím Enter
        if (passInput) {
            passInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") this.handleLogin();
            });
        }

        // Kiểm tra ngay khi khởi động
        this.verifySession();
    },

    verifySession() {
        const currentUser = sessionStorage.getItem(this.sessionKey);
        const loginScreen = document.getElementById("loginScreen");
        const appContainer = document.getElementById("appContainer");
        const userBadge = document.getElementById("userBadge");

        if (currentUser) {
            loginScreen.classList.add("hidden");
            appContainer.classList.remove("hidden");
            userBadge.textContent = `Kỹ sư: ${currentUser}`;
            userBadge.className = "badge active";
        } else {
            loginScreen.classList.remove("hidden");
            appContainer.classList.add("hidden");
            userBadge.textContent = "Chưa đăng nhập";
            userBadge.className = "badge";
        }
    },

    handleLogin() {
        const user = document.getElementById("loginUser").value.trim();
        const pass = document.getElementById("loginPass").value;
        const errorMsg = document.getElementById("loginErrorMsg");

        // Tìm user trong mảng AppUsers (từ file users.js)
        const validUser = AppUsers.find(u => u.username === user && u.password === pass);

        if (validUser) {
            errorMsg.classList.add("hidden");
            sessionStorage.setItem(this.sessionKey, validUser.name);
            document.getElementById("loginPass").value = ""; // Xóa password để bảo mật
            this.verifySession();
        } else {
            errorMsg.textContent = "Tên đăng nhập hoặc mật khẩu không đúng!";
            errorMsg.classList.remove("hidden");
        }
    },

    handleLogout() {
        sessionStorage.removeItem(this.sessionKey);
        this.verifySession();
    }
};

// Khởi động module Auth khi HTML đã load xong
document.addEventListener("DOMContentLoaded", () => {
    AuthManager.init();
});