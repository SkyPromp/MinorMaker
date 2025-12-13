from config.dbConfig import db
from sqlalchemy.orm import Mapped, mapped_column

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    firstName: Mapped[str] = mapped_column(db.String(255), nullable=False)
    lastName: Mapped[str] = mapped_column(db.String(255), nullable=False)
    role: Mapped[int] = mapped_column(db.Integer, nullable=False)
    imageUrl: Mapped[str] = mapped_column(db.String(500), nullable=True)
    is_deleted: Mapped[bool] = mapped_column(db.Boolean, nullable=False, default=False)

    def __init__(self, firstName: str, lastName: str, role: int, imageUrl: str = None, id=None):
        if id is not None:
            self.id = id

        self.is_deleted = False
        self.role = role
        self.firstName = firstName
        self.lastName = lastName
        self.imageUrl = imageUrl

    def to_json(self):
        """Convert User object to dictionary for JSON serialization"""
        return {
            "id": self.id,
            "role": self.role,
            "firstName": self.firstName,
            "lastName": self.lastName,
            "imageUrl": self.imageUrl,
        }