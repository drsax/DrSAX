
var sax  = new window.AudioContext();


  
(function() {



    var root = this;
    var version = '1.0';
   
    var DSX;
  

    if(typeof exports !== 'undefined') {
        DSX= exports;
    } else {
        DSX = root.DSX = {};


    }









//////////////////////////////////////////////////
 DSX.dac = DAC = sax.destination;


DSX.os0 = OS = sax.createOscillator();
  DSX.os1 =OS1 = sax.createOscillator();
  DSX.os2 =OS2 = sax.createOscillator();
  DSX.os3 =OS3 = sax.createOscillator();





DSX.sp0 = SP = sax.createGain();
DSX.sp1= SP1 = sax.createGain();
DSX.sp2= SP2 = sax.createGain();
DSX.sp3 = SP3 = sax.createGain();



DSX.spg0 = SPgain = SP.gain;
DSX.spg1 =SPgain1 = SP.gain;
DSX.spg2 =SPgain2 = SP.gain;
DSX.spg3 =SPgain3 = SP.gain;



DSX.ays1 =ays = sax.createAnalyser();
 DSX.ays2 =ays2 = sax.createAnalyser();

  DSX.get = function(a,b) {
       var sum =  a+b
        return version;
    }
    


/////////////////////////OSC INPUT /////////////////





DSX.osf=OSfreq = OS.frequency;



DSX.osval0= OSval = function OSval(a,b){ 

OSfreq = OS.frequency; 
OSfreq.value = a;
OS.type = b;

} 



DSX.osval1= OS1val = function OS1val(a,b){ 

OS1freq = OS1.frequency; 
OS1freq.value = a;
OS1.type = b;

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