""" tests """
import logging
from tinysearch import *

pages = [
    ("a.com", "oh romeo wherefore art thou?", ["b.com", "d.com", "e.com"]),
    ("b.com", "These Violent Delights Have Violent Ends", ["d.com", "c.com"]),
    (
        "c.com",
        "The fool doth think he is wise, but the wise man knows himself to be a fool.",
        ["d.com", "b.com"],
    ),
    ("d.com", "Love all, trust a few, do wrong to none.", ["a.com", "b.com"]),
    ("e.com", "Though this be madness, yet there is method in't.", ["c.com", "a.com"],),
    (
        "phil.com",
        f"""Philosophy (from Greek φιλοσοφία, philosophia, literally "love of wisdom")[1][2][3][4] 
                is the study of general and fundamental questions[5][6][7] about existence, 
                knowledge, values, reason, mind, and language.
                Such questions are often posed to be studied or resolved.
                The term was probably coined by Pythagoras (c. 570 – 495 BCE). 
                Philosophical methods include questioning, critical discussion, 
                rational argument, and systematic presentation.[8][9]
                Classic philosophical questions include:
                Is it possible to know anything and to prove it?[10][11][12] What is most real? 
                Philosophers also pose more practical and concrete questions such as: Is there a best way to live? Is 
it better to be just or unjust (if one can get away with it)?[13] Do humans have free will?[14]""",
        [],
    ),
    (
        "pols.com",
        """Politics is the set of activities that are associated with the governance of a country, state or area. 
        It involves making decisions that apply to groups of members[1] and achieving and exercising positions of 
        governance—organized control over a human community.[2] The academic study of politics is referred to as 
        political science.""",
        [],
    ),
    (
        "psy.com",
        """Psychology is the science of behavior and mind. Psychology includes the study of conscious and 
        unconscious phenomena, as well as feeling and thought. It is an academic discipline of immense scope. 
        Psychologists seek an understanding of the emergent properties of brains, and all the variety of 
        phenomena linked to those emergent properties, joining this way the broader neuroscientific group of 
        researchers. As a social science it aims to understand individuals and groups by establishing general 
        principles and researching specific cases.[1][2]""",
        [],
    ),
]


def check_search_engine(pages):
    stop_words = {"the", "a", "an", "is", "this", "to"}
    tokenizer = Tokenizer(stop_words)
    scorer = Scorer()
    indexer = Indexer(tokenizer, scorer)
    ranker = PageRank(scorer)
    engine = SearchEngine(indexer, ranker)
    engine.start(pages)
    logging.debug(f"page_rank {engine.page_rank}")
    logging.debug(engine.index)

    # TODO repl history
    while True:
        query = input("search > ")
        if query:
            results = engine.search(query)
            if results:
                print(results)
            else:
                print("no results")


if __name__ == "__main__":
    logging.getLogger().setLevel("DEBUG")
    check_search_engine(pages)
