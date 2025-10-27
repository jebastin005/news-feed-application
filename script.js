const apiKey = "YOUR_API_KEY"; // Replace with your 
NewsAPI.org API key
const newsContainer = 
document.getElementById("newsContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const categoryButtons = 
document.querySelectorAll(".categoryBtn");
// Function to fetch news
async function fetchNews(url) {
 newsContainer.innerHTML = "<p>Loading news...</p>";
 try {
 const response = await fetch(url);
 const data = await response.json();
 if (data.status !== "ok") {
 newsContainer.innerHTML = `<p>Error: 
${data.message}</p>`;
 return;
 }
 displayNews(data.articles);
 } catch (error) {
 newsContainer.innerHTML = `<p>Error fetching news: 
${error}</p>`;
 }
}
// Function to display news
function displayNews(articles) {
 newsContainer.innerHTML = "";
 if (articles.length === 0) {
 newsContainer.innerHTML = "<p>No articles found.</p>";
 return;
 }
 articles.forEach(article => {
 const card = document.createElement("div");
 card.className = "news-card";
 card.innerHTML = `
 <img src="${article.urlToImage || 
'https://via.placeholder.com/300x200'}" alt="News Image">
 <h3>${article.title}</h3>
 <p>${article.description || ''}</p>
 <a href="${article.url}" target="_blank">Read More</a>
 `;
 newsContainer.appendChild(card);
 });
}
// Fetch top headlines on page load
fetchNews(`https://newsapi.org/v2/top headlines?country=in&apiKey=${apiKey}`);
// Search functionality
searchBtn.addEventListener("click", () => {
 const query = searchInput.value.trim();
 if (!query) return alert("Please enter a search term");
 
fetchNews(`https://newsapi.org/v2/everything?q=${encodeURIC
omponent(query)}&sortBy=publishedAt&apiKey=${apiKey}`);
});
// Category buttons
categoryButtons.forEach(btn => {
 btn.addEventListener("click", () => {
 const category = btn.getAttribute("data-category");
 fetchNews(`https://newsapi.org/v2/topheadlines?country=in&category=${category}&apiKey=${apiKe
y}`); })});