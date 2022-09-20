""" Node is defined as
class node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None
"""


def checkBST(root, min=0, max=10000):
    if not root:
        return True
    if root.data >= max or root.data <= min:
        return False
    return checkBST(root.left, min, root.data) and checkBST(root.right, root.data, max)
