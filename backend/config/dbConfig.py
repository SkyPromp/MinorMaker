import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "../ergo.db")

def get_connection():
    """Return a new SQLite connection."""
    con = sqlite3.connect(DB_PATH)
    con.row_factory = sqlite3.Row  # access columns by name
    return con

def database_init():
    """Create tables if they don’t exist."""
    con = get_connection()
    cur = con.cursor()

    cur.execute("""
        CREATE TABLE IF NOT EXISTS plants (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            moisture REAL NOT NULL,
            digital REAL NOT NULL
        );
    """)

    con.commit()
    con.close()

def add_plant(moisture, digital):
    con = get_connection()
    cur = con.cursor()
    cur.execute(
        "INSERT INTO plants (moisture, digital) VALUES (?, ?)",
        (moisture, digital)
    )
    con.commit()
    _id = cur.lastrowid
    return _id

def get_plants():
    con = get_connection()
    cur = con.cursor()
    cur.execute("SELECT * FROM plants;")
    rows = cur.fetchall()
    con.close()

    return rows

def get_plant_by_id(plant_id):
    con = get_connection()
    cur = con.cursor()
    cur.execute("SELECT * FROM plants WHERE id = ?;", (plant_id,))

    row = cur.fetchone()
    con.close()

    return row


def update_plant(plant_id, moisture, digital):
    con = get_connection()
    cur = con.cursor()
    cur.execute(
        "UPDATE plants SET moisture = ?, digital = ? WHERE id = ?",
        (moisture, digital, plant_id)
    )
    con.commit()
    affected_rows = cur.rowcount
    con.close()
    return affected_rows > 0