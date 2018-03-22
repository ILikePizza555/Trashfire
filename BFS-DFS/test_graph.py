from graph import Graph

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