var HEIGHT;
var WIDTH;
var g_renderer;
var g_commands;
var ALGORYTHM;
var BASE;
var CANVAS;



function startHandler(canvas)
{
   
	CANVAS = canvas;
	BASE = canvas.getActiveObject() || canvas.getActiveGroup();
	ALGORYTHM = BASE.LSAlg;
	HEIGHT = canvas.height;
	WIDTH = canvas.width; 
	
		updateStatus("Generating command string...", generateCmdString);

}


function generateCmdString()
{
   // collect up Form input data required by the processor
   try
   {
      var lsys = new LSystems.LSystemsProcessor();
      lsys.iterations = parseInt(ALGORYTHM[1]);
      lsys.axiom = ALGORYTHM[4];
	  ALGORYTHM[5].forEach( function (item){
		if (item.rule && item.rule.length !== 0)
			{
				lsys.addRule(item.rule);
			}
		});
      
       var before = new Date();

      g_commands = lsys.generate();

	  var after = new Date();
	  
      updateStatus("Commands: " + g_commands.length + " in " + (after - before) + "ms. Calculating offsets...", renderCmds);
   }
   catch (e)
   {
      alert("Error during LSystemsProcessor.generate()\n" + e);
      resetUI("Press Start to begin.");
   }
}


function renderCmds()
{
   try
   {
      // calc offset bounding box before render
      g_renderer = new LSystems.TurtleRenderer(WIDTH, HEIGHT);
      g_renderer.setAngle(parseInt(ALGORYTHM[2]));
      var before = new Date();
      g_renderer.process(g_commands);
	  CANVAS.renderAll();
	  var after = new Date();
	resetUI("Finished rendering in " + (after - before) + "ms.");
   }
   catch (e)
   {
      alert("Error during TurtleRenderer.process()\n" + e);
      resetUI("Press Start to begin.");
   }
}



function resetUI(msg)
{
/* g_renderer = null;
   g_commands = null; */
   updateStatus(msg);
   document.getElementById('start').disabled = false;
}




function updateStatus(msg, fn)
{
   document.getElementById('status').innerHTML = msg;
   if (fn)
   {
      setTimeout(fn, 0);
   }
}
if (typeof LSystems == "undefined" || !LSystems)
{
   var LSystems = {};
}






// Public constants
const ANTICLOCK  = '+';
const CLOCKWISE  = '-';
const PUSH       = '[';
const POP        = ']';
const COLOUR     = 'C';

const RAD = Math.PI/180.0;



(function()
{
   LSystems.TurtleRenderer = function(width, height)
   {
      if (width !== undefined && width !== null)
      {
         this._width = width;
      }
      if (height !== undefined && height !== null)
      {
         this._height = height;
      }
      
      this._colourList = ["rgba(140, 80, 60, 0.75)", "rgba(24, 180, 24, 0.75)", "rgba(48, 220, 48, 0.5)", "rgba(64, 255, 64, 0.5)"];
      this._constants = [];
	  
      
      return this;
   };
   
   LSystems.TurtleRenderer.prototype =
   {

      _width: 0,
      

      _height: 0,

	  
      _distance: 10,
      

      _angle: 30,
      

      _minx: 0,
      

      _miny: 0,
      

      _maxx: 0,
      

      _maxy: 0,
      

      _maxStackDepth: 0,
      

      _stack: null,
      

      _colourList: null,
      

      _constants: null,
      

      _renderLineWidths: true,
      
	  _outputLsGroup: null,
	  
	  
      setDistance: function setDistance(distance)
      {
         this._distance = distance;
         return this;
      },
      
      /**
       * Set turning angle in degrees to use per turtle rotation.
       *
       * @method setDistance
       * @param angle {number} Turning angle in degrees to use per turtle rotation
       * @return {LSystems.TurtleRenderer} returns 'this' for method chaining
       */
      setAngle: function setAngle(angle)
      {
         this._angle = angle;
         return this;
      },
      
      setRenderLineWidths: function setRenderLineWidths(val)
      {
         this._renderLineWidths = val;
      },
      

      getMinMaxValues: function getMinMaxValues()
      {
         return new LSystems.Dimension(this._minx, this._miny, this._maxx, this._maxy);
      },
      


      
      setConstants: function(constants)
      {
         this._constants = [];
         if (constants && constants.length !== 0)
         {
            for (var i=0; i<constants.length; i++)
            {
               var c = constants.charAt(i);
               if (c != ' ' && c != ',')
               {
                  this._constants[c] = true;
               }
            }
         }
      },

      process: function process(cmds)
      {
         this._stack = [];
		 
         var angle = this._angle;
         var distance = 50;
         var lastX;
         var lastY;
		
         

         var pos = new LSystems.Location(100.0, 100.0, 90.0, -1);
         

         var yOffset = this._yOffset, xOffset = this._xOffset, maxStackDepth = this._maxStackDepth;
         var colourList = this._colourList, stack = this._stack;
         var renderLineWidths = this._renderLineWidths;
         var rad, colour, width, lastColour, t1, t2 = null;
         var c, len = cmds.length;
		 var outputLsArray = [];
		 var inputDataArray = [];
		 var counter = 0;
		 var BaseSize;
		 var baseCopy = [];
		
 		 if (!!BASE) {

			if (typeof BASE._objects === 'undefined') {
				var style = getActiveStyle('LSBase', BASE);
				if (!style) {
					baseCopy[0] = fabric.util.object.clone(BASE);
				} else {
					baseCopy = style;
				} 
				
			}	else {
				
				baseCopy = BASE._objects;
			}
		 
		 
		 }
		
		
		var bSize = getActiveStyle('BaseSize', BASE);
		(bSize && (bSize != '')) ? ( BaseSize = bSize) : ( BaseSize = 50);
		 
		 for (var i=0; i<len; i++)
         {
            c = cmds.charAt(i);
            
            switch (c)
            {
               case COLOUR:
               {
                  // get colour index from next character
                  pos.colour = (cmds.charAt(++i) - '0');
                  break;
               }
               
               case ANTICLOCK:
               {
                  pos.heading += angle;
                  break;
               }
               
               case CLOCKWISE:
               {
                  pos.heading -= angle;
                  break;
               }
               
               case PUSH:
               {
                  stack.push(new LSystems.Location(pos.x, pos.y, pos.heading, pos.colour));
                  break;
               }
               
               case POP:
               {
                  pos = stack.pop();
                  break;
               }
               
			default:
               {
					
                  if (!this._constants[c])
                  {
                     lastX = pos.x;
                     lastY = pos.y;
                     

                     rad = pos.heading * RAD;
                     pos.x += distance* Math.cos(rad);
                     pos.y += distance* Math.sin(rad);

					var cnt = ( counter++ % baseCopy.length);
					var a = fabric.util.object.clone(baseCopy[cnt]);
					

 					if (a.getHeight() < a.getWidth()) { 
						a.scaleToWidth(BaseSize); 
					} else { 
						a.scaleToHeight(BaseSize); 
					}
					
					a.active = false;
 					a.setTop(HEIGHT - Math.floor((pos.y + lastY)/2));
 						a.setLeft(Math.floor((pos.x + lastX)/2)); 
			
					
					a.setAngle(a.getAngle() + 90 - pos.heading);
//					a.setFill('#' + getRandomColor());
					outputLsArray.push(a);


 

                  }
                  break;
               }
            }
         }
		
		
		
		this._outputLsGroup = new fabric.Group(outputLsArray,{left: 0, top: 0 });
		
		var l = this._outputLsGroup.left;
		var t =  this._outputLsGroup.top;
		baseCopy.active = false;
		fabric.Image.fromURL(this._outputLsGroup.toDataURL(), function(image) {
 			image.set({
				left: l,
				top: t,
				selectable:true
			}).setCoords(); 

			var max = (image.getHeight() < image.getWidth() ? WIDTH : HEIGHT);
			image.scaleToWidth(max);

	  		image.setTop(Math.floor(HEIGHT/2 - image.getHeight()/2));
			image.setLeft(Math.floor(WIDTH/2 - image.getWidth()/2));


			setActiveStyle('LSAlg', ALGORYTHM, image);
			setActiveStyle('LSBase', baseCopy , image);
			setActiveStyle('BaseSize', BaseSize , image);
			canvas.setActiveObject(image);
			canvas.add(image);
			



		}); 
		canvas.remove(BASE);		
 		baseCopy.forEach(function(o){(canvas.remove(o))});
		canvas.discardActiveGroup().renderAll();
		
		

      }
   };
})();

/**
 * LSystemsProcessor class
 */
(function()

{

   LSystems.LSystemsProcessor = function()
   {
      this.rules = [];
      return this;
   };
   
   LSystems.LSystemsProcessor.prototype =
   {
      /**
       * Number of iterations to perform
       * 
       * @property iterations
       * @type number
       */
      iterations: 1,
      
      /**
       * Root axiom
       * 
       * @property axiom
       * @type string
       */
      axiom: null,
      
      /**
       * Array of rules to process
       * 
       * @property rules
       * @type Array
       */
      rules: null,
      
      /**
       * Add a rule to the processor.
       * 
       * @method process
       * @param rule {string}  Rules must be of form: F=FX
       */
      addRule: function addRule(rule)
      {
         if (rule.length < 2 || rule.charAt(1) !== '=')
         {
            throw "Rule must be of form: F=FX";
         }
         var rulePart = "";
         if (rule.length > 2)
         {
            rulePart = rule.substring(2);
         }
         
         this.rules[rule.charAt(0)] = rulePart;
      },
      

      generate: function generate()
      {
		
         var ruleCount = this.rules.length;
         var axiom = null;
         var result = null;


         for (var i = 0; i < this.iterations; i++)
         {
            if (i == 0)
            {
               axiom = this.axiom;
            }
            else
            {
               axiom = result.toString();
            }
            result = new StringBuffer();
            for (var c, len = axiom.length, rule, rules=this.rules, n=0; n<len; n++)
            {
               c = axiom.charAt(n);
               rule = rules[c];
               result.append(rule != null ? rule : c);
               
               if (result.length() > 100000000)
               {
                  throw "Generated command string too large! 100,000,000 commands max.";
               }
            }
         }
         
         return result.toString();
      }
   };
})();



(function()
{
   LSystems.Location = function(x, y, heading, colour)
   {
      this.x = x;
      this.y = y;
      this.heading = heading;
      this.colour = colour;
      
      return this;
   };
   
   LSystems.Location.prototype =
   {
      /**
       * X coordinate
       * 
       * @property x
       * @type number
       */
      x: 0,
      
      /**
       * Y coordinate
       * 
       * @property y
       * @type number
       */
      y: 0,
      
      /**
       * Heading angle
       * 
       * @property heading
       * @type number
       */
      heading: 0,
      
      /**
       * Colour index
       * 
       * @property colour
       * @type number
       */
      colour: 0
   };
})();


/**
 * Dimension structure class - all fields are public.
 * 
 * @namespace LSystems
 * @class LSystems.Dimension
 */
(function()
{
   LSystems.Dimension = function(minx, miny, maxx, maxy)
   {
      this.minx = minx;
      this.miny = miny;
      this.maxx = maxx;
      this.maxy = maxy;
      
      return this;
   };
   
   LSystems.Dimension.prototype =
   {
      /**
       * Minimum X coordinate
       * 
       * @property minx
       * @type number
       */
      minx: 0,
      
      /**
       * Minimum Y coordinate
       * 
       * @property miny
       * @type number
       */
      miny: 0,
      
      /**
       * Maximum X coordinate
       * 
       * @property heading
       * @type number
       */
      maxx: 0,
      
      /**
       * Maximum Y coordinate
       * 
       * @property miny
       * @type number
       */
      maxy: 0
   };
})();


/**
 * StringBuffer object
 */
function StringBuffer(len)
{
   this.buffer = len ? new Array(len) : [];
   this.count = 0;
   return this;
}

StringBuffer.prototype.append = function append(s)
{
   this.buffer.push(s);
   this.count += s.length;
   return this;
};

StringBuffer.prototype.length = function length()
{
   return this.count;
};

StringBuffer.prototype.toString = function toString()
{
   return this.buffer.join("");
};