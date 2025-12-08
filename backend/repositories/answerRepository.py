from config.dbConfig import db
from entities.answer import Answer


class AnswerRepository:
    def get_answers(self):
        return db.session.query(Answer).all()

    def add_answer(self, answer):
        db.session.add(answer)
        db.session.commit()

        return answer

    def get_answers_by_question_moment(self, question_moment):
        return db.session.query(Answer).filter(Answer.question_moment == question_moment).all()

    def get_all_question_moments(self):
       return list(set(map(lambda a: a.question_moment, db.session.query(Answer).all())))

    def get_answer_by_id(self, id) -> Answer | None:
        return db.session.query(Answer).filter_by(id=id).filter(Answer.is_deleted.is_(False)).first()

    def get_answers_by_user_id(self, user_id):
        return db.session.query(Answer).filter(Answer.user_id == user_id).all()

    def delete_answer(self, answer: Answer):
        existing_answer = self.get_answer_by_id(answer.id)

        if existing_answer:
            existing_answer.is_deleted = True
            db.session.commit()

    def hard_delete_answer(self, answer: Answer):
        db.session.delete(answer)
        db.session.commit()

    def update_answer(self, answer: Answer):
        existing_answer = self.get_answer_by_id(answer.id)

        if existing_answer:
            existing_answer.note = answer.note
            existing_answer.answer = answer.answer
            existing_answer.timestamp = answer.timestamp
            existing_answer.user_id = answer.user_id
            existing_answer.question_id = answer.question_id

            db.session.commit()

            return existing_answer
        else:
            return None

    def get_current_question_moment_by_user_id(self, user_id):
        answer = db.session.query(Answer).filter(
            Answer.user_id == user_id,
            Answer.answer.is_(None)
        ).first()

        return answer.question_moment if answer else None

    def get_question_moment_stats(self, question_moment):
        # Get all answers for the question moment
        answers = db.session.query(Answer).filter(
            Answer.question_moment == question_moment,
            Answer.is_deleted.is_(False)
        ).all()

        if not answers:
            return None

        # Calculate statistics
        total_answers = len(answers)
        answered_count = sum(1 for answer in answers if answer.answer is not None)

        return {
            "questionMoment": question_moment,
            "totalAnswers": total_answers,
            "answeredCount": answered_count,
            "unansweredCount": total_answers - answered_count,
            "answerRate": answered_count / total_answers if total_answers > 0 else 0
        }
