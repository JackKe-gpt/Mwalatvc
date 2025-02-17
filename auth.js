document.addEventListener("DOMContentLoaded", function () {
    // ====================== STUDENT REGISTRATION ======================
    const registerForm = document.getElementById("student-register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent form submission

            let fullName = document.getElementById("fullname").value;
            let username = document.getElementById("username").value;
            let admission = document.getElementById("admission").value;
            let password = document.getElementById("password").value;
            let confirmPassword = document.getElementById("confirm-password").value;

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            // Check if admission number is already registered
            if (localStorage.getItem("student_" + admission)) {
                alert("Admission number already registered!");
                return;
            }

            // Save student data
            let studentData = { fullName, username, admission, password };
            localStorage.setItem("student_" + admission, JSON.stringify(studentData));
            localStorage.setItem("currentUser", admission); // Save session data

            alert("Registration successful!");
            window.location.href = "login.html"; // Redirect to student dashboard
        });
    }

    // ====================== STUDENT LOGIN ======================
    const studentLoginForm = document.getElementById("student-login-form");
    if (studentLoginForm) {
        studentLoginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let admission = document.getElementById("admission").value;
            let password = document.getElementById("password").value;

            let studentData = JSON.parse(localStorage.getItem("student_" + admission));

            if (studentData && studentData.password === password) {
                localStorage.setItem("currentUser", admission);
                alert("Login successful!");
                window.location.href = "dashboard.html";
            } else {
                alert("Invalid admission number or password.");
            }
        });
    }

    // ====================== ADMIN LOGIN ======================
    const adminLoginForm = document.getElementById("admin-login-form");
    if (adminLoginForm) {
        adminLoginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let adminUsername = document.getElementById("admin-username").value;
            let adminPassword = document.getElementById("admin-password").value;

            // Default admin credentials
            if (adminUsername === "jackson" && adminPassword === "jack123") {
                localStorage.setItem("admin", "true");
                alert("Admin Login successful!");
                window.location.href = "adashboard.html";
            } else {
                alert("Invalid admin credentials.");
            }
        });
    }

    // ====================== DASHBOARD ACCESS CONTROL ======================
    const studentDashboard = document.getElementById("student-dashboard");
    if (studentDashboard && !localStorage.getItem("currentUser")) {
        alert("Access Denied! Please login first.");
        window.location.href = "login.html";
    }

    const adminDashboard = document.getElementById("admin-dashboard");
    if (adminDashboard && !localStorage.getItem("admin")) {
        alert("Access Denied! Admins only.");
        window.location.href = "alogin.html";
    }

    // ====================== LOGOUT FUNCTION ======================
    const logoutButton = document.querySelector(".logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("currentUser"); // Remove student session
            localStorage.removeItem("admin"); // Remove admin session
            alert("Logged out successfully!");
            window.location.href = "index.html";
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // ====================== DISPLAY REGISTERED STUDENTS ======================
    const studentTable = document.getElementById("student-list");
    if (studentTable) {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key.startsWith("student_")) {
                let studentData = JSON.parse(localStorage.getItem(key));
                let row = `<tr>
                    <td>${studentData.fullName}</td>
                    <td>${studentData.username}</td>
                    <td>${studentData.admission}</td>
                </tr>`;
                studentTable.innerHTML += row;
            }
        }
    }

    // ====================== ANNOUNCEMENTS (ADMIN POSTS) ======================
    const announcementForm = document.getElementById("announcement-form");
    if (announcementForm) {
        announcementForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let title = document.getElementById("announcement-title").value;
            let message = document.getElementById("announcement-message").value;
            let fileInput = document.getElementById("announcement-image");
            let file = fileInput.files[0];

            let reader = new FileReader();
            reader.onload = function (e) {
                let announcements = JSON.parse(localStorage.getItem("announcements")) || [];
                announcements.push({
                    id: Date.now(),
                    title,
                    message,
                    image: file ? e.target.result : "",
                    date: new Date().toLocaleString(),
                    likes: 0
                });
                localStorage.setItem("announcements", JSON.stringify(announcements));

                alert("Announcement Posted!");
                document.getElementById("announcement-title").value = "";
                document.getElementById("announcement-message").value = "";
                fileInput.value = "";
            };
            if (file) {
                reader.readAsDataURL(file);
            } else {
                reader.onload();
            }
        });
    }

    // ====================== DISPLAY ANNOUNCEMENTS (STUDENT DASHBOARD) ======================
    const studentAnnouncements = document.getElementById("student-announcements");
    if (studentAnnouncements) {
        let announcements = JSON.parse(localStorage.getItem("announcements")) || [];
        studentAnnouncements.innerHTML = "";
        announcements.forEach((a, index) => {
            let post = `<div class="announcement">
                <h3>${a.title}</h3>
                <p>${a.message}</p>
                ${a.image ? `<img src="${a.image}" alt="Announcement Image" width="200">` : ""}
                <small>${a.date}</small>
                <p>Likes: <span id="like-count-${a.id}">${a.likes}</span></p>
                <button onclick="likeAnnouncement(${a.id})">Like</button>
            </div>`;
            studentAnnouncements.innerHTML += post;
        });
    }

    // ====================== LIKE ANNOUNCEMENT FUNCTION ======================
    window.likeAnnouncement = function (id) {
        let announcements = JSON.parse(localStorage.getItem("announcements")) || [];
        let index = announcements.findIndex(a => a.id === id);
        if (index !== -1) {
            announcements[index].likes += 1;
            localStorage.setItem("announcements", JSON.stringify(announcements));
            document.getElementById(`like-count-${id}`).innerText = announcements[index].likes;
        }
    };

    // ====================== TIMETABLE UPLOAD ======================
    const timetableForm = document.getElementById("timetable-form");
    if (timetableForm) {
        timetableForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let fileInput = document.getElementById("timetable-file");
            let file = fileInput.files[0];

            if (!file || file.type !== "application/pdf") {
                alert("Please upload a valid PDF file.");
                return;
            }

            let reader = new FileReader();
            reader.onload = function (e) {
                localStorage.setItem("timetablePDF", e.target.result);
                alert("Timetable uploaded successfully!");
                fileInput.value = "";
            };
            reader.readAsDataURL(file);
        });
    }

    // ====================== DISPLAY TIMETABLE (STUDENT DASHBOARD) ======================
    const studentTimetable = document.getElementById("student-timetable");
    if (studentTimetable) {
        let pdfData = localStorage.getItem("timetablePDF");
        studentTimetable.innerHTML = pdfData ? `<a href="${pdfData}" target="_blank">View Timetable</a>` : "<p>No timetable uploaded.</p>";
    }
});