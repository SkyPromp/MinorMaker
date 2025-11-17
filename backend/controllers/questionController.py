from flask import jsonify, Blueprint

class QuestionController:
    def __init__(self, app):
        self.blueprint = Blueprint("questionController", __name__)

        ## register routes  ##
        self.blueprint.add_url_rule('/api/questions', 'get_questions', self.get_questions, methods=['GET'])

        self.register(app)

    def register(self, app):
        app.register_blueprint(self.blueprint)

    ##  endpoints  ##

    def get_questions(self):
        data = [{"message": "hey lowie"}]

        return jsonify({"data": data, "status": "ok"}), 200

