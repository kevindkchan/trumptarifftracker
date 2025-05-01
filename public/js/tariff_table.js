document.addEventListener('DOMContentLoaded', () => {
  const tbody = document.querySelector('#tariff-table tbody');
  let tariffData = [];
  let currentSort = { key: null, asc: true };

  function renderTable(data) {
    tbody.innerHTML = '';
    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item["Country"]}</td>
        <td>${item["US imports"]}</td>
        <td>${item["Tariff"]}</td>
      `;
      tbody.appendChild(row);
    });
  }

  function updateSortArrows() {
    document.querySelectorAll('#tariff-table thead button').forEach(button => {
      const arrow = button.querySelector('.sort-arrow');
      const key = button.dataset.key;
      if (key === currentSort.key) {
        arrow.textContent = currentSort.asc ? '↑' : '↓';
      } else {
        arrow.textContent = '';
      }
    });
  }

  function sortData(key) {
    const isNumeric = key !== "Country";
    const parseValue = val => isNumeric ? parseFloat(val) || 0 : val;

    if (currentSort.key === key) {
      currentSort.asc = !currentSort.asc;
    } else {
      currentSort.key = key;
      currentSort.asc = true;
    }

    tariffData.sort((a, b) => {
      const aVal = parseValue(a[key]);
      const bVal = parseValue(b[key]);
      if (aVal < bVal) return currentSort.asc ? -1 : 1;
      if (aVal > bVal) return currentSort.asc ? 1 : -1;
      return 0;
    });

    renderTable(tariffData);
    updateSortArrows();
  }

  fetch('data/tariff_table.json')
    .then(res => res.json())
    .then(data => {
      tariffData = data;
      sortData("Country");
    })
    .catch(err => {
      console.error('Failed to load JSON:', err);
      tbody.innerHTML = '<tr><td colspan="3">Failed to load tariff data.</td></tr>';
    });

  document.querySelectorAll('#tariff-table thead button').forEach(button => {
    button.addEventListener('click', () => sortData(button.dataset.key));
  });
});
