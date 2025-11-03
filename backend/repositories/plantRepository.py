from entities.plant import Plant
import config.dbConfig as db

class PlantRepository:
    def add_plant(self, plant):
        _id = db.add_plant(plant.moisture, plant.digital)
        plant.id = _id
        return plant.to_json()

    def get_plants(self):
        rows = db.get_plants()
        return [Plant(row["moisture"], row["digital"], row["id"]).to_json() for row in rows]

    def get_plant_by_id(self, plant_id):
        row = db.get_plant_by_id(plant_id)

        return Plant(row["moisture"], row["digital"], row["id"]).to_json()

    def update_plant(self, plant):
        existing = self.get_plant_by_id(plant.id)
        if existing:
            success = db.update_plant(plant.id, plant.moisture, plant.digital)
            if success:
                return plant.to_json()  # return the updated plant
        return None  # plant doesn't exist