var svg = d3.select('body').append('svg')
.attr({
    width:960,
    height:500
});
var text1=svg.append('text')
.attr({
    x: 200,
    y: 250
})
var text2=svg.append('text')
.attr({
    x: 200,
    y: 300
})
//比较d3.mouse和d3.event的偏移坐标
svg.on("mousemove", function (d, i) {
console.log(d3.event);
var pos1 = "d3.mouse pos："+d3.mouse(d3.select("body")[0][0]);
var pos2 = "d3.event pos："+d3.event.offsetX+","+d3.event.offsetY;
text1.text(pos1);
text2.text(pos2);
});