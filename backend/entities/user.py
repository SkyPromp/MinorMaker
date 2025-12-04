from config.dbConfig import db

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    firstname = db.Column(db.String(100))
    lastname = db.Column(db.String(100))
    role = db.Column(db.String(50))

    def __init__(self, firstname=None, lastname=None, role=None, _id=None):
        if _id is not None:
            self.id = _id
        self.firstname = firstname
        self.lastname = lastname
        self.role = role

    def to_json(self):
        """Convert User object to dictionary for JSON serialization"""
        return {
            "id": self.id,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "role": self.role,
        }


