import { getExpenses, createExpense, removeExpense, getCategories, getSettings, updateSettings } from './api.js';
import { renderTable, setStatus } from './ui.js';

let currencySymbol = '$'; // default fallback

async function refreshExpenses() {
    try {
        setStatus('Loading…');
        const data = await getExpenses();
        renderTable(data, currencySymbol);
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

async function loadCategories() {
    try {
        const categories = await getCategories();
        const datalist = document.getElementById('category-list');
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            datalist.appendChild(option);
        });
    } catch (err) {
        console.error('Failed to load categories:', err);
    }
}

async function loadSettings() {
    try {
        const settings = await getSettings();
        currencySymbol = settings.currency;
        // Update form label
        const amountLabel = document.querySelector('label[for="amount"]');
        if (amountLabel) {
            amountLabel.textContent = `Amount (${currencySymbol})`;
        }
        // Update currency select
        const currencySelect = document.getElementById('currency-select');
        if (currencySelect) {
            currencySelect.value = currencySymbol;
        }
    } catch (err) {
        console.error('Failed to load settings:', err);
    }
}

function setupSettings() {
    const saveBtn = document.getElementById('save-settings');
    const statusEl = document.getElementById('settings-status');
    const currencySelect = document.getElementById('currency-select');

    saveBtn.addEventListener('click', async () => {
        try {
            statusEl.hidden = true;
            const newCurrency = currencySelect.value;
            const updated = await updateSettings({ currency: newCurrency });
            currencySymbol = updated.currency;
            // Update label
            const amountLabel = document.querySelector('label[for="amount"]');
            if (amountLabel) {
                amountLabel.textContent = `Amount (${currencySymbol})`;
            }
            // Refresh table with new currency
            await refreshExpenses();
            statusEl.textContent = 'Settings saved!';
            statusEl.hidden = false;
            setTimeout(() => statusEl.hidden = true, 3000);
        } catch (err) {
            statusEl.textContent = `Error: ${err.message}`;
            statusEl.hidden = false;
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    setupForm();
    setupDeleteButtons();
    setupSettings();
    loadSettings();
    loadCategories();
    refreshExpenses();
});
