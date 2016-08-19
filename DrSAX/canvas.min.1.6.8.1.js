
  
(function() {

    var root = this;
    var DSC;
  

    if(typeof exports !== 'undefined') {
        DSC= exports;
    } else {
        DSC = root.DSC = {};


    }








 DSC.frm = frameLooper= function(a){


     var canvas = document.getElementById('analyser1');
     var ctx = canvas.getContext('2d');
  
  window.webkitRequestAnimationFrame(frameLooper);
 var fbc_array = new Uint8Array(ays.frequencyBinCount);
  ays.getByteFrequencyData(fbc_array);


  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  ctx.fillStyle = a; // Color of the bars
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