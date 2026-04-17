from flask import Blueprint, request, jsonify
from .models import db, Expense
import json
import os


api_bp = Blueprint('api', __name__)

SETTINGS_FILE = os.path.join(os.path.dirname(__file__), '..', 'settings.json')

def get_settings_data():
    if os.path.exists(SETTINGS_FILE):
        with open(SETTINGS_FILE, 'r') as f:
            return json.load(f)
    return {'currency': '€'}

def save_settings_data(data):
    with open(SETTINGS_FILE, 'w') as f:
        json.dump(data, f)

DEFAULT_CURRENCY = '€'

DEFAULT_CATEGORIES = [
    'Groceries',
    'Transport',
    'Entertainment',
    'Utilities',
    'Dining Out',
    'Healthcare',
    'Shopping',
    'Bills',
    'Other'
]


@api_bp.route('/categories', methods=['GET'])
def get_categories():
    return jsonify(DEFAULT_CATEGORIES)


@api_bp.route('/settings', methods=['GET'])
def get_settings():
    return jsonify(get_settings_data())


@api_bp.route('/settings', methods=['PUT'])
def update_settings():
    payload = request.get_json() or {}
    current = get_settings_data()
    if 'currency' in payload:
        current['currency'] = payload['currency']
    save_settings_data(current)
    return jsonify(current)


@api_bp.route('/expenses', methods=['GET'])
def get_expenses():
    expenses = Expense.query.order_by(Expense.id.desc()).all()
    data = [
        {
            'id': e.id,
            'date': e.date,
            'category': e.category,
            'amount': e.amount,
            'note': e.note,
        }
        for e in expenses
    ]
    return jsonify(data)


@api_bp.route('/expenses', methods=['POST'])
def add_expense():
    payload = request.get_json() or {}
    errors = []

    for field in ['date', 'category', 'amount']:
        if payload.get(field) in (None, ''):
            errors.append(f'{field} is required')

    try:
        amount = float(payload.get('amount', 0))
    except Exception:
        errors.append('amount must be a number')
        amount = None

    if errors:
        return jsonify({'errors': errors}), 400

    exp = Expense(
        date=payload['date'],
        category=payload['category'],
        amount=amount,
        note=payload.get('note'),
    )
    db.session.add(exp)
    db.session.commit()

    return jsonify({'id': exp.id}), 201


@api_bp.route('/expenses/<int:expense_id>', methods=['DELETE'])
def delete_expense(expense_id):
    exp = Expense.query.get(expense_id)
    if not exp:
        return jsonify({'error': 'Not found'}), 404

    db.session.delete(exp)
    db.session.commit()

    return jsonify({'status': 'deleted'})
