import bs4
import requests


def get_soup(url):
    r = requests.get(url, verify=False)
    soup = bs4.BeautifulSoup(r.content, features="lxml")
    return soup
