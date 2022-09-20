"""
this server recognize a person in photos after just seeing a single photo of the person  
"""
import face_recognition
import os
import pickle

from flask import Flask, jsonify, request
from requests.exceptions import RequestException, Timeout, ConnectionError
from io import BytesIO


model_path = "known_faces"


def get_known_faces():
    known_faces = dict()

    if os.path.exists(model_path):
        try:
            with open(model_path, "rb") as f:
                known_faces = pickle.load(f)
        except IOError as e:
            print(e)

    return known_faces


def save_dict(updated_known_faces):
    try:
        with open(model_path, "wb") as f:
            pickle.dump(updated_known_faces, f, protocol=pickle.HIGHEST_PROTOCOL)
    except IOError as e:
        print(e)


app = Flask(__name__)
known_faces = get_known_faces()
last_seen_person = {"encoding": None, "name": None}


@app.route("/")
def hello():
    response = {"status": "UP"}
    return jsonify(response)


@app.route("/meet", methods=["GET", "POST"])
def meet():
    photo, name = get_photo_and_name(get_name=True)

    if photo is not None and name is not None:
        new_face_encoding = get_face_encoding(photo)
        if new_face_encoding is not None:
            known_faces[name] = new_face_encoding
            save_dict(known_faces)
            status = "I just met you and this is crazy"
        else:
            status = "could not detect a face, please send another pic"
    else:
        status = "could not read the photo and name, please check the image file"

    response = {"status": status, "hello": name}
    return jsonify(response)


@app.route("/predict", methods=["GET", "POST"])
def predict():
    status = "could not recognize"
    guess = "anyone"
    global last_seen_person
    photo, name = get_photo_and_name()

    if photo is None:
        status = "could not read the photo, please check the image file"
        response = {"guess": guess, "status": status}
        return jsonify(response)

    unknown_face_encoding = get_face_encoding(photo)
    if unknown_face_encoding is None:
        status = "could not detect a face, please send another pic"
        response = {"guess": guess, "status": status}
        return jsonify(response)

    # check last seen
    last_seen_face_encoding = last_seen_person["encoding"]
    if last_seen_face_encoding is not None:
        is_last_seen = face_recognition.compare_faces(
            [last_seen_face_encoding], unknown_face_encoding, tolerance=0.6
        )[0]
        if is_last_seen:
            guess = last_seen_person["name"]
            status = "found"
            response = {"guess": guess, "status": status}
            return jsonify(response)

    # check all faces
    for name, face_encoding in known_faces.items():
        try:
            is_found = face_recognition.compare_faces(
                [face_encoding], unknown_face_encoding, tolerance=0.6
            )[0]
            if is_found:
                guess = name
                status = "found"
                last_seen_person["encoding"] = face_encoding
                last_seen_person["name"] = name
                break
        except IndexError as e:
            print(e)

    response = {"guess": guess, "status": status}
    return jsonify(response)


def get_photo_and_name(get_name=False):
    try:
        if get_name:
            name = request.form.get("name")
        photo = request.files.get("photo")
    except (ConnectionError,Timeout,RequestException)  as err:
        return err 

    return photo, name


def get_face_encoding(photo):
    face_encoding = None
    try:
        image_bytes = photo.read()
        stream = BytesIO(image_bytes)
        photo_array = face_recognition.load_image_file(stream)  # mode='L' for grayscale
        face_encoding = face_recognition.face_encodings(photo_array)[0]
    except IndexError as e:  # couldn't locate a face
        print(e)
    return face_encoding


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)