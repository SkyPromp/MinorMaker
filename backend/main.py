from controllers.answerController import AnswerController
from controllers.questionController import QuestionController
from controllers.userController import UserController
from controllers.fileController import FileController
from flask import Flask
from flask_cors import CORS
from config.dbConfig import db
from seed_questions_max import seedQuestions
import cloudinary
import cloudinary.uploader
from cloudinary.utils import cloudinary_url
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
cors = CORS(app)

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

# upload_result = cloudinary.uploader.upload("./boot.jpg", public_id="boot")

# print(upload_result["secure_url"])

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://ergos_admin:ergos123@db/ergos'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()
    seedQuestions()

questionController = QuestionController(app)
answerController = AnswerController(app)
userController = UserController(app)
fileController = FileController(app)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
