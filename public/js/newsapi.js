function fetchNews() {
  fetch('/news?q=Trump tariff')
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
          <a class="article" href="${article.url}" target="_blank">${article.title}</a>
          <div class="description">${article.description || ''}</div>
          <div class="date">${new Date(article.publishedAt).toLocaleString()} — <div class="source">${article.source.name}</div></div>
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
