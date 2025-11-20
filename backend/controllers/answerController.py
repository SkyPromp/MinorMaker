from entities.answer import Answer
from flask import request, jsonify, Blueprint
from services.answerService import AnswerService

class AnswerController:
    def __init__(self, app):
        self.answerSvc = AnswerService()
        self.blueprint = Blueprint("answerController", __name__)

        ## register routes  ##
        self.blueprint.add_url_rule('/api/answers', 'get_answers', self.get_answers, methods=['GET'])

        self.blueprint.add_url_rule('/api/answers', 'add_answer', self.add_answer, methods=['POST'])
        
        self.register(app)

    def register(self, app):
        app.register_blueprint(self.blueprint)

    ##  endpoints  ##

    def get_answers(self):
        data = self.answerSvc.get_answers()

        return jsonify({"data": data, "status": "ok"}), 200

    def add_answer(self):
        data = request.get_json()

        if not data:
            return jsonify({"error": "No JSON data"}), 400

        id = data.get("id", None)
        questionId = data.get("question-id")
        answer = data.get("answer")
        note = data.get("note")
        timestamp = data.get("timestamp")

        created = self.answerSvc.add_answer(Answer(questionId, answer, note, timestamp))

        return jsonify({"data": created, "status": "ok", "action": "created"}), 201


