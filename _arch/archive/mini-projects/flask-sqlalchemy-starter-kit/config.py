import os
from flask.json import JSONEncoder
import datetime


class CustomJSONEncoder(JSONEncoder):
    "Add support for serializing time"

    def default(self, o):

        if type(o) == datetime.datetime:
            return o.strftime("%Y-%m-%d %H:%M:%S.%f")
        else:
            return super().default(o)


basedir = os.path.abspath(os.path.dirname(__file__))
DB_PATH = os.path.join(basedir, "tasks.sqlite")
SQLALCHEMY_DATABASE_URI = "sqlite:///" + DB_PATH
SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, "db_repository")