export type Comparator<T> = (a: T, b: T) => -1 | 0 | 1;

export function defaultComparator(a: any, b: any): -1 | 0 | 1{
    if (a < b) {return -1;}
    else if (a === b) {return 0;}
    else return 1;
}

export namespace DataStructures {
    export interface Traversable<T> {
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

    export interface TreeNode<T> extends Traversable<T> {
        readonly _tag: string;
        readonly value: T;
        readonly children: (TreeNode<T> | null)[];
        insert(value: T): void;
        remove(child: number): void;
        /**
         * The number of elements under this node, including this node.
         */
        size(): number;
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

        /**
         * Returns the smallest child node.
         */
        getMinNode(): BSTNode<T>  {
            let rv: BSTNode<T> = this;
            while(rv._children[0]) {
                rv = rv._children[0]
            }
            return rv
        }

        remove(childIndex: 0 | 1) {
            const child = this._children[childIndex];

            if(!child) {
                throw new Error("Cannot delete non-existant child.");
            }

            // Child has no children
            if(child._children[0] == null && child._children[1] == null) {
                this._children[childIndex] = null;
            }

            // Child has one child
            else if(child._children[0] != null && child._children[1] == null) {
                this._children[childIndex] = child._children[0];
            } else if(child._children[0] == null && child._children[1] != null) {
                this._children[childIndex] = child._children[1];
            } 
            
            // Child is full
            else if(child._children[0] && child._children[1]) {
                const successor = child._children[1].getMinNode();

                // Find the parent of successor
                let parent = child._children[1];
                while(parent._children[0] && parent._children[0]._children[0]) {
                    parent = child._children[0]
                }

                // Delete successor from it's parent
                parent._children[0] = null;

                // Replace child with successor
                successor._children = child._children;
                this._children[childIndex] = successor;
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

    /**
     * Balances a binary tree using the Day-Stout-Warren algorithmn
     * @param root 
     */
    export function balance<T>(root: BSTNode<T>) {

    }

    export namespace BTree {
        class BNode<K> {
            _keys: K[];
            _children: BNode<K>[];
            _parent?: BNode<K>;

            constructor(keys: K[] = [], children: BNode<K>[] = [], parent?: BNode<K>) {
                this._keys = keys;
                this._children = children;
                this._parent = parent;
            }
            isLeaf(): boolean {
                return this._children.length == 0;
            }

            removeChild(n: BNode<K>) {
                const index = this._children.indexOf(n);

                if(index == -1) {
                    throw Error("Invalid child.");
                }

                this._children.splice(index, 1);
            }

            /**
            * Inserts a key into the key array, keeping it sorted.
            */
            insertKey(key: K, comparator: Comparator<K>): number {
                for (let i = 0; i < this._keys.length - 1; i++) {
                    if (comparator(key, this._keys[i]) <= 0) {
                        this._keys.splice(i, 0, key);
                        return i ;
                    }
                }
                return this._keys.push(key) - 1;
            }
        }
        export class BTree<K> {
            private _root: BNode<K>;
            private _comparator: Comparator<K>;

            constructor(initalKey: K, comparator: Comparator<K> = defaultComparator) {
                this._root = new BNode<K>([initalKey]);
                this._comparator = comparator;
            }

            get rootNode(): BNode<K> {
                return this._root;
            }

            private replaceRoot(newRoot: BNode<K>) {
                // Delete references so that nodes can be garbage-collected.
                // idk if this actually helps, but better safe than sorry.
                this._root._keys = [];
                this._root._children = [];
                this._root = newRoot;
            }

            private fixOrder(n: BNode<K>): void {
                // Assert that the length of the children is either 0 or 1 more than the number of keys
                if (n._children.length != 0 && n._children.length != n._keys.length + 1) {
                    throw new Error(`Invalid Node State: keys:${n._keys.length}, children:${n._children.length}`);
                }

                // Nothing to fix!
                if (n._keys.length <= 2) {
                    return;
                }

                if (n._keys.length == 3) {
                    // First we need to break ourselves apart
                    const pushKey = n._keys[1];
                    const leftNode = new BNode<K>([n._keys[0]], n._children.slice(0, 2), n._parent);
                    const rightNode = new BNode<K>([n._keys[1]], n._children.slice(2, 4), n._parent);

                    if (!n._parent) {
                        // Create a new parent, this is the new root;
                        const newRoot = new BNode<K>([pushKey], [leftNode, rightNode]);
                        newRoot._parent = newRoot;
                        newRoot._parent = newRoot;
                        this.replaceRoot(newRoot);
                    } else {
                        n._parent.removeChild(n);
                        const index = n._parent.insertKey(pushKey, this._comparator);

                        n._parent._children.splice(index, 0, leftNode);
                        n._parent._children.splice(index + 1, 0, leftNode);

                        this.fixOrder(n._parent);
                    }
                }
            }

            insert(key: K): void {
                let n = this._root;

                while(!n.isLeaf()) {
                    for(let i=0; i < n._keys.length - 1; i+= 1) {
                        const k = n._keys[i];

                        if(this._comparator(key, k) <= 0) {
                            if (n._children[i] == undefined) {
                                throw new Error(`
                                Invalid State: _children[${i}] is undefined. 
                                Either this node has too many keys or not enough children. 
                                keys: ${n._keys.length}; children: ${n._children.length}`);
                            }
                            n = n._children[i];
                        }
                    }

                    n = n._children[n._children.length - 1];
                }

                n.insertKey(key, this._comparator);
                this.fixOrder(n);
            }
        }
    }
}