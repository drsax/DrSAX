(function(window) {

    var drsaxContext,
        drsaxInstance,


   
        Super = Object.create(null, {
            activate: {
                writable: true,
                value: function(doActivate) {
                    if (doActivate) {
                        this.input.disconnect();
                        this.input.connect(this.activateNode);
                        if (this.activateCallback) {
                            this.activateCallback(doActivate);
                        }
                    } else {
                        this.input.disconnect();
                        this.input.connect(this.output);
                    }
                }
            },
            bypass: {
                get: function() {
                    return this._bypass;
                },
                set: function(value) {
                    if (this._lastBypassValue === value) {
                        return;
                    }
                    this._bypass = value;
                    this.activate(!value);
                    this._lastBypassValue = value;
                }
            },
            connect: {
                value: function(target) {
                    this.output.connect(target);
                }
            },
            disconnect: {
                value: function(target) {
                    this.output.disconnect(target);
                }
            },
            connectInOrder: {
                value: function(nodeArray) {
                    var i = nodeArray.length - 1;
                    while (i--) {
                        if (!nodeArray[i].connect) {
                            return console.error(" Not an AudioNode.", nodeArray[i]);
                        }
                        if (nodeArray[i + 1].input) {
                            nodeArray[i].connect(nodeArray[i + 1].input);
                        } else {
                            nodeArray[i].connect(nodeArray[i + 1]);
                        }
                    }
                }
            },
            getDefaults: {
                value: function() {
                    var result = {};
                    for (var key in this.defaults) {
                        result[key] = this.defaults[key].value;
                    }
                    return result;
                }
            },
            automate: {
                value: function(property, value, duration, startTime) {
                    var start = startTime ? ~~(startTime / 1000) : userContext.currentTime,
                        dur = duration ? ~~(duration / 1000) : 0,
                        _is = this.defaults[property],
                        param = this[property],
                        method;

                    if (param) {
                        if (_is.automatable) {
                            if (!duration) {
                                method = "setValueAtTime";
                            } else {
                                method = "linearRampToValueAtTime";
                                param.cancelScheduledValues(start);
                                param.setValueAtTime(param.value, start);
                            }
                            param[method](value, dur + start);
                        } else {
                            param = value;
                        }
                    } else {
                        console.error("Invalid Property for " + this.name);
                    }
                }
            }
        }),


        FLOAT = "float",
        BOOLEAN = "boolean",
        STRING = "string",
        INT = "int";





//////////object and AUDIOCONTEXT///////////////////////////////////////////////////////////

var root = this;

var AudioContext = root.AudioContext;
          drsax = new AudioContext();

    if (typeof module !== "undefined" && module.exports) {
        module.exports = DSX;
    }  else {
        window.DSX = DSX;
    }


    function DSX() {
        if (!(this instanceof DSX)) {
            return new DSX;
        }
        

        connectify(drsax);
        drsaxContext = drsax;
        drsaxInstance = this;
    }


/////////////////////////////////////////////////////////////////


    function connectify(sax) {
        if (sax.__connectified__ === true) return;

        var gain = sax.createGain(),
            proto = Object.getPrototypeOf(Object.getPrototypeOf(gain)),
            oconnect = proto.connect;

        proto.connect = shimConnect;
       sax.__connectified__ = true; // Prevent overriding connect more than once

        function shimConnect() {
            var node = arguments[0];
            arguments[0] = Super.isPrototypeOf ? (Super.isPrototypeOf(node) ? node.input : node) : (node.input || node);
            oconnect.apply(this, arguments);
            return node;
        }
    }


    
    function initValue(userVal, defaultVal) {
        return userVal === undefined ? defaultVal : userVal;
    }

  
//////////////Delay/////////////////
    
    DSX.prototype.Delay = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.input = drsaxContext.createGain();
        this.activateNode = drsaxContext.createGain();

        this.delay = drsaxContext.createDelay();
        this.feedbackNode = drsaxContext.createGain();
        this.output = drsaxContext.createGain();

        this.activateNode.connect(this.delay);
        this.delay.connect(this.feedbackNode);
        this.feedbackNode.connect(this.delay);
        this.delay.connect(this.output);

         this.delayTime = properties.delayTime || this.defaults.delayTime.value;
        this.feedback = initValue(properties.feedback, this.defaults.feedback.value);
        this.bypass = properties.bypass || false;
    };
    DSX.prototype.Delay.prototype = Object.create(Super, {
        name: {
            value: "Delay"
        },
        defaults: {
            writable: true,
            value: {
                delayTime: {
                    value: 100,
                    min: 20,
                    max: 1000,
                    automatable: false,
                    type: FLOAT
                },
                feedback: {
                    value: 0.45,
                    min: 0,
                    max: 0.9,
                    automatable: true,
                    type: FLOAT
                },

        


            }
        },
        delayTime: {
            enumerable: true,
            get: function() {
                return this.delay.delayTime;
            },
            set: function(value) {
                this.delay.delayTime.value = value / 1000;
            }
        },
       
        feedback: {
            enumerable: true,
            get: function() {
                return this.feedbackNode.gain;
            },
            set: function(value) {
                this.feedbackNode.gain.value = value;
            }
        }
    });


//////stereopanning/////////////////////////////////////////
 
   DSX.prototype.stereoPan = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.input = drsaxContext.createGain();
        this.activateNode = drsaxContext.createGain();
        this.stereoPan= drsaxContext.createStereoPanner();
        this.output = drsaxContext.createGain();

        this.activateNode.connect(this.stereoPan);
        this.stereoPan.connect(this.output);


         this.pan = properties.pan || this.defaults.pan.value;
        this.bypass = properties.bypass || false;
    };
    DSX.prototype.stereoPan.prototype = Object.create(Super, {
        name: {
            value: "stereoPan"
        },
        defaults: {
            writable: true,
            value: {
               pan: {
                    value: 0,
                    min: -1,
                    max: 1,
                    automatable: false,
                    type: FLOAT
                },
                
            }
        },


     pan: {
            enumerable: true,
            get: function() {
                return this.pan.value;
            },
            set: function(value) {
                this.stereoPan.pan.value = value ;
            }
        }
    });


//////////saxComp//////////////////////////////////////////

DSX.prototype.saxComp = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.input = drsaxContext.createGain();
        this.activateNode = drsaxContext.createGain();

        this.saxComp = drsaxContext.createDynamicsCompressor();
        this.output = drsaxContext.createGain();

        this.activateNode.connect(this.saxComp);
        this.saxComp.connect(this.output);

         this.threshold = properties.threshold || this.defaults.threshold.value;
         this.knee = properties.knee || this.defaults.knee.value;
         this.ratio = properties.ratio || this.defaults.ratio.value;
         this.reduction = properties.reduction || this.defaults.reduction.value;
         this.attack = properties.attack || this.defaults.attack.value;
        this.release = properties.release || this.defaults.release.value;
        this.bypass = properties.bypass || false;
    };
    DSX.prototype.saxComp.prototype = Object.create(Super, {
        name: {
            value: "saxComp"
        },
        defaults: {
            writable: true,
            value: {
               threshold: {
                    value: -70,
                    min: -100,
                    max: 0,
                    automatable: false,
                    type: FLOAT
                },
                knee: {
                    value: 40,
                    min: 0,
                    max: 100,
                    automatable: true,
                    type: FLOAT
                },

                ratio: {
                    value: 12,
                    min: 0,
                    max: 15,
                    automatable: true,
                    type: FLOAT
                },
                reduction: {
                    value: -20,
                    min: -40,
                    max: 0,
                    automatable: true,
                    type: FLOAT
                },

                attack: {
                    value: 0,
                    min: 0,
                    max: 5,
                    automatable: true,
                    type: FLOAT
                },

                release: {
                    value: 0.25,
                    min: 0,
                    max: 0.5,
                    automatable: true,
                    type: FLOAT
                },

            }
        },
        threshold: {
            enumerable: true,
            get: function() {
                return this.saxComp.threshold;
            },
            set: function(value) {
                this.saxComp.threshold.value = value;
            }
        },
       
        knee: {
            enumerable: true,
            get: function() {
                return this.saxComp.knee;
            },
            set: function(value) {
                this.saxComp.knee.value = value;
            }
        },
          ratio: {
            enumerable: true,
            get: function() {
                return this.saxComp.ratio;
            },
            set: function(value) {
                this.saxComp.ratio.value = value;
            }
        },
           reduction: {
            enumerable: true,
            get: function() {
                return this.saxComp.reduction;
            },
            set: function(value) {
                this.saxComp.reduction.value = value;
            }
        },
          attack: {
            enumerable: true,
            get: function() {
                return this.saxComp.attack;
            },
            set: function(value) {
                this.saxComp.attack.value = value;
            }
        },
          release: {
            enumerable: true,
            get: function() {
                return this.saxComp.release;
            },
            set: function(value) {
                this.saxComp.release.value= value;
            }
        }
    });





////////5EQ////////////////////////////////////////

DSX.prototype.EQ = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.input = drsaxContext.createGain();
        this.activateNode = drsaxContext.createGain();


        this.high = drsaxContext.createBiquadFilter();
        this.midhigh = drsaxContext.createBiquadFilter();
        this.mid= drsaxContext.createBiquadFilter();
        this.midlow = drsaxContext.createBiquadFilter();
        this.low = drsaxContext.createBiquadFilter();

        this.output = drsaxContext.createGain();

        this.activateNode.connect(this.high);
        this.high.connect(this.midhigh);
        this.midhigh.connect(this.mid);
        this.mid.connect(this.midlow);
        this.midlow.connect(this.low);
        this.low.connect(this.output);


    
        this.high.type = "highshelf";
        this.midhigh.type = "highshelf"; 
        this.mid.type = "peaking";
        this.midlow.type = "lowshelf";
        this.low.type = "lowshelf";
        this.high.frequency.value = 13000;
        this.midhigh.frequency.value = 4000;
        this.mid.frequency.value = 1000;
        this.midlow.frequency.value = 250;
        this.low.frequency.value = 62.5;
        this.mid.Q.value = 1;





      
         this.hiGain = properties.hiGain || this.defaults.hiGain.value;
         this.mhiGain = properties.mhiGain || this.defaults.mhiGain.value;
         this.miGain = properties.miGain || this.defaults.miGain.value;
         this.milowGain = properties.milowGain || this.defaults.milowGain.value;
         this.lowGain = properties.lowGain || this.defaults.lowGain.value;

         this.bypass = properties.bypass || false;


    };




    DSX.prototype.EQ.prototype = Object.create(Super, {
        name: {
            value: "EQ"
        },
        defaults: {
            writable: true,
            value: {

                hiGain: {
                    value: -10,
                    min: -20,
                    max: 20,
                    automatable: false,
                    type: FLOAT
                },

            mhiGain: {
                    value: -10,
                    min: -20,
                    max: 20,
                    automatable: false,
                    type: FLOAT
                },

            miGain: {
                     value: -10,
                    min: -20,
                    max: 20,
                    automatable: false,
                    type: FLOAT
                },

            milowGain: {
                    value: -10,
                    min: -20,
                    max: 20,
                    automatable: false,
                    type: FLOAT
                },

             lowGain: {
                    value: -10,
                    min: -20,
                    max: 20,
                    automatable: false,
                    type: FLOAT
                }

            }
        },

         hiGain: {
            enumerable: true,
            get: function() {
                return this.high.gain;
            },
            set: function(value) {
                this.high.gain.value = value;
            }
        },

           mhiGain: {
            enumerable: true,
            get: function() {
                return this.midhigh.gain;
            },
            set: function(value) {
                this.midhigh.gain.value = value;
            }
        },

           miGain: {
            enumerable: true,
            get: function() {
                return this.mid.gain;
            },
            set: function(value) {
                this.mid.gain.value = value;
            }
        },

          milowGain: {
            enumerable: true,
            get: function() {
                return this.midlow.gain;
            },
            set: function(value) {
                this.midlow.gain.value = value;
            }
        },  

        lowGain: {
            enumerable: true,
            get: function() {
                return this.low.gain;
            },
            set: function(value) {
                this.low.gain.value = value;
            }
        }
       
   
    });








 
///////amp////////////////////////////
DSX.prototype.Amp = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.input = drsaxContext.createGain();
        this.activateNode = drsaxContext.createGain();

        this.Amp =drsaxContext.createGain();
        this.output = drsaxContext.createGain();

        this.activateNode.connect(this.Amp);
        this.Amp.connect(this.output);

         this.gain = properties.gain || this.defaults.gain.value;
         this.bypass = properties.bypass || false;
    };
    DSX.prototype.Amp.prototype = Object.create(Super, {
        name: {
            value: "Amp"
        },
        defaults: {
            writable: true,
            value: {
                gain: {
                    value: 0,
                    min: 0,
                    max: 1,
                    automatable: false,
                    type: FLOAT
                },
          

            }
        },
        gain: {
            enumerable: true,
            get: function() {
                return this.Amp.gain;
            },
            set: function(value) {
                this.Amp.gain.value = value;
            }
        }
       
   
    });

////////////////////////////////////////////////

DSX.prototype.Aux = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.input = drsaxContext.createGain();
        this.activateNode = drsaxContext.createGain();

        this.Aux =drsaxContext.createGain();
        this.output = drsaxContext.createGain();

        this.activateNode.connect(this.Aux);
        this.Aux.connect(this.output);

         this.gain = properties.gain || this.defaults.gain.value;
         this.bypass = properties.bypass || false;
    };
    DSX.prototype.Aux.prototype = Object.create(Super, {
        name: {
            value: "Aux"
        },
        defaults: {
            writable: true,
            value: {
                gain: {
                    value: 0,
                    min: 0,
                    max: 1,
                    automatable: false,
                    type: FLOAT
                },
          

            }
        },
        gain: {
            enumerable: true,
            get: function() {
                return this.Aux.gain;
            },
            set: function(value) {
                this.Aux.gain.value = value;
            }
        }
       
   
    });


//////////////////////////////////////////////



///////////////////////////////////////////////













 DSX.dac = DAC = drsax.destination;





DSX.prototype.Osc = function(type,frequency){
    this.type = type;
   this.frequency = frequency;

    this.drOsc = drsax.createOscillator();
    this.gain_out = drsax.createGain();

    this.drOsc.type = type;
    this.drOsc.frequency.value=frequency;
    
    this.connect = function(out){
    this.out = out;

    this.gain_out.connect(out);
    this.drOsc.start(0);

    };


 

   

     this.start = function(){
 
    this.drOsc.connect(this.gain_out);
    
    }
    
    this.stop = function(){
    this.drOsc.disconnect(this.gain_out);
    }
      
}

/////////////////////////////////////



DSX.prototype.AM = function(type,ModeFreq,Depth,Amp){
   
    this.type=type;
    this.ModeFreq = ModeFreq;
    this.Depth = Depth;
    this.Amp = Amp;



    this.AMOsc = drsax.createOscillator();
    this.gain1 = drsax.createGain();
      this.mainout = drsax.createGain();
       this.depth = drsax.createGain();

    this.AMOsc.type = type;
  
      this.AMOsc.frequency.value = ModeFreq;
      this.gain1.gain.value = Depth;
     
      this.depth.gain.value = 1-Depth;
      this.mainout.gain.value = Amp;

  
     

      this.AMOsc.connect(this.gain1); 
      this.gain1.connect(this.mainout.gain);
      this.depth.connect(this.mainout.gain);



    
    this.from = function(dat){

    this.dat = dat;

    this.dat.connect(this.mainout);
  

    };

    
    this.connect = function(out){

    this.out = out;

    this.mainout.connect(out);
    this.AMOsc.start(0);

    };
  this.disconnect = function(dis){

    this.dis = dis;

    this.mainout.disconnect(dis);


    };



   
      
}


DSX.prototype.FM = function(carrier,carrier_type,ModeFreq,FM_type,Depth,Amp){
   
   this.carrier=carrier;
    this.carrier_type=carrier_type;
    this.FM_type=FM_type;
    

    this.ModeFreq = ModeFreq;
    this.Depth = Depth;
    this.Amp = Amp;


    this.CAOsc = drsax.createOscillator();
    this.FMOsc = drsax.createOscillator();


    this.gain1 = drsax.createGain();
    this.mainout = drsax.createGain();
  


  
    this.CAOsc.frequency.value = carrier;
     this.FMOsc.frequency.value = ModeFreq;
      this.gain1.gain.value = Depth;
      this.mainout.gain.value = Amp;

  
     

      this.CAOsc.connect(this.mainout);
   


     this.FMOsc.connect(this.gain1); 
      this.gain1.connect(this.CAOsc.frequency);
     

    this.FMOsc.start(0);
    this.CAOsc.start(0);



    
    this.connect = function(out){

    this.out = out;

    this.mainout.connect(out);

    };


  this.stopp = function(){

  
    this.mainout.gain.value = 0;


    };



   
      
}





////////////////////saxInput///////////


  navigator.webkitGetUserMedia(

                {audio: true, video: false},

                function (stream) {
                    saxInput = drsax.createMediaStreamSource(stream);
                },
                function (error) {
                    alert('Unable to get the user media');
                }
            );



////////////////////////////////////////


  DSX.get = function(a,b) {

       var sum = a+b
        return sum ;
    }
    


 
})(window);

