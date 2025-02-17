
document.addEventListener("DOMContentLoaded", function () {
    const newsForm = document.getElementById("news-form");
    const newsContainer = document.getElementById("news-container");
    const studentNewsContainer = document.getElementById("student-announcements");
    const adminNewsContainer = document.getElementById("admin-news-container");

    // Load news from localStorage or initialize an empty array
    let newsList = JSON.parse(localStorage.getItem("newsList")) || [];

    // Function to display news with likes, comments, and share buttons
    function displayNews() {
        function generateNewsHTML(news, index) {
            return `
                <div class="news-item">
                    <h3>${news.title}</h3>
                    <p>${news.content}</p>
                    <small>${news.date}</small>
                    <div class="news-actions">
                        <button onclick="likeNews(${index})">👍 Like (${news.likes || 0})</button>
                        <button onclick="toggleComments(${index})">💬 Comment</button>
                        <button onclick="shareNews('${news.title}', '${news.content}')">📤 Share</button>
                    </div>
                    <div id="comments-${index}" class="comments-section" style="display:none;">
                        <input type="text" id="comment-input-${index}" placeholder="Write a comment...">
                        <button onclick="addComment(${index})">Post</button>
                        <div class="comments-list">${(news.comments || []).map(comment => `<p>${comment}</p>`).join('')}</div>
                    </div>
                </div>
            `;
        }

        if (newsContainer) {
            newsContainer.innerHTML = newsList.map((news, index) => generateNewsHTML(news, index)).join('');
        }

        if (studentNewsContainer) {
            studentNewsContainer.innerHTML = newsList.map((news, index) => generateNewsHTML(news, index)).join('');
        }

        if (adminNewsContainer) {
            adminNewsContainer.innerHTML = newsList.map((news, index) => generateNewsHTML(news, index)).join('');
        }
    }

    // Display news on page load
    displayNews();

    // Handle news submission
    if (newsForm) {
        newsForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const title = document.getElementById("news-title").value;
            const content = document.getElementById("news-content").value;
            const date = new Date().toLocaleString();

            const newNews = { title, content, date, likes: 0, comments: [] };

            // Add new news to the beginning of the list (latest first)
            newsList.unshift(newNews);

            // Save updated list to localStorage
            localStorage.setItem("newsList", JSON.stringify(newsList));

            // Refresh display
            displayNews();

            // Clear form inputs
            newsForm.reset();
        });
    }

    // Function to like news
    window.likeNews = function(index) {
        newsList[index].likes = (newsList[index].likes || 0) + 1;
        localStorage.setItem("newsList", JSON.stringify(newsList));
        displayNews();
    }

    // Function to toggle comments section
    window.toggleComments = function(index) {
        const commentsSection = document.getElementById(`comments-${index}`);
        commentsSection.style.display = commentsSection.style.display === "none" ? "block" : "none";
    }

    // Function to add a comment
    window.addComment = function(index) {
        const commentInput = document.getElementById(`comment-input-${index}`);
        if (commentInput.value.trim() !== "") {
            newsList[index].comments = newsList[index].comments || [];
            newsList[index].comments.push(commentInput.value);
            localStorage.setItem("newsList", JSON.stringify(newsList));
            displayNews();
        }
    }

    // Function to share news
    window.shareNews = function(title, content) {
        const shareText = `Check out this news: "${title}" - ${content}`;
        if (navigator.share) {
            navigator.share({
                title: title,
                text: shareText,
                url: window.location.href
            }).catch(err => console.log("Error sharing", err));
        } else {
            alert("Sharing not supported in this browser.");
        }
    }
});
