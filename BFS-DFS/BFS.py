"""
Breadth-First Search implementation
"""
from enum import auto, Enum
from graph import Graph
from queue import Queue

class BFSColors(Enum):
    WHITE = auto()  # Unvisited
    GREY = auto()   # Enqueued
    BLACK = auto()  # Dequeued

def BFS(g: Graph, v):
    queue = Queue()
    parent = {v: None}
    dist = {v: 0}
    visted = dict()

    queue.put(v)
    visted[v] = BFSColors.GREY

    while not queue.empty():
        u = queue.get()
        visted[u] = BFSColors.BLACK

        for n in g.get_neighbors(u):
            if n not in visted or visted[n] == BFSColors.WHITE:
                visted[n] = BFSColors.GREY
                queue.put(n)

                parent[n] = u
                dist[n] = dist[u] + 1
    
    # BFS Theorem: dist[x] is the shortest path from v to x
    # And, x, parent[x], parent[parent[x]], ..., v is the shortest path from x to v

    return dist, parent

def path_exists(parent, x):
    if x == None:
        return True
    
    try:
        return path_exists(parent, parent[x])
    except KeyError:
        return False

def find_cycle_with_edge(g: Graph, e: tuple):
    e1, e2 = e

