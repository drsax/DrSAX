window.onload = function() {
 context = new AudioContext();
}

var mic;

    micsound =function(){

     navigator.webkitGetUserMedia({audio: true},aaa,bbb);

                function aaa(stream) {
                    mic = context.createMediaStreamSource(stream);
                };

                function bbb() {};
           
    }
 

 micsound();

////////////////////////////////////////////////////




//////////// mic input ///////////

function micInputon() {

  
amp = context.createGain();
mic.connect(amp);
amp.connect(context.destination);
                       }
                       

function micInputoff() {
          mic.disconnect(amp);
                       }
