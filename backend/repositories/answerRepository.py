from config.dbConfig import db
from entities.answer import Answer


class AnswerRepository:
    def get_answers(self):
        return db.session.query(Answer).all()

    def add_answer(self, answer):
        db.session.add(answer)
        db.session.commit()

        return answer

