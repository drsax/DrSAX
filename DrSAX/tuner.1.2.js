  
var detectorElem, canvasElem,  pitchElem, noteElem;
var theBuffer = null;
  detectorElem = document.getElementById( "detector" );
  pitchElem = document.getElementById( "pitch" );
  noteElem = document.getElementById( "note" );


var rafID = null;
var tracks = null;
var buflen = 1024;
var buf = new Float32Array( buflen );
var noteStrings = ["C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
function noteFromPitch( frequency ) {
  var noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
  return Math.round( noteNum ) + 69;
}
function frequencyFromNoteNumber( note ) {
  return 440 * Math.pow(2,(note-69)/12);
}
function centsOffFromPitch( frequency, note ) {
  return Math.floor( 1200 * Math.log( frequency / frequencyFromNoteNumber( note ))/Math.log(2) );
}
var MIN_SAMPLES = 0;  

function autoCorrelate( buf, sampleRate ) {
  var SIZE = buf.length;
  var MAX_SAMPLES = Math.floor(SIZE/2);
  var best_offset = -1;
  var best_correlation = 0;
  var rms = 0;
  var foundGoodCorrelation = false;
  var correlations = new Array(MAX_SAMPLES);


  for (var i=0;i<SIZE;i++) {
    var val = buf[i];
    rms += val*val;
  }
  rms = Math.sqrt(rms/SIZE);


  if (rms<0.01) 
    return -1;
  var lastCorrelation=1;
  for (var offset = MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
    var correlation = 0;
    for (var i=0; i<MAX_SAMPLES; i++) {
      correlation += Math.abs((buf[i])-(buf[i+offset]));
    }
    correlation = 1 - (correlation/MAX_SAMPLES);
    correlations[offset] = correlation; 
    if ((correlation>0.9) && (correlation > lastCorrelation)) {
      foundGoodCorrelation = true;
      if (correlation > best_correlation) {
        best_correlation = correlation;
        best_offset = offset;
      }
    } else if (foundGoodCorrelation) {
      
      var shift = (correlations[best_offset+1] - correlations[best_offset-1])/correlations[best_offset];  
      return sampleRate/(best_offset+(8*shift));
    }
    lastCorrelation = correlation;
  }

  if (best_correlation > 0.01) {

    return sampleRate/best_offset;
  }
  return -1;

}


function updatePitch( time ) {
  var cycles = new Array;
  analyser.getFloatTimeDomainData( buf );
  var ac = autoCorrelate( buf, audioContext.sampleRate );
  // TODO: Paint confidence meter on canvasElem here.

  if (ac == -1) {
    detectorElem.className = "vague";
    pitchElem.innerText = "440";
    noteElem.innerText = "A";

 

  
  } else {
    detectorElem.className = "confident";
    pitch = ac;
    pitchElem.innerText = Math.round( pitch ) ;
    var note =  noteFromPitch( pitch );
    noteElem.innerHTML = noteStrings[note%12];



  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = window.webkitRequestAnimationFrame;
  rafID = window.requestAnimationFrame( updatePitch );
}


