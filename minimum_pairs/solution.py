def minimumAbsoluteDifference(arr):
    # Another way to define this problem is "find the pair of numbers with the smallest distance from each other".
    # Easiest to begin approaching this problem is to sort the data set.
    sorted_arr = list(sorted(arr))
    pairs = zip(sorted_arr, sorted_arr[1:])
    
    # The dataset now has the property arr[i] < arr[j] for all i < j. Thus the pair of numbers with the smallest distance have to next to each other. If there existed a element arr[a] where a != i + 1 which did have a smaller distance to arr[i] than arr[i + 1], then this would break the sorted propety.

    smallest_pair = min(pairs, key=lambda pair: abs(pair[0] - pair[1]))
    return abs(smallest_pair[0] - smallest_pair[1])

if __name__ == "__main__":
    with open("test_case.txt") as f:
        n = int(f.readline().strip())
        arr = list(map(int, f.readline().rstrip().split()))

    assert len(arr) == n

    result = minimumAbsoluteDifference(arr)
    print("RESULT: ", result, "EXPECTED: 0")