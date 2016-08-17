

 var sax = new window.AudioContext();
 var DAC = sax.destination;
 var dataTO,dataID,dataTO1,dataID1,dataTO2,dataID2,dataT3,dataID3,
     dataTO4,dataID4,dataTO5,dataID5,dataTO6,dataID6,dataTO7,dataID7,
     dataTO8,dataID8,dataTO9,dataID9,dataTO10,dataID10;

  

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





/////////////////////////////////////////////////////////////////////////////

function we(b,c){

var dial_10 = document.getElementById(b);
    dial_10.addEventListener("change",_dial10,false);

  function _dial10(dial_data){      
c.value= dial_data.target.value;
}

}
