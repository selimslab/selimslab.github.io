---
title: MF Copilot
---

## example flow 

The user asks a question

Classify the intent and select a template 

Extract named entities 

Select a set of skills, like querying kusto, or sql 

eg. get attributes for the assets, shifts, people, schedule etc. from MKG and use them to fill the query

RAI checks/localization/summary etc 

## OpenAI Plugin 

skill for **user intent detection**

skill for **Named Entity Recognition** 

skill for Manufacturing **terminology translation**

**data grounding** with **vector embeddings** and **graph triplets**


## How do we customize for MF?

prompt templates for specific mf workflows 

data grounding 

extensibility via skills and plugins 

## Initiatives 

## Templates and prompt workflows 

1. data lookup/retrieval assistant 
2. compute assistant, like transforms, aggregates, KPIs
3. workflows like predictive maintenance
4. reasoning, deconstruct, suggest 

### prompt repo with templates
1. detect intent
2. chain of thought 
3. RAG
4. summarize
5. RAI
6. Localize
7. explainability 
8. memory, short-term, long-term
9. personalization


## Data grounding on MKG

### Skills

NL2DSL




## model params 

- **Temperature**: Controls randomness. Lowering the temperature means that the model produces more repetitive and deterministic responses. Increasing the temperature results in more unexpected or creative responses. Try adjusting temperature or Top P but not both.
- **Max length (tokens)**: Set a limit on the number of tokens per model response. The API supports a maximum of 4000 tokens shared between the prompt (including system message, examples, message history, and user query) and the model's response. One token is roughly four characters for typical English text.
- **Stop sequences**: Make responses stop at a desired point, such as the end of a sentence or list. Specify up to four sequences where the model will stop generating further tokens in a response. The returned text won't contain the stop sequence.
- **Top probabilities (Top P)**: Similar to temperature, this controls randomness but uses a different method. Lowering Top P narrows the model’s token selection to likelier tokens. Increasing Top P lets the model choose from tokens with both high and low likelihood. Try adjusting temperature or Top P but not both.
- **Frequency penalty**: Reduce the chance of repeating a token proportionally based on how often it has appeared in the text so far. This decreases the likelihood of repeating the exact same text in a response.
- **Presence penalty**: Reduce the chance of repeating any token that has appeared in the text at all so far. This increases the likelihood of introducing new topics in a response.
- **Pre-response text**: Insert text after the user’s input and before the model’s response. This can help prepare the model for a response.
- **Post-response text**: Insert text after the model’s generated response to encourage further user input, as when modeling a conversation.