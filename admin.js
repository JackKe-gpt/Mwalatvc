
document.addEventListener("DOMContentLoaded", function () {
    const studentListContainer = document.getElementById("student-list");

    // Load students from localStorage or initialize an empty array
    let studentList = JSON.parse(localStorage.getItem("studentList")) || [
        { admissionNumber: "1001", fullName: "John Doe", username: "johndoe" },
        { admissionNumber: "1002", fullName: "Jane Smith", username: "janesmith" }
    ];

    // Function to display students
    function displayStudents() {
        studentListContainer.innerHTML = studentList.map((student, index) => `
            <tr>
                <td>${student.admissionNumber}</td>
                <td>${student.fullName}</td>
                <td>${student.username}</td>
                <td><button onclick="removeStudent(${index})">Remove</button></td>
            </tr>
        `).join('');
    }

    // Display students on page load
    displayStudents();

    // Function to remove a student
    window.removeStudent = function(index) {
        if (confirm("Are you sure you want to remove this student?")) {
            studentList.splice(index, 1);
            localStorage.setItem("studentList", JSON.stringify(studentList));
            displayStudents();
        }
    }
});
