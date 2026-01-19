import { getExpenses, createExpense, removeExpense } from './api.js';
import { renderTable, setStatus } from './ui.js';

async function refreshExpenses() {
    try {
        setStatus('Loading…');
        const data = await getExpenses();
        renderTable(data);
        setStatus(data.length ? `${data.length} item(s)` : 'No expenses yet');
    } catch (err) {
        setStatus(`Error: ${err.message}`);
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
            await createExpense(payload);
            form.reset();
            await refreshExpenses();
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
        await removeExpense(id);
        await refreshExpenses();
    });
}

window.addEventListener('DOMContentLoaded', () => {
    setupForm();
    setupDeleteButtons();
    refreshExpenses();
});
