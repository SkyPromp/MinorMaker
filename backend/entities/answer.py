from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime
from config.dbConfig import db

class Answer(db.Model):
    __tablename__ = 'answer'

    id: Mapped[int] = mapped_column(db.Integer, primary_key=True, autoincrement=True)
    questionId: Mapped[int] = mapped_column(db.Integer, nullable=False)
    answer: Mapped[int] = mapped_column(db.Integer, nullable=False)
    note: Mapped[str] = mapped_column(db.String(int(1e4)), nullable=False)
    timestamp: Mapped[datetime | None] = mapped_column(db.DateTime, nullable=True)
    userId: Mapped[int] = mapped_column(db.Integer, nullable=False)

    def __init__(self, questionId, answer, note, timestamp, userId, _id=None):
        if _id is not None:
            self.id = _id

        self.questionId = questionId;
        self.answer = answer;
        self.note = note;
        self.timestamp = timestamp;
        self.userId = userId;

    def to_json(self):
        """Convert Answer object to dictionary for JSON serialization"""
        return {
            "id": self.id,
            "question-id": self.questionId,
            "answer": self.answer,
            "note": self.note,
            "timestamp": self.timestamp,
            "userId": self.userId
        }


