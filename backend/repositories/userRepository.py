from config.dbConfig import db
from entities.user import User


class UserRepository:
    def get_users(self):
        return db.session.query(User).all()

    def add_user(self, user):
        db.session.add(user)
        db.session.commit()

        return user

    def get_user_by_id(self, user_id):
        return db.session.query(User).filter(User.id == user_id).first()

    def update_user(self, user_id, firstname, lastname, role):
        user = self.get_user_by_id(user_id)
        if user:
            user.firstname = firstname
            user.lastname = lastname
            user.role = role
            db.session.commit()
        return user

    def delete_user(self, user_id):
        user = self.get_user_by_id(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return True
        return False


