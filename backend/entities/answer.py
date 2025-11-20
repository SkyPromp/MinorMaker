from config.dbConfig import db

class Answer(db.Model):
    __tablename__ = 'answer'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    questionId = db.Column(db.Integer, nullable=False)
    answer = db.Column(db.Integer, nullable=False)
    note = db.Column(db.String(int(1e4)), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=True)


    def __init__(self, questionId, answer, note, timestamp, _id=None):
        if _id is not None:
            self.id = _id

        self.questionId = questionId;
        self.answer = answer;
        self.note = note;
        self.timestamp = timestamp;

    def to_json(self):
        """Convert Answer object to dictionary for JSON serialization"""
        return {
            "id": self.id,
            "question-id": self.questionId,
            "answer": self.answer,
            "note": self.note,
            "timestamp": self.timestamp
        }


