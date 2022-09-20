from datetime import datetime, timedelta

TODAY = datetime.now().date().isoformat()


def get_date_of_x_days_ago(x: int):
    return (datetime.now().date() - timedelta(days=x)).isoformat()


def str_to_date(s: str):
    return datetime.strptime(s, "%Y-%m-%d").date()
