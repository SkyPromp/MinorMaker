from repositories import answerRepository
from entities.answer import Answer

class AnswerService:
    def __init__(self):
        self.answerRepo = answerRepository.AnswerRepository()

    def get_answers(self):
        answerJson = []

        for answer in self.answerRepo.get_answers():
            answerJson.append(answer.to_json())

        return answerJson

    def get_answer_by_id(self, id):
        answer = self.answerRepo.get_answer_by_id(id)

        if answer is not None:
            return answer.to_json()
        
        return None

    def add_answer(self, answer):
        return self.answerRepo.add_answer(answer).to_json()
    
    def get_answers_by_user_id(self, user_id):
        answerJson = []

        for answer in self.answerRepo.get_answers_by_user_id(user_id):
            answerJson.append(answer.to_json())

        return answerJson

    def update_answer(self, answer: Answer):
        result = self.answerRepo.update_answer(answer)

        if result:
            return result.to_json()
        else:
            return None
        
    def delete_answer(self, answer_id):
        answer = self.answerRepo.get_answer_by_id(answer_id)

        if not answer:
            return {"error": f"Answer {answer_id} not found"}, 404

        self.answerRepo.delete_answer(answer)

    def get_answers_by_question_moment(self, question_moment):
        answerJson = []

        for answer in self.answerRepo.get_answers_by_question_moment(question_moment):
            answerJson.append(answer.to_json())

        return answerJson

    def get_all_question_moments(self):
        return self.answerRepo.get_all_question_moments()

    def get_current_question_moment_by_user(self, user_id):
        return self.answerRepo.get_current_question_moment_by_user_id(user_id)

    def get_question_moment_stats(self, question_moment):
        return self.answerRepo.get_question_moment_stats(question_moment)
