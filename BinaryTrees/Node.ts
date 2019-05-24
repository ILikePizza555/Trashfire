namespace DataStructures {
    interface TreeNode<T>{
        readonly value: T;
        readonly children: TreeNode<T>[];

        /**
         * Inserts an item into the tree.
         * @param item 
         */
        insert(item: T | TreeNode<T>): void;

        /**
         * Removes child i from the tree.
         * @param i 
         */
        deleteChild(i: number): void;
    }


}