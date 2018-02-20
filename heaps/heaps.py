from collections import namedtuple
from math import floor
from typing import Tuple, Optional, Any

def swap(l: list, a: int, b: int):
    t = l[a]
    l[a] = l[b]
    l[b] = t
    return l

class BinaryHeap():
    Node = namedtuple("node", ["key", "value"])

    def __init__(self):
        self.data = []

    def __repr__(self):
        return f"BinaryHeap size {len(self.data)} max: {self.max[0]} - {self.data}"
    
    def _get_parent_index(self, index: int) -> int:
        return int(floor(index / 2))

    def _get_parent(self, index: int) -> "BinaryHeap.Node":
        return self.data[self._get_parent_index(index)]

    def _get_children_index(self, index: int) -> Tuple[Optional[int], Optional[int]]:
        a = index * 2 + 1 if (index * 2 + 1) < len(self.data) else None
        b = index * 2 + 2 if (index * 2 + 2) < len(self.data) else None
        return a, b

    def get_children(self, index: int) -> Tuple[Optional["BinaryHeap.Node"], Optional["BinaryHeap.Node"]]:
        a, b = self._get_children_index(index)
        return self.data[a] if a is not None else None, self.data[b] if b is not None else None

    def _is_leaf(self, index: int) -> bool:
        return 2 * index + 1 >= len(self.data)

    def _heapify(self, index: int):
        # If the current node is a leaf, we are done
        if self._is_leaf(index):
            return
        
        # Pull data
        n = self.data[index]                            # n is the current node at index
        c1, c2 = self.get_children(index)               # c1 and c2 are the children of n
        c1_i, c2_i = self._get_children_index(index)    # c1_i and c2_i are the indexes of c1 and c2

        # Find the max of the children
        # If one of the children doesn't exist, then because this node isn't a leaf, the other child is the max
        if c1 is None:
            swap(self.data, c2_i, index)
            self._heapify(c2_i)
            return
        
        if c2 is None:
            swap(self.data, c1_i, index)
            self._heapify(c1_i)
            return

        if c1.key > c2.key and n.key < c1.key:
            swap(self.data, c1_i, index)
            self._heapify(c1_i)
        elif c2.key >= c1.key and n.key < c2.key:
            swap(self.data, c2_i, index)
            self._heapify(c2_i)

    @property
    def max(self) -> Tuple[int, Any]:
        if not self.data:
            return None, None
        return self.data[0].key, self.data[0].value

    def insert(self, key: int, item: Any):
        #Insert at the end of the heap
        n = BinaryHeap.Node(key, item)
        self.data.append(n)

        # Fix the heap
        index = len(self.data) - 1
        parent_index = self._get_parent_index(index)

        while self.data[parent_index].key < n.key:
            swap(self.data, index, parent_index)

            # Recalculate indexes
            index = parent_index
            parent_index = self._get_parent_index(index)

    def pop_max(self) -> Tuple[int, Any]:
        rv = self.max
        swap(self.data, 0, -1)
        del self.data[-1]
        self._heapify(0)
        return rv