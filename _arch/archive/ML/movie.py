""" 
Machine Learning model to predict the genres of a movie from its summary 
"""
import os
import pickle
from io import StringIO

from flask import Flask, request

from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer

from sklearn.ensemble import RandomForestClassifier

from sklearn.linear_model import LogisticRegression
from sklearn.multiclass import OneVsRestClassifier
from sklearn.pipeline import Pipeline

import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

from joblib import dump, load

import numpy as np
import pandas as pd


app = Flask(__name__)

CLASSIFIER_PATH = "clf.joblib"
BINARIZER_PATH = "binary_classes.pickle"


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


def bytes_to_df(bytes:bytes):
    string_data = StringIO(str(bytes, "utf-8"))
    df = pd.read_csv(string_data)
    return df 

def get_binarized_labels(df):
    genres = df.genres.values
    
    genre_lists = [line.split() for line in genres]
    
    multilabel_binarizer = MultiLabelBinarizer().fit(genre_lists)
    
    binary_classes = multilabel_binarizer.classes_

    with open(BINARIZER_PATH, "wb") as handle:
        pickle.dump(binary_classes, handle, protocol=pickle.HIGHEST_PROTOCOL)

    y_train = multilabel_binarizer.transform(genre_lists)

    return y_train

def get_multi_label_clf():
    rf = RandomForestClassifier()
    multi_label_clf = Pipeline(
        [
            ("vect", CountVectorizer()),
            ("tfidf", TfidfTransformer()),
            ("clf", OneVsRestClassifier(rf)),
        ]
    )
    return multi_label_clf


@app.route("/genres/train", methods=["POST"])
def train():
    """
    Post a CSV with header movie_id,synopsis,genres.

    where genres is a space-separated list of movie genres.
    :return:
    Get the training result

    """
    _train(request.data)

def _train(csv_bytes):
    df = bytes_to_df(csv_bytes)

    X_train = df.synopsis.values
    y_train = get_binarized_labels(df)

    multi_label_clf = get_multi_label_clf()
    multi_label_clf.fit(X_train, y_train)
    dump(multi_label_clf, CLASSIFIER_PATH)

    return "training successful!"



@app.route("/genres/predict", methods=["POST"])
def predict():
    """
    Post a CSV with header movie_id,synopsis.

    :return:
    Get a CSV with header movie_id,predicted_genres,

    where predicted_genres is a space-separated list of the top 5 movie genres.
    """
    _predict(request.data)
    return 200


def _predict(csv_bytes):
    df = bytes_to_df(csv_bytes)

    top_n_indexes = get_top_n_indexes(df, 5)

    df["predicted_genres"] = get_predicted_genres(top_n_indexes)

    df = df.drop(["synopsis"], axis=1)

    return df.to_csv(index=False)


def get_top_n_indexes(df, n):
    X_test = df.synopsis.values

    multi_label_clf = load(CLASSIFIER_PATH)
    y_pred_prob = multi_label_clf.predict_proba(X_test)
    top_n_indexes = np.argsort(y_pred_prob, axis=1)[:, -n:]

    return top_n_indexes

def get_predicted_genres(top_n_indexes):
    with open(BINARIZER_PATH, "rb") as handle:
        binary_classes = pickle.load(handle)

    top_n_classes = binary_classes[top_n_indexes]

    predicted_genres = [" ".join(reversed(row)) for row in top_n_classes]

    return predicted_genres