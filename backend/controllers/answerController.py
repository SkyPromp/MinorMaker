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

        self.blueprint.add_url_rule('/api/answers/<int:id>', 'get_answer_by_id', self.get_answer_by_id, methods=['GET'])

        self.blueprint.add_url_rule('/api/answers', 'update_answer', self.update_answer, methods=['PUT'])

        self.blueprint.add_url_rule('/api/answers/<int:id>', 'delete_answer', self.delete_answer, methods=['DELETE'])

        self.blueprint.add_url_rule('/api/users/<int:user_id>/answers', 'get_answers_by_user_id', self.get_answers_by_user_id, methods=['GET'])
        
        self.register(app)

    def register(self, app):
        app.register_blueprint(self.blueprint)

    ##  endpoints  ##

    def get_answer_by_id(self, id):
        data = self.answerSvc.get_answer_by_id(id)

        return jsonify({"data": data, "status": "ok"}), 200

    def delete_answer(self, id):
        self.answerSvc.delete_answer(id)

        return jsonify({"status": "No content", "action": "Delete"}), 204

    def update_answer(self):
        data = request.get_json()

        if not data:
            return jsonify({"error": "No JSON data"}), 400
        
        id = data.get("id", None)

        if id is None:
            return jsonify({"error": "No answer id found"}), 400

        answer = data.get("answer")
        note = data.get("note")
        timestamp = data.get("timestamp")
        question_id = data.get("questionId")
        question_moment = data.get("questionMoment")
        userId = data.get("userId")

        updated = self.answerSvc.update_answer(Answer(questionId=question_id, answer=answer, note=note, timestamp=timestamp, userId=userId, question_moment=question_moment, id=id))

        return jsonify({"data": updated, "status": "ok", "action": "Update"}), 200

    def get_answers(self):
        data = self.answerSvc.get_answers()

        return jsonify({"data": data, "status": "ok"}), 200

    def add_answer(self):
        data = request.get_json()

        if not data:
            return jsonify({"error": "No JSON data"}), 400

        id = data.get("id", None)
        question_id = data.get("questionId")
        answer = data.get("answer")
        note = data.get("note")
        timestamp = data.get("timestamp")
        question_moment = data.get("questionMoment")
        user_id = data.get("userId")

        created = self.answerSvc.add_answer(Answer(question_id, answer, note, timestamp, question_moment, user_id))

        return jsonify({"data": created, "status": "ok", "action": "created"}), 201

    def get_answers_by_user_id(self, user_id):
        data = self.answerSvc.get_answers_by_user_id(user_id)

        return jsonify({"data": data, "status": "ok"}), 200
