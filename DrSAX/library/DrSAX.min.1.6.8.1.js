

var sax  = new window.AudioContext();
 var DAC = sax.destination;

  

//////////////////////////////////



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
   
    var DSX;
    var SPgain = SP.gain;

    if(typeof exports !== 'undefined') {
        DSX= exports;
    } else {
        DSX = root.DSX = {};


    }

//////////////////////////////////////////////////

DSX.sp1 = SPgain = SP.gain;




 OS = DSX.os0 = sax.createOscillator();

  DSX.os1 =OS1 = sax.createOscillator();
  DSX.os2 =OS2 = sax.createOscillator();
  DSX.os3 =OS3 = sax.createOscillator();

 

  DSX.get = function(a,b) {
       var sum =  a+b
        return version;
    }
    
////////////////////////dial control///////////////

 DSX.dial = AA = function(b,c){

var dial_10 = document.getElementById(b);
    dial_10.addEventListener("change",_dial10,false);

  function _dial10(dial_data){      
c.value= dial_data.target.value;
}

}

////////////////////////dial control///////////////


}());
