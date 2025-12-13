from repositories import userRepository

class UserService:
    def __init__(self):
        self.userRepo = userRepository.UserRepository()

    def get_users(self):
        userJson = []

        for user in self.userRepo.get_users():
            userJson.append(user.to_json())

        return userJson

    def add_user(self, firstname, lastname, role, imageUrl=None):
        from entities.user import User
        user = User(firstName=firstname, lastName=lastname, role=role, imageUrl=imageUrl)
        return self.userRepo.add_user(user).to_json()

    def update_user(self, user_id, firstname, lastname, role, imageUrl=None):
        user = self.userRepo.get_user_by_id(user_id)

        if not user:
            return None

        user = self.userRepo.update_user(user_id, firstname, lastname, role, imageUrl)

        if not user:
            return None

        return user.to_json()

    def delete_user(self, user_id):
        return self.userRepo.delete_user(user_id)

    def get_users_by_role(self, role):
        userJson = []

        for user in self.userRepo.get_users_by_role(role):
            userJson.append(user.to_json())

        return userJson