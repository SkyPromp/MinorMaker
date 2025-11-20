from config.dbConfig import db
from entities.question import Question


class QuestionRepository:
    def get_questions(self):
        return db.session.query(Question).all()

    def add_question(self, question):
        db.session.add(question)
        db.session.commit()

        return question
