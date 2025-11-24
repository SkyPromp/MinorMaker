from repositories import answerRepository

class AnswerService:
    def __init__(self):
        self.answerRepo = answerRepository.AnswerRepository()

    def get_answers(self):
        answerJson = []

        for answer in self.answerRepo.get_answers():
            answerJson.append(answer.to_json())

        return answerJson

    def add_answer(self, answer):
        return self.answerRepo.add_answer(answer).to_json()


