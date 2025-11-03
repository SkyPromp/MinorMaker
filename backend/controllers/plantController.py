from flask import request, jsonify, Blueprint
from entities.plant import Plant
from services.plantService import PlantService

class PlantController:
    def __init__(self, app):
        self.plantSvc = PlantService()
        self.blueprint = Blueprint("plantController", __name__)

        ## register routes  ##
        self.blueprint.add_url_rule('/api/moisture', 'get_moisture', self.get_moisture, methods=['GET'])
        self.blueprint.add_url_rule('/api/moisture', 'add_plant', self.add_plant, methods=['POST'])
        self.blueprint.add_url_rule('/api/moisture/<plant_id>/needs_water', 'needs_water', self.needs_water, methods=['GET'])

        self.register(app)

    def register(self, app):
        app.register_blueprint(self.blueprint)

    ##  endpoints  ##

    def get_moisture(self):
        plants = self.plantSvc.get_plants()
        return jsonify({"data": plants, "status": "ok"}), 200

    def add_plant(self):
        data = request.get_json()

        if not data:
            return jsonify({"error": "No JSON data"}), 400

        plant_id = data.get("plant_id", None)
        moisture = data.get("moisture")
        digital = data.get("digital")

        if plant_id is not None:
            # check if that plant exists
            existing = self.plantSvc.get_plant_by_id(plant_id)
            if existing:
                # ✅ update existing plant
                _plant = Plant(moisture, digital, plant_id)
                updated = self.plantSvc.update_plant(_plant)
                return jsonify({"data": updated, "status": "ok", "action": "updated"}), 200
            else:
                # ✅ plant id given but not found → create new one
                _plant = Plant(moisture, digital)
                created = self.plantSvc.add_plant(_plant)
                return jsonify({"data": created, "status": "ok", "action": "created"}), 201
        else:
            # ✅ no plant id → always create new one
            _plant = Plant(moisture, digital)
            created = self.plantSvc.add_plant(_plant)
            return jsonify({"data": created, "status": "ok", "action": "created"}), 201

    def needs_water(self, plant_id):
        try:
            plant_id = int(plant_id)
        except ValueError:
            return jsonify({"error": f"Invalid plant ID: {plant_id}"}), 400

        plant = self.plantSvc.get_plant_by_id(plant_id)
        if not plant:
            return jsonify({"error": f"Plant with id {plant_id} not found"}), 404

        needs = plant["moisture"] < 50
        return jsonify({"plant_id": plant_id, "needs_water": needs}), 200