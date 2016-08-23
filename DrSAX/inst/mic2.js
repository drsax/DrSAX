window.onload = function() {
 context = new AudioContext();
}

var mic;

    micsound =function(){

     navigator.webkitGetUserMedia(

                {audio: true, video: false},

                function (stream) {
                    mic = context.createMediaStreamSource(stream);
                },
                function (error) {
                    alert('Unable to get the user media');
                }
            );
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


