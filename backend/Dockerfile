FROM python:3.12

WORKDIR .

RUN pip3 install flask flask_sqlalchemy pymysql flask_cors cloudinary

COPY . .

ENV FLASK_APP=backend/main.py

# CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]
CMD ["python3", "-u", "-m", "flask", "run", "--host=0.0.0.0", "--no-reload"]
