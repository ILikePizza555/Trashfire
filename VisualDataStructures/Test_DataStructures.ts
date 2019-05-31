import { DataStructures } from "./DataStructures";
import { expect } from "chai";
import "mocha";

import BTree = DataStructures.BTree.BTree;

describe("BTree", function() {
    describe("#insert()", function() {
        let tree: BTree<number>;

        beforeEach(function() {
            tree = new BTree(5000);
        });

        it("should transform root into a 3-node", function() {
            tree.insert(6000);

            expect(tree.rootNode._keys).to.deep.equal([5000, 6000]);
        });

        it("should set a new root with two children when two items are inserted", function() {
            tree.insert(6000);
            tree.insert(7000);

            expect(tree.rootNode._keys).to.deep.equal([6000]);
            expect(tree.rootNode._children).to.have.lengthOf(2);

            expect(tree.rootNode._children[0]._keys).to.deep.equal([5000]);
            expect(tree.rootNode._children[1]._keys).to.deep.equal([7000]);
        });

        it("should insert into the first leaf", function() {
            tree.insert(6000);
            tree.insert(7000); //Tree now has a height of 1
            tree.insert(9000);

            expect(tree.rootNode._keys).has.lengthOf(1);
            expect(tree.rootNode._children).has.lengthOf(2);

            const rightChild = tree.rootNode._children[1];
            expect(rightChild._keys).to.deep.equal([7000, 9000]);
        })

        it("should push up overflow keys to the parent", function () {
            tree.insert(6000);
            tree.insert(7000); //Tree now has a height of 1
            tree.insert(9000);

            tree.insert(8000);

            expect(tree.rootNode._keys).to.deep.equal([6000, 8000]);
            expect(tree.rootNode._children).have.lengthOf(3);

            expect(tree.rootNode._children[0]._keys).to.deep.equal([5000]);
            expect(tree.rootNode._children[1]._keys).to.deep.equal([7000]);
            expect(tree.rootNode._children[2]._keys).to.deep.equal([9000]);
        })
    });
});