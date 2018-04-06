from graph import Graph, WeightedGraph

def test_simple_insert():
    g = Graph()

    g.insert_edge(1, {2, 3, 4, 5})

    assert g.get_neighbors(1) == {2, 3, 4, 5}
    assert g.get_neighbors(2) == {1}
    assert g.get_neighbors(3) == {1}
    assert g.get_neighbors(4) == {1}
    assert g.get_neighbors(5) == {1}

def test_complex_insert():
    g = Graph()

    g.insert_edge(1, {2, 3, 4, 5})
    g.insert_edge(3, {4, 5})

    assert g.get_neighbors(1) == {2, 3, 4, 5}
    assert g.get_neighbors(2) == {1}
    assert g.get_neighbors(3) == {1, 4, 5}
    assert g.get_neighbors(4) == {1, 3}
    assert g.get_neighbors(5) == {1, 3}

def test_weighted_graph():
    g = WeightedGraph()

    g.insert_edge("a", {(9, "b"), (6, "c"), (1, "d")})

    assert g.get_neighbors("a") == {(9, "b"), (6, "c"), (1, "d")}
    assert g.get_neighbors("b") == {(9, "a")}
    assert g.get_neighbors("c") == {(6, "a")}
    assert g.get_neighbors("d") == {(1, "a")}

    assert g.get_weight("a", "b") == 9
    assert g.get_weight("a", "c") == 6
    assert g.get_weight("a", "d") == 1