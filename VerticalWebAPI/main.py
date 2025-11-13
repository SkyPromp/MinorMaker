from flask import Flask
from flask_cors import CORS, cross_origin
from config.dbConfig import db
from controllers.plantController import PlantController

app = Flask(__name__)
cors = CORS(app)

# Configure DB connection
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://ergos_admin:ergos123@db/ergos'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Init db with app
db.init_app(app)

with app.app_context():
    db.create_all()
    print("✅ Database and tables created successfully!")

plantController = PlantController(app)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
