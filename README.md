# Budget Flow (Deutsch)

Budget Flow ist eine kleine App, um tägliche Ausgaben zu protokollieren. Sie besteht aus einem einfachen JavaScript-Frontend, einer Flask-API und einer SQLite-Datenbank.

## Was es macht
- Ausgabe hinzufügen (Datum, Kategorie, Betrag, Notiz)
- Ausgaben in einer Tabelle ansehen
- Ausgabe löschen, wenn sie nicht mehr benötigt wird

## Technologie-Stack
- Frontend: JavaScript + HTML/CSS
- Backend: Flask (Python)
- Datenbank: SQLite (dateibasiert, liegt im Repository)
- Containerisierung: Docker für einen Ein-Kommando-Start

## Lokal ausführen
Voraussetzungen: Python 3.10+ installiert.

```bash
# im Projektwurzelverzeichnis
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Server starten
python -m flask --app app.app run
```

Öffnen Sie http://localhost:5000 im Browser.

Tipps:
- Beim ersten Start wird die SQLite-Datei unter db/budget.db erstellt.
- Wenn Port 5000 belegt ist, können Sie einen anderen Port verwenden: `python -m flask --app app.app run -p 5050`.

## Mit Docker ausführen
```bash
docker compose up --build
```

Besuchen Sie anschließend http://localhost:5000. Beenden mit `docker compose down`.

## API-Kurzübersicht
- GET /api/expenses — alle Ausgaben auflisten
- POST /api/expenses — eine Ausgabe erstellen
	- Beispielkörper:
		```json
		{
			"date": "2026-01-11",
			"category": "Groceries",
			"amount": 12.34,
			"note": "Milk and eggs"
		}
		```
- DELETE /api/expenses/{id} — nach ID löschen

## Projektstruktur
- app/
	- app.py — Flask-App und Konfiguration
	- models.py — `Expense`-Modell und Datenbankeinrichtung
	- routes.py — JSON-API-Endpunkte
	- templates/index.html — die angezeigte Seite
	- static/css/styles.css — Grundstyles
	- static/js/app.js — Fetch-API + UI-Aktualisierungen
- db/ — Datenbankordner (SQLite-Datei liegt hier)
- requirements.txt — Python-Abhängigkeiten
- Dockerfile, docker-compose.yml — Container-Setup

---

# Budget Flow (English)

Budget Flow is a small app to log daily spendings. It’s made with a plain JavaScript frontend, a Flask API, and a SQLite database. 

## What it does
- Add an expense (date, category, amount, note)
- See your expenses in a table
- Delete an expense when you don’t need it anymore

## Stack
- Frontend: JavaScript + HTML/CSS
- Backend: Flask (Python)
- Database: SQLite (file-based, lives in the repo)
- Containerization: Docker for a one-command run

## Run it locally
Prerequisites: Python 3.10+ installed.

```bash
# from the project root
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# start the server
python -m flask --app app.app run
```

Open http://localhost:5000 in your browser.

Tips:
- The first run creates a SQLite file at db/budget.db.
- If 5000 is busy, you can use another port: `python -m flask --app app.app run -p 5050`.

## Run with Docker
```bash
docker compose up --build
```

Then visit http://localhost:5000. Stop with `docker compose down`.

## API quick reference
- GET /api/expenses — list all expenses
- POST /api/expenses — create an expense
	- body example:
		```json
		{
			"date": "2026-01-11",
			"category": "Groceries",
			"amount": 12.34,
			"note": "Milk and eggs"
		}
		```
- DELETE /api/expenses/{id} — delete by id

## Project layout
- app/
	- app.py — Flask app and configuration
	- models.py — `Expense` model and database setup
	- routes.py — JSON API endpoints
	- templates/index.html — the page you see
	- static/css/styles.css — basic styles
	- static/js/app.js — fetch API + UI updates
- db/ — database folder (SQLite file lives here)
- requirements.txt — Python dependencies
- Dockerfile, docker-compose.yml — container setup

