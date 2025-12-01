from config.dbConfig import db
from entities.user import User


class UserRepository:
    def get_users(self):
        return db.session.query(User).all()

    def add_user(self, user):
        db.session.add(user)
        db.session.commit()

        return user

    def get_users_by_role(self, role):
        return db.session.query(User).filter_by(role=role).filter(User.is_deleted.is_(False)).all()
