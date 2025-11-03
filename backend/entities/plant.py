class Plant:

    def __init__(self,moisture, digital, _id=None):
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