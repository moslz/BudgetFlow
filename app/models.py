from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(10), nullable=False)  # YYYY-MM-DD
    category = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    note = db.Column(db.String(200), nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
