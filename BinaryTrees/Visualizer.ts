import d3, {Selection} from "d3";

let d3svg: Selection<SVGSVGElement, {}, HTMLElement, any> = null;

document.onload = function main() {
    d3svg = d3.select("#tree-display")
        .append("svg")
        .attr("width", "50%")
        .attr("height", "50%");
}