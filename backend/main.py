from controllers.answerController import AnswerController
from controllers.plantController import PlantController
from controllers.questionController import QuestionController
from controllers.userController import UserController
from flask import Flask
from flask_cors import CORS
from config.dbConfig import db
from seed_questions import seed_questions
import time
import pymysql

app = Flask(__name__)
cors = CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://ergos_admin:ergos123@db/ergos'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Wait for database to be ready
max_retries = 10
retry_count = 0
while retry_count < max_retries:
    try:
        with app.app_context():
            db.create_all()
            seed_questions()
            print("Database and tables created successfully!")
        break
    except (pymysql.err.OperationalError, Exception) as e:
        retry_count += 1
        print(f"Database connection attempt {retry_count}/{max_retries} failed: {e}")
        if retry_count < max_retries:
            time.sleep(2)
        else:
            print("Failed to connect to database after retries")
            raise

questionController = QuestionController(app)
answerController = AnswerController(app)
plantController = PlantController(app)
userController = UserController(app)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
