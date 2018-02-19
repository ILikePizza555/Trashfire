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
        l = len(self.data)
        m = self.get_max()[0]
        return "BinaryHeap size {l} max: {m}"
    
    def _get_parent_index(self, index: int) -> int:
        return int(floor(index / 2))

    def _get_parent(self, index: int) -> "BinaryHeap.Node":
        return self.data[self._get_parent_index(index)]

    def _get_children_index(self, index: int) -> Tuple[int, int]:
        return index * 2, index * 2 + 1

    def _get_children(self, index: int) -> Tuple["BinaryHeap.Node", "BinaryHeap.Node"]:
        a, b = self._get_children_index(index)
        return self.data[a], self.data[b]

    def _is_leaf(self, index: int):
        return 2 * index > len(self.data)

    def _heapify(self, index: int):
        if self._is_leaf(index):
            return
        
        n = self.data[index]
        c1, c2 = self._get_children(index)
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
        return self.data[0].key, self.data[0].value

    def insert(self, key, item):
        #Insert at the end of the heap
        n = BinaryHeap.Node(key, item)
        self.data.append(n)

        # Fix the heap
        index = len(self.data) - 1
        parent_index = self._get_parent_index(index)
        while self.data[parent_index].key > n.key:
            swap(self.data, index, parent_index)

            # Recalculate indexes
            index = parent_index
            parent_index = self._get_parent_index(index)