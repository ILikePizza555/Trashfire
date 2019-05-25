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
            if(!this._comparator(value))
            this._children[0] = child;
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