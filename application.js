function per_day_calc() {
    var week_total = document.getElementById("weekTotal").value;
    var week_bills = document.getElementById("weekBills").value;
    var per_day = (Math.round(week_total-week_bills)/7)
    document.getElementById("weekAllowance").innerHTML = (" $" + (week_total - week_bills));
    document.getElementById("filler").innerHTML = ("OR");
    document.getElementById("perDayAllowance").innerHTML = (" $" + (Math.round((week_total - week_bills)/7)));
    document.getElementById("perDayAllowanceTag").innerHTML = ("Per Day");
}

$(document).ready(function(){
    $("button").click(function(){
        $("#weekAllowance").fadeIn(1000);
        $('html, body').animate({ scrollTop: $('#weekAllowance').offset().top }, 3000);
        $("#filler").fadeIn(2000);
        $("#perDayAllowance").fadeIn(4000);
        $("#perDayAllowanceTag").fadeIn(5000);
    });
});

function bar_graph() {

  var week_total = document.getElementById("weekTotal").value;
  var week_bills = document.getElementById("weekBills").value;
  var per_day = (Math.round(week_total-week_bills)/7)
  var data = [per_day, per_day]; // here are the data values; v1 = total, v2 = current value

  var chart = d3.select("#graph").append("svg") // creating the svg object inside the container div
    .attr("class", "chart")
    .attr("width", 200) // bar has a fixed width
    .attr("height", 20 * data.length);

  var x = d3.scale.linear() // takes the fixed width and creates the percentage from the data values
    .domain([0, d3.max(data)])
    .range([0, 200]);

  chart.selectAll("rect") // this is what actually creates the bars
    .data(data)
  .enter().append("rect")
    .attr("width", x)
    .attr("height", 20)
    .attr("rx", 5) // rounded corners
    .attr("ry", 5);

  chart.selectAll("text") // adding the text labels to the bar
    .data(data)
  .enter().append("text")
    .attr("x", x)
    .attr("y", 10) // y position of the text inside bar
    .attr("dx", -3) // padding-right
    .attr("dy", ".35em") // vertical-align: middle
    .attr("text-anchor", "end") // text-align: right
    .text(String);
}
