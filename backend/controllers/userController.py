from entities.user import User
from flask import request, jsonify, Blueprint
from services.userService import UserService

class UserController:
    def __init__(self, app):
        self.userSvc = UserService()
        self.blueprint = Blueprint("userController", __name__)

        ## register routes  ##
        self.blueprint.add_url_rule('/api/users', 'get_users', self.get_users, methods=['GET'])
        self.blueprint.add_url_rule('/api/users/roles/<int:role>', 'get_users_by_role', self.get_users_by_role, methods=['GET'])

        self.blueprint.add_url_rule('/api/users', 'add_user', self.add_user, methods=['POST'])

        self.register(app)

    def register(self, app):
        app.register_blueprint(self.blueprint)

    ##  endpoints  ##

    def get_users(self):
        data = self.userSvc.get_users()

        return jsonify({"data": data, "status": "ok"}), 200

    def add_user(self):
        data = request.get_json()

        if not data:
            return jsonify({"error": "No JSON data"}), 400

        id = data.get("id")
        role = data.get("role")
        firstName = data.get("firstName")
        lastName = data.get("lastName")

        created = self.userSvc.add_user(User(role=role, firstName=firstName, lastName=lastName))

        return jsonify({"data": created, "status": "ok", "action": "created"}), 201

    def get_users_by_role(self, role):
        data = self.userSvc.get_users_by_role(role)

        return jsonify({"data": data, "status": "ok"}), 200
