from config.dbConfig import db

class Question(db.Model):
    __tablename__ = 'question'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(50), nullable=False)

    def __init__(self, question, category, id=None):
        if id is not None:
            self.id = id

        self.question = question
        self.category = category

    def to_json(self):
        """Convert Question object to dictionary for JSON serialization"""
        return {
            "id": self.id,
            "question": self.question,
            "category": self.category
        }

