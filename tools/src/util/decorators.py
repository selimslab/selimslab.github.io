def retry(func, attempts):
    def wrapper(*args, **kwargs):
        for _ in range(attempts):
            try:
                return func(*args, **kwargs)
            except Exception as e:
                print(f"Error: {e}")
                continue

    return wrapper
