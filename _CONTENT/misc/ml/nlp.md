---
---
⏺ Key Practical Ideas from Summarization Chapter:

• Start with baselines - Simple 3-sentence extraction often performs surprisingly well compared to complex
models

• Use domain-specific fine-tuning - Models trained on CNN/DailyMail perform poorly on dialogue data;
fine-tune for your specific domain

• Leverage evaluation metrics early - Set up ROUGE evaluation before training to measure progress and catch
issues

• Handle length constraints - Most transformers limited to ~1000 tokens; truncate inputs as needed for now

• Choose right model architecture - Use encoder-decoder models (T5, BART, PEGASUS) for abstractive
summarization vs. GPT-2's extractive approach

• Optimize generation parameters - Use beam search with length penalty (0.8) and 8 beams for better quality
summaries

• Use gradient accumulation - For large models, accumulate gradients across multiple small batches to
simulate larger batch sizes

• Apply teacher forcing - In seq2seq training, decoder receives ground truth labels shifted by one position

• Focus on ROUGE over loss - ROUGE correlates better with human judgment than training loss for text
generation tasks
