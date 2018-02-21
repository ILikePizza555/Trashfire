class BSTNode():
    def __init__(self, key: int):
        self.key = key

        self.left = None
        self.left_size = 0

        self.right = None
        self.right_size = 0

    def __repr__(self):
        l = "\n".join(map(lambda s: "\t" + s, repr(self.left).split("\n")))
        r = "\n".join(map(lambda s: "\t" + s, repr(self.right).split("\n")))

        return f"BSTNode key: {self.key}\nleft (size: {self.left_size})\n {l}\nright (size: {self.right_size})\n {r}\n"

    def is_leaf(self) -> bool:
        return self.left is None and self.right is None

    def find_min(self):
        if self.left is None:
            return self.key
        
        return self.left.find_min()

def insert(x: int, t: BSTNode):
    if t == None:
        return BSTNode(x)
    
    if x < t.key:
        t.left = insert(x, t.left)
        t.left_size += 1
        return t
    
    if x > t.key:
        t.right = insert(x, t.right)
        t.right_size += 1
        return t

def delete(x: int, t: BSTNode):
    # Node doesn't exist
    if t is None:
        raise KeyError(f"Key {x} not found in tree")

    # Traverse phase
    if x < t.key:
        t.left = delete(x, t.left)
        t.left_size -= 1
        return t
    
    if x > t.key:
        t.right = delete(x, t.right)
        t.right_size -= 1
        return t

    # Deletion phase
    if t.is_leaf:
        return None
    
    # Single-child cases
    if t.left is not None and t.right is None:
        return t.left
    
    if t.right is not None and t.left is None:
        return t.right

    # Two-child case
    # In this case, we just replace the node the the smallest higher value
    t.key = t.right.find_min()
    # Then delete the value from the right tree
    t.right = delete(t.key, t.right)
    # Finally, return
    return t