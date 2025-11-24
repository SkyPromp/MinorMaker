from config.dbConfig import db
from entities.question import Question


class QuestionRepository:
    def get_questions(self):
        return db.session.query(Question).all()

    def add_question(self, question):
        db.session.add(question)
        db.session.commit()

        return question

    def get_question_by_id(self, id):
        return db.session.query(Question).filter_by(id=id).first()

    def update_question(self, question: Question):
        existing_question = self.get_question_by_id(question.id)

        if existing_question:
            existing_question.question = question.question
            existing_question.category = question.category
            db.session.commit()

            return existing_question
        else:
            return None

    def delete_question(self, question: Question):
        existing_question = self.get_question_by_id(question.id)

        if existing_question:
            #existing_question.is_deleted = True
            db.session.commit()

    def hard_delete_question(self, question: Question):
        db.session.delete(question)
        db.session.commit()
