import datetime
import os
from dataclasses import dataclass

from flask import Flask, request, jsonify, render_template, make_response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, Float, DateTime, String
from flask_restful import Api, Resource

from config import DB_PATH, CustomJSONEncoder


app = Flask(__name__)
app.config.from_pyfile("config.py")
app.json_encoder = CustomJSONEncoder

db = SQLAlchemy(app)
api = Api(app)


# Dataclasses used for simpler serialization
@dataclass
class Log(db.Model):
    id: int
    timestamp: datetime.datetime
    type: str
    description: str

    id = Column(Integer, primary_key=True, autoincrement=True)
    timestamp = Column(DateTime)
    type = Column(String)
    description = Column(String)


@dataclass
class Task(db.Model):
    id: int
    timestamp: datetime.datetime
    temperature: float
    duration: str

    id = Column(Integer, primary_key=True)
    timestamp = Column(DateTime)
    temperature = Column(Float)
    duration = Column(String)


class LogListView(Resource):
    def get(self):
        headers = {"Content-Type": "text/html"}
        logs = Log.query.all()
        return make_response(render_template("logs.html", logs=logs), 200, headers)


# shows a list of all todos, and lets you POST to add new tasks
class TaskListView(Resource):
    def get(self):
        headers = {"Content-Type": "text/html"}
        tasks = Task.query.all()
        log = Log(timestamp=datetime.datetime.now(), type="get", description="all")
        db.session.add(log)
        db.session.commit()
        return make_response(render_template("index.html", tasks=tasks), 200, headers)

    def post(self):
        id = request.json.get("id")
        timestamp = request.json.get("timestamp")
        timestamp = datetime.datetime.strptime(timestamp, "%Y-%m-%d %H:%M:%S.%f")
        task = Task(
            id=id,
            timestamp=timestamp,
            temperature=request.json.get("temperature"),
            duration=request.json.get("duration"),
        )

        db.session.add(task)
        db.session.commit()
        return jsonify({"id": id, "status": "201 created"})


class TaskDetailView(Resource):
    def get(self, task_id):
        log = Log(
            timestamp=datetime.datetime.now(), type="get", description=str(task_id)
        )
        db.session.add(log)
        db.session.commit()
        return jsonify(Task.query.get(task_id))

    def put(self):
        pass

    def delete(self):
        pass


api.add_resource(TaskDetailView, "/tasks/<task_id>")
api.add_resource(TaskListView, "/tasks/")
api.add_resource(LogListView, "/logs/")

if __name__ == "__main__":
    if not os.path.exists(DB_PATH):
        db.create_all()
    app.run(debug=True)