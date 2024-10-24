import * as d3 from 'd3';
import { useEffect, useMemo, useRef } from 'react';

type Point = { date: Date; value: number };

export const LineChart = () => {
  const ref = useRef<HTMLDivElement>(null);

  //create fake data
  const dataset: Point[] = useMemo(
    () => [
      { date: new Date('2024-01-01'), value: 200 },
      { date: new Date('2024-02-01'), value: 220 },
      { date: new Date('2024-03-01'), value: 260 },
      { date: new Date('2024-04-01'), value: 100 },
      { date: new Date('2024-05-01'), value: 150 },
      { date: new Date('2024-06-01'), value: 240 },
      { date: new Date('2024-07-01'), value: 250 },
      { date: new Date('2024-08-01'), value: 120 },
      { date: new Date('2024-09-01'), value: 160 },
      { date: new Date('2024-10-01'), value: 210 },
      { date: new Date('2024-11-01'), value: 220 },
      { date: new Date('2024-12-01'), value: 240 },
      { date: new Date('2025-01-01'), value: 230 },
      { date: new Date('2025-02-01'), value: 210 },
      { date: new Date('2025-03-01'), value: 250 },
      { date: new Date('2025-04-01'), value: 270 },
      { date: new Date('2025-05-01'), value: 290 },
      { date: new Date('2025-06-01'), value: 310 },
      { date: new Date('2025-07-01'), value: 280 },
      { date: new Date('2025-08-01'), value: 350 },
      { date: new Date('2025-09-01'), value: 370 },
      { date: new Date('2025-10-01'), value: 390 },
      { date: new Date('2025-11-01'), value: 410 },
      { date: new Date('2025-12-01'), value: 430 },
      { date: new Date('2026-01-01'), value: 450 },
      { date: new Date('2026-02-01'), value: 470 },
      { date: new Date('2026-03-01'), value: 490 },
      { date: new Date('2026-04-01'), value: 510 },
      { date: new Date('2026-05-01'), value: 530 },
      { date: new Date('2026-06-01'), value: 550 },
      { date: new Date('2026-07-01'), value: 500 },
      { date: new Date('2026-08-01'), value: 600 },
      { date: new Date('2026-09-01'), value: 610 },
      { date: new Date('2026-10-01'), value: 630 },
      { date: new Date('2026-11-01'), value: 650 },
      { date: new Date('2026-12-01'), value: 670 },
      { date: new Date('2027-01-01'), value: 690 },
      { date: new Date('2027-02-01'), value: 710 },
      { date: new Date('2027-03-01'), value: 730 },
      { date: new Date('2027-04-01'), value: 750 },
      { date: new Date('2027-05-01'), value: 770 },
      { date: new Date('2027-06-01'), value: 790 },
      { date: new Date('2027-07-01'), value: 810 },
      { date: new Date('2027-08-01'), value: 830 },
      { date: new Date('2027-09-01'), value: 850 },
      { date: new Date('2027-10-01'), value: 870 },
      { date: new Date('2027-11-01'), value: 890 },
      { date: new Date('2027-12-01'), value: 910 },
    ],
    [],
  );

  useEffect(() => {
    //Set dimensions for chart
    const margin = { top: 70, right: 30, bottom: 40, left: 80 };
    const width = 1200 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    //Set x and y scales
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    //Set domains
    const xext = d3.extent(dataset, (d) => d.date);
    if (xext[0]) {
      x.domain(xext);
    }
    y.domain([0, d3.max(dataset, (d) => d.value) ?? 0]);

    //create svg elements and append to chart container
    const timeFormat = d3.timeFormat('%b %Y');
    const refref = ref.current;
    const svg = d3
      .select(refref)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    //add x-axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .style('font-size', '14px')
      .call(
        d3
          .axisBottom(x)
          .ticks(d3.timeMonth.every(6)) // Show tick every 6 months
          .tickFormat((d) => timeFormat(d as Date)),
      )
      .call((g) => {
        g.select('.domain').remove(); // Remove domain line
        g.selectAll('.tick line').style('stroke', '#ddd').style('stroke-dasharray', '2,2'); // Add dotted gridlines
      });

    //add the y-axis
    svg
      .append('g')
      .call(d3.axisLeft(y).tickSize(0).tickPadding(10))
      .call((g) => g.select('.domain').remove())
      .selectAll('.tick text')
      .style('fill', '#777')
      .style('visibility', (_d, i) => {
        if (i === 0) {
          return 'hidden';
        } else {
          return 'visibile';
        }
      });

    //Create the line generator
    const line = d3
      .line<Point>()
      .x((d) => x(d.date))
      .y((d) => y(d.value));

    svg
      .append('path')
      .datum(dataset)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1)
      .attr('d', line);

    return () => {
      d3.select(refref).selectAll('svg').remove();
    };
  }, [dataset]);

  return <div ref={ref} />;
};
