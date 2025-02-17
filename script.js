// ====================== STUDENT REGISTRATION ======================
document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.querySelector("form[action='dashboard.html']");
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent page reload

            let fullName = document.getElementById("fullname").value;
            let username = document.getElementById("username").value;
            let admission = document.getElementById("admission").value;
            let password = document.getElementById("password").value;
            let confirmPassword = document.getElementById("confirm-password").value;

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            // Save student data (simulate backend)
            let studentData = { fullName, username, admission, password };
            localStorage.setItem("student_" + admission, JSON.stringify(studentData));
            localStorage.setItem("username", username);

            alert("Registration successful!");
            window.location.href = "dashboard.html";
        });
    }
});

// ====================== STUDENT LOGIN ======================
const studentLoginForm = document.querySelector("form[action='dashboard.html']");
if (studentLoginForm) {
    studentLoginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let admission = document.getElementById("admission").value;
        let password = document.getElementById("password").value;

        let studentData = JSON.parse(localStorage.getItem("student_" + admission));

        if (studentData && studentData.password === password) {
            localStorage.setItem("username", studentData.username);
            alert("Login successful!");
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid admission number or password.");
        }
    });
}

// ====================== ADMIN LOGIN ======================
const adminLoginForm = document.querySelector("form[action='admin_dashboard.html']");
if (adminLoginForm) {
    adminLoginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let adminUsername = document.getElementById("admin-username").value;
        let adminPassword = document.getElementById("admin-password").value;

        // Default admin credentials
        if (adminUsername === "admin" && adminPassword === "admin123") {
            localStorage.setItem("admin", "true");
            alert("Admin Login successful!");
            window.location.href = "admin_dashboard.html";
        } else {
            alert("Invalid admin credentials.");
        }
    });
}

// ====================== DISPLAY STUDENT DASHBOARD ======================
const studentUsernameDisplay = document.getElementById("username");
if (studentUsernameDisplay) {
    studentUsernameDisplay.textContent = localStorage.getItem("username") || "Student";
}

// ====================== DISPLAY ADMIN DASHBOARD ======================
const adminDashboard = document.querySelector(".admin-dashboard");
if (adminDashboard && !localStorage.getItem("admin")) {
    alert("Access Denied! Admins only.");
    window.location.href = "admin_login.html";
}

// ====================== LOGOUT FUNCTION ======================
const logoutButton = document.querySelector(".logout");
if (logoutButton) {
    logoutButton.addEventListener("click", function () {
        localStorage.clear();
        alert("Logged out successfully!");
        window.location.href = "index.html";
    });
}

// ====================== SEARCH FUNCTION FOR MANAGE STUDENTS ======================
function searchStudents() {
    let input = document.getElementById("search").value.toLowerCase();
    let table = document.getElementById("student-list");
    let rows = table.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        let name = rows[i].getElementsByTagName("td")[1];
        let admission = rows[i].getElementsByTagName("td")[0];

        if (name && admission) {
            let nameText = name.textContent.toLowerCase();
            let admissionText = admission.textContent.toLowerCase();

            if (nameText.includes(input) || admissionText.includes(input)) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
}

// ====================== MANAGE CANDIDATES (DUMMY DATA) ======================
document.addEventListener("DOMContentLoaded", function () {
    let candidatesList = document.getElementById("candidates-list");
    if (candidatesList) {
        let candidates = [
            { id: 1, name: "John Doe", position: "President" },
            { id: 2, name: "Jane Smith", position: "Vice President" },
            { id: 3, name: "Michael Johnson", position: "Secretary" }
        ];

        candidates.forEach(candidate => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${candidate.id}</td>
                <td>${candidate.name}</td>
                <td>${candidate.position}</td>
                <td>
                    <button class="delete" onclick="deleteCandidate(${candidate.id})">Delete</button>
                </td>
            `;
            candidatesList.appendChild(row);
        });
    }
});

// ====================== DELETE CANDIDATE ======================
function deleteCandidate(candidateId) {
    alert("Candidate with ID " + candidateId + " deleted! (Dummy Function)");
}

// ====================== VOTING FUNCTIONALITY ======================
document.addEventListener("DOMContentLoaded", function () {
    let voteButtons = document.querySelectorAll(".vote-btn");
    if (voteButtons.length > 0) {
        voteButtons.forEach(button => {
            button.addEventListener("click", function () {
                let candidateName = this.dataset.name;
                alert(`You have voted for ${candidateName}!`);
                this.disabled = true;
            });
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Fullscreen Image View
    const images = document.querySelectorAll(".announcement-image");
    
    images.forEach(image => {
        image.addEventListener("click", function () {
            const fullscreenDiv = document.createElement("div");
            fullscreenDiv.classList.add("fullscreen");
            fullscreenDiv.innerHTML = `<img src="${this.src}" alt="Announcement"><span class="close"></span>`;
            
            document.body.appendChild(fullscreenDiv);
            
            fullscreenDiv.addEventListener("click", function () {
                fullscreenDiv.remove();
            });

            // Change container styles after viewing
            document.querySelector(".container").style.background = "#e0f7fa";
        });
    });

    // Like Button Functionality
    const likeButtons = document.querySelectorAll(".like-btn");
    
    likeButtons.forEach(button => {
        button.addEventListener("click", function () {
            this.classList.toggle("liked");
            this.textContent = this.classList.contains("liked") ? "Liked" : "Like";
        });
    });
});