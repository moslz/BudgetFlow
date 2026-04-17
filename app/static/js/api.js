export async function getExpenses() {
    const res = await fetch('/api/expenses');
    if (!res.ok) throw new Error('Failed to load expenses');
    return res.json();
}

export async function getCategories() {
    const res = await fetch('/api/categories');
    if (!res.ok) throw new Error('Failed to load categories');
    return res.json();
}

export async function getSettings() {
    const res = await fetch('/api/settings');
    if (!res.ok) throw new Error('Failed to load settings');
    return res.json();
}

export async function updateSettings(settings) {
    const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
    });
    if (!res.ok) throw new Error('Failed to update settings');
    return res.json();
}

export async function createExpense(payload) {
    const res = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err && err.errors && err.errors.join(', ')) || 'Failed to add expense');
    }
    return res.json();
}

export async function removeExpense(id) {
    const res = await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err && err.error) || 'Failed to delete');
    }
}
