// react and d3
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import PropTypes from "prop-types";

const BarChart = ({ data }) => {
  const barchartSvgRef = useRef(null);


  useEffect(() => {
    if (barchartSvgRef?.current !== null) {
      const svgEl = barchartSvgRef.current;
      const cssProperties = window.getComputedStyle(svgEl);

      // Define dimensions and margins
      const margin = { top: 20, right: 20, bottom: 100, left: 100 };
      const graphWidth =
        parseInt(cssProperties.width) - margin.left - margin.right;
      const graphHeight =
        parseInt(cssProperties.height) - margin.top - margin.bottom;

      // Create graph element
      const svg = d3.select(svgEl);
      const graph = svg
        .select("g")
        .attr("width", graphWidth)
        .attr("height", graphHeight)
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // linear and band scales
      const x = d3
        .scaleBand()
        .domain(data.map(d => d.name))
        .range([0, graphWidth])
        .paddingInner(0.2)
        .paddingOuter(0.2);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, d => d.number) + 50])
        .range([graphHeight, 0]);

      // creating Axes
      const xAxisGroup = graph
        .append("g")
        .attr("transform", `translate(0,${graphHeight})`);
      const yAxisGroup = graph.append("g");

      const xAxis = d3.axisBottom(x);
      const yAxis = d3.axisLeft(y);

      xAxisGroup.call(xAxis);
      yAxisGroup.call(yAxis);

      // make rectangles
      const rects = graph.selectAll("rect").data(data);
      rects
        .enter()
        .append("rect")
        .attr("width", x.bandwidth)
        .attr("height", d => graphHeight - y(d.number))
        .attr("x", d => x(d.name))
        .attr("y", d => y(d.number))
        .attr("fill", d => d.color);
    }
  }, [data]);

  return (
    <svg width={600} height={500} ref={barchartSvgRef}>
      <g></g>
    </svg>
  );
};

BarChart.propTypes = {
  data: PropTypes.array,
};

export default BarChart;
