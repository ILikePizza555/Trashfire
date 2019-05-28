def minimumAbsoluteDifference(arr):
    # Another way to define this problem is "find the pair of numbers with the smallest distance from each other".
    # Easiest to begin approaching this problem is to sort the data set.
    sorted_arr = list(sorted(arr))
    
    # The dataset now has the property arr[i] < arr[j] for all i < j. Thus the pair of numbers with the smallest distance have to next to each other. If there existed a element arr[a] where a != i + 1 which did have a smaller distance to arr[i] than arr[i + 1], then this would break the sorted propety.

    minimum_distance = None
    for i in range(0, len(arr) - 1):
        distance = abs(sorted_arr[i] - sorted_arr[i + 1])
        if not minimum_distance or distance < minimum_distance:
            minimum_distance = distance
    
    return minimum_distance

if __name__ == "__main__":
    with open("test_case.txt") as f:
        n = f.readline()
        arr = list(map(int, f.readline().rstrip().split))

    result = minimumAbsoluteDifference(arr)
    print("RESULT: ", result, "EXPECTED: 0")