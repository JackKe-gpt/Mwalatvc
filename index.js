document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("toggleBtn");
    const mainContent = document.querySelector(".main-content");

    // Toggle Sidebar
    toggleBtn.addEventListener("click", function () {
        sidebar.classList.toggle("active");
        mainContent.classList.toggle("active");
    });

    // Slideshow Logic
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slide");
    const slideWrapper = document.querySelector(".slide-wrapper");

    function showSlides() {
        slideIndex++;
        if (slideIndex >= slides.length) slideIndex = 0;
        
        slideWrapper.style.transform = `translateX(-${slideIndex * 100}%)`;
        setTimeout(showSlides, 3000); // Change slide every 3 sec
    }

    showSlides();

    // Manual Slide Control
    window.moveSlide = function(n) {
        slideIndex += n;
        if (slideIndex >= slides.length) slideIndex = 0;
        if (slideIndex < 0) slideIndex = slides.length - 1;

        slideWrapper.style.transform = `translateX(-${slideIndex * 100}%)`;
    };
});

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const sideNav = document.querySelector(".side-nav");
    const closeBtn = document.querySelector(".close-btn");
    const dropdownLinks = document.querySelectorAll(".dropdown > a");

    // Open side menu
    menuToggle.addEventListener("click", () => {
        sideNav.classList.add("open");
    });

    // Close side menu
    closeBtn.addEventListener("click", () => {
        sideNav.classList.remove("open");
    });

    // Dropdown toggle
    dropdownLinks.forEach((dropdown) => {
        dropdown.addEventListener("click", (e) => {
            e.preventDefault();
            const parent = dropdown.parentElement;
            parent.classList.toggle("open");
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!sideNav.contains(e.target) && !menuToggle.contains(e.target)) {
            sideNav.classList.remove("open");
        }
    });
});
// Function to post news
function postNews() {
    let title = document.getElementById("news-title").value;
    let content = document.getElementById("news-content").value;
    let image = document.getElementById("news-image").files[0];

    if (title.trim() === "" || content.trim() === "") {
        alert("Title and content are required!");
        return;
    }

    let reader = new FileReader();
    reader.onload = function (e) {
        let newsHTML = `
            <div class="news-item">
                <h3>${title}</h3>
                <p>${content}</p>
                ${image ? `<img src="${e.target.result}" alt="News Image">` : ""}
                <div class="news-actions">
                    <button onclick="editNews(this)">Edit</button>
                    <button onclick="deleteNews(this)">Delete</button>
                </div>
            </div>`;
        document.getElementById("news-container").innerHTML += newsHTML;
    };
    if (image) {
        reader.readAsDataURL(image);
    } else {
        reader.onload();
    }
}

// Function to edit news
function editNews(button) {
    let newsItem = button.parentElement.parentElement;
    let title = prompt("Edit title:", newsItem.querySelector("h3").innerText);
    let content = prompt("Edit content:", newsItem.querySelector("p").innerText);
    
    if (title && content) {
        newsItem.querySelector("h3").innerText = title;
        newsItem.querySelector("p").innerText = content;
    }
}

// Function to delete news
function deleteNews(button) {
    if (confirm("Are you sure you want to delete this news?")) {
        button.parentElement.parentElement.remove();
    }
}
