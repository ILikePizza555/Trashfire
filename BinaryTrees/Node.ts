export type Comparator<T> = (a: T, b: T) => -1 | 0 | 1;

export function defaultComparator(a: any, b: any): -1 | 0 | 1{
    if (a < b) {return -1;}
    else if (a === b) {return 0;}
    else return 1;
}

export namespace DataStructures {
    class BSTNode<T> {
        private _tag = "BSTNode";
        private _value: T;
        private _children: [BSTNode<T> | null, BSTNode<T> | null];
        private _comparator: Comparator<T>;

        constructor(value: T, comparator = defaultComparator) {
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

        set left(child: BSTNode<T>) {
            if(this._comparator(child._value, this._value) === 1) {
                throw new Error("Invalid left child.")
            }

            this._children[0] = child;
        }

        get right(): BSTNode<T> {
            return this._children[1];
        }

        set right(child: BSTNode<T>) {
            if(this._comparator(child.value, this._value) <= 0) {
                throw new Error("Invalid right child.")
            }

            this._children[1] = child;
        }

        insert(value: T) {
            const cmp = this._comparator(value, this._value);

            if(cmp <= 0) {
                if(!this.left) {
                    this.left = new BSTNode(value, this._comparator);
                } else {
                    this.left.insert(value);
                }
            } else {
                if(!this.right) {
                    this.right = new BSTNode(value, this._comparator);
                } else {
                    this.right.insert(value);
                }
            }
        }

        remove(child: 0 | 1) {
            this._children[child] = this._children[child]._children[child];
        }

        height(): number {
            const leftHeight = this.left ? this.left.height() : 0;
            const rightHeight = this.right ? this.right.height() : 0;
            return leftHeight + rightHeight + 1;
        }
    }

    function isBSTNode<T>(obj: any): obj is BSTNode<T> {
        return obj._tag === "BSTNode";
    }
}