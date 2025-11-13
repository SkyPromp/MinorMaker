FROM python:3.12

# Set working directory inside the container
WORKDIR /app

# Copy your backend code into the container
COPY . .

# Install dependencies
RUN pip3 install --no-cache-dir flask flask_sqlalchemy pymysql flask_cors python-dotenv

# Set Flask environment variable
ENV FLASK_APP=backend/main.py

# Expose port 5000 (optional, helpful for clarity)
EXPOSE 5000

# Run the Flask app
CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]

