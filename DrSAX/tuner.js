  
var detectorElem, canvasElem,  pitchElem, noteElem, detuneElem, detuneAmount;
var theBuffer = null;
  detectorElem = document.getElementById( "detector" );

  pitchElem = document.getElementById( "pitch" );
  noteElem = document.getElementById( "note" );
  detuneElem = document.getElementById( "detune" );
  detuneAmount = document.getElementById( "detune_amt" );

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
var MIN_SAMPLES = 0;  // will be initialized when AudioContext is created.

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


  if (rms<0.01) // not enough signal
    return -1;
  var lastCorrelation=1;
  for (var offset = MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
    var correlation = 0;
    for (var i=0; i<MAX_SAMPLES; i++) {
      correlation += Math.abs((buf[i])-(buf[i+offset]));
    }
    correlation = 1 - (correlation/MAX_SAMPLES);
    correlations[offset] = correlation; // store it, for the tweaking we need to do below.
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
    // console.log("f = " + sampleRate/best_offset + "Hz (rms: " + rms + " confidence: " + best_correlation + ")")
    return sampleRate/best_offset;
  }
  return -1;
//  var best_frequency = sampleRate/best_offset;
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
    detuneElem.className = "";
    detuneAmount.innerText = "--";
  } else {
    detectorElem.className = "confident";
    pitch = ac;
    pitchElem.innerText = Math.round( pitch ) ;
    var note =  noteFromPitch( pitch );
    noteElem.innerHTML = noteStrings[note%12];
    var detune = centsOffFromPitch( pitch, note );


    if (detune == 0 ) {
      detuneElem.className = "";
      detuneAmount.innerHTML = "--";
    } else {

      if (detune < 0)
        detuneElem.className = "flat";
      else
        detuneElem.className = "sharp";
      detuneAmount.innerHTML = Math.abs( detune );
    }
  }
  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = window.webkitRequestAnimationFrame;
  rafID = window.requestAnimationFrame( updatePitch );
}