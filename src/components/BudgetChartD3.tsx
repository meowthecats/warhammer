import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface Props {
  expenses: number;
  limit: number;
}

export default function BudgetChartD3({ expenses, limit }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Remove previous contents to prepare for clean redraw
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Responsive dimensions based on parent container width
    const width = 500;
    const height = 180;
    const margin = { top: 35, right: 30, bottom: 45, left: 140 };

    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", "100%");

    // Dual data comparison items
    const data = [
      {
        label: "Your Monthly Limit",
        value: limit,
        color: "#7da481", // Sage green
        isLimit: true
      },
      {
        label: "Current Spending",
        value: expenses,
        // Crimson warning if over budget, otherwise deep forest wargaming green
        color: expenses > limit ? "#bf5a45" : "#2d3a2e",
        isLimit: false
      }
    ];

    // X-Scale: Dollar Value (extends to maximum of limit, expenses, or at least 100 for proper context)
    const maxVal = Math.max(limit, expenses, 100) * 1.15;
    const xScale = d3.scaleLinear()
      .domain([0, maxVal])
      .range([margin.left, width - margin.right]);

    // Y-Scale: Categorical Bars
    const yScale = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([margin.top, height - margin.bottom])
      .padding(0.35);

    // Gridlines for scale readability in modern warm paper format
    const xTicks = xScale.ticks(5);
    svg.append("g")
      .attr("class", "grid")
      .selectAll("line")
      .data(xTicks)
      .enter()
      .append("line")
      .attr("x1", d => xScale(d))
      .attr("x2", d => xScale(d))
      .attr("y1", margin.top)
      .attr("y2", height - margin.bottom)
      .attr("stroke", "#dddccf") // Editorial clay
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "2,2");

    // Draw comparison bars
    svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("y", d => yScale(d.label) || 0)
      .attr("x", margin.left)
      .attr("height", yScale.bandwidth())
      .attr("fill", d => d.color)
      .attr("rx", 3) // rounded corners for modern craft look
      .attr("ry", 3)
      .attr("stroke", "#1a1a1a")
      .attr("stroke-width", 1.5)
      // Intro horizontal slide-in transition animation
      .attr("width", 0)
      .transition()
      .duration(850)
      .ease(d3.easeCubicOut)
      .attr("width", d => Math.max(2, xScale(d.value) - margin.left));

    // Value Labels inside or alongside the bars
    svg.selectAll(".value-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "value-label")
      .attr("y", d => (yScale(d.label) || 0) + yScale.bandwidth() / 2 + 4)
      .attr("x", margin.left + 8)
      .attr("fill", d => d.isLimit ? "#1a1a1a" : "#f9f8f4") // High contrast text on dark bar
      .attr("font-family", "JetBrains Mono, monospace")
      .attr("font-size", "11px")
      .attr("font-weight", "bold")
      .attr("opacity", 0)
      // Fade and position transition
      .transition()
      .delay(150)
      .duration(700)
      .attr("opacity", 1)
      .attr("x", d => {
        const barWidth = xScale(d.value) - margin.left;
        // If bar is too narrow, draw text on the outside
        return barWidth > 60 ? margin.left + 8 : margin.left + barWidth + 8;
      })
      .attr("fill", d => {
        const barWidth = xScale(d.value) - margin.left;
        return barWidth > 60 ? (d.isLimit ? "#1a1a1a" : "#f9f8f4") : "#1a1a1a";
      })
      .text(d => `$${d.value.toFixed(2)}`);

    // Y Axis (Custom styled matching wargames journal)
    const yAxis = d3.axisLeft(yScale).tickSize(0);
    svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(yAxis)
      .call(g => g.select(".domain").attr("stroke", "#1a1a1a").attr("stroke-width", 2))
      .selectAll("text")
      .attr("font-family", "Inter, sans-serif")
      .attr("font-size", "11px")
      .attr("font-weight", "bold")
      .attr("fill", "#1a1a1a")
      .attr("dx", "-10px");

    // X Axis (Bottom ticks)
    const xAxis = d3.axisBottom(xScale).ticks(5).tickFormat(d => `$${d}`);
    svg.append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis)
      .call(g => g.select(".domain").attr("stroke", "#1a1a1a").attr("stroke-width", 1.5))
      .selectAll("text")
      .attr("font-family", "JetBrains Mono, monospace")
      .attr("font-size", "10px")
      .attr("fill", "#4a5d4c")
      .attr("dy", "10px");

    // Monthly limit guidelines vertical threshold marker (for high readability)
    if (expenses > 0) {
      const limitXPos = xScale(limit);
      
      const thresholdGroup = svg.append("g")
        .attr("class", "threshold");

      thresholdGroup.append("line")
        .attr("x1", limitXPos)
        .attr("x2", limitXPos)
        .attr("y1", margin.top - 10)
        .attr("y2", height - margin.bottom)
        .attr("stroke", "#1a1a1a")
        .attr("stroke-width", 1.5)
        .attr("stroke-dasharray", "4,4")
        .style("opacity", 0)
        .transition()
        .delay(300)
        .duration(400)
        .style("opacity", 0.7);

      thresholdGroup.append("text")
        .attr("x", limitXPos)
        .attr("y", margin.top - 14)
        .attr("text-anchor", "middle")
        .attr("font-family", "Inter, sans-serif")
        .attr("font-size", "9px")
        .attr("font-weight", "extrabold")
        .attr("fill", expenses > limit ? "#bf5a45" : "#4a5d4c")
        .style("opacity", 0)
        .transition()
        .delay(400)
        .duration(400)
        .style("opacity", 1)
        .text(expenses > limit ? "⚠️ EXCEEDED" : "TARGET LIMIT");
    }

  }, [expenses, limit]);

  return (
    <div className="bg-white p-4 border border-editorial-clay rounded shadow-inner" id="d3-budget-chart-container">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-sans uppercase tracking-[0.15em] font-black text-editorial-moss">
          📊 Spending Comparison (D3 Analytics)
        </span>
        <span className={`text-[10px] font-sans font-bold px-2 py-0.5 rounded ${
          expenses > limit ? "bg-red-100 text-red-800" : "bg-emerald-100 text-editorial-forest"
        }`}>
          {expenses > limit ? "Over Limit" : "Under Limit"}
        </span>
      </div>

      <div className="w-full h-auto min-h-[140px] flex items-center justify-center">
        <svg ref={svgRef} className="max-w-full h-auto" id="d3-budget-comparison-svg" />
      </div>

      <p className="text-[10px] text-editorial-moss font-serif italic text-center mt-2">
        Visualized in real-time. Dynamic threshold adapts to individual kit purchases.
      </p>
    </div>
  );
}
