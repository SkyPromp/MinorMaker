from config.dbConfig import db

class Question(db.Model):
    __tablename__ = 'question'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    is_deleted = db.Column(db.Boolean(), nullable=False)

    def __init__(self, question, category, id=None):
        if id is not None:
            self.id = id

        self.is_deleted = False
        self.question = question
        self.category = category

    def to_json(self):
        if self.is_deleted:
            return None

        return {
            "id": self.id,
            "question": self.question,
            "category": self.category
        }

