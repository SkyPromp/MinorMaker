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

        self.blueprint.add_url_rule('/api/users/<int:user_id>', 'update_user', self.update_user, methods=['PUT'])

        self.blueprint.add_url_rule('/api/users/<int:user_id>', 'delete_user', self.delete_user, methods=['DELETE'])

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

        firstname = data.get("firstname")
        lastname = data.get("lastname")
        role = data.get("role")

        if not firstname or not lastname or role is None:
            return jsonify({"error": "Missing required fields: firstname, lastname, role"}), 400

        created = self.userSvc.add_user(firstname=firstname, lastname=lastname, role=role)

        return jsonify({"data": created, "status": "ok", "action": "created"}), 201

    def update_user(self, user_id):
        data = request.get_json()

        if not data:
            return jsonify({"error": "No JSON data"}), 400

        firstname = data.get("firstname")
        lastname = data.get("lastname")
        role = data.get("role")

        if not firstname or not lastname or role is None:
            return jsonify({"error": "Missing required fields: firstname, lastname, role"}), 400

        updated = self.userSvc.update_user(user_id, firstname, lastname, role)

        if not updated:
            return jsonify({"error": "User not found"}), 404

        return jsonify({"data": updated, "status": "ok", "action": "updated"}), 200

    def delete_user(self, user_id):
        deleted = self.userSvc.delete_user(user_id)

        if not deleted:
            return jsonify({"error": "User not found"}), 404

        return jsonify({"status": "ok", "action": "deleted"}), 200

    def get_users_by_role(self, role):
        data = self.userSvc.get_users_by_role(role)

        return jsonify({"data": data, "status": "ok"}), 200
