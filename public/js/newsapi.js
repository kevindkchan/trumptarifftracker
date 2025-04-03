function fetchNews() {
  fetch('/news?q=Trump tariffs')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('news-container');
      container.innerHTML = '';

      const articles = data.articles || [];

      if (articles.length === 0) {
        container.innerHTML = '<p>No articles found.</p>';
        return;
      }

      articles.forEach(article => {
        const el = document.createElement('div');
        el.className = 'news-item';
        el.innerHTML = `
          <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
          <p>${article.description || ''}</p>
          <small>${new Date(article.publishedAt).toLocaleString()} — <em>${article.source.name}</em></small>
        `;
        container.appendChild(el);
      });
    })
    .catch(err => {
      console.error(err);
      document.getElementById('news-container').innerText = 'Error loading news.';
    });
}

fetchNews();
setInterval(fetchNews, 300000);
