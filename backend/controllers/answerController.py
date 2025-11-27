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

        self.blueprint.add_url_rule('/api/users/answers', 'get_answers_by_user_id', self.get_answers_by_user_id, methods=['GET'])
        
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
        user_id = data.get("userId")

        created = self.answerSvc.add_answer(Answer(questionId, answer, note, timestamp, user_id))

        return jsonify({"data": created, "status": "ok", "action": "created"}), 201

    def get_answers_by_user_id(self, user_id):
        data = self.answerSvc.get_answers_by_user_id(user_id)

        return jsonify({"data": data, "status": "ok"}), 200
