distill @https://ml-site.cdn-apple.com/papers/the-illusion-of-thinking.pdf 

Despite sophisticated self-reflection mechanisms, current LRMs have fundamental limitations in reasoning capabilities and face complete accuracy collapse beyond certain complexity thresholds.

Key Findings:

1. Performance Regimes
- Low complexity: Standard LLMs outperform LRMs
- Medium complexity: LRMs show advantages
- High complexity: Both models completely fail

2. Scaling Limitations
- LRMs reduce reasoning effort as problems get more complex
- Performance collapses beyond certain complexity thresholds
- Models fail even with adequate token budget
- Counterintuitive decline in thinking tokens after complexity threshold

3. Reasoning Patterns
- Simple problems: Find correct solutions early but waste time exploring wrong paths
- Moderate complexity: Need extensive exploration to find solutions
- High complexity: Complete failure to find solutions
- Models show inefficient self-correction capabilities

4. Experimental Setup
- Used controllable puzzle environments
- Allowed systematic complexity variation
- Enabled verification of both final answers and reasoning traces
- Avoided data contamination issues
- Used simulator-based evaluation

5. Technical Limitations
- Fail to use explicit algorithms effectively
- Reason inconsistently across puzzle types
- Limited exact computation abilities
- Performance varies unpredictably with problem scale
- Higher variance in failure patterns for thinking models

6. Models Tested
- OpenAI's o1/o3
- DeepSeek-R1
- Claude 3.7 Sonnet Thinking
- Gemini Thinking

Practical Implications:
- Current LRMs are not truly reasoning but using sophisticated pattern matching
- Performance benefits of LRMs are limited to medium-complexity problems
- Need fundamental improvements for robust reasoning capabilities
- Models' self-reflection mechanisms have clear scaling limitations

The paper demonstrates that while LRMs show promise for certain complexity ranges, they face fundamental limitations in developing generalizable problem-solving capabilities.
