import { DataStructures } from "./DataStructures";
import BSTNode = DataStructures.BSTNode;

export namespace BST {

    type VineTFCallbacks<T> = {
        onLoop: (tail: BSTNode<T>, next: BSTNode<T>) => PromiseLike<void>
    }

    /**
     * Async function that converts a BinaryTree to a right-vine. Part of the Day-Stout-Warren algorithmn.
     * @param root 
     * @param cb 
     */
    export async function treeToVine<T>(root: BSTNode<T>, cb: VineTFCallbacks<T>) {
        let tail = root;
        let next = root.right;

        while(next) {
            await cb.onLoop(tail, next);
            if(!next.left) {
                tail = next;
                next = next.right;
            } else {
                const pivot = next.left;
                next.left = pivot.right;
                pivot.right = next;

                next = pivot;
                tail.right = pivot;
            }
        }

        return root;
    }

    type TreeTFCallbacks<T> = {
        onCompress: (root: BSTNode<T>, count: number, i: number) => PromiseLike<void>
        onLoop: (root: BSTNode<T>, size: number) => PromiseLike<void>
    }
    /**
     * Converts a right-vine to a balanced tree. Second part of the Day-Stout-Warren algorithmn.
     * @param root 
     */
    export async function vineToTree<T>(root: BSTNode<T>, cb: TreeTFCallbacks<T>) {
        /**
         * Performs `count` left-rotations on `root`.
         */
        async function compress(root: BSTNode<T>, count: number) {
            for(let i = 0; i < count; i++) {
                try {
                    if(root.right) {
                        root.right = DataStructures.leftRotate(root.right);
                        root = root.right;
                    } else {
                        console.warn(`root.right is null [count: ${count}, i: ${i}]`);
                    }
                } catch (e) {
                    console.error(`Got error "${e}". [count: ${count}, i: ${i}]`);
                }

                await cb.onCompress(root, count, i);
            }
        }

        let size = root.size();
        const leaves = size + 1 - Math.pow(2, Math.log2(size + 1));
        await compress(root, leaves);
        size -= leaves;

        while(size > 1) {
            const newSize = Math.floor(size / 2)
            await cb.onLoop(root, newSize);
            await compress(root, newSize);
            size = newSize;
        }
    }
}