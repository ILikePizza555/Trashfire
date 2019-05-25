namespace DataStructures {
    class BSTNode<T> {
        private _tag = "BSTNode";
        private _value: T;
        private _children: [BSTNode<T> | null, BSTNode<T> | null];
        private _comparator: (a: T, b: T) => boolean;

        constructor(value: T, comparator = (a: any, b: any) => a < b) {
            this._value = value;
            this._comparator = comparator;
            this._children = [null, null];
        }

        get value(): T {
            return this._value;
        }

        get left(): BSTNode<T> {
            return this._children[0];
        }

        get right(): BSTNode<T> {
            return this._children[1];
        }

        insert(value: T) {
            const cmp = this._comparator(value, this._value);

            if(cmp && !this.left) {
                this._children[0] = new BSTNode(value, this._comparator);
            } else if (cmp && this.left) {
                this.left.insert(value);
            } else if (!cmp && !this.right) {
                this._children[1] = new BSTNode(value, this._comparator);
            } else if (!cmp && this.right) {
                this.right.insert(value);
            }
        }

        remove(child: 0 | 1) {
            this._children[child] = this._children[child]._children[child];
        }
    }
}