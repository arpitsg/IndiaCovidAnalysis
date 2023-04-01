d3.tip = function () {
  var direction = d3_tip_direction,
    offset = d3_tip_offset,
    html = d3_tip_html,
    node = initNode(),
    svg = null,
    point = null,
    target = null

  function tip(vis) {
    svg = getSVGNode(vis)
    point = svg.createSVGPoint()
    document.body.appendChild(node)
  }

  tip.show = function () {
    var args = Array.prototype.slice.call(arguments)
    if (args[args.length - 1] instanceof SVGElement) target = args.pop()

    var content = html.apply(this, args),
      poffset = offset.apply(this, args),
      dir = direction.apply(this, args),
      nodel = d3.select(node), i = 0,
      coords

    nodel.html(content)
      .style({ opacity: 1, 'pointer-events': 'all' })

    while (i--) nodel.classed(directions[i], false)
    coords = direction_callbacks.get(dir).apply(this)
    nodel.classed(dir, true).style({
      top: (coords.top + poffset[0]) + 'px',
      left: (coords.left + poffset[1]) + 'px'
    })

    return tip
  }

  tip.hide = function () {
    nodel = d3.select(node)
    nodel.style({ opacity: 0, 'pointer-events': 'none' })
    return tip
  }

  tip.attr = function (n, v) {
    if (arguments.length < 2 && typeof n === 'string') {
      return d3.select(node).attr(n)
    } else {
      var args = Array.prototype.slice.call(arguments)
      d3.selection.prototype.attr.apply(d3.select(node), args)
    }

    return tip
  }

  tip.style = function (n, v) {
    if (arguments.length < 2 && typeof n === 'string') {
      return d3.select(node).style(n)
    } else {
      var args = Array.prototype.slice.call(arguments)
      d3.selection.prototype.style.apply(d3.select(node), args)
    }

    return tip
  }

  tip.direction = function (v) {
    if (!arguments.length) return direction
    direction = v == null ? v : d3.functor(v)

    return tip
  }

  tip.offset = function (v) {
    if (!arguments.length) return offset
    offset = v == null ? v : d3.functor(v)

    return tip
  }

  tip.html = function (v) {
    if (!arguments.length) return html
    html = v == null ? v : d3.functor(v)

    return tip
  }

  function d3_tip_direction() { return 'n' }
  function d3_tip_offset() { return [0, 0] }
  function d3_tip_html() { return ' ' }

  var direction_callbacks = d3.map({
    n: direction_n,
    s: direction_s,
    e: direction_e,
    w: direction_w,
    nw: direction_nw,
    ne: direction_ne,
    sw: direction_sw,
    se: direction_se
  }),

    directions = direction_callbacks.keys()

  function direction_n() {
    var bbox = getScreenBBox()
    return {
      top: bbox.n.y - node.offsetHeight,
      left: bbox.n.x - node.offsetWidth / 2
    }
  }

  function direction_s() {
    var bbox = getScreenBBox()
    return {
      top: bbox.s.y,
      left: bbox.s.x - node.offsetWidth / 2
    }
  }

  function direction_e() {
    var bbox = getScreenBBox()
    return {
      top: bbox.e.y - node.offsetHeight / 2,
      left: bbox.e.x
    }
  }

  function direction_w() {
    var bbox = getScreenBBox()
    return {
      top: bbox.w.y - node.offsetHeight / 2,
      left: bbox.w.x - node.offsetWidth
    }
  }

  function direction_nw() {
    var bbox = getScreenBBox()
    return {
      top: bbox.nw.y - node.offsetHeight,
      left: bbox.nw.x - node.offsetWidth
    }
  }

  function direction_ne() {
    var bbox = getScreenBBox()
    return {
      top: bbox.ne.y - node.offsetHeight,
      left: bbox.ne.x
    }
  }

  function direction_sw() {
    var bbox = getScreenBBox()
    return {
      top: bbox.sw.y,
      left: bbox.sw.x - node.offsetWidth
    }
  }

  function direction_se() {
    var bbox = getScreenBBox()
    return {
      top: bbox.se.y,
      left: bbox.e.x
    }
  }

  function initNode() {
    var node = d3.select(document.createElement('div'))
    node.style({
      position: 'absolute',
      opacity: 0,
      pointerEvents: 'none',
      boxSizing: 'border-box'
    })

    return node.node()
  }

  function getSVGNode(el) {
    el = el.node()
    if (el.tagName.toLowerCase() == 'svg')
      return el

    return el.ownerSVGElement
  }

  function getScreenBBox() {
    var targetel = target || d3.event.target,
      bbox = {},
      matrix = targetel.getScreenCTM(),
      tbbox = targetel.getBBox(),
      width = tbbox.width,
      height = tbbox.height,
      x = tbbox.x,
      y = tbbox.y,
      scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
      scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft


    point.x = x + scrollLeft
    point.y = y + scrollTop
    bbox.nw = point.matrixTransform(matrix)
    point.x += width
    bbox.ne = point.matrixTransform(matrix)
    point.y += height
    bbox.se = point.matrixTransform(matrix)
    point.x -= width
    bbox.sw = point.matrixTransform(matrix)
    point.y -= height / 2
    bbox.w = point.matrixTransform(matrix)
    point.x += width
    bbox.e = point.matrixTransform(matrix)
    point.x -= width / 2
    point.y -= height / 2
    bbox.n = point.matrixTransform(matrix)
    point.y += height
    bbox.s = point.matrixTransform(matrix)

    return bbox
  }

  return tip
};

populate_parallel();
makeStackedArea();
var i, tabcontent, tablinks;



tabcontent = document.getElementsByClassName("tabcontent");
for (i = 0; i < tabcontent.length; i++) {
  tabcontent[i].style.display = "none";
}



tablinks = document.getElementsByClassName("tablinks");
for (i = 0; i < tablinks.length; i++) {
  tablinks[i].className = tablinks[i].className.replace(" active", "");
}


document.getElementById("dashcnt").style.display = "block";



populate_map('01/01/2020', '01/01/2021');


make_time_series('all');


make_pie_chart_wrapper('all');


update_count('all');


makeRadarWrapper('all');

class GraphUnweightedUndirectedAdjacencyList {

  constructor() {
    this.connections = {}
  }

  addPoint(node) {

    this.connections[node] = new Set()
  }
  addEdge(node1, node2) {
    if (!(node1 in this.connections)) { this.addPoint(node1) }
    if (!(node2 in this.connections)) { this.addPoint(node2) }
    this.connections[node1].add(node2)
    this.connections[node2].add(node1)
  }

  DFSComponent(components, node, visited) {
    components.push(node)
    const stack = [node]
    while (stack.length > 0) {
      const curr = stack.pop()
      visited.add(curr.toString())
      for (const neighbour of this.connections[curr].keys()) {
        if (!visited.has(neighbour.toString())) { stack.push(neighbour) }
      }
    }
  }

  connectedComponents() {
    const visited = new Set()
    const components = []
    for (const node of Object.keys(this.connections)) {
      if (!visited.has(node.toString())) { this.DFSComponent(components, node, visited) }
    }
    return components
  }
}


function makeRadarWrapper(state) {

  $.getJSON('/get_radar_data/' + state + '?fraction=True', function (data) {

    window.d = data;

    var newdata = [data['male'], data['female']];

    makeRadar(newdata);
  });
}


function makeRadar(d) {
  var w = 400,
    h = 400;
  var colorscale = d3.scale.ordinal().range(["#CC333F", "#00A0B0"]);
  var LegendOptions = ['Male', 'Female'];

  var mycfg = {
    w: w,
    h: h,
    maxValue: 0.6,
    levels: 6,
    ExtraWidthX: 300
  }
  var RadarChart = {
    make: function (id, d, options) {
      var cfg = {
        radius: 5,
        w: 100,
        h: 100,
        factor: 1,
        factorLegend: .85,
        levels: 3,
        maxValue: 0,
        radians: 2 * Math.PI,
        opacityArea: 0.5,
        ToRight: 5,
        TranslateX: 80,
        TranslateY: 70,
        ExtraWidthX: 100,
        ExtraWidthY: 100,
        color: d3.scale.ordinal().range(["#CC333F", "#00A0B0"]),
      };

      if ('undefined' !== typeof options) {
        for (var i in options) {
          if ('undefined' !== typeof options[i]) {
            cfg[i] = options[i];
          }
        }
      }
      cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function (i) { return d3.max(i.map(function (o) { return o.value; })) }));
      var allAxis = (d[0].map(function (i, j) { return i.axis }));
      var total = allAxis.length;
      var radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2);
      var Format = d3.format('%');
      d3.select(id).select("svg").remove();

      var g = d3.select(id)
        .append("svg")
        .attr("width", cfg.w + cfg.ExtraWidthX)
        .attr("height", cfg.h + cfg.ExtraWidthY)
        .append("g")
        .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");
      ;

      var tooltip;


      for (var j = 0; j < cfg.levels - 1; j++) {
        var levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
        g.selectAll(".levels")
          .data(allAxis)
          .enter()
          .append("svg:line")
          .attr("x1", function (d, i) { return levelFactor * (1 - cfg.factor * Math.sin(i * cfg.radians / total)); })
          .attr("y1", function (d, i) { return levelFactor * (1 - cfg.factor * Math.cos(i * cfg.radians / total)); })
          .attr("x2", function (d, i) { return levelFactor * (1 - cfg.factor * Math.sin((i + 1) * cfg.radians / total)); })
          .attr("y2", function (d, i) { return levelFactor * (1 - cfg.factor * Math.cos((i + 1) * cfg.radians / total)); })
          .attr("class", "line")
          .style("stroke", "grey")
          .style("stroke-opacity", "0.75")
          .style("stroke-width", "0.3px")
          .attr("transform", "translate(" + (cfg.w / 2 - levelFactor) + ", " + (cfg.h / 2 - levelFactor) + ")");
      }

      for (var j = 0; j < cfg.levels; j++) {
        var levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
        g.selectAll(".levels")
          .data([1])
          .enter()
          .append("svg:text")
          .attr("x", function (d) { return 70 + levelFactor * (1 - cfg.factor * Math.sin(0)); })
          .attr("y", function (d) { return levelFactor * (1 - cfg.factor * Math.cos(0)); })
          .attr("class", "legend")
          .style("font-family", "sans-serif")
          .style("font-size", "10px")
          .attr("transform", "translate(" + (cfg.w / 2 - levelFactor + cfg.ToRight) + ", " + (cfg.h / 2 - levelFactor) + ")")
          .attr("fill", "#737373")
          .text(Format((j + 1) * cfg.maxValue / cfg.levels));
      }

      series = 0;

      var axis = g.selectAll(".axis")
        .data(allAxis)
        .enter()
        .append("g")
        .attr("class", "axis");

      axis.append("line")
        .attr("x1", cfg.w / 2)
        .attr("y1", cfg.h / 2)
        .attr("x2", function (d, i) { return cfg.w / 2 * (1 - cfg.factor * Math.sin(i * cfg.radians / total)); })
        .attr("y2", function (d, i) { return cfg.h / 2 * (1 - cfg.factor * Math.cos(i * cfg.radians / total)); })
        .attr("class", "line")
        .style("stroke", "grey")
        .style("stroke-width", "1px");

      axis.append("text")
        .attr("class", "legend")
        .text(function (d) { return d })
        .style("font-family", "sans-serif")
        .style("font-size", "11px")
        .attr("text-anchor", "middle")
        .attr("dy", "1.5em")
        .attr("transform", function (d, i) { return "translate(0, -10)" })
        .attr("x", function (d, i) { return cfg.w / 2 * (1 - cfg.factorLegend * Math.sin(i * cfg.radians / total)) - 60 * Math.sin(i * cfg.radians / total); })
        .attr("y", function (d, i) { return -50 + cfg.h / 2 * (1 - Math.cos(i * cfg.radians / total)) - 20 * Math.cos(i * cfg.radians / total); });


      d.forEach(function (y, x) {
        dataValues = [];
        g.selectAll(".nodes")
          .data(y, function (j, i) {
            dataValues.push([
              cfg.w / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)),
              cfg.h / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total))
            ]);
          });
        dataValues.push(dataValues[0]);
        g.selectAll(".area")
          .data([dataValues])
          .enter()
          .append("polygon")
          .attr("class", "radar-chart-serie" + series)
          .style("stroke-width", "2px")
          .style("stroke", cfg.color(series))
          .attr("points", function (d) {
            var str = "";
            for (var pti = 0; pti < d.length; pti++) {
              str = str + d[pti][0] + "," + d[pti][1] + " ";
            }
            return str;
          })
          .style("fill", function (j, i) { return cfg.color(series) })
          .style("fill-opacity", cfg.opacityArea)
          .on('mouseover', function (d) {
            z = "polygon." + d3.select(this).attr("class");
            g.selectAll("polygon")
              .transition(200)
              .style("fill-opacity", 0.1);
            g.selectAll(z)
              .transition(200)
              .style("fill-opacity", .7);
          })
          .on('mouseout', function () {
            g.selectAll("polygon")
              .transition(200)
              .style("fill-opacity", cfg.opacityArea);
          });
        series++;
      });
      series = 0;


      d.forEach(function (y, x) {
        g.selectAll(".nodes")
          .data(y).enter()
          .append("svg:circle")
          .attr("class", "radar-chart-serie" + series)
          .attr('r', cfg.radius)
          .attr("alt", function (j) { return Math.max(j.value, 0) })
          .attr("cx", function (j, i) {
            dataValues.push([
              cfg.w / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)),
              cfg.h / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total))
            ]);
            return cfg.w / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total));
          })
          .attr("cy", function (j, i) {
            return cfg.h / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total));
          })
          .attr("data-id", function (j) { return j.axis })
          .style("fill", cfg.color(series)).style("fill-opacity", .9)
          .on('mouseover', function (d) {
            newX = parseFloat(d3.select(this).attr('cx')) - 10;
            newY = parseFloat(d3.select(this).attr('cy')) - 5;

            tooltip
              .attr('x', newX)
              .attr('y', newY)
              .text(Format(d.value))
              .transition(200)
              .style('opacity', 1);

            z = "polygon." + d3.select(this).attr("class");
            g.selectAll("polygon")
              .transition(200)
              .style("fill-opacity", 0.1);
            g.selectAll(z)
              .transition(200)
              .style("fill-opacity", .7);
          })
          .on('mouseout', function () {
            tooltip
              .transition(200)
              .style('opacity', 0);
            g.selectAll("polygon")
              .transition(200)
              .style("fill-opacity", cfg.opacityArea);
          })
          .append("svg:title")
          .text(function (j) { return Math.max(j.value, 0) });

        series++;
      });

      tooltip = g.append('text')
        .style('opacity', 0)
        .style('font-family', 'sans-serif')
        .style('font-size', '13px');
    }
  };


  RadarChart.make("#rader", d, mycfg);



  var svg = d3.select('#raderp')
    .selectAll('svg')
    .append('svg')
    .attr("width", w + 300)
    .attr("height", h)

  var legend = svg.append("g")
    .attr("class", "legend")
    .attr("height", 100)
    .attr("width", 200)
    .attr('transform', 'translate(90,20)')
    ;

  legend.selectAll('rect')
    .data(LegendOptions)
    .enter()
    .append("rect")
    .attr("x", w + 180)
    .attr("y", function (d, i) { return i * 20; })
    .attr("width", 10)
    .attr("height", 10)
    .style("fill", function (d, i) { return colorscale(i); })
    ;

  legend.selectAll('text')
    .data(LegendOptions)
    .enter()
    .append("text")
    .attr("x", w + 193)
    .attr("y", function (d, i) { return i * 20 + 9; })
    .attr("font-size", "11px")
    .attr("fill", "#737373")
    .text(function (d) { return d; });
}

async function aggrAPI(caseType, startDate, endDate, state) {

  let data = await fetch(`get_time_series_data/${state}/${caseType}?startDate=${startDate}&endDate=${endDate}`)
  data = await data.json()

  let sum = 0
  data.values.map((val) => {
    sum += val
  })



  return sum



}




function dashboard_click(state, startDate = '', endDate = '') {
  make_time_series(state);
  update_count(state);
  make_pie_chart_wrapper(state, startDate, endDate);
}
async function make_pie_chart_wrapper(state, startDate = '', endDate = '') {

  let num_recovered = await aggrAPI('Recovered', startDate, endDate, state)
  let num_deaths = await aggrAPI('Deaths', startDate, endDate, state)


  if (num_recovered && num_deaths) {
    make_pie_chart(num_recovered, num_deaths, state)

  }
  else {
    make_pie_chart(4464470, 2060053, state)

  }


}
function make_pie_chart(num_recovered, num_deaths, state) {
  d3.select("#piechart").selectAll('svg').remove();
  var svg = d3.select("#piechart")

  var Tooltip = svg
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("height", "30px")
    .style("width", "65px")
    .style("position", "absolute")
    .style("background-color", "rgba(0,0,0,0.75)")
    .style("color", "white")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style("font-family", "sans-serif")
    ;

  svg = svg.append("svg")
    .append("g");

  svg.append("g")
    .attr("class", "slices");
  svg.append("g")
    .attr("class", "labels");
  svg.append("g")
    .attr("class", "lines");


  var width = 400,
    height = 300,
    radius = Math.min(width, height) / 2;
  var anglesRange = 0.5 * Math.PI;
  var pie = d3.layout.pie()
    .sort(null)
    .value(function (d) {
      return d.value;
    })
    .startAngle(anglesRange * -1)
    .endAngle(anglesRange);

  var arc = d3.svg.arc()
    .outerRadius(radius * 0.9)
    .innerRadius(radius * 0.5);

  var outerArc = d3.svg.arc()
    .innerRadius(radius * 0.95)
    .outerRadius(radius * 0.95);

  svg.attr("transform", "translate(" + (width / 2 + 100) + "," + height / 2 + ")");

  var key = function (d) { return d.data.label; };

  var color = d3.scale.ordinal()
    .domain(["Deaths", "Recovered", "Admitted"])
    .range(["#98abc5", "#8a89a6", "#7b6888"]);

  function randomData() {
    var labels = color.domain();
    return labels.map(function (label) {
      return { label: label, value: Math.random() }
    });
  }
  var data = [{ "label": "Deaths (Scaled 5X)", "value": num_deaths * 5 },
  { "label": "Recovered", "value": num_recovered }];
  change(data);

  function change(data) {
    var slice = svg.select(".slices").selectAll("path.slice")
      .data(pie(data), key)
      ;

    slice.enter()
      .insert("path")
      .style("fill", function (d) { return color(d.data.label); })
      .attr("class", "slice")

      .on('mouseover', function (d) {
        Tooltip.html(d.data.value).style("opacity", 1).style("visibility", "visible")
          .style("top", (d3.event.pageY - 620) + "px")
          .style("left", (d3.event.pageX - 780) + "px");
        ;

      })
      .on('mouseout', function (d) { Tooltip.style("opacity", 0); }
      )
      ;

    slice
      .transition().duration(1000)
      .attrTween("d", function (d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function (t) {
          return arc(interpolate(t));
        };
      })

    slice.exit()
      .remove();


    var text = svg.select(".labels").selectAll("text")
      .data(pie(data), key);

    text.enter()
      .append("text")
      .attr("dy", ".35em")
      .text(function (d) {
        return d.data.label;
      })
      ;

    function midAngle(d) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }


    text.transition().duration(1000)
      .attrTween("transform", function (d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function (t) {
          var d2 = interpolate(t);
          var pos = outerArc.centroid(d2);

          pos[0] = radius * (midAngle(d2) > 0 ? 1 : -1);
          return "translate(" + pos + ")";
        };
      })
      .styleTween("text-anchor", function (d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function (t) {
          var d2 = interpolate(t);
          return midAngle(d2) > 0 ? "start" : "end";
        };
      });

    text.exit()
      .remove();


    var polyline = svg.select(".lines").selectAll("polyline")
      .data(pie(data), key);

    polyline.enter()
      .append("polyline");


    polyline.transition().duration(1000)
      .attrTween("points", function (d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function (t) {
          var d2 = interpolate(t);
          var pos = outerArc.centroid(d2);
          pos[0] = radius * 0.95 * (midAngle(d2) > 0 ? 1 : -1);
          return [arc.centroid(d2), outerArc.centroid(d2), pos];
        };
      });

    polyline.exit()
      .remove();
  };
}

function update_count(state, startDate = '', endDate = '') {























  fetch(`get_time_series_data/${state}/Confirmed?startDate=${startDate}&endDate=${endDate}`).then(response => response.json()).then((value) => {
    let sum = 0
    value.values.map((val) => {
      sum += val
    })

    document.getElementById('confcase_cnt').innerText = `${sum}`
  })

  fetch(`get_time_series_data/${state}/Recovered?startDate=${startDate}&endDate=${endDate}`).then(response => response.json()).then((value) => {
    let sum = 0
    value.values.map((val) => {
      sum += val
    })

    document.getElementById('confrcv_cases').innerText = `${sum}`
  })

  fetch(`get_time_series_data/${state}/Deaths?startDate=${startDate}&endDate=${endDate}`).then(response => response.json()).then((value) => {
    let sum = 0
    value.values.map((val) => {
      sum += val
    })
    document.getElementById('deaths').innerText = `${sum}`
  })

}





class Vector {
  #components;

  constructor(...components) {
    this.#components = components;
  }


  fromMagnitudeAngle2D(magnitude, angle) {
    if (magnitude <= 0) throw new Error("Magnitude must be positive and non-zero!");
    this.#components = [magnitude * Math.cos(angle), magnitude * Math.sin(angle)];
  }


  fromTwoPoints(point1, point2) {
    if (point1.length != point2.length) throw new Error("Points must have the same number of dimensions!");
    this.#components = point1.map((v, i) => point2[i] - v);
  }






  unit() {
    let newComponents = this.#components.map((c) => c / this.magnitude);
    return new Vector(...newComponents);
  }


  multiply(k) {
    let newComponents = this.#components.map((c) => k * c);
    return new Vector(...newComponents);
  }


  add(vect) {
    if (vect.size != this.size) throw new Error("Vectors must have the same dimensions!");
    let newComponents = this.#components.map((c, i) => c + vect.#components[i]);
    return new Vector(...newComponents);
  }


  subtract(vect) {
    if (vect.size != this.size) throw new Error("Vectors must have the same dimensions!");
    let newComponents = this.#components.map((c, i) => c - vect.#components[i]);
    return new Vector(...newComponents);
  }


  cross(vect) {
    if ((vect.size & this.size) != 3) throw new Error("Vectors must both be 3D!");
    let a = this.#components;
    let b = vect.#components;
    return new Vector(
      a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0]
    );
  }


  proj(vect) {
    return this.unit().multiply(this.scal(vect));
  }


  getCopy() {
    return new Vector(this.#components);
  }






  dot(vect) {
    if (vect.size != this.size) throw new Error("Vectors must have the same dimensions!");
    let newComponents = this.#components.map((c, i) => c * vect.#components[i]);
    let product = newComponents.reduce((a, b) => a + b);
    return product;
  }


  tripleScalarProduct(vect1, vect2) {
    return this.dot(vect1.cross(vect2));
  }


  angle(vect) {
    if (vect.size != this.size) throw new Error("Vectors must have the same dimensions!");
    return Math.acos(this.dot(vect) / (this.magnitude * vect.magnitude));
  }


  scal(vect) {
    return this.dot(vect) / this.magnitude;
  }



  get magnitude() {
    let sqauresSum = this.#components.reduce((a, b, i) => {
      if (i == 1) {
        return a * a + b * b;
      } else {
        return a + b * b
      }
    })
    return Math.sqrt(sqauresSum);
  }


  get size() {
    return this.#components.length;
  }


  toString() {
    return this.#components;
  }





  set magnitude(k) {
    this.#components = this.unit().multiply(k).#components;
  }



  isUnit() {
    return this.magnitude >= 0.9999999 && this.magnitude <= 1.0000001;
  }


  isEqual(vect) {
    return vect.#components.filter((v, i) => {
      return v <= this.#components[i] - 0.000001 || v >= this.#components[i] + 0.000001
    }).length == 0;
  }
}



const VectorConstants = {
  D2: {
    i: new Vector(1, 0),
    j: new Vector(0, 1)
  },
  D3: {
    i: new Vector(1, 0, 0),
    j: new Vector(0, 1, 0),
    k: new Vector(0, 0, 1)
  }
}

module.exports = { Vector, VectorConstants };




function make_time_series(state) {

  $.getJSON('/get_time_series_data/' + state + '/Confirmed', function (data) {
    var metricCount = data.values;
    var metricMonths = data.dates;
    var metricName = "";
    var optwidth = 600;
    var optheight = 370;

    make(metricCount, metricMonths, metricName, optwidth, optheight)
    sparkwrap();

  });
  function sparkwrap(startDate = '', endDate = '') {

    $.getJSON('/get_time_series_data/' + state + '/Deaths?startDate=' + startDate + '&endDate=' + endDate, function (data) {
      sparkline('#confdth_spark', data.values);
    });

    $.getJSON('/get_time_series_data/' + state + '/Recovered?startDate=' + startDate + '&endDate=' + endDate, function (data) {
      sparkline('#confrcv_spark', data.values);
    });

    $.getJSON('/get_time_series_data/' + state + '/Confirmed?startDate=' + startDate + '&endDate=' + endDate, function (data) {
      sparkline('#confcase_spark', data.values);
    });
  }

  function sparkline(elemId, olddata) {
    var width = 100;
    var height = 56;
    var x = d3.scale.linear().range([0, width - 2]);
    var y = d3.scale.linear().range([height - 4, 0]);
    data = []
    for (i = 0; i < olddata.length; i++) {
      data.push({ 'id': i, 'metric': olddata[i] })
    }
    d3.select(elemId).selectAll('*').remove();
    var line = d3.svg.line()
      .interpolate("basis")
      .x(function (d) { return x(d.id); })
      .y(function (d) { return y(d.metric); });

    x.domain(d3.extent(data, function (d) { return d.id; }));
    y.domain(d3.extent(data, function (d) { return d.metric; }));


    var svg = d3.select(elemId)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(0, 2)');
    svg.append('path')
      .datum(data)
      .attr('class', 'sparkline')
      .attr('d', line);
    svg.append('circle')
      .attr('class', 'sparkcircle')
      .attr('cx', x(data[data.length - 1].id))
      .attr('cy', y(data[data.length - 1].metric))
      .attr('r', 1.5);
  }
  function make(metricCount, metricMonths, metricName, optwidth, optheight) {


    var dataset = [];
    for (var i = 0; i < metricCount.length; i++) {
      var obj = { count: metricCount[i], month: metricMonths[i] };
      dataset.push(obj);
    }


    dataset.forEach(function (d) {
      d.month = d3.time.format("%Y-%m-%d").parse(d.month);
    });



    dataset.sort(function (x, y) {
      return d3.ascending(x.month, y.month);
    });






    var margin = { top: 20, right: 30, bottom: 100, left: 20 },
      width = optwidth - margin.left - margin.right,
      height = optheight - margin.top - margin.bottom;



    var margin_context = { top: 320, right: 30, bottom: 20, left: 20 },
      height_context = optheight - margin_context.top - margin_context.bottom;




    var dataXrange = d3.extent(dataset, function (d) { return d.month; });
    var dataYrange = [0, d3.max(dataset, function (d) { return d.count; })];


    var mindate = dataXrange[0],
      maxdate = dataXrange[1];

    var DateFormat = d3.time.format("%b %Y");

    var dynamicDateFormat = timeFormat([
      [d3.time.format("%Y"), function () { return true; }],
      [d3.time.format("%b %Y"), function (d) { return d.getMonth(); }],
      [function () { return ""; }, function (d) { return d.getDate() != 1; }]
    ]);









    var x = d3.time.scale()
      .range([0, (width)])
      .domain(dataXrange);


    var y = d3.scale.linear()
      .range([height, 0])
      .domain(dataYrange);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickSize(-(height))
      .ticks(customTickFunction)
      .tickFormat(dynamicDateFormat);

    var yAxis = d3.svg.axis()
      .scale(y)
      .ticks(4)
      .tickSize(-(width))
      .orient("right");



    var x2 = d3.time.scale()
      .range([0, width])
      .domain([mindate, maxdate]);

    var y2 = d3.scale.linear()
      .range([height_context, 0])
      .domain(y.domain());

    var xAxis_context = d3.svg.axis()
      .scale(x2)
      .orient("bottom")
      .ticks(customTickFunction)

      .tickFormat(dynamicDateFormat);


    var line = d3.svg.line()
      .x(function (d) { return x(d.month); })
      .y(function (d) { return y(d.count); });

    var area = d3.svg.area()
      .x(function (d) { return x(d.month); })
      .y0((height))
      .y1(function (d) { return y(d.count); });


    var area_context = d3.svg.area()
      .x(function (d) { return x2(d.month); })
      .y0((height_context))
      .y1(function (d) { return y2(d.count); });

    var line_context = d3.svg.line()
      .x(function (d) { return x2(d.month); })
      .y(function (d) { return y2(d.count); });


    var brush = d3.svg.brush()
      .x(x2)
      .on("brush", brushed)
      .on("brushend", brushend);

    var zoom = d3.behavior.zoom()
      .on("zoom", make)
      .on("zoomend", brushend);


    d3.select("#timesrs_dist").selectAll('svg').remove();
    var vis = d3.select("#timesrs_dist").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("class", "metric-chart");

    vis.append("defs").append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", width)
      .attr("height", height);

    var context = vis.append("g")
      .attr("class", "context")
      .attr("transform", "translate(" + margin_context.left + "," + margin_context.top + ")");

    var focus = vis.append("g")
      .attr("class", "focus")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var rect = vis.append("svg:rect")
      .attr("class", "pane")
      .attr("width", width)
      .attr("height", height)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(zoom)
      .call(make);


    var display_range_group = vis.append("g")
      .attr("id", "buttons_group")
      .attr("transform", "translate(" + 0 + "," + 0 + ")");

    var expl_text = display_range_group.append("text")
      .text("Showing data from: ")
      .style("text-anchor", "start")
      .attr("transform", "translate(" + 0 + "," + 10 + ")");

    display_range_group.append("text")
      .attr("id", "displayDates")
      .text(DateFormat(dataXrange[0]) + " - " + DateFormat(dataXrange[1]))
      .style("text-anchor", "start")
      .attr("transform", "translate(" + 82 + "," + 10 + ")");

    var expl_text = display_range_group.append("text")
      .text("Zoom to: ")
      .style("text-anchor", "start")
      .attr("transform", "translate(" + 180 + "," + 10 + ")");


    var button_width = 40;
    var button_height = 14;

    var dateRange = dataXrange[1] - dataXrange[0],
      ms_in_year = 31540000000;

    if (dateRange < ms_in_year) {
      var button_data = ["month", "data"];
    } else {
      var button_data = ["year", "month", "data"];
    };

    var button = display_range_group.selectAll("g")
      .data(button_data)

      .enter().append("g")
      .attr("class", "scale_button")
      .attr("transform", function (d, i) { return "translate(" + (220 + i * button_width + i * 10) + ",0)"; })
      .on("click", scaleDate);

    button.append("rect")
      .attr("width", button_width)
      .attr("height", button_height)
      .attr("rx", 1)
      .attr("ry", 1);

    button.append("text")
      .attr("dy", (button_height / 2 + 3))
      .attr("dx", button_width / 2)
      .style("text-anchor", "middle")
      .text(function (d) { return d; });

    focus.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .attr("transform", "translate(" + (width - 50) + ", 0)");

    focus.append("path")
      .datum(dataset)
      .attr("class", "area")
      .attr("d", area);

    focus.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);


    focus.append("path")
      .datum(dataset)
      .attr("class", "line")
      .attr("d", line);

    context.append("path")
      .datum(dataset)
      .attr("class", "area")
      .attr("d", area_context);

    context.append("path")
      .datum(dataset)
      .attr("class", "line")
      .attr("d", line_context);

    context.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height_context + ")")
      .call(xAxis_context);

    var brushg = context.append("g")
      .attr("class", "x brush")
      .call(brush);

    brushg.selectAll(".extent")
      .attr("y", -6)
      .attr("height", height_context + 8);

    brushg.selectAll(".resize")
      .append("rect")
      .attr("class", "handle")

      .attr("transform", "translate(0," + -3 + ")")
      .attr('rx', 2)
      .attr('ry', 2)
      .attr("height", height_context + 6)
      .attr("width", 3);

    brushg.selectAll(".resize")
      .append("rect")
      .attr("class", "handle-mini")
      .attr("transform", "translate(-2,8)")
      .attr('rx', 3)
      .attr('ry', 3)
      .attr("height", (height_context / 2))
      .attr("width", 7);

    vis.append("text")
      .attr("class", "y axis title")
      .text("Number of cases " + metricName)
      .attr("x", (-(height / 2)))
      .attr("y", 0)
      .attr("dy", "1em")
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "middle");


    zoom.x(x);

    function timeFormat(formats) {
      return function (date) {
        var i = formats.length - 1, f = formats[i];
        while (!f[1](date)) f = formats[--i];
        return f[0](date);

      };
    };

    function customTickFunction(t0, t1, dt) {
      var labelSize = 42;
      var maxTotalLabels = Math.floor(width / labelSize);

      function step(date, offset) {
        date.setMonth(date.getMonth() + offset);
      }

      var time = d3.time.month.ceil(t0), times = [], monthFactors = [1, 3, 4, 12];

      while (time < t1) times.push(new Date(+time)), step(time, 1);
      var timesCopy = times;
      var i;
      for (i = 0; times.length > maxTotalLabels; i++)
        times = _.filter(timesCopy, function (d) {
          return (d.getMonth()) % monthFactors[i] == 0;
        });

      return times;
    };



    function brushed() {
      x.domain(brush.empty() ? x2.domain() : brush.extent());
      focus.select(".area").attr("d", area);
      focus.select(".line").attr("d", line);
      focus.select(".x.axis").call(xAxis);

      zoom.x(x);
      updateDisplayDates();

      setYdomain();
    };

    function make() {
      setYdomain();
      focus.select(".area").attr("d", area);
      focus.select(".line").attr("d", line);
      focus.select(".x.axis").call(xAxis);
      brush.extent(x.domain());
      vis.select(".brush").call(brush);
      updateDisplayDates();
    };

    function brushend() {

      var b = brush.extent();
      var out_of_bounds = brush.extent().some(function (e) { return e < mindate | e > maxdate; });
      if (out_of_bounds) { b = moveInBounds(b) };

      var startdate = new Date(brush.extent()[0]).toLocaleDateString('en-us');
      var enddate = new Date(brush.extent()[1]).toLocaleDateString('en-us');
      window.temp = startdate;
      make_pie_chart_wrapper(state, startdate, enddate);
      populate_map(startdate, enddate);
      update_count(state, startdate, enddate);
      sparkwrap(startdate, enddate)
    };

    function updateDisplayDates() {

      var b = brush.extent();

      var localBrushDateStart = (brush.empty()) ? DateFormat(dataXrange[0]) : DateFormat(b[0]),
        localBrushDateEnd = (brush.empty()) ? DateFormat(dataXrange[1]) : DateFormat(b[1]);

      d3.select("#displayDates")
        .text(localBrushDateStart == localBrushDateEnd ? localBrushDateStart : localBrushDateStart + " - " + localBrushDateEnd);
    };

    function moveInBounds(b) {

      var ms_in_year = 31536000000,
        brush_start_new,
        brush_end_new;

      if (b[0] < mindate) { brush_start_new = mindate; }
      else if (b[0] > maxdate) { brush_start_new = new Date(maxdate.getTime() - ms_in_year); }
      else { brush_start_new = b[0]; };

      if (b[1] > maxdate) { brush_end_new = maxdate; }
      else if (b[1] < mindate) { brush_end_new = new Date(mindate.getTime() + ms_in_year); }
      else { brush_end_new = b[1]; };

      brush.extent([brush_start_new, brush_end_new]);

      brush(d3.select(".brush").transition());
      brushed();
      make();

      return (brush.extent())
    };

    function setYdomain() {

      var xleft = new Date(x.domain()[0]);
      var xright = new Date(x.domain()[1]);

      var bisectDate = d3.bisector(function (d) { return d.month; }).right;


      var iL = bisectDate(dataset, xleft);

      if (dataset[iL] !== undefined && dataset[iL - 1] !== undefined) {

        var left_dateBefore = dataset[iL - 1].month,
          left_dateAfter = dataset[iL].month;

        var intfun = d3.interpolateNumber(dataset[iL - 1].count, dataset[iL].count);
        var yleft = intfun((xleft - left_dateBefore) / (left_dateAfter - left_dateBefore));
      } else {
        var yleft = 0;
      }

      var iR = bisectDate(dataset, xright);

      if (dataset[iR] !== undefined && dataset[iR - 1] !== undefined) {

        var right_dateBefore = dataset[iR - 1].month,
          right_dateAfter = dataset[iR].month;

        var intfun = d3.interpolateNumber(dataset[iR - 1].count, dataset[iR].count);
        var yright = intfun((xright - right_dateBefore) / (right_dateAfter - right_dateBefore));
      } else {
        var yright = 0;
      }

      var dataSubset = dataset.filter(function (d) { return d.month >= xleft && d.month <= xright; });
      var countSubset = [];
      dataSubset.map(function (d) { countSubset.push(d.count); });


      countSubset.push(yleft);
      countSubset.push(yright);
      var ymax_new = d3.max(countSubset);

      if (ymax_new == 0) {
        ymax_new = dataYrange[1];
      }

      y.domain([0, ymax_new * 1.05]);
      focus.select(".y.axis").call(yAxis);

    };

    function scaleDate(d, i) {

      var b = brush.extent(),
        interval_ms,
        brush_end_new,
        brush_start_new;

      if (d == "year") { interval_ms = 31536000000 }
      else if (d == "month") { interval_ms = 2592000000 };

      if (d == "year" | d == "month") {

        if ((maxdate.getTime() - b[1].getTime()) < interval_ms) {
          brush_start_new = new Date(maxdate.getTime() - interval_ms);
          brush_end_new = maxdate;
        } else {
          brush_start_new = b[0];
          brush_end_new = new Date(b[0].getTime() + interval_ms);
        };

      } else if (d == "data") {
        // Filter regions by date range
        brush_start_new = dataXrange[0];
        brush_end_new = dataXrange[1]
      } else {
        brush_start_new = b[0];
        brush_end_new = b[1];
      };

      brush.extent([brush_start_new, brush_end_new]);

      brush(d3.select(".brush").transition());
      brush.event(d3.select(".brush").transition());
    };

  }

}


function populate_map(startDate = '', endDate = '') {
  var width = 650;
  height = 500;

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-5, 0])
    .html(function (d) {
      var dataRow = countryById.get(d.properties.name);
      if (dataRow) {
        return dataRow.states + " confirmed cases: " + dataRow.Confirmed;
      } else {
        return d.properties.name + ": 0";
      }
    })
  d3.select('#indmap').selectAll('*').remove();
  var svg = d3.select('#indmap')

    ;

  svg.call(tip);

  var projection = d3.geo.mercator()
    .center([78, 29])
    .scale(800)
    .translate([width / 2, height / 2]);

  var path = d3.geo.path()
    .projection(projection);

  var colorScale = d3.scale.linear().range(["#D4EEFF", "#8B0000"]).interpolate(d3.interpolateLab);

  var countryById = d3.map();
  queue()
    .defer(d3.json, 'static/data/INDIA.json')
    .defer(d3.csv, "http://localhost:6060/get_map_data?startDate=" + startDate + '&endDate=' + endDate, typeAndSet)
    .await(loaded);

  function typeAndSet(d) {
    // Filter regions by date range
    d.mortality = parseInt(d.Deaths);
    countryById.set(d.states, d);
    return d;
  }

  function getColor(d) {
    var dataRow = countryById.get(d.properties.name);
    if (dataRow) {
      return colorScale(dataRow.mortality);
    } else {
      return "#ccc";
    }
  }

  function loaded(error, india_1, mortality) {

    colorScale.domain(d3.extent(mortality, function (d) { return d.mortality; }));

    var states = topojson.feature(india_1, india_1.objects.in_slim).features;
    svg.selectAll('path.states')
      .data(states)
      .enter()
      .append('path')
      .attr('class', 'states')
      .attr('d', path)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .on('click', async function (d) {
        dashboard_click(d.properties.name, startDate, endDate);
        document.getElementById('pres_st').innerText = d.properties.name

        fetch(`get_time_series_data/${d.properties.name}/Confirmed?startDate=${startDate}&endDate=${endDate}`).then(response => response.json()).then((value) => {
          let sum = 0
          value.values.map((val) => {
            sum += val
          })

          document.getElementById('confcase_cnt').innerText = `${sum}`
        })

        fetch(`get_time_series_data/${d.properties.name}/Recovered?startDate=${startDate}&endDate=${endDate}`).then(response => response.json()).then((value) => {
          let sum = 0
          value.values.map((val) => {
            sum += val
          })

          document.getElementById('confrcv_cases').innerText = `${sum}`
        })

        fetch(`get_time_series_data/${d.properties.name}/Deaths?startDate=${startDate}&endDate=${endDate}`).then(response => response.json()).then((value) => {
          let sum = 0
          value.values.map((val) => {
            sum += val
          })
          document.getElementById('deaths').innerText = `${sum}`
        })

      })

      .attr('fill', function (d, i) {
        return getColor(d);
      })
      .append("title");

    var linear = colorScale;

    svg.append("g")
      .attr("class", "legendLinear")
      .attr("transform", "translate(20,20)");

    var legendLinear = d3.legend.color()
      .shapeWidth(60)
      .orient('horizontal')
      .scale(linear);

    svg.select(".legendLinear")
      .call(legendLinear);

  }
}





function populate_parallel() {
  var margin = { top: 30, right: 20, bottom: 20, left: 130 };
  var width = 800 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;
  $.ajax({
    type: "POST",
    url: '/hospitals',
    dataType: "json",
    data: JSON.stringify({ 'option': "whole" }),
    contentType: 'application/json;charset=UTF-8',
    success: function (data) {
      hospitals = JSON.parse(data.rows)
      cols = JSON.parse(data.cols)

      var dimensions = [{
        name: "State",
        scale: d3.scale.ordinal().rangePoints([0, height]),
        type: String
      }]
      for (i = 2; i < cols.length; i++) {
        var obj = {
          name: cols[i],
          scale: d3.scale.linear().range([height, 0]),
          type: Number
        };
        dimensions.push(obj)
      };

      var dragging = {};
      var foreground;
      var background;
      var y = {};

      var x = d3.scale.ordinal()
        .domain(dimensions.map(function (d) { return d.name; }))
        .rangePoints([0, width]);

      var line = d3.svg.line()
        .defined(function (d) { return !isNaN(d[1]); });

      var yAxis = d3.svg.axis()
        .orient("left");

      var svg = d3.select("#parallel")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var dimension = svg.selectAll(".dimension")
        .data(dimensions)
        .enter().append("g")
        .attr("class", "dimension")
        .attr("transform", function (d) { return "translate(" + x(d.name) + ")"; });

      d3.keys(hospitals[0]).filter(function (d) {
        y[d] = d3.scale.linear().domain(d3.extent(hospitals, function (p) { return +p[d]; })).range([height, 0]);
        return d != "State" && y[d];
      });

      dimensions.forEach(function (dimension) {
        dimension.scale.domain(dimension.type === Number
          ? d3.extent(hospitals, function (d) { return +d[dimension.name]; })
          : hospitals.map(function (d) { return d[dimension.name]; }));
      });

      var background = svg.append("g")
        .attr("class", "background")
        .selectAll("path")
        .data(hospitals)
        .enter().append("path")
        .attr("d", make);

      var foreground = svg.append("g")
        .attr("class", "foreground")
        .selectAll("path")
        .data(hospitals)
        .enter().append("path")
        .attr("d", make);

      function make(d) {
        return line(dimensions.map(function (dimension) {
          return [x(dimension.name), dimension.scale(d[dimension.name])];
        }));
      }

      dimension.append("g")
        .attr("class", "vaxis")
        .each(function (d) { d3.select(this).call(yAxis.scale(d.scale)); })
        .append("text")
        .attr("class", "title")
        .attr("text-anchor", "left")
        .attr("transform", "translate(0," + height + ")rotate(45)")

        .text(function (d) { return d.name; });

      svg.select(".vaxis").selectAll("text:not(.title)")
        .attr("class", "label")
        .data(hospitals, function (d) {
          return d.name || d;
        });

      var g = dimension.call(d3.behavior.drag()
        .origin(function (d) { console.log({ x: x(d.name) }); return { x: x(d.name) }; })
        .on("dragstart", function (d) {
          dragging[d.name] = x(d.name);
          background.attr("visibility", "hidden");
        })
        .on("drag", function (d) {
          dragging[d.name] = Math.min(width, Math.max(0, d3.event.x));
          foreground.attr("d", path);
          dimensions.sort(function (a, b) { return position(a.name) - position(b.name); });
          x.domain(dimensions);
          g.attr("transform", function (d) { return "translate(" + position(d.name) + ")"; })
        })
        .on("dragend", function (d) {
          delete dragging[d.name];

          transition(d3.select(this)).attr("transform", "translate(" + x(d.name) + ")");
          transition(foreground).attr("d", path);

          background
            .attr("d", path)
            .transition()
            .delay(500)
            .duration(0)
            .attr("visibility", null);
        }
        ));

      g.append("g")
        .attr("class", "brush")
        .each(function (d) {
          d3.select(this).call(y[d.name].brush = d3.svg.brush().y(y[d.name]).on("brushstart", brushstart).on("brush", brush));
        })
        .selectAll("rect")
        .attr("x", -8)
        .attr("width", 16);

      function position(d) {
        var v = dragging[d];
        return v == null ? x(d) : v;
      }

      function transition(g) {
        return g.transition().duration(500);
      }

      function path(d) {
        return line(dimensions.map(function (p) {
          return [position(p.name), y[p.name](d[p.name])];
        }));
      }


      function brushstart() {
        d3.event.sourceEvent.stopPropagation();
      }

      function brush() {
        var actives = dimensions.filter(function (p) { return !y[p.name].brush.empty(); }),
          extents = actives.map(function (p) { return y[p.name].brush.extent(); });
        foreground.style("display", function (d) {
          return actives.every(function (p, i) {
            return extents[i][0] <= d[p.name] && d[p.name] <= extents[i][1];
          }) ? null : "none";
        });
      }
    }
  });
}

function makeStackedArea() {
  function get_colors(n) {
    var colors = ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c",
      "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6",
      "#6a3d9a"];

    return colors[n % colors.length];
  }

  var margin = { top: 61, right: 140, bottom: 101, left: 50 },
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


  $.ajax({
    type: "POST",
    url: '/getconfirmedcases',
    dataType: "json",
    data: JSON.stringify({ 'option': "whole" }),
    contentType: 'application/json;charset=UTF-8',
    success: function (data) {
      var data = JSON.parse(data.rows)

      var x = d3.scale.linear()
        .range([0, width]);

      var y = d3.scale.linear()
        .range([height, 0]);

      var color = d3.scale.category10();

      var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(d3.max(data, function (d) { return d.day; }), "s");

      var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5, "s");

      var area = d3.svg.area()
        .x(function (d) { return x(d.day); })
        .y0(function (d) { return y(d.y0); })
        .y1(function (d) { return y(d.y0 + d.y); });


      var stack = d3.layout.stack()
        .values(function (d) { return d.values; });

      var svg = d3.select("#stackedarea").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      svg.append("text")
        .attr("x", 0)
        .attr("y", -40)
        .attr("dy", "0.71em")
        .attr("fill", "#000")
        .text("Confirmed Corona Cases By States")
        .style("font", "23px avenir")
        .style("fill", "#000000");


      svg.append("text")
        .attr("x", 0)
        .attr("y", 402)
        .attr("dy", "0em")
        .style("font", "12px avenir")
        .style("fill", "#000000")
        .text("This is a stacked area chart of the  time series data on Confirmed Corona Cases across different states in India.");

      color.domain(d3.keys(data[0]).filter(function (key) { return key !== "day" && key !== "total"; }));


      var browsers = stack(color.domain().map(function (name) {
        return {
          name: name,
          values: data.map(function (d) {
            return { day: d.day, y: d[name] * 1 };
          })
        };
      }));

      x.domain(d3.extent(data, function (d) { return d.day; }));
      y.domain([0, d3.max(data, function (d) { return d.total; })]);

      var browser = svg.selectAll(".browser")
        .data(browsers)
        .enter().append("g")
        .attr("class", "browser");

      browser.append("path")
        .attr("class", "area")
        .attr("d", function (d) { return area(d.values); })
        .style("fill", function (d, i) {
          return get_colors(i);
        });

      browser.append("text")
        .datum(function (d) { return { name: d.name, value: d.values[d.values.length - 1] }; })
        .attr("transform", function (d) { return "translate(" + x(d.value.day) + "," + y(d.value.y0 + d.value.y / 2) + ")"; })
        .attr("x", -6)
        .attr("dy", "-0.882em")
        .style("font", "15px avenir")
        .attr("transform", function (d) { return "translate(500," + y(d.value.y0 + d.value.y / 2) + ")"; })

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis).append("text")
        .attr("x", 350)
        .attr("y", 36)
        .attr("fill", "#000")
        .text("Days of Month")
        .style("font-weight", "bold");

      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -250)
        .attr("y", -40)
        .attr("dy", "0.3408em")
        .attr("fill", "#000")
        .text("Number of Confirmed Cases")
        .style("font-weight", "bold");

      var legend = svg.selectAll(".legend")
        .data(color.domain()).enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + (width + 20) + "," + 0 + ")");

      legend.append("rect")
        .attr("x", 0)
        .attr("y", function (d, i) { return 20 * i; })
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function (d, i) {
          return get_colors(i);
        });

      legend.append("text")
        .attr("x", 20)
        .attr("dy", "0.75em")
        .attr("y", function (d, i) { return 20 * i; })
        .text(function (d) { return d });

      legend.append("text")
        .attr("x", 0)
        .attr("y", -10)
        .text("States");
    }
  });
}




