window.addEventListener('DOMContentLoaded', () => {
    setupForm();
    setupDeleteButtons();
    fetchExpenses();
});

async function fetchExpenses() {
    const res = await fetch('/api/expenses');
    const data = await res.json();
    renderTable(data);
}

function renderTable(expenses) {
    const tbody = document.querySelector('#expenses-table tbody');
    tbody.innerHTML = '';
    for (const e of expenses) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td>${e.date}</td>
      <td>${e.category}</td>
      <td class="num">${Number(e.amount).toFixed(2)}</td>
      <td>${e.note || ''}</td>
      <td>
        <button data-id="${e.id}" class="delete">Delete</button>
      </td>
    `;
        tbody.appendChild(tr);
    }
}

async function addExpense(payload) {
    const res = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error((err && err.errors && err.errors.join(', ')) || 'Unknown error');
    }
    return res.json();
}

async function deleteExpense(id) {
    const res = await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Delete failed');
    }
}

function setupForm() {
    const form = document.getElementById('expense-form');
    const errorEl = document.getElementById('form-error');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorEl.hidden = true;
        try {
            const payload = {
                date: form.date.value,
                category: form.category.value.trim(),
                amount: form.amount.value,
                note: form.note.value.trim(),
            };
            await addExpense(payload);
            form.reset();
            await fetchExpenses();
        } catch (err) {
            errorEl.textContent = err.message;
            errorEl.hidden = false;
        }
    });
}

function setupDeleteButtons() {
    const tbody = document.querySelector('#expenses-table tbody');
    tbody.addEventListener('click', async (e) => {
        const btn = e.target.closest('button.delete');
        if (!btn) return;
        const id = btn.getAttribute('data-id');
        await deleteExpense(id);
        await fetchExpenses();
    });
}
