import re
import math
import operator
import logging
from collections import defaultdict, Counter
import numpy as np


class Tokenizer:
    def __init__(self, stop_words, ):
        self.stop_words = stop_words

    def token_generator(self, s):
        letters_and_digits_only = re.compile('[a-z0-9]+')
        for token in letters_and_digits_only.findall(s.lower()):
            if token not in self.stop_words:
                yield token


class Scorer:
    @staticmethod
    def get_tf_idf(tf, number_of_pages, df):
        weighted_tf = 1 + math.log10(tf)
        idf = math.log10(number_of_pages / df)
        return weighted_tf * idf


class Indexer:
    def __init__(self, tokenizer, scorer):
        self.tokenizer = tokenizer
        self.scorer = scorer

    def get_count_index(self, pages):
        # count terms
        count_index = defaultdict(list)
        for url, content, links in pages:
            counts = Counter(self.tokenizer.token_generator(content))
            for token, count in counts.items():
                count_index[token].append((url, count))
        return count_index

    def get_weighted_index(self, count_index, number_of_pages):
        # add tf-idf weights
        weighted_index = defaultdict(list)
        for token, docs in count_index.items():
            df = len(docs)
            for url, count in docs:
                weight = self.scorer.get_tf_idf(count, number_of_pages, df)
                weighted_index[token].append((url, weight))
        return weighted_index

    def get_normalized_index(self, weighted_index):
        # normalize tf-idf weights
        weights_by_url = defaultdict(list)
        for docs in weighted_index.values():
            for url, weight in docs:
                weights_by_url[url].append(weight)

        normalized_index = defaultdict(list)
        for term, docs in weighted_index.items():
            for url, weight in docs:
                doc_norm = np.linalg.norm(weights_by_url.get(url))
                if doc_norm == 0:
                    normalized_weight = weight
                else:
                    normalized_weight = round(weight / doc_norm, 3)
                normalized_index[term].append((url, normalized_weight))

        return normalized_index

    def get_index(self, pages):
        number_of_pages = len(pages)
        count_index = self.get_count_index(pages)
        weighted_index = self.get_weighted_index(count_index, number_of_pages)
        normalized_index = self.get_normalized_index(weighted_index)
        return normalized_index


class PageRank:
    def __init__(self, scorer):
        self.max_iterations = 10000
        self.teleport_rate = 0.1
        self.page_rank = None
        self.scorer = scorer

    def get_cosine_similarity_scores(self, index, number_of_pages, query):
        query_terms = set(query.split())
        related_terms = set(term for term in query_terms if term in index)

        query_tf_idfs = {term: self.scorer.get_tf_idf(1, number_of_pages, len(index[term])) for term in related_terms}
        query_vector_norm = np.linalg.norm(list(query_tf_idfs.values()))

        scores = defaultdict(int)
        for term in related_terms:
            query_term_weight = query_tf_idfs.get(term) / query_vector_norm
            for url, weight in index[term]:
                scores[url] += weight * query_term_weight

        return sorted(scores.items(), key=operator.itemgetter(1), reverse=True)

    @staticmethod
    def split_link_weight(number_of_pages, url, links):
        if not links:
            return 1 / number_of_pages
        if url in links:
            return 1 / len(links)
        else:
            return 0

    def create_transition_matrix(self, pages):
        urls = [url for url, content, links in pages]
        number_of_pages = len(pages)
        transition_probabilities = [
            [
                self.split_link_weight(number_of_pages, url, links) for url in urls
            ]
            for url, content, links in pages
        ]
        transition_matrix = np.matrix(transition_probabilities)
        markov_transition_matrix = self.teleport(number_of_pages, transition_matrix)
        return markov_transition_matrix

    def teleport(self, number_of_pages, transition_matrix):
        return transition_matrix * (1 - self.teleport_rate) + self.teleport_rate / number_of_pages

    def power_method(self, number_of_pages, transition_matrix):
        # initial ranking score is 1/N for every page
        ranks = [1 / number_of_pages] * number_of_pages
        for i in range(self.max_iterations):
            new_ranks = ranks * transition_matrix
            logging.debug(f"step {i} {new_ranks}")
            if np.allclose(ranks, new_ranks):
                break
            ranks = new_ranks

        return ranks.reshape(-1, ).tolist().pop()

    def create_page_rank(self, pages):
        transition_matrix = self.create_transition_matrix(pages)
        logging.debug(f"transition_matrix {transition_matrix}")
        ranks = self.power_method(len(pages), transition_matrix)
        urls = [page[0] for page in pages]
        page_rank = {
            url: round(rank, 3)
            for url, rank in zip(urls, ranks)
        }
        return page_rank


class SearchEngine():
    def __init__(self, indexer, ranker):
        self.indexer = indexer
        self.ranker = ranker
        self.index = self.page_rank = self.number_of_pages = None

    def start(self, pages):
        self.index = self.indexer.get_index(pages)
        self.page_rank = self.ranker.create_page_rank(pages)
        self.number_of_pages = len(pages)

    def search(self, query):
        cosine_similarity_scores = self.ranker.get_cosine_similarity_scores(self.index, self.number_of_pages, query)
        logging.debug(f"cosine_similarity_scores {cosine_similarity_scores}")
        final_scores = [(url, score * self.page_rank.get(url)) for url, score in cosine_similarity_scores]
        results = sorted(final_scores, key=operator.itemgetter(1), reverse=True)
        return results


def test_search_engine(pages):
    stop_words = {"the", "a", "an", "is", "this", "to"}
    tokenizer = Tokenizer(stop_words)
    scorer = Scorer()
    indexer = Indexer(tokenizer, scorer)
    ranker = PageRank(scorer)
    engine = SearchEngine(indexer, ranker)
    engine.start(pages)
    logging.debug(f"page_rank {engine.page_rank}")
    logging.debug(engine.index)

    while True:
        query = input("search > ")
        if query:
            results = engine.search(query)
            if results:
                print(results)
            else:
                print("no results")


if __name__ == "__main__":
    # TODO fuzzy search
    # TODO lexrank summarizer
    # TODO integrate with the async crawler
    pages = [
        ("a.com", "oh romeo wherefore art thou?", ["b.com", "d.com", "e.com"]),
        ("b.com", "These Violent Delights Have Violent Ends", ["d.com", "c.com"]),
        ("c.com", "The fool doth think he is wise, but the wise man knows himself to be a fool.", ["d.com", "b.com"]),
        ("d.com", "Love all, trust a few, do wrong to none.", ["a.com", "b.com"]),
        ("e.com", "Though this be madness, yet there is method in't.", ["c.com", "a.com"]),
    ]
    logging.getLogger().setLevel("DEBUG")
    test_search_engine(pages)