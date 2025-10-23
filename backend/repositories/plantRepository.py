from sqlalchemy.exc import NoResultFound

from config.dbConfig import db
from entities.plant import Plant


class PlantRepository:
    def add_plant(self, plant):
        db.session.add(plant)
        db.session.commit()
        return plant

    def get_plants(self):
        return db.session.query(Plant).all()

    def get_plant_by_id(self, plant_id):
        return db.session.query(Plant).filter_by(id=plant_id).first()

    def update_plant(self, plant):
        # First check if plant exists
        existing_plant = self.get_plant_by_id(plant.id)
        if existing_plant:
            # Update the existing plant
            existing_plant.moisture = int(plant.moisture)
            existing_plant.digital = int(plant.digital)
            db.session.commit()
            return existing_plant
        else:
            # Plant doesn't exist, so add it
            return None