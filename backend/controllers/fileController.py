from flask import send_file, request, Blueprint, jsonify
from io import BytesIO
import os
import cloudinary
import cloudinary.uploader


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

def upload_image():
    try:
        # Check if image file is in request
        if 'image' not in request.files:
            return jsonify({"error": "No image file provided"}), 400

        file = request.files['image']

        # Check if file is selected
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400

        # Optional: Get public_id from request or generate one
        public_id = request.form.get('public_id', None)

        # Upload to Cloudinary
        if public_id:
            upload_result = cloudinary.uploader.upload(file, public_id=public_id)
        else:
            upload_result = cloudinary.uploader.upload(file)

        # Return the secure URL
        return jsonify({
            "success": True,
            "url": upload_result["secure_url"],
            "public_id": upload_result["public_id"]
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


class FileController:
    def __init__(self, app):
        self.blueprint = Blueprint("qrCodeController", __name__)

        ## register routes  ##
        self.blueprint.add_url_rule('/api/button', 'get_qr_code', generate_qr, methods=['GET'])
        self.blueprint.add_url_rule('/api/upload-image', 'upload_image', upload_image, methods=['POST'])

        self.register(app)

    def register(self, app):
        app.register_blueprint(self.blueprint)