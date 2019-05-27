import { DataStructures } from "./DataStructures";
import BSTNode = DataStructures.BSTNode;

export namespace BST {

    type VineCallbacks<T> = {
        onLoop: (tail: BSTNode<T>, next: BSTNode<T>) => PromiseLike<void>
    }

    /**
     * Async function that converts a BinaryTree to a right-vine. Part of the Day-Stout-Warren algorithmn.
     * @param root 
     * @param cb 
     */
    export async function treeToVine<T>(root: BSTNode<T>, cb: VineCallbacks<T>) {
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
}