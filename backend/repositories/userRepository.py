from config.dbConfig import db
from entities.user import User


class UserRepository:
    def get_users(self):
        return db.session.query(User).all()

    def add_user(self, user):
        db.session.add(user)
        db.session.commit()

        return user


