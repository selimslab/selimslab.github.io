#!/usr/bin/env python3
import argparse
import sys
import requests
from bs4 import BeautifulSoup
import spacy


def extract_text_from_url(url):
    """Extract text content from a URL."""
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")

        # Remove script and style elements
        for script in soup(["script", "style"]):
            script.extract()

        # Get text
        text = soup.get_text(separator=" ", strip=True)
        return text
    except Exception as e:
        print(f"Error fetching URL: {e}", file=sys.stderr)
        sys.exit(1)


def extract_entities(text, model="en_core_web_sm"):
    """
    Extract named entities from text using spaCy.
    Returns a dictionary of entity types and their counts.
    """
    try:
        nlp = spacy.load(model)
    except OSError:
        print(f"Model '{model}' not found. Downloading it now...", file=sys.stderr)
        spacy.cli.download(model)
        nlp = spacy.load(model)

    doc = nlp(text)

    # Group entities by type
    entity_dict = {}
    entity_texts = {}

    for ent in doc.ents:
        entity_type = ent.label_
        entity_text = ent.text.strip()

        if entity_type not in entity_texts:
            entity_texts[entity_type] = set()
            entity_dict[entity_type] = []

        if entity_text.lower() not in entity_texts[entity_type]:
            entity_texts[entity_type].add(entity_text.lower())
            entity_dict[entity_type].append((entity_text, 1))
        else:
            # Find the item and increment its count
            for i, (text, count) in enumerate(entity_dict[entity_type]):
                if text.lower() == entity_text.lower():
                    entity_dict[entity_type][i] = (text, count + 1)
                    break

    # Sort entities by frequency
    for entity_type in entity_dict:
        entity_dict[entity_type] = sorted(
            entity_dict[entity_type], key=lambda x: x[1], reverse=True
        )

    return entity_dict


def main():
    parser = argparse.ArgumentParser(
        description="Extract named entities from a URL using spaCy"
    )
    parser.add_argument(
        "--url", type=str, required=True, help="URL to extract text from"
    )
    parser.add_argument(
        "--model", type=str, default="en_core_web_sm", help="spaCy model to use"
    )
    parser.add_argument(
        "--min-count", type=int, default=1, help="Minimum occurrence count"
    )
    parser.add_argument(
        "--entity-types", type=str, help="Comma-separated list of entity types"
    )

    args = parser.parse_args()

    text = extract_text_from_url(args.url)
    entities = extract_entities(text, args.model)

    # Filter by entity types if specified
    if args.entity_types:
        entity_types = [t.strip() for t in args.entity_types.split(",")]
        entities = {k: v for k, v in entities.items() if k in entity_types}

    # Filter by minimum count
    for entity_type, entity_list in entities.items():
        entities[entity_type] = [
            (text, count) for text, count in entity_list if count >= args.min_count
        ]

    # Prepare output
    output_lines = []
    for entity_type, entity_list in sorted(entities.items()):
        if entity_list:  # Only include if there are entities of this type
            output_lines.append(f"\n{entity_type}:")
            for entity_text, count in entity_list:
                output_lines.append(f" {entity_text} ({count})")

    OUTPUT_FILE = "output.txt"
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(output_lines))


if __name__ == "__main__":
    main()
    # uv run tools/entityextractor.py --url "https://news.ycombinator.com/item?id=19087418" --entity-types=
