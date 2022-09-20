def get_dict_key_with_the_min_value(d: dict):
    # get dict key with the min value
    return min(d, key=d.get)


def get_dict_key_with_the_max_value(d: dict):
    # get dict key with the max value
    return max(d, key=d.get)


def get_min_dict_value(d: dict):
    return min(d.values())


def get_max_dict_value(d: dict):
    return max(d.values())
