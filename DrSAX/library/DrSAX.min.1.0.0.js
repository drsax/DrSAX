// DrSAX.min.1.0.0.js 
//2016, 08, 15

 var sax = new window.AudioContext();
 var DAC = sax.destination;




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



OSval = function(a,b){  

OSfreq = OS.frequency;

OSfreq.value = a;
OS.type = b;

} 

OS1val = function(a,b){ 

OS1freq = OS1.frequency; 
OS1freq.value = a;
OS1.type = b;

} 
