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



