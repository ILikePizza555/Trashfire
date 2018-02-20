from heaps import BinaryHeap
import unittest

class BinaryHeapTest(unittest.TestCase):
    def test_insert(self):
        a = BinaryHeap()

        a.insert(1, "b")
        self.assertEqual(a.max, (1, "b"))

        a.insert(7, "c")
        self.assertEqual(a.max, (7, "c"))

        a.insert(29, "d")
        self.assertEqual(a.max, (29, "d"))

        a.insert(10, "e")
        self.assertEqual(a.max, (29, "d"))

        a.insert(4, "f")
        self.assertEqual(a.max, (29, "d"))

        a.insert(89, "g")
        self.assertEqual(a.max, (89, "g"))

    def test_pop_max(self):
        a = BinaryHeap()
        a.insert(1, "b")
        a.insert(7, "c")
        a.insert(29, "d")
        a.insert(10, "e")
        a.insert(4, "f")
        a.insert(89, "g")

        for expected in [89, 29, 10, 7, 4, 1]:
            actual = a.pop_max()
            self.assertEquals(actual[0], expected)