from config.dbConfig import db
from sqlalchemy.orm import Mapped, mapped_column

class Question(db.Model):
    __tablename__ = 'question'

    id: Mapped[int] = mapped_column(db.Integer, primary_key=True, autoincrement=True)
    question: Mapped[str] = mapped_column(db.String(255), nullable=False)
    category: Mapped[str] = mapped_column(db.String(50), nullable=False)
    image: Mapped[str | None] = mapped_column(db.String(255), nullable=True)
    is_deleted: Mapped[bool] = mapped_column(db.Boolean, nullable=False, default=False)

    def __init__(self, question, category, image=None, id=None):
        if id is not None:
            self.id = id

        if image is not None or image == "":
            self.image = image

        self.is_deleted = False
        self.question = question
        self.category = category

    def to_json(self):
        return {
            "id": self.id,
            "question": self.question,
            "category": self.category,
            "image": self.image
        }

