import {DataStructures} from "./DataStructures";
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

    const layoutRoot = d3.tree<TN>()
            .nodeSize([nodeRadius, nodeRadius])
            .size(canvasSize)(treeLayoutData);

    layoutRoot.each(node => {
        node.x += 2 * nodeRadius;
        node.y += 2 * nodeRadius;
    });
    
    // The SVG element to hold the graph
    const d3svg = d3.select("svg#tree-display")
        .attr("width", canvasSize[0] + 100)
        .attr("height", canvasSize[1] + 100);

    
    // Create all the elements for the nodes
    const nodes = d3svg.select("g#node-group").selectAll<SVGGElement, {}>("g .node")
        .data(layoutRoot.descendants())
        .join(
            enter => enter.append("g").attr("class", "node")
        )
    
    nodes
        .transition()
        .attr("transform", d => `translate(${d.x}, ${d.y})`);

    nodes.append("circle")
        .join("circle")
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("r", nodeRadius);

    nodes.append("text").join("text")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .text(d => (d.data.value).toString());
    
    // Create all the elements for the links
    const links = d3svg.select("g#link-group").selectAll<SVGPathElement, {}>("line")
            .data(layoutRoot.links())
            .join("line")
            .attr("stroke", "black")
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
}

const data: DataStructures.BSTNode<number> = new DataStructures.BSTNode(20);
Array.from({length: 19}, (_, i) => i).reverse().forEach(data.insert.bind(data))
Array.from({length: 19}, (_, i) => 21 + i).forEach(data.insert.bind(data));

const root: DataStructures.BSTNode<number> = new DataStructures.BSTNode(0);
root.right = data;
update(root);