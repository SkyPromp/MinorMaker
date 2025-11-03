from repositories import plantRepository

class PlantService:
    def __init__(self):
        self.plantRepo = plantRepository.PlantRepository()

    def get_plants(self):
        plantsJson = []
        for plant in self.plantRepo.get_plants():
            plantsJson.append(plant)

        return plantsJson

    def add_plant(self, plant):
        return self.plantRepo.add_plant(plant)

    def get_plant_by_id(self, plant_id):
        plant = self.plantRepo.get_plant_by_id(plant_id)
        if plant:
            return plant
        else:
            return None

    def update_plant(self, plant):
        result = self.plantRepo.update_plant(plant)
        if result:
            return result
        else:
            return None