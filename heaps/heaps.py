from collections import namedtuple
from math import floor
from typing import Tuple

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
        return f"BinaryHeap size {len(self.data)} max: {self.get_max()[0]} - {self.data}"
    
    def _get_parent_index(self, index: int) -> int:
        return int(floor(index / 2))

    def _get_parent(self, index: int) -> "BinaryHeap.Node":
        return self.data[self._get_parent_index(index)]

    def _get_children_index(self, index: int) -> Tuple[int, int]:
        a = index * 2 + 1 if (index * 2 + 1) < len(self.data) else None
        b = index * 2 + 2 if (index * 2 + 2) < len(self.data) else None
        return a, b

    def get_children(self, index: int) -> Tuple["BinaryHeap.Node", "BinaryHeap.Node"]:
        a, b = self._get_children_index(index)
        return self.data[a] if a is not None else None, self.data[b] if b is not None else None

    def _is_leaf(self, index: int):
        return 2 * index > len(self.data)

    def _heapify(self, index: int):
        if self._is_leaf(index):
            return
        
        n = self.data[index]
        c1, c2 = self.get_children(index)
        if c1.key < n.key and c2.key < n.key:
            return
        
        # Get children indexes
        c1_i, c2_i = self._get_children_index(index)
        if c1.key > n.key:
            swap(self.data, c1_i, index)
            self._heapify(c1_i)

        if c2.key > n.key:
            swap(self.data, c2_i, index)
            self._heapify(c2_i)

    def get_max(self):
        if not self.data:
            return None, None
        return self.data[0].key, self.data[0].value

    def insert(self, key, item):
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