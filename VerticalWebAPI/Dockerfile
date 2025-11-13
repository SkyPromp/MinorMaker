FROM python:3.12

WORKDIR .

RUN pip3 install flask flask_sqlalchemy pymysql flask_cors

COPY . .

ENV FLASK_APP=VerticalWebAPI/main.py

CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]
