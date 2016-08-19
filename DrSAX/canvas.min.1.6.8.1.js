
  
(function() {

    var root = this;
    var CNV;


    if(typeof exports !== 'undefined') {
        CNV= exports;
    } else {
        CNV = root.CNV = {};

    }

 var d=document;
d.g=document.getElementById;
var canvas = d.g("can1")

  var ctx = canvas.getContext('2d');


 CNV.frm = cnvGo= function(gg){
  window.requestAnimationFrame(cnvGo);
 var fbc_array = new Uint8Array(ays.frequencyBinCount);
  ays.getByteFrequencyData(fbc_array);


  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  ctx.fillStyle = gg; // Color of the bars
 var  bars = 200;
  for (var i = 0; i < bars; i++) {
   var bar_x = i * 3;
   var bar_width = 2;
   var bar_height = -(fbc_array[i] / 2);
    //  fillRect( x, y, width, height ) // Explanation of the parameters below
    ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
  }


}













}());