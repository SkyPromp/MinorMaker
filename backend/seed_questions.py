from config.dbConfig import db
from entities.question import Question
from entities.pictogram import Pictogram
from pathlib import Path
import re

def seed_questions():
    items = {
        "zelfbepaling": [
            "Waarover kan je in het dagcentrum zelf keuzes maken? (werk, vrije tijd, eten, ...)",
            "Kan je in het dagcentrum zelf keuzes maken over werk?",
            "Kan je in het dagcentrum zelf keuzes maken over vrije tijd?",
            "Kan je in het dagcentrum zelf keuzes maken over eten?",
            "Kan je in het dagcentrum zelf keuzes maken over …?",
            "Krijg je voldoende hulp bij het maken van keuzes?",
            "Zijn er dingen die de begeleiding voor je regelt maar die je zelf zou kunnen?",
        ],
        "lichamelijk welbevinden": [
            "Kan je voldoende bewegen/sporten in het dagcentrum?",
            "Heb je voldoende tijd om te rusten?",
            "Heb je buiten wat er nodig is voor jou?",
            "Wat vind je van de temperatuur in de ruimtes?",
            "Is de temperatuur in de ruimtes goed voor je?",
        ],
        "rechten": [
            "Kan je altijd mee beslissen over de dingen die over jou gaan? (afspraken, keuzes, CE)",
            "Ben je tevreden over je begeleiders/persoonlijke begeleider?",
            "Helpen je begeleiders je genoeg?",
            "Krijg je genoeg uitleg?",
        ],
        "emotioneel welbevinden": [
            "Voel je je vaak boos/gelukkig/eenzaam/ blij/verdrietig/onzeker?",
            "Vind je dat de begeleiders je begrijpen?",
        ],
        "persoonlijke ontwikkeling": [
            "Leer je wel eens nieuwe dingen? Op je werk? In je vrije tijd?",
            "Vind je dat je meer kunt dan vroeger?",
            "Heb je hobby’s?",
            "Zijn er mensen die je helpen bij je hobby’s?",
        ],
        "activiteiten": [
            "Wat vind je van deze activiteit?",
            "Vind je deze activiteit leuk?",
            "Welke activiteit zou je ook graag meer doen in je vast programma?",
            "Zou je deze activiteit graag meer doen in je vast programma?",
            "Welke uitstap vind je leuk/niet leuk buitenshuis?",
            "Vind je deze uitstap leuk?",
            "Welke speciale activiteit/evenement in huis vind je leuk/niet leuk?",
            "Kan je voldoende activiteiten doen buiten het dagcentrum?",
        ],
        "daginvulling": [
            "Wat vind je van de pauzemomenten?",
            "Vind je de pauzemomenten goed?",
            "Welke taakjes doe jij graag/niet graag?",
            "Doe je dit taakje graag?",
            "Met wie doe jij graag taakjes?",
            "Doe je dit taakje graag met…",
        ],
        "logistiek": [
            "Wat vind je van je vervoer?",
            "Vind je het vervoer goed?",
            "Wat vind je van de indeling van de verschillende groepen?",
            "Vind je de indeling van de verschillende groepen oké?",
            "Wat vind je van onze tuin?",
            "Hou je van onze tuin?",
            "Kan jij hier genoeg buiten zitten/zijn?",
            "Wat vinden jullie van het eten hier?",
            "Is het eten hier lekker?",
            "Wat zouden jullie ook eens graag eten?",
        ],
        "sociale relaties": [
            "Welke cliënten vind jij leuk?",
            "Vind je deze cliënt leuk?",
            "Welke begeleiding vind jij leuk?",
            "Vind je deze begeleider leuk?",
            "Welke vrijwilligers vind jij leuk?",
            "Vind je deze vrijwilliger leuk?",
            "Vind je het fijn dat we soms samenwerken met andere mensen? Bv. Gaan helpen in een school, snoepzakjes inpakken voor verenigingen, ...",
            "Help je graag andere cliënten?",
        ],
    }

    for category, questions in items.items():
        for text in questions:
            existing = db.session.query(Question).filter(Question.question == text).filter(Question.is_deleted.is_(False)).first()
            if existing is None:
                db.session.add(Question(question=text, category=category))
    db.session.commit()

    pictogram_path = Path(__file__).parent / "vragenPictogram"
    if pictogram_path.exists():
        content = pictogram_path.read_text(encoding="utf-8", errors="ignore")
        pattern = re.compile(r"-\s*([^()]+?)\s*\(([^)]*)\)")
        pairs = []
        for line in content.splitlines():
            m = pattern.search(line)
            if m:
                label = m.group(1).strip()
                url = m.group(2).strip()
                if not url:
                    continue
                if not url.startswith("http"):
                    if "sclera.be" in url:
                        url = "https://" + url.lstrip("(")
                    else:
                        continue
                pairs.append((label, url))

        for label, url in pairs:
            q = db.session.query(Question).filter(Question.question == label).filter(Question.category == "activiteiten").filter(Question.is_deleted.is_(False)).first()
            if q is None:
                q = Question(question=label, category="activiteiten")
                db.session.add(q)
                db.session.flush()

            existing_pic = db.session.query(Pictogram).filter(Pictogram.questionId == q.id).first()
            if existing_pic is None:
                db.session.add(Pictogram(label=label, category="activiteiten", url=url, questionId=q.id))
            else:
                existing_pic.url = url
        db.session.commit()
