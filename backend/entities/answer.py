from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime
from config.dbConfig import db

class Answer(db.Model):
    __tablename__ = 'answer'

    id: Mapped[int] = mapped_column(db.Integer, primary_key=True, autoincrement=True)
    question_id: Mapped[int] = mapped_column(db.Integer, nullable=False)
    answer: Mapped[int | None] = mapped_column(db.Integer, nullable=None)
    note: Mapped[str | None] = mapped_column(db.String(int(1e4)), nullable=True)
    timestamp: Mapped[datetime | None] = mapped_column(db.DateTime, nullable=True)
    question_moment: Mapped[int | None] = mapped_column(db.Integer, nullable=True)
    userId: Mapped[int] = mapped_column(db.Integer, nullable=False)
    is_deleted: Mapped[bool] = mapped_column(db.Boolean, nullable=False, default=False)

    def __init__(self, questionId, answer, note, timestamp, userId, question_moment=None, id=None):
        if id is not None:
            self.id = id

        self.is_deleted = False
        self.question_id = questionId;
        self.answer = answer;
        self.note = note;
        self.timestamp = timestamp;
        self.question_moment = question_moment;
        self.userId = userId;

    def to_json(self):
        """Convert Answer object to dictionary for JSON serialization"""
        return {
            "id": self.id,
            "questionId": self.questionId,
            "answer": self.answer,
            "note": self.note,
            "timestamp": self.timestamp,
            "questionMoment": self.question_moment,
            "userId": self.userId
        }


