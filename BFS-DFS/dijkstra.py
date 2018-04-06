"""
Implementation of dijkstra
"""
from graph import WeightedGraph
from queue import PriorityQueue

def dijkstra(g: WeightedGraph, s: list):
    dist = {}
    pred = {}
    Q = PriorityQueue()

    def relax(u, v):
        if dist[v] > dist[u] + g.get_weight(u, v):
            dist[v] = dist[u] + g.get_weight(u, v)
            pred[v] = u

    while not Q.empty():
        u = Q.get()
        s.append(u)
        for v in g.get_neighbors(u):
            relax(u, v)