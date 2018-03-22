"""
Depth-First Search implementation
"""
from BFS import BFSColors
from graph import Graph

def DFS(g: Graph, v):
    parent = {}
    colors = {}
    discover = {}
    finish = {}
    time = 0

    def visit(s):
        nonlocal time

        colors[s] = BFSColors.GREY
        discover[s] = time
        time += 1

        for n in g.get_neighbors(s):
            if n not in colors or colors[n] == BFSColors.WHITE:
                parent[n] = s
                visit(n)
        colors[s] = BFSColors.BLACK
        finish[s] = time
        time += 1
    
    for n in g.get_neighbors(v):
        if n not in colors or colors[n] == BFSColors.WHITE:
            visit(n)
    
    return parent, discover, finish
