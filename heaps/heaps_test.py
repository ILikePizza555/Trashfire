from heaps import BinaryHeap
import unittest

class BinaryHeapTest(unittest.TestCase):
    def test_insert(self):
        a = BinaryHeap()

        a.insert(1, "b")
        self.assertEqual(a.get_max(), (1, "b"))

        a.insert(7, "c")
        self.assertEqual(a.get_max(), (7, "c"))

        a.insert(29, "d")
        self.assertEqual(a.get_max(), (29, "d"))

        a.insert(10, "e")
        self.assertEqual(a.get_max(), (29, "d"))

        a.insert(4, "f")
        self.assertEqual(a.get_max(), (29, "d"))

        a.insert(89, "g")
        self.assertEqual(a.get_max(), (89, "g"))