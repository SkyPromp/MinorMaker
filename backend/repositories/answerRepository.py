from config.dbConfig import db
from entities.answer import Answer


class AnswerRepository:
    def get_answers(self):
        return db.session.query(Answer).all()

    def add_answer(self, answer):
        db.session.add(answer)
        db.session.commit()

        return answer

    def get_answers_by_user_id(self, user_id):
        return db.session.query(Answer).filter(Answer.userId == user_id).all()

