FROM python:3.13

WORKDIR .

RUN pip3 install flask pymysql flask_cors

COPY . .

ENV FLASK_APP=backend/main.py

CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]
