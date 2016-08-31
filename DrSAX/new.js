(function(root) {
	'use strict';

	var DSX = {};


	root.DSX  = DSX;

	var AudioContext = root.AudioContext ; 



	var SAX = new AudioContext();

	var master = SAX.createGain();
	master.connect(SAX.destination);






	DSX.Sound = function(data) {

 	(OS_connect.bind(this))(data.DSXdata);
 		
	
		this.gain1 =SAX.createGain();
		this.gain1.connect(master);
		 this.gain1.gain.value=0.7;


		function OS_connect(val) {
	

			this.preset = function() {

		    var os1 = SAX.createOscillator();

			
				os1.type = val.ty || 'sine';
				os1.frequency.value = val.frequen || 440;

		
				return os1;	};

			this.OS_connect = this.preset();


	                             }
	


	
		
	};
	
	
	DSX.Sound.prototype = Object.create(null, {
	
		play: {
	
	           value: function() {
	           var sou = this.preset();
				sou.connect(this.gain1);
			     sou.start(0);
				  
			}
		},
	
	
		freq: {
			value: function(a) {
					this.osc1.frequency.value = a;
				}
		},
	

		ty: {
			value: function(ty) {
					this.osc1.type = ty;
				}
		},	


       amp: {
	 		value: function(amp) {
				     this.gain1.gain.value  = amp;
				}
		},	


	
	});
	



	
	
	return DSX;
})(window);






