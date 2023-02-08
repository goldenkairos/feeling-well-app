import React, { useEffect, useRef, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import { partition as d3Partition, hierarchy } from "d3-hierarchy";
import { scaleLinear, scaleOrdinal } from "d3-scale";
import { quantize } from "d3-interpolate";
import { interpolateRainbow } from "d3-scale-chromatic";
import { arc as d3Arc } from "d3-shape";
import { select as d3Select } from "d3-selection";
import jsonData from "../static/icons/emotions.json";

// following example at https://observablehq.com/@d3/zoomable-sunburst

const Sunburst = ({
  width = 600,
  centerCircleRadius = 25,
  clickSubmitNewWord,
}) => {
  const svgRef = useRef(null);
  const gRef = useRef(null);
  const pathRef = useRef(null);
  const labelRef = useRef(null);
  const parentRef = useRef(null);
  const parentLabelRef = useRef(null);

  const chartRadius = useMemo(() => width / 3, [width]);

  const root = useMemo(() => {
    const partition = (data) => {
      const dataHierarchy = hierarchy(data).sum((d) => d.size);
      return d3Partition().size([2 * Math.PI, dataHierarchy.height + 1])(
        dataHierarchy
      );
    };

    const root = partition(jsonData);
    root.each((d) => (d.current = d));
    return root;
  }, []);

  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain([1, 3])
        .range([centerCircleRadius * 1.1, chartRadius]),
    [centerCircleRadius, chartRadius]
  );

  const color = useMemo(
    () =>
      scaleOrdinal(quantize(interpolateRainbow, jsonData.children.length + 1)),
    []
  );

  const parentColor = useMemo(
    () => (d) => {
      if (d.depth === 0) return null;
      while (d.depth > 1) d = d.parent;
      return color(d.data.name);
    },
    [color]
  );

  const opacity = useMemo(
    () => (d) => {
      return 1 / d.depth + 0.2;
    },
    []
  );

  const arc = useMemo(
    () =>
      d3Arc()
        .startAngle((d) => d.x0)
        .endAngle((d) => d.x1)
        .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(chartRadius * 1.5)
        .innerRadius((d) => yScale(d.y0))
        .outerRadius((d) => yScale(d.y1) - 5)
        .cornerRadius(10),
    [chartRadius, yScale]
  );

  const labelTransform = useMemo(
    () => (d) => {
      const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
      const y = yScale((d.y0 + d.y1) / 2);
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    },
    [yScale]
  );

  const clicked = useCallback((p) => {
    console.log("clicked", p?.data?.name);
    clickSubmitNewWord({ description: p?.data?.name });
  }, []);

  // on mount: create the svg element and it's group child
  // on unmount: remove svg
  useEffect(() => {
    const svg = d3Select(svgRef.current)
      .append("svg")
      .style("width", "40vw")
      .style("height", "70vh")
      .attr("viewBox", [0, 0, width, width],)
      .style("font", "10px sans-serif");

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${width / 2})`);

    gRef.current = g;

    // filters go in defs element
    const defs = svg.append("defs");

    //Code taken from http://stackoverflow.com/questions/9630008/how-can-i-create-a-glow-around-a-rectangle-with-svg
    //Filter for the outside glow
    const filter = defs.append("filter").attr("id", "glow");

    filter
      .append("feGaussianBlur")
      .attr("class", "blur")
      .attr("stdDeviation", "2")
      .attr("result", "coloredBlur");

    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    return () => {
      svg.remove();
    };
  }, [width]);

  useEffect(() => {
    function handleMouseOver() {
      d3Select(this).style("filter", "url(#glow)");
    }
    function handleMouseOut() {
      d3Select(this).style("filter", "none");
    }
    const path = gRef.current
      .append("g")
      .selectAll("path")
      .data(root.descendants().slice(1))
      .join("path")
      .attr("fill", (d) => parentColor(d))
      .attr("fill-opacity", (d) => opacity(d))
      .attr("d", (d) => arc(d.current))
      .style("cursor", "pointer")
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
      .on("click", (e, d) => clicked(d));

    path.append("title").text((d) => d.data.name);

    pathRef.current = path;

    const label = gRef.current
      .append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .style("user-select", "none")
      .selectAll("text")
      .data(root.descendants().slice(1))
      .join("text")
      .attr("dy", "0.35em")
      .attr("fill-opacity", (d) => opacity(d.current))
      .attr("transform", (d) => labelTransform(d.current))
      .text((d) => d.data.name);

    labelRef.current = label;

    const parent = gRef.current
      .append("circle")
      .datum(root)
      .attr("r", centerCircleRadius)
      .attr("opacity", () => 0)
      .attr("pointer-events", "all")
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
      .on("click", clicked);

    parentRef.current = parent;

    const parentLabel = gRef.current
      .append("text")
      .datum(root)
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .style("user-select", "none")
      .join("text")
      .attr("dy", "0.35em")
      .text((d) => d.data.name);

    parentLabelRef.current = parentLabel;
  }, [
    gRef,
    arc,
    root,
    centerCircleRadius,
    clicked,
    labelTransform,
    opacity,
    parentColor,
  ]);

  return <main ref={svgRef}></main>;
};

Sunburst.propTypes = {
  width: PropTypes.number,
  centerCircleRadius: PropTypes.number,
};

export default Sunburst;

