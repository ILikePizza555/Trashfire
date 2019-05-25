import {DataStructures} from "./Node";
import {Selection} from "d3";
import * as d3 from "d3";

function dataToTree<T, TN extends DataStructures.TreeNode<T>>(node: TN): d3.HierarchyNode<TN> {
    
    function children(d: TN): TN[] {
        return d.children.filter(v => v !== null) as TN[];
    }

    return d3.hierarchy(node, children);
}

function update<T, TN extends DataStructures.TreeNode<T>>(data: TN, nodeRadius: number = 25): void {
    // Apply the hierarchies to the data.
    const treeLayoutData = dataToTree(data);
    const nodeDiameter = nodeRadius * 2;
    const canvasSize: [number, number] = [
        (nodeDiameter + 5) * treeLayoutData.leaves().length, 
        (nodeDiameter + 5) * treeLayoutData.height
    ];
    
    /**
     * The SVG Canvas
     */
    const d3svg = d3.select("#tree-display")
        .append("svg")
        .attr("width", canvasSize[0] + 100)
        .attr("height", canvasSize[1] + 100);

    const layoutRoot = d3.tree<TN>()
            .nodeSize([nodeRadius, nodeRadius])
            .size(canvasSize)(treeLayoutData);

    /**
     * The nodes of the tree.
     */
    const tree = d3svg.selectAll<SVGGElement, {}>("g .node")
        .data(layoutRoot.descendants());

    const groups = tree.enter()
        .append("g")
        .attr("class", "node")
        .merge(tree)
        .attr("transform", d => `translate(${d.x + 2 * nodeRadius}, ${d.y + 2 * nodeRadius})`)

    groups.append("circle").join("circle")
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("r", nodeRadius);
    groups.append("text").join("text")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .text(d => (d.data.value).toString())
}

const data: DataStructures.BSTNode<number> = new DataStructures.BSTNode(20);
Array.from({length: 40}, (x, i) => i).forEach(v => data.insert(v));
update(data);