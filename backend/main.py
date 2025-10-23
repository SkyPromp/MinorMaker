from flask import Flask
from flask_cors import CORS, cross_origin
from controllers.plantController import PlantController
import config.dbConfig as db

app = Flask(__name__)
cors = CORS(app)

with app.app_context():
    db.database_init()
    print("✅ Database and tables created successfully!")

plantController = PlantController(app)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)