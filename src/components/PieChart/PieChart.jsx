// react
import { useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";

// d3
import * as d3 from "d3";

const PieChart = ({ width = 300, height = 300, radius = 150, data = [] }) => {
  const graphRef = useRef();
  const legendRef = useRef();

  const center = useMemo(() => {
    return { x: width / 2, y: width / 2 };
  }, [width]);

  useEffect(() => {
    const pie = d3
      .pie()
      .sort(null)
      .value(d => d.valueData);
    const arcPath = d3.arc().outerRadius(radius).innerRadius(0);

    const sliceColorScale = d3
      .scaleOrdinal(d3["schemeSet3"])
      .domain(data?.map(el => el.name));

    const tweenEnter = data => {
      const tempData = { ...data };
      let i = d3.interpolate(tempData.endAngle, tempData.startAngle);

      return function (t) {
        tempData.startAngle = i(t);
        return arcPath(tempData);
      };
    };

    const tweenExit = data => {
      let i = d3.interpolate(data.startAngle, data.endAngle);

      return function (t) {
        data.startAngle = i(t);
        return arcPath(data);
      };
    };

    const graph = d3.select(graphRef.current);
    const paths = graph.selectAll("path").data(pie(data));

    // legend
    const legendGroup = d3
      .select(legendRef.current)
      .attr("transform", `translate(${width + 50}, 10)`);

    const legendCircles = legendGroup.selectAll("circle").data(data);

    legendCircles
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("cy", (d, i) => i * 30)
      .attr("fill", d => sliceColorScale(d.name));

    const legendTexts = legendGroup.selectAll("text").data(data);

    legendTexts
      .enter()
      .append("text")
      .attr("x", 20)
      .text(d => d.name)
      .attr("y", (d, i) => 6 + i * 30)
      .attr("fill", "#111");

    paths
      .exit()
      .transition()
      .duration(750)
      .attrTween("d", d => tweenExit(d));

    paths
      .attr("stroke", "#fff")
      .attr("stroke-width", 5)
      .attr("fill", d => sliceColorScale(d.data.name));

    paths
      .enter()
      .append("path")
      .attr("stroke", "#fff")
      .attr("stroke-width", 5)
      .attr("fill", d => sliceColorScale(d.data.name))
      .each(function (d) {
        this._current = d;
      })
      .transition()
      .duration(750)
      .attrTween("d", d => tweenEnter(d));
  }, [radius, data]);

  return (
    <svg width={width + 300} height={height + 100}>
      <g ref={legendRef}></g>
      <g ref={graphRef} transform={`translate(${center?.x}, ${center?.y})`}></g>
    </svg>
  );
};

PieChart.propTypes = {
  data: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  radius: PropTypes.number,
};

export default PieChart;
