function fetchNews() {
  console.log('Fetching news...');

  return fetch('/news?q=Trump tariff')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('news-container');
      container.innerHTML = '';

      const articles = data.articles || [];

      if (articles.length === 0) {
        container.innerHTML = '<p>No articles found.</p>';
        return;
      }

      const timestamp = new Date().toLocaleTimeString();
      const updatedTag = document.createElement('div');
      updatedTag.className = 'updated-tag';
      updatedTag.textContent = `Updated at ${timestamp}`;
      container.appendChild(updatedTag);

      articles.forEach(article => {
        const el = document.createElement('div');
        el.className = 'news-item';
        el.innerHTML = `
          <a class="article" href="${article.url}" target="_blank">${article.title}</a>
          <div class="description">${article.description || ''}</div>
          <div class="date">
            ${new Date(article.publishedAt).toLocaleString()} —
            <span class="source">${article.source.name}</span>
          </div>
        `;
        container.appendChild(el);
      });

      console.log(`Rendered ${articles.length} article(s)`);
    })
    .catch(err => {
      console.error('News fetch error:', err);
      document.getElementById('news-container').innerText = 'Error loading news.';
    });
}

fetchNews();

const refreshIcon = document.getElementById('refresh');

refreshIcon.addEventListener('click', () => {
  console.log('Refresh clicked');
  refreshIcon.classList.add('spin');

  fetchNews().finally(() => {
    refreshIcon.classList.remove('spin');
    console.log('Refresh complete');
  });
});
