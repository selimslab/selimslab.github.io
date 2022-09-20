import logging
import os
import sys
from logging.handlers import TimedRotatingFileHandler


def get_plain_text_formatter() -> logging.Formatter:
    return logging.Formatter("""%(levelname)s: %(asctime)s: %(message)s """)


def create_console_handler(level: int) -> logging.StreamHandler:
    ch = logging.StreamHandler(stream=sys.stdout)

    formatter = get_plain_text_formatter()
    ch.setFormatter(formatter)
    ch.setLevel(level)

    return ch


def create_rotating_handler(level: int, filename: str) -> TimedRotatingFileHandler:

    # interval is 1 day, create a new file everyday, and keep the old in logs/
    fh = TimedRotatingFileHandler(
        filename=filename, interval=1, when="D", backupCount=30, encoding="utf-8"
    )

    formatter = get_plain_text_formatter()
    fh.setFormatter(formatter)
    fh.setLevel(level)

    return fh


def create_logger(name: str) -> logging.Logger:
    logger = logging.getLogger(name)

    logger.setLevel(logging.DEBUG)

    logs_dir = "logs"
    os.makedirs(logs_dir, exist_ok=True)

    # trace is the most inclusive level
    trace_path = os.path.join(logs_dir, "debug.log")
    trace_handler = create_rotating_handler(logging.INFO, trace_path)
    logger.addHandler(trace_handler)

    console_handler = create_console_handler(logging.INFO)
    logger.addHandler(console_handler)

    return logger


logger = create_logger("root")
