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

const data: DataStructures.BSTNode<number> = new DataStructures.BSTNode(20);
Array.from({length: 40}, (x, i) => i).forEach(v => data.insert(v));

const layoutRoot = dataToTree(data);

/**
 * The SVG Canvas
 */
const d3svg = d3.select("#tree-display")
    .append("svg")
    .attr("width", "50%")
    .attr("height", "50%");

/**
 * The nodes of the tree.
 */
const nodes = d3svg.select("circle .node")
    .data(layoutRoot.descendants());

nodes.enter()
        .append("circle .node #root")
        .attr("r", 2.5)
    .merge(nodes)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", 2.5)