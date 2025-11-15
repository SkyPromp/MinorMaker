from config.dbConfig import db

class Plant(db.Model):
    __tablename__ = 'plants'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    moisture = db.Column(db.Float)
    digital = db.Column(db.Float)

    def __init__(self,moisture, digital, _id=None):
        if _id is not None:
            self.id = _id
        self.moisture = moisture
        self.digital = digital

    def to_json(self):
        """Convert Plant object to dictionary for JSON serialization"""
        return {
            "id": self.id,
            "moisture": self.moisture,
            "digital": self.digital
        }