""" 
Machine Learning model to predict the genres of a movie from its summary 
"""

from flask import Flask, request

from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer

from sklearn.linear_model import LogisticRegression
from sklearn.multiclass import OneVsRestClassifier
from sklearn.pipeline import Pipeline

import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

from joblib import dump, load
import pickle

from io import StringIO

import numpy as np
import pandas as pd
import os

from sklearn.ensemble import RandomForestClassifier


app = Flask(__name__)

clf_path = "clf.joblib"
binarizer_path = "binary_classes.pickle"


def clean(X):
    nltk.download("stopwords")
    stop_words = stopwords.words("english")
    ps = PorterStemmer()

    def stem_sentence(sentence):
        return " ".join(
            [ps.stem(word) for word in sentence.split() if word not in stop_words]
        )

    X = [stem_sentence(sentence) for sentence in X]

    return X


@app.route("/genres/train", methods=["POST"])
def train():
    """
    Post a CSV with header movie_id,synopsis,genres.

    where genres is a space-separated list of movie genres.
    :return:
    Get the training result

    """
    bytes_data = request.data
    s = str(bytes_data, "utf-8")
    string_data = StringIO(s)
    df = pd.read_csv(string_data)

    genres = df.genres.values
    genre_lists = [line.split() for line in genres]

    X_train = df.synopsis.values

    multilabel_binarizer = MultiLabelBinarizer().fit(genre_lists)
    binary_classes = multilabel_binarizer.classes_
    with open(binarizer_path, "wb") as handle:
        pickle.dump(binary_classes, handle, protocol=pickle.HIGHEST_PROTOCOL)

    y_train = multilabel_binarizer.transform(genre_lists)

    rf = RandomForestClassifier()
    lr = LogisticRegression()
    multi_label_clf = Pipeline(
        [
            ("vect", CountVectorizer()),
            ("tfidf", TfidfTransformer()),
            ("clf", OneVsRestClassifier(rf)),
        ]
    )

    multi_label_clf.fit(X_train, y_train)
    dump(multi_label_clf, clf_path)

    return "training successful!"


@app.route("/genres/predict", methods=["POST"])
def predict():
    """
    Post a CSV with header movie_id,synopsis.

    :return:
    Get a CSV with header movie_id,predicted_genres,

    where predicted_genres is a space-separated list of the top 5 movie genres.
    """

    bytes_data = request.data
    s = str(bytes_data, "utf-8")
    string_data = StringIO(s)

    df = pd.read_csv(string_data)

    X_test = df.synopsis.values

    multi_label_clf = load(clf_path)
    y_pred_prob = multi_label_clf.predict_proba(X_test)
    n = 5
    top_n_indexes = np.argsort(y_pred_prob, axis=1)[:, -n:]

    with open(binarizer_path, "rb") as handle:
        binary_classes = pickle.load(handle)

    top_n_classes = binary_classes[top_n_indexes]
    predicted_genres = [" ".join(reversed(row)) for row in top_n_classes]
    df["predicted_genres"] = predicted_genres
    df = df.drop(["synopsis"], axis=1)

    return df.to_csv(index=False)