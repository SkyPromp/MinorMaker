from entities.question import Question
from repositories import questionRepository

class QuestionService:
    def __init__(self):
        self.questionRepo = questionRepository.QuestionRepository()

    def get_questions(self):
        questionJson = []

        for question in self.questionRepo.get_questions():
            questionJson.append(question.to_json())

        return questionJson

    def add_question(self, question: Question):
        return self.questionRepo.add_question(question).to_json()

    def update_question(self, question: Question):
        result = self.questionRepo.update_question(question)

        if result:
            return result.to_json()
        else:
            return None
        
    def delete_question(self, question_id):
        question = self.questionRepo.get_question_by_id(question_id)

        if not question:
            return {"error": f"Question {question_id} not found"}, 404

        self.questionRepo.delete_question(question)

    def get_question_by_id(self, id):
        return self.questionRepo.get_question_by_id(id).to_json()

    def get_answers_by_question_moment(self, category):
        questionJson = []

        for question in self.questionRepo.get_questions_by_category(category):
            questionJson.append(question.to_json())

        return questionJson

    def get_all_categories(self):
        return self.questionRepo.get_all_categories()
