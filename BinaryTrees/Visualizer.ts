import {DataStructures} from "./Node";
import {Selection} from "d3";
import * as d3 from "d3";

function dataToTree<T, TN extends DataStructures.TreeNode<T>>(
    node: TN, 
    t: d3.TreeLayout<TN> = d3.tree<TN>()): d3.HierarchyPointNode<TN> {
    
    function children(d: TN): TN[] {
        return d.children.filter(v => v !== null) as TN[];
    }

    const h = d3.hierarchy(node, children);
    return t(h);
}

function update(data: any, nodeRadius: number = 25): void {
    /**
     * The SVG Canvas
     */
    const d3svg = d3.select("#tree-display")
        .append("svg")
        .attr("width", "500")
        .attr("height", "500");

    const layoutRoot = dataToTree(
        data, 
        d3.tree<DataStructures.BSTNode<number>>()
            .nodeSize([nodeRadius, nodeRadius])
            .size([1000, 1000])
    );

    /**
     * The nodes of the tree.
     */
    const tree = d3svg.selectAll<SVGGElement, {}>("g .node")
        .data(layoutRoot.descendants());

    const groups = tree.enter()
        .append("g")
        .attr("class", "node")
        .merge(tree)
        .attr("transform", d => `translate(${d.x}, ${d.y})`)

    groups.append("circle").join("circle")
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("r", nodeRadius);
    groups.append("text").join("text")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .text(d => d.data.value)
}

const data: DataStructures.BSTNode<number> = new DataStructures.BSTNode(20);
Array.from({length: 40}, (x, i) => i).forEach(v => data.insert(v));
update(data);