fetch('data/tariff_table.json')
      .then(response => response.json())
      .then(data => {
        const tbody = document.querySelector('#tariff-table tbody');
        data.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${item["Country"]}</td>
            <td>${item["US imports"] || "-"}</td>
            <td>${item["Tariff"]}</td>
          `;
          tbody.appendChild(row);
        });
    })
.catch(err => console.error('Failed to load JSON:', err));