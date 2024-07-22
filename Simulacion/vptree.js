document.addEventListener("DOMContentLoaded", function() {
    // Sample data for the VP-Tree
    const treeData = {
        name: "B1",
        children: [
            {
                name: "B2",
                children: [
                    { name: "B4" },
                    { name: "B5" }
                ]
            },
            {
                name: "B3",
                children: [
                    { name: "B6" },
                    { name: "B7" }
                ]
            }
        ]
    };

    // Sample data points for the circles
    const dataPoints = [
        { x: 50, y: 50 }, { x: 70, y: 70 }, { x: 110, y: 100 },
        { x: 130, y: 150 }, { x: 200, y: 80 }, { x: 300, y: 200 },
        { x: 400, y: 300 }, { x: 500, y: 400 }, { x: 600, y: 500 }
    ];

    // Set up the dimensions and margins of the diagram
    const margin = {top: 20, right: 90, bottom: 30, left: 90},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

    // Append the svg object to the body of the page
    const svgTree = d3.select("#tree-container").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const svgCircles = d3.select("#circle-diagram").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Draw circles for the VP-Tree nodes
    const circles = [
        { cx: 200, cy: 200, r: 150, stroke: "red" },
        { cx: 400, cy: 200, r: 100, stroke: "green" },
        { cx: 600, cy: 300, r: 50, stroke: "blue" },
        { cx: 300, cy: 400, r: 75, stroke: "purple" }
    ];

    svgCircles.selectAll(".circle")
        .data(circles)
        .enter()
        .append("circle")
        .attr("class", "circle")
        .attr("cx", d => d.cx)
        .attr("cy", d => d.cy)
        .attr("r", d => d.r)
        .attr("stroke", d => d.stroke);

    // Draw data points
    svgCircles.selectAll(".data-point")
        .data(dataPoints)
        .enter()
        .append("circle")
        .attr("class", "data-point")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", 3);

    let i = 0,
        duration = 750,
        root;

    // Create the tree layout
    const treemap = d3.tree().size([height, width]);

    // Assigns parent, children, height, depth
    root = d3.hierarchy(treeData, d => d.children);
    root.x0 = height / 2;
    root.y0 = 0;

    // Collapse after the second level
    root.children.forEach(collapse);

    update(root);

    // Collapse the node and all its children
    function collapse(d) {
      if(d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
      }
    }

    function update(source) {
        const treeData = treemap(root);

        // Compute the new tree layout
        const nodes = treeData.descendants(),
              links = treeData.descendants().slice(1);

        nodes.forEach(d => { d.y = d.depth * 180 });

        // Nodes section
        const node = svgTree.selectAll('g.node')
            .data(nodes, d => d.id || (d.id = ++i));

        // Enter any new modes at the parent's previous position
        const nodeEnter = node.enter().append('g')
            .attr('class', 'node')
            .attr('transform', d => 'translate(' + source.y0 + ',' + source.x0 + ')')
            .on('click', click);

        nodeEnter.append('circle')
            .attr('class', 'node')
            .attr('r', 1e-6)
            .style('fill', d => d._children ? 'lightsteelblue' : '#fff');

        nodeEnter.append('text')
            .attr('dy', '.35em')
            .attr('x', d => d.children || d._children ? -13 : 13)
            .attr('text-anchor', d => d.children || d._children ? 'end' : 'start')
            .text(d => d.data.name);

        // UPDATE
        const nodeUpdate = nodeEnter.merge(node);

        nodeUpdate.transition()
            .duration(duration)
            .attr('transform', d => 'translate(' + d.y + ',' + d.x + ')');

        nodeUpdate.select('circle.node')
            .attr('r', 10)
            .style('fill', d => d._children ? 'lightsteelblue' : '#fff')
            .attr('cursor', 'pointer');

        // Remove any exiting nodes
        const nodeExit = node.exit().transition()
            .duration(duration)
            .attr('transform', d => 'translate(' + source.y + ',' + source.x + ')')
            .remove();

        nodeExit.select('circle')
            .attr('r', 1e-6);

        nodeExit.select('text')
            .style('fill-opacity', 1e-6);

        // Links section
        const link = svgTree.selectAll('path.link')
            .data(links, d => d.id);

        // Enter any new links at the parent's previous position
        const linkEnter = link.enter().insert('path', 'g')
            .attr('class', 'link')
            .attr('d', d => {
              const o = {x: source.x0, y: source.y0};
              return diagonal(o, o);
            });

        // UPDATE
        const linkUpdate = linkEnter.merge(link);

        linkUpdate.transition()
            .duration(duration)
            .attr('d', d => diagonal(d, d.parent));

        // Remove any exiting links
        const linkExit = link.exit().transition()
            .duration(duration)
            .attr('d', d => {
              const o = {x: source.x, y: source.y};
              return diagonal(o, o);
            })
            .remove();

        // Store the old positions for transition
        nodes.forEach(d => {
          d.x0 = d.x;
          d.y0 = d.y;
        });

        // Creates a curved (diagonal) path from parent to the child nodes
        function diagonal(s, d) {
          const path = `M ${s.y} ${s.x}
                        C ${(s.y + d.y) / 2} ${s.x},
                          ${(s.y + d.y) / 2} ${d.x},
                          ${d.y} ${d.x}`;

          return path;
        }

        // Toggle children on click
        function click(event, d) {
          if (d.children) {
            d._children = d.children;
            d.children = null;
          } else {
            d.children = d._children;
            d._children = null;
          }
          update(d);
        }
    }
});
