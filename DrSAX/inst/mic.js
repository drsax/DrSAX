window.onload = function() {
 context = new AudioContext();
}


function error() {
    alert('Stream generation failed.');
}
//////////////////////////////////////////////////////////


function getUserMedia(dictionary, callback) {
    try {
        navigator.getUserMedia = navigator.webkitGetUserMedia;  
        navigator.getUserMedia(dictionary, callback, error);
    } catch (e) {
        alert('getUserMedia threw exception :' + e);
    }
}


//////////// mic input ///////////

function micInputon() {

    getUserMedia(
      { "audio": 
                  { "mandatory": 
                                   {"googEchoCancellation": "false",},
                                                                         "optional": [] },

     },  gotMic);
                       }
                       

function micInputoff() {
          mic.disconnect(amp);
                       }


function gotMic(stream) {
    // Create an AudioNode from the stream.
mic =context.createMediaStreamSource(stream);
amp = context.createGain();
mic.connect(amp);
amp.connect(context.destination);

  }
