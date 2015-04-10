function per_day_calc() {
    var week_total = document.getElementById("weekTotal").value;
    var week_bills = document.getElementById("weekBills").value;
    var week_savings = document.getElementById("weekSavings").value;
    var per_day = (Math.round(week_total-week_bills)/7);
    var three_month_savings = (week_savings*16);
    var year_savings = (week_savings*52);
    document.getElementById("weekAllowance").innerHTML = (" $" + (week_total - week_bills));
    document.getElementById("filler").innerHTML = ("OR");
    document.getElementById("perDayAllowance").innerHTML = (" $" + (Math.round((week_total - week_bills)/7)));
    document.getElementById("perWeekSavings").innerHTML = (" $" + week_savings);
    document.getElementById("perMonthSavings").innerHTML = (" $" + three_month_savings);
    document.getElementById("perYearSavings").innerHTML = (" $" + year_savings);

  var dataArray = [week_savings, three_month_savings, year_savings];
  var width = 500;
  var height = 500;

  var widthScale = d3.scale.linear()
                  .domain([0, year_savings])
                  .range([0, width]);

  var color = d3.scale.linear()
              .domain([0, year_savings])
              .range(["#B8FFB8", "#00B85C"]);

  var canvas = d3.select(".graph")
              .append("svg")
              .attr("width", width)
              .attr("height", height);

  var bars = canvas.selectAll("rect")
            .data(dataArray)
            .enter()
              .append("rect")
              .attr("width", function(d) { return widthScale(d); })
              .attr("height", 50)
              .attr("y", function(d, i) { return i * 75 })
              .attr("fill", function(d) { return color(d) })
              .attr("rx", "8")
              .attr("ry", "8");

}

function draw_graph() {
  var width = 960,
    height = 500,
    delay = 1000,
    duration = 150;

var sample = poissonDiscSampler(width, height, 10);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var s;

while (s = sample()) {
  if (!s[1]) continue;
  svg.append("line")
      .attr("x1", s[1][0])
      .attr("y1", s[1][1])
      .attr("x2", s[1][0])
      .attr("y2", s[1][1])
      .style("stroke-opacity", 0)
    .transition()
      .delay(s[0].depth * duration + delay)
      .duration(duration)
      .ease("linear")
      .style("stroke-opacity", 1)
      .attr("x2", s[0][0])
      .attr("y2", s[0][1]);
}

// Based on https://www.jasondavies.com/poisson-disc/
function poissonDiscSampler(width, height, radius) {
  var k = 30, // maximum number of samples before rejection
      radius2 = radius * radius,
      R = 3 * radius2,
      cellSize = radius * Math.SQRT1_2,
      gridWidth = Math.ceil(width / cellSize),
      gridHeight = Math.ceil(height / cellSize),
      grid = new Array(gridWidth * gridHeight),
      queue = [],
      queueSize = 0,
      sampleSize = 0;

  return function() {
    if (!sampleSize) {
      var s1 = [Math.random() * width, Math.random() * height];
      s1.depth = 0;
      return sample(s1, null);
    }

    // Pick a random existing sample and remove it from the queue.
    while (queueSize) {
      var i = Math.random() * queueSize | 0,
          s = queue[i];

      // Make a new candidate between [radius, 2 * radius] from the existing sample.
      for (var j = 0; j < k; ++j) {
        var a = 2 * Math.PI * Math.random(),
            r = Math.sqrt(Math.random() * R + radius2),
            x = s[0] + r * Math.cos(a),
            y = s[1] + r * Math.sin(a);

        // Reject candidates that are outside the allowed extent,
        // or closer than 2 * radius to any existing sample.
        if (0 <= x && x < width && 0 <= y && y < height && far(x, y)) return sample([x, y], s);
      }

      queue[i] = queue[--queueSize];
      queue.length = queueSize;
    }
  };

  function far(x, y) {
    var i = x / cellSize | 0,
        j = y / cellSize | 0,
        i0 = Math.max(i - 2, 0),
        j0 = Math.max(j - 2, 0),
        i1 = Math.min(i + 3, gridWidth),
        j1 = Math.min(j + 3, gridHeight);

    for (j = j0; j < j1; ++j) {
      var o = j * gridWidth;
      for (i = i0; i < i1; ++i) {
        if (s = grid[o + i]) {
          var s,
              dx = s[0] - x,
              dy = s[1] - y;
          if (dx * dx + dy * dy < radius2) return false;
        }
      }
    }

    return true;
  }

  function sample(s1, s0) {
    if (s0) s1.depth = s0.depth + 1;
    queue.push(s1);
    grid[gridWidth * (s1[1] / cellSize | 0) + (s1[0] / cellSize | 0)] = s1;
    ++sampleSize;
    ++queueSize;
    return [s1, s0];
  }
}
}


$(document).ready(function(){
    $(".buttonOne").click(function(){
        $("#weekAllowance").fadeIn(1000);
        $('html, body').animate({ scrollTop: $('#weekAllowance').offset().top }, 3000);
        $("#filler").fadeIn(2000);
        $("#perDayAllowance").fadeIn(4000);
        $("#perDayAllowanceTag").fadeIn(5000);
        $(".buttonTwo").fadeIn(5000);
        $(".graph").fadeIn(5000);
    });
});

$(".buttonTwo").click(function() {
  $('html, body').animate({ scrollTop: $('#buttonTwo').offset().top }, 3000);
});
