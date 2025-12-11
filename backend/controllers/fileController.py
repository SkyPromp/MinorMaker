from flask import send_file, request, Blueprint
from io import BytesIO
import os

def generate_qr():
    try:
        # Path to your existing exe file
        file_path = '../files/app.exe'  # Change this to your actual file path

        # Check if file exists
        if not os.path.exists(file_path):
            return {"error": "File not found"}, 404

        # Send the file
        return send_file(
            file_path,
            mimetype="application/octet-stream",  # Correct mimetype for exe files
            as_attachment=True,
            download_name="app.exe"
        )
    except Exception as e:
        return {"error": str(e)}, 500


class FileController:
    def __init__(self, app):
        self.blueprint = Blueprint("qrCodeController", __name__)

        ## register routes  ##
        self.blueprint.add_url_rule('/api/button', 'get_qr_code', generate_qr, methods=['GET'])

        self.register(app)

    def register(self, app):
        app.register_blueprint(self.blueprint)