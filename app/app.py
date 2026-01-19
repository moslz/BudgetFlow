import os
from flask import Flask, render_template
from app.models import db
from app.routes import api_bp


def create_app():
    app = Flask(__name__, static_folder='static', template_folder='templates')

    database_url = os.environ.get('DATABASE_URL')
    if database_url:
        app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    else:
        # SQLite file in repo's db/ folder 
        base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
        db_file = os.path.join(base_dir, 'db', 'budget.db')
        os.makedirs(os.path.dirname(db_file), exist_ok=True)
        app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_file}'

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    with app.app_context():
        db.create_all()

    app.register_blueprint(api_bp, url_prefix='/api')

    @app.route('/')
    def index():
        return render_template('index.html')

    return app


app = create_app()
