from entities.question import Question
from flask import request, jsonify, Blueprint
from services.questionService import QuestionService

class QuestionController:
    def __init__(self, app):
        self.questionSvc = QuestionService()
        self.blueprint = Blueprint("questionController", __name__)

        ## register routes  ##
        self.blueprint.add_url_rule('/api/questions', 'get_questions', self.get_questions, methods=['GET'])
        self.blueprint.add_url_rule('/api/categories', 'get_categories', self.get_categories, methods=['GET'])
        self.blueprint.add_url_rule('/api/questions/<int:id>', 'get_question_by_id', self.get_question_by_id, methods=['GET'])
        self.blueprint.add_url_rule('/api/questions', 'add_question', self.add_question, methods=['POST'])
        self.blueprint.add_url_rule('/api/questions/<int:id>', 'update_question', self.update_question, methods=['PUT'])
        self.blueprint.add_url_rule('/api/questions/<int:id>', 'delete_question', self.delete_question, methods=['DELETE'])

        
        self.register(app)

    def register(self, app):
        app.register_blueprint(self.blueprint)

    ##  endpoints  ##

    def get_questions(self):
        data = self.questionSvc.get_questions()

        category = request.args.get("category")

        if category is not None:
            data = self.questionSvc.get_questions_by_category(category)
        else:
            data = self.questionSvc.get_questions()

        return jsonify({"data": data, "status": "ok"}), 200

    def add_question(self):
        data = request.get_json()

        if not data:
            return jsonify({"error": "No JSON data"}), 400

        question = data.get("question")
        category = data.get("category")
        image = data.get("image")

        created = self.questionSvc.add_question(Question(question, category, image=image))

        return jsonify({"data": created, "status": "ok", "action": "Created"}), 201

    def update_question(self, id):
        data = request.get_json()

        if not data:
            return jsonify({"error": "No JSON data"}), 400

        question = data.get("question")
        category = data.get("category")
        image = data.get("image")

        updated = self.questionSvc.update_question(Question(question=question, category=category, image=image, id=id))

        return jsonify({"data": updated, "status": "ok", "action": "Update"}), 200

    def delete_question(self, id):
        self.questionSvc.delete_question(id)

        return jsonify({"status": "No content", "action": "Delete"}), 204

    def get_question_by_id(self, id):
        data = self.questionSvc.get_question_by_id(id)

        return jsonify({"data": data, "status": "ok"}), 200

    def get_categories(self):
        data = self.questionSvc.get_all_categories()

        return jsonify({"data": data, "status": "ok"}), 200

