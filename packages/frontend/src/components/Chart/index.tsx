/* eslint-disable */
// @ts-nocheck

import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { SDG } from "./sdg";
import info from "../../assets/img/info.svg";
import "./styles.scss";

function svg({ data }) {
  // Specify the chart’s dimensions.
  const width = 928;
  const height = width;
  const radius = width / 6;

  // Create the color scale.
  const color = d3.scaleOrdinal(
    d3.quantize(d3.interpolateRainbow, data.children.length + 1)
  );

  // Compute the layout.
  const hierarchy = d3
    .hierarchy(data)
    .sum((d) => d.value)
    .sort((a, b) => b.value - a.value);
  const root = d3.partition().size([2 * Math.PI, hierarchy.height + 1])(
    hierarchy
  );
  root.each((d) => (d.current = d));

  // Create the arc generator.
  const arc = d3
    .arc()
    .startAngle((d) => d.x0)
    .endAngle((d) => d.x1)
    .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius * 1.5)
    .innerRadius((d) => d.y0 * radius)
    .outerRadius((d) => Math.max(d.y0 * radius, d.y1 * radius - 1));

  // Create the SVG container.
  const svg = d3
    .create("svg")
    .attr("viewBox", [-width / 2, -height / 2, width, width])
    .style("font", "20px sans-serif")
    .style("font-weight", "200")
    .style("fill", "#FFF");

  // Append the arcs.
  const path = svg
    .append("g")
    .selectAll("path")
    .data(root.descendants().slice(1))
    .join("path")
    .attr("fill", (d) => {
      while (d.depth > 1) d = d.parent;
      let color = SDG.find((item) => item.id === d.data.name)?.color;
      return color;
    })
    .attr("fill-opacity", (d) =>
      arcVisible(d.current) ? (d.children ? 1 : 0.5) : 0
    )
    .attr("pointer-events", (d) => (arcVisible(d.current) ? "auto" : "none"))

    .attr("d", (d) => arc(d.current));

  // Make them clickable if they have children.
  path
    .filter((d) => d.children)
    .style("cursor", "pointer")
    .on("click", clicked);

  const format = d3.format(",d");
  path.append("title").text(
    (d) =>
      `${d
        .ancestors()
        .map((d) => d.data.name)
        .reverse()
        .join("/")}\n${format(d.value)}`
  );

  const label = svg
    .append("g")
    .attr("pointer-events", "none")
    .attr("text-anchor", "middle")
    .style("user-select", "none")
    .selectAll("text")
    .data(root.descendants().slice(1))
    .join("text")
    .attr("dy", "0.35em")
    .attr("fill-opacity", (d) => {
      return +labelVisible(d.current);
    })
    .attr("transform", (d) => labelTransform(d.current))
    .text((d) => {
      let sdg = SDG.find((i) => i.id === d.data.name);
      if (!sdg) return d.data.name;
      return sdg.name;
    });

  const parent = svg
    .append("circle")
    .datum(root)
    .attr("r", radius)
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .on("click", clicked);

  // Handle zoom on click.
  function clicked(event, p) {
    parent.datum(p.parent || root);

    root.each(
      (d) =>
        (d.target = {
          x0:
            Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) *
            2 *
            Math.PI,
          x1:
            Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) *
            2 *
            Math.PI,
          y0: Math.max(0, d.y0 - p.depth),
          y1: Math.max(0, d.y1 - p.depth),
        })
    );

    const t = svg.transition().duration(750);

    // Transition the data on all arcs, even the ones that aren’t visible,
    // so that if this transition is interrupted, entering arcs will start
    // the next transition from the desired position.
    path
      .transition(t)
      .tween("data", (d) => {
        const i = d3.interpolate(d.current, d.target);
        return (t) => (d.current = i(t));
      })
      .filter(function (d) {
        return +this.getAttribute("fill-opacity") || arcVisible(d.target);
      })
      .attr("fill-opacity", (d) => {
        console.log(arcVisible(d.target));
        // change opacity on transitions
        return arcVisible(d.target)
          ? d.children
            ? 1
            : d.target.y0 === 1
              ? 1
              : 0.5
          : 0;
      })
      .attr("pointer-events", (d) => (arcVisible(d.target) ? "auto" : "none"))
      .attrTween("d", (d) => () => arc(d.current));

    label
      .filter(function (d) {
        return +this.getAttribute("fill-opacity") || labelVisible(d.target);
      })
      .transition(t)
      .attr("fill-opacity", (d) => {
        return +labelVisible(d.target);
      })
      .attrTween("transform", (d) => () => labelTransform(d.current));
  }

  function arcVisible(d) {
    return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
  }

  function labelVisible(d) {
    // Setting the condition of d.y0 === 1 make visible only labels from the first level
    // (d.x1 - d.x0) > 0.2 sets a minimun width for displaying the label
    return d.y1 <= 3 && d.y0 === 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.2;
  }

  function labelTransform(d) {
    const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
    const y = ((d.y0 + d.y1) / 2) * radius;
    return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
  }

  return svg.nodes()[0];
}

function Chart({ data }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    if (svgRef.current) {
      svgRef.current.appendChild(svg({ data }));
    }
  }, []);
  return (
    <div className="chart">
      <div ref={svgRef} />
      <div className="info-notice">
        <img src={info} alt="info-icon" />
        You can zoom in to view individual portions
      </div>
    </div>
  );
}

export default Chart;
