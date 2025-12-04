from repositories import userRepository

class UserService:
    def __init__(self):
        self.userRepo = userRepository.UserRepository()

    def get_users(self):
        userJson = []

        for user in self.userRepo.get_users():
            userJson.append(user.to_json())

        return userJson

    def add_user(self, firstname, lastname, role):
        from entities.user import User
        user = User(firstname=firstname, lastname=lastname, role=role)
        return self.userRepo.add_user(user).to_json()

    def update_user(self, user_id, firstname, lastname, role):
        user = self.userRepo.get_user_by_id(user_id)
        if not user:
            return None
        return self.userRepo.update_user(user_id, firstname, lastname, role).to_json()

    def delete_user(self, user_id):
        return self.userRepo.delete_user(user_id)



