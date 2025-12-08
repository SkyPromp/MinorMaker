from controllers.answerController import AnswerController
from controllers.questionController import QuestionController
from controllers.userController import UserController
from flask import Flask
from flask_cors import CORS
from config.dbConfig import db
from seed_questions_max import seedQuestions

app = Flask(__name__)
cors = CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://ergos_admin:ergos123@db/ergos'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()
    seedQuestions()

questionController = QuestionController(app)
answerController = AnswerController(app)
userController = UserController(app)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
