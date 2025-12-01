from repositories import userRepository

class UserService:
    def __init__(self):
        self.userRepo = userRepository.UserRepository()

    def get_users(self):
        userJson = []

        for user in self.userRepo.get_users():
            userJson.append(user.to_json())

        return userJson

    def add_user(self, user):
        return self.userRepo.add_user(user).to_json()

    def get_users_by_role(self, role):
        return self.userRepo.get_users_by_role(role).to_json()


