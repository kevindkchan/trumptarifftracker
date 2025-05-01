fetch('data/timeline_events_2025.json')
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector('.timeline-wrapper.second-term-2025');

    data.forEach(event => {
      container.insertAdjacentHTML('beforeend', `
        <div class="timeline-item ${event.position}">
            ${event.position !== 'center' ? `
            <div class="timeline-marker">
                <img src="${event.image}" loading="lazy">
            </div>` : ''}
            <div class="timeline-content">
                <div class="timeline-header">${event.date}</div>
                <div class="timeline-desc">${event.description}</div>
                <div class="content-bottom">
                    <a class="timeline-link" href="${event.link}" target="_blank" rel="noopener noreferrer"><u>${event.source}</u></a>
                    <div class="timeline-category">${event.category}</div>
                </div>
            </div>
        </div>
      `);
    });
  })
.catch(err => console.error('Failed to load timeline events:', err));
