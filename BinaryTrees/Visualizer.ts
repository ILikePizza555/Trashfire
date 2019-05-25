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

/**
 * The SVG Canvas
 */
const d3svg = d3.select("#tree-display")
    .append("svg")
    .attr("width", "500")
    .attr("height", "500");

const layoutRoot = dataToTree(data, d3.tree<DataStructures.BSTNode<number>>().size([500, 500]));

/**
 * The nodes of the tree.
 */
const nodes = d3svg.selectAll<SVGCircleElement, {}>("circle .node")
    .data(layoutRoot.descendants());

nodes.enter()
        .append("circle")
        .attr("class", "node")
        .attr("r", 2.5)
    .merge(nodes)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", 2.5)