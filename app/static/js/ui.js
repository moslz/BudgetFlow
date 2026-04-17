const tbody = document.querySelector('#expenses-table tbody');
const statusEl = document.getElementById('table-status');
const emptyEl = document.getElementById('empty');

export function setStatus(message) {
    statusEl.textContent = message || '';
}

export function renderTable(expenses, currency = '$') {
    tbody.innerHTML = '';
    for (const e of expenses) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td>${e.date}</td>
      <td>${e.category}</td>
      <td class="num">${currency}${Number(e.amount).toFixed(2)}</td>
      <td>${e.note || ''}</td>
      <td>
          <button data-id="${e.id}" class="btn btn--danger btn--sm delete">Delete</button>
      </td>
    `;
        tbody.appendChild(tr);
    }
    emptyEl.hidden = expenses.length > 0;
}
