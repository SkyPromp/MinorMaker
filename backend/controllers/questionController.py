from entities.question import Question
from flask import request, jsonify, Blueprint
from services.questionService import QuestionService

class QuestionController:
    def __init__(self, app):
        self.questionSvc = QuestionService()
        self.blueprint = Blueprint("questionController", __name__)

        ## register routes  ##
        self.blueprint.add_url_rule('/api/questions', 'get_questions', self.get_questions, methods=['GET'])

        self.blueprint.add_url_rule('/api/questions', 'add_question', self.add_question, methods=['POST'])
        
        self.register(app)

    def register(self, app):
        app.register_blueprint(self.blueprint)

    ##  endpoints  ##

    def get_questions(self):
        data = self.questionSvc.get_questions()

        return jsonify({"data": data, "status": "ok"}), 200

    def get_questions(self):
        data = self.questionSvc.get_questions()

        return jsonify({"data": data, "status": "ok"}), 200

    def add_question(self):
        data = request.get_json()

        if not data:
            return jsonify({"error": "No JSON data"}), 400

        id = data.get("id", None)
        question = data.get("question")
        category = data.get("category")

        created = self.questionSvc.add_question(Question(question, category))

        return jsonify({"data": created, "status": "ok", "action": "created"}), 201

