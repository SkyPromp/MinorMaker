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
            user.firstName = firstname
            user.lastName = lastname
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

    def get_users_by_role(self, role):
        return db.session.query(User).filter_by(role=role).filter(User.is_deleted.is_(False)).all()
