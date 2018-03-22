"""
Module contains some classes for both weighted and unweighted graphs, which are essentially just a set of nodes that connect to each other.
"""
from collections import namedtuple
from typing import Dict, Set, Any, Generic, TypeVar

N = TypeVar("N")
class Graph(Generic[N]):
    """
    Represents a graph using an adjacency list
    """
    def __init__(self, adjlist: Dict[N, Set[N]] = {}):
        # Okay so I lied, we use a set and not a union
        # This is because our graphs have unique nodes
        self._adjlist: Dict[N, Set[N]] = adjlist

    def __repr__(self):
        return "Graph(" + repr(self._adjlist) +")"

    def get_neighbors(self, key: N) -> Set[N]:
        return self._adjlist[key].copy()
    
    def insert_edge(self, key: N, neighbors: Set[N]):
        """
        Inserts a new connection between two or more verticies. If the verticies do not exist, they will be created.
        """
        if key in self._adjlist:
            # If the key is in the adjacency list, take the union with the neighbor set
            self._adjlist[key] |= neighbors
        else:
            self._adjlist[key] = neighbors

        for v in neighbors:
            # Ensure that the neighbors exist too
            if v not in self._adjlist:
                self._adjlist[v] = {key}
            else:
                self._adjlist[v].add(key)

    def delete_edge(self, k1: N, k2: N):
        self._adjlist[k1].remove(k2)
        self._adjlist[k2].remove(k1)