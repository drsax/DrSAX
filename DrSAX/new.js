(function(root) {
	'use strict';

	var DSX = {};


	root.DSX  = DSX;

	var AudioContext = root.AudioContext ; 



	var abc = new AudioContext();

	var master = abc.createGain();
	master.connect(abc.destination);





	DSX.Sound = function(data) {


		this.gain1 = abc.createGain();
		this.gain1.connect(master);
	

		(sound1.bind(this))(data.DSXdata);
	

	
		function sound1(sss) {
		
			this.preset = function() {

		    var os = abc.createOscillator();

			
				os.type = sss.ty || 'sine';
				os.frequency.value = sss.frequen || 440;
		
				return os;	};

			this.osc1 = this.preset();
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
			set: function(a) {
					this.osc1.frequency.value = a;
				}
		},
	

		ty: {
			set: function(ty) {
					this.osc1.type = ty;
				}
		},	
	
	});
	

	
	
	return DSX;
})(window);






