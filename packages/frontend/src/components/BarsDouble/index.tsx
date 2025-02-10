import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface DataItem {
  name: string;
  value: number;
  reference: number;
}

function svg({ data }: { data: DataItem[] }) {
  // Specify the chart’s dimensions, based on a bar’s height.
  const barHeight = 15;
  const marginTop = 30;
  const marginRight = 0;
  const marginBottom = 10;
  const marginLeft = 30;
  const width = 928;
  const height =
    Math.ceil((data.length + 0.1) * barHeight) + marginTop + marginBottom;

  // Create the scales.
  const x = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(
        data,
        (d) => Number(d.reference).toFixed(2) as unknown as number
      ) || 0,
    ])
    .range([marginLeft, width - 100 - marginRight]);

  const y = d3
    .scaleBand()
    .domain(d3.sort(data, (d) => d).map((d) => d.name))
    .rangeRound([marginTop, height - marginBottom])
    .padding(0.1);

  // Create the SVG container.
  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-10, 0, width, height])
    .attr(
      "style",
      "width: 100%; max-width: 100%; height: auto; font: 12px sans-serif;"
    );

  // Append a rect for each name.
  svg
    .append("g")
    .attr("fill", "steelblue")
    .selectAll()
    .data(data)
    .join("rect")
    .attr("x", x(0))
    .attr("y", (d) => y(d.name) ?? 0)
    .attr("width", (d) => x(d.value) - x(0))
    .attr("height", y.bandwidth());

  // Append a rect for each name.
  svg
    .append("g")
    .attr("fill", "crimson")
    .selectAll()
    .data(data)
    .join("rect")
    .attr("x", x(0))
    .attr("y", (d) => y(d.name) ?? 0)
    .attr("width", (d) => x(d.reference) - x(0))
    .attr("height", y.bandwidth() / 2);

  // Create the axes.
  svg
    .append("g")
    .style("font", "12px sans-serif")
    .attr("transform", `translate(0,${marginTop})`)
    .call(d3.axisTop(x).ticks(width / 80, ""))
    .call((g) => g.select(".domain").remove());

  svg
    .append("g")
    .style("font", "12px sans-serif")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).tickSizeOuter(0));

  return svg.node();
}

function BarsDouble({ data }) {
  const divRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (divRef.current) {
      const svgNode = svg({ data });
      if (svgNode) {
        divRef.current.appendChild(svgNode);
      }
    }
  }, [data]);
  return (
    <div className="chart">
      <div ref={divRef} />
    </div>
  );
}

export default BarsDouble;
