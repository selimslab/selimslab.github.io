def retry(attempts):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    print(f"Error: {e}")
                    continue
            # If all attempts fail, re-raise the last exception
            raise e
        return wrapper
    return decorator
