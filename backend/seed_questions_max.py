from config.dbConfig import db
from json import load
from entities.question import Question


def seedQuestions():
    with open("./questions.json") as f:
        for question in load(f):
            for q in question["questions"]:
                existing_question = db.session.query(Question).filter(Question.question == q["question"]).first()
                
                if existing_question is None:
                    db.session.add(Question(q["question"], question["category"], image=q["image"]))

        db.session.commit()

