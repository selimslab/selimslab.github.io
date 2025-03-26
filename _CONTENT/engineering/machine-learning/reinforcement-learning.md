---
---

<p>
  When \(a \ne 0\), there are two solutions to \(ax^2 + bx + c = 0\) and they are
  \[x = {-b \pm \sqrt{b^2-4ac} \over 2a}.\]
</p>

## Core Concepts

- **Reinforcement Learning (RL)**: Agent learns strategy through environment interaction to maximize rewards
- **Agent/Environment Interaction**: Agent takes actions in states to receive rewards and transition to new states
- **Goal**: Learn optimal policy to maximize cumulative future rewards

## Key Components

- **States** (\(s \in \mathcal{S}\)): Situations agent can be in
- **Actions** (\(a \in \mathcal{A}\)): Choices agent can make
- **Transitions** (\(P\)): How states change with actions
- **Rewards** (\(r \in \mathcal{R}\)): Feedback from environment
- **Policy** (\(\pi\)): Strategy mapping states to actions
- **Value Functions**: Quantify state/action goodness

## Fundamental Equations

- **State-Value Function**: \(V_\pi(s) = \mathbb{E}_\pi[G_t | S_t = s]\)
- **Action-Value Function**: \(Q_\pi(s,a) = \mathbb{E}_\pi[G_t | S_t = s, A_t = a]\)
- **Bellman Equations**: Recursive relationships between values of states

## Major Approaches

- **Dynamic Programming**: Solve known MDPs through iterative value computation
- **Monte Carlo Methods**: Learn from complete episodes without bootstrapping
- **Temporal Difference**: Learn from incomplete episodes with bootstrapping
- **Policy Gradient**: Directly optimize policy parameters using gradient ascent
- **Evolution Strategies**: Population-based optimization of policy parameters

## Important Algorithms

- **SARSA**: On-policy TD control
- **Q-Learning**: Off-policy TD control
- **DQN**: Deep Q-Network with experience replay
- **REINFORCE**: Policy gradient with Monte Carlo updates
- **Actor-Critic**: Combined value and policy learning
- **A3C**: Asynchronous Advantage Actor-Critic

## Known Challenges

- **Exploration-Exploitation Dilemma**: Balance between trying new actions and exploiting known rewards
- **Deadly Triad Issue**: Instability from combining off-policy learning, function approximation, and bootstrapping

## Case Study: AlphaGo Zero

- Deep CNN outputs policy and value estimates
- Monte Carlo Tree Search improves action selection
- Self-play without human knowledge beyond basic rules
- Outperformed previous versions requiring human expertise

[Source: Lilian Weng's "A (Long) Peek into Reinforcement Learning"](https://lilianweng.github.io/posts/2018-02-19-rl-overview/)
