
 var DAX = new AudioContext();
var osc =DAX.createOscillator();

(function() {



    var root = this;
    var version = '1.0';
    var DrSAX;
  

    if(typeof exports !== 'undefined') {
        DrSAX= exports;
    } else {
        DrSAX = root.DrSAX = {};


    }

  DrSAX.abc ="dsdd"


  DrSAX.get = function(a,b) {
       var sum =  a+b
        return sum;
    }
    



}());











