from repositories import questionRepository

class QuestionService:
    def __init__(self):
        self.questionRepo = questionRepository.QuestionRepository()

    def get_questions(self):
        questionJson = []
        for question in self.questionRepo.get_questions():
            questionJson.append(question.to_json())

        return questionJson

