from config.dbConfig import db

class Pictogram(db.Model):
    __tablename__ = 'pictogram'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    label = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    url = db.Column(db.String(int(2e3)), nullable=False)
    questionId = db.Column(db.Integer, nullable=True)

    def __init__(self, label, category, url, questionId=None, _id=None):
        if _id is not None:
            self.id = _id
        self.label = label
        self.category = category
        self.url = url
        self.questionId = questionId

    def to_json(self):
        return {
            "id": self.id,
            "label": self.label,
            "category": self.category,
            "url": self.url,
            "questionId": self.questionId,
        }

