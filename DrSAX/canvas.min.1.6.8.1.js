
  
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


////////////////////////////////// amp ////////////////////////////

 

    var sampleSize = 1024;  
    var amplitudeArray,a;         
    var column = 0;
    var canvasWidth  = 300;
    var canvasHeight = 150;

   var   canvas2 = document.getElementById('can2');
   var ctx2 = canvas2.getContext('2d');
     
   
/*aa();
     function aa()
     {

                  drawTimeDomain();
             SP.connect(ays2); 
            column = 0;
            ctx2.clearRect(0, 0, canvasWidth, canvasHeight);
            clearInterval(a);
     }
        function bb()
     {

    SP.disconnect(ays2); 
     column = 0;
            ctx2.clearRect(0, 0, canvasWidth, canvasHeight);
  a = setInterval(function(){ 
  column = 0;
     }, 10);
                         } */



  CNV.frm3 = cnvGo2= function dfad(a) {
        window.webkitRequestAnimationFrame(cnvGo2);
        amplitudeArray = new Uint8Array(ays2.frequencyBinCount);
        ays2.getByteTimeDomainData(amplitudeArray);

        var minValue = 9999999;
        var maxValue = 0;
        for (var i = 0; i < amplitudeArray.length; i++) {
            var value = amplitudeArray[i] / 256;
            if(value > maxValue) {
                maxValue = value;
            } else if(value < minValue) {
                minValue = value;
            }
        }
        var y_lo = canvasHeight - (canvasHeight * minValue) - 1;
        var y_hi = canvasHeight - (canvasHeight * maxValue) - 1;
        ctx2.fillStyle = a;
        ctx2.fillRect(column,y_lo, 1, y_hi - y_lo);
        // loop around the canvas when we reach the end
        column += 1;
        if(column >= canvasWidth) {
            column = 0;
            ctx2.clearRect(0, 0, canvasWidth, canvasHeight);
        }
    }
   


/////////////////////  FFT CANVAS SPECTRUM/////////////////













  
  




}());