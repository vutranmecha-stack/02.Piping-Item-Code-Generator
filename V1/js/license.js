/**
 * LICENSE MANAGER MODULE: Kiểm soát tính năng khóa phần mềm sau 1 tháng.
 */
class LicenseManager {
    constructor(trialDays = 30) {
        this.trialDays = trialDays;
        this.storageKey = 'piping_app_v1_install'; // Key lưu trong Local Storage
    }

    // Hàm kiểm tra thời hạn
    validate() {
        let installDate = localStorage.getItem(this.storageKey);
        
        // Nếu là lần đầu chạy, set mốc thời gian hiện tại
        if (!installDate) {
            installDate = new Date().toISOString();
            localStorage.setItem(this.storageKey, installDate);
        }

        const start = new Date(installDate);
        const now = new Date();
        const diffTime = Math.abs(now - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Tính khoảng cách ngày

        return {
            isValid: diffDays <= this.trialDays,
            daysLeft: Math.max(0, this.trialDays - diffDays)
        };
    }

    // Hàm áp dụng logic khóa/mở giao diện
    enforce() {
        const status = this.validate();
        const banner = document.getElementById("licenseStatus");
        const appContainer = document.getElementById("appContainer");
        const lockScreen = document.getElementById("lockScreen");

        if (status.isValid) {
            banner.textContent = `License Valid: ${status.daysLeft} days remaining`;
            banner.className = "badge active";
            return true;
        } else {
            // Khi hết hạn, khóa toàn bộ giao diện làm việc
            appContainer.classList.add("hidden");
            lockScreen.classList.remove("hidden");
            return false;
        }
    }
}