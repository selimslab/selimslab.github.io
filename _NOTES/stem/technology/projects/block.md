---
title: Tiny blockchain in 100 lines
tags: projects 
---

```python
import time
import hashlib
import uuid
import random 
from dataclasses import dataclass
from typing import List

@dataclass
class Node:
    uid: str


@dataclass
class Transaction:
    sender: Node
    recipient: Node
    amount: int


@dataclass
class Block:
    index: int
    timestamp: float
    transactions: List[Transaction]
    proof_of_work: int
    previous_hash: str


class Blockchain:
    def __init__(self):
        self.chain = []
        self.transactions = []
        self.nodes = set()
        # the genesis block
        self.create_new_block(previous_hash=1, proof_of_work=42)
        
    def create_new_block(self, previous_hash: str, proof_of_work: int):
        block = Block(
            index=len(self.chain) + 1,
            timestamp=time.time(),
            transactions=self.transactions,
            proof_of_work=proof_of_work,
            previous_hash=previous_hash or self.hash(self.last_block),
        )
        # Reset the current list of transactions
        self.transactions = []
        self.chain.append(block)
        return block

    @property
    def last_block(self):
        return self.chain[-1]

    def add_new_transaction(self, transaction):
        self.transactions.append(transaction)
        
    @staticmethod
    def hash(block):
        return hashlib.sha256(block.__str__()).hexdigest()

    @staticmethod
    def is_valid_proof(last_proof, proof):
        guess_hash = hashlib.sha256(f"{last_proof}{proof}").hexdigest()
        return guess_hash[:3] == "000"

    def generate_proof_of_work(self, last_proof):
        # Find a number p such that the hash of previous-proof and p contains 3 leading zeroes
        proof = 0
        while self.is_valid_proof(last_proof, proof) is False:
            # choose a random 64-bit signed integer 
            proof = random.randint(0,2**63-1) 
        return proof

    def add_node(self):
        new_node = Node(uid=str(uuid.uuid4()))
        self.nodes.add(new_node)
        return new_node

    def is_valid_chain(self, chain):
        # if hashes and proofs are valid for all blocks, the chain is valid
        for i in range(1, len(chain)):
            previous_block, current_block = chain[i - 1], chain[i]
            if current_block.previous_hash != self.hash(previous_block):
                return False
            if not self.is_valid_proof(
                previous_block.proof_of_work, current_block.proof_of_work
            ):
                return False
        return True

    def mine(self, miner_id):
        # the first miner with a correct proof of work gets the prize
        prize_transaction = Transaction(sender="genesis", recipient=miner_id, amount=1)
        self.add_new_transaction(prize_transaction)
        new_proof = self.generate_proof_of_work(self.last_block.proof_of_work)
        new_block = self.create_new_block(new_proof, self.last_block.previous_hash)
        return f"new block forged, {new_block}"
    
    def consensus(self):
        # The longest valid chain in the network is the true chain
        pass
```