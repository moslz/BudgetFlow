export async function getExpenses() {
    const res = await fetch('/api/expenses');
    if (!res.ok) throw new Error('Failed to load expenses');
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
