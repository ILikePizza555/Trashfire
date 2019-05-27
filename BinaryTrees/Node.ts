import { callbackify } from "util";

export type Comparator<T> = (a: T, b: T) => -1 | 0 | 1;

export function defaultComparator(a: any, b: any): -1 | 0 | 1{
    if (a < b) {return -1;}
    else if (a === b) {return 0;}
    else return 1;
}

export namespace DataStructures {
    export interface TreeNode<T> {
        readonly _tag: string;
        readonly value: T;
        readonly children: (TreeNode<T> | null)[];
        insert(value: T): void;
        remove(child: number): void;
        /**
         * The number of elements under this node, including this node.
         */
        size(): number;

        /**
         * Breath-first traversal of the tree. Assume that the traversal is in order.
         */
        each(consumer: (t: T, i?: number) => void): void;


        /**
         * Depth-first traversal of the tree.
         * @param consumer 
         */
        eachDepth(consumer: (t: T, d?: number) => void): void;
    }

    /**
     * A basic binary search tree. Supports insertion and removal operations. 
     */
    export class BSTNode<T> implements TreeNode<T> {
        public readonly _tag = "BSTNode";
        private _value: T;
        private _children: [BSTNode<T> | null, BSTNode<T> | null];
        private _comparator: Comparator<T>;

        constructor(value: T, comparator = defaultComparator) {
            this._value = value;
            this._comparator = comparator;
            this._children = [null, null];
        }

        get children() {
            return this._children;
        }

        get value(): T {
            return this._value;
        }

        get left(): (BSTNode<T> | null) {
            return this._children[0];
        }

        set left(child: (BSTNode<T> | null)) {
            if(child && this._comparator(child._value, this._value) === 1) {
                throw new Error("Invalid left child.")
            }

            this._children[0] = child;
        }

        get right(): (BSTNode<T> | null) {
            return this._children[1];
        }

        set right(child: (BSTNode<T> | null)) {
            if(child && this._comparator(child.value, this._value) === -1) {
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
            const c = this.children[child];
            if(c !== null) {
                this._children[child] = c._children[child];
            }
        }

        private _each<R>(consumer: (t: T, i?: number) => void, i: number = 0 ): number {
            if(this._children[0]) {
                i += this._children[0]._each(consumer, i);
            }

            consumer(this._value, i);
            i++;

            if(this._children[1]) {
                i += this._children[1]._each(consumer, i);
            }
            return i;
        }

        each(consumer: (t: T, i?: number) => void): void {
            this._each(consumer);
        }

        eachDepth(consumer: (t: T, d?: number) => void): void {
            const dfsQueue: [number, BSTNode<T>][] = [[0, this]];

            while (dfsQueue.length != 0) {
                const [depth, node] = dfsQueue.shift()!;

                consumer(node._value, depth);

                if(node._children[0]) { 
                    dfsQueue.push([depth + 1, node._children[0]]); 
                }

                if(node._children[1]) { 
                    dfsQueue.push([depth + 1, node._children[1]]);
                }
            }
        }

        size(): number {
            const leftHeight = this.left ? this.left.size() : 0;
            const rightHeight = this.right ? this.right.size() : 0;
            return leftHeight + rightHeight + 1;
        }
    }

    export function isBSTNode<T>(obj: any): obj is BSTNode<T> {
        return obj._tag === "BSTNode";
    }

    /**
     * Rotates the tree from the root with the left child as the pivot
     */
    export function leftRotate<T>(root: BSTNode<T>): BSTNode<T> {
        if (!root.right) {
            throw new Error("Cannot perform left rotate on null pivot.");
        }

        const pivot = root.right;

        root.right = pivot.left;
        pivot.left = root;

        return pivot;
    }

    export function rightRotate<T>(root: BSTNode<T>): BSTNode<T> {
        if(!root.left) {
            throw new Error("Cannot perform right rotate on null privot.")
        }

        const pivot = root.left;

        root.left = pivot.right;
        pivot.right = root;

        return pivot;
    }

    type IterCallback = (next: () => void) => void;
    type VineCallback = {
        iter: IterCallback,
        finished?: () => void
    }

    /**
     * Converts a tree to a right-vine. Part of the DSW algorithmn.
     * @param root 
     */
    export function toVine<T>(tail: BSTNode<T>, next: BSTNode<T> | null, cb: VineCallback): void {
        if (next != null) {
            if(!next.left) {
                const newTail = next;
                const newNext = next.right;
                cb.iter(() => toVine(newTail, newNext, cb));
            } else {
                // Goal here is to make pivot the right of tail
                const pivot = next.left;
                next.left = pivot.right;
                pivot.right = next;
                next = pivot;
                tail.right = pivot;
                cb.iter(() => toVine(tail, next, cb));
            }
        } else if(cb.finished) {
            cb.finished();
        }
    }

    export function vineToTree<T>(root: BSTNode<T>): void {
        function compress(root: BSTNode<T>, count: number): void {
            for(let i = 0; i < count; i++) {
                root.right = leftRotate(root.right!);
                root = root.right;
            }
        }

        let size = root.size();
        const leaves = size + 1 - (Math.pow(2, Math.log2(size + 1)));
        compress(root, leaves);
        size = size - leaves;

        while (size > 1) {
            const newSize = Math.floor(size / 2);
            compress(root, newSize);
            size = newSize;
        }
    }

    /**
     * Balances a binary tree using the Day-Stout-Warren algorithmn
     * @param root 
     */
    export function balance<T>(root: BSTNode<T>) {

    }
}