import pickle


def save_object(name, object):
    try:
        print("saving the data structure.. ")
        with open("obj/" + name + ".pkl", "wb") as f:
            pickle.dump(object, f, pickle.HIGHEST_PROTOCOL)
    except IOError as e:
        print(e)


def load_object(name):
    content = None
    try:
        print("reading the data structure.. ")
        with open("obj/" + name + ".pkl", "rb") as f:
            content = pickle.load(f)
    except FileNotFoundError as e:
        print(e)

    return content
