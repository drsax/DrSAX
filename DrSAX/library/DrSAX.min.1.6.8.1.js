

 var sax = new window.AudioContext();
 var DAC = sax.destination;

  

//////////////////////////////////


OS = sax.createOscillator();
OS1 = sax.createOscillator();
OS2 = sax.createOscillator();
OS3 = sax.createOscillator();

SP = sax.createGain();
SP1 = sax.createGain();
SP2 = sax.createGain();
SP3 = sax.createGain();


SPgain = SP.gain;
SPgain1 = SP.gain;
SPgain2 = SP.gain;
SPgain3 = SP.gain;



function OSval(a,b){  

OSfreq = OS.frequency;

OSfreq.value = a;
OS.type = b;

} 

function OS1val(a,b){ 

OS1freq = OS1.frequency; 
OS1freq.value = a;
OS1.type = b;

} 





/////////////////////////////////////////////////////////////////////////////




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
    
////////////////////////dial control///////////////

 DrSAX.dial = function(b,c){

var dial_10 = document.getElementById(b);
    dial_10.addEventListener("change",_dial10,false);

  function _dial10(dial_data){      
c.value= dial_data.target.value;
}

}

////////////////////////dial control///////////////


}());
