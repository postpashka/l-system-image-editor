function addTabLogic($scope) {
	$scope.select = function(value){
		(value == $scope.selected) ? $scope.selected = "": $scope.selected = value; 
	};
};

function getActiveStyle(styleName, object) {
  object = object || canvas.getActiveObject() ;
  if (!object) return '';

  
  return (object.getSelectionStyles && object.isEditing)
    ? (object.getSelectionStyles()[styleName] || '')
    : (object[styleName] || '');
};

function setActiveStyle(styleName, value, object) {
  object = object || canvas.getActiveObject();
  if (!object) return;

  if (object.setSelectionStyles && object.isEditing) {
    var style = { };
    style[styleName] = value;
    object.setSelectionStyles(style);
    object.setCoords();
  }
  else {
    object[styleName] = value;
  }

  object.setCoords();
  canvas.renderAll();
};

function getActiveProp(name) {
  var object = canvas.getActiveObject();
  if (!object) return '';
  //console.log(name + " is " + object[name] || 'ss');
  return object[name] || '';
};

function setActiveProp(name, value) {
  var object = canvas.getActiveObject();
  if (!object) return;

  object.set(name, value).setCoords();
  canvas.renderAll();
};

function getActiveElem(){

  var object = canvas.getActiveObject();
  var group = canvas.getActiveGroup();
  if (!object) return group;

  return object;
};




function addAccessors($scope) {
  
  
  	$scope.start = function() {
		startHandler(canvas);
		canvas.renderAll();
	};
	
	$scope.save = function() {
	
		var o = canvas.getActiveObject();
		o.LSAlg = "";
		o.LSBase = "";
	
	};
	
	$scope.merge = function() {
	
	
		var o = canvas.getActiveGroup();
		o.forEachObject(function (obj) {obj.active = false});
		o.active = false;
		fabric.Image.fromURL(o.toDataURL(), function(image) {
		
		
		image.set({
			left: o.left,
			top: o.top,
			selectable:true
		})
		.setCoords();
			canvas.remove(o);
			canvas.add(image);
			canvas.setActiveObject(image);
		}); 
		o.forEachObject(function(obj){ canvas.remove(obj) });
		canvas.discardActiveGroup().renderAll();

	};
	
	
  $scope.getOpacity = function() {
    return getActiveStyle('opacity') * 100;
  };
  $scope.setOpacity = function(value) {
    setActiveStyle('opacity', parseInt(value, 10) / 100);
  };

  $scope.getFill = function() {
    return getActiveStyle('fill');
  };
  $scope.setFill = function(value) {
    setActiveStyle('fill', value);
  };

  $scope.isBold = function() {
    return getActiveStyle('fontWeight') === 'bold';
  };
  $scope.toggleBold = function() {
    setActiveStyle('fontWeight',
      getActiveStyle('fontWeight') === 'bold' ? '' : 'bold');
  };
  $scope.isItalic = function() {
    return getActiveStyle('fontStyle') === 'italic';
  };
  $scope.toggleItalic = function() {
    setActiveStyle('fontStyle',
      getActiveStyle('fontStyle') === 'italic' ? '' : 'italic');
  };

  $scope.isUnderline = function() {
    return getActiveStyle('textDecoration').indexOf('underline') > -1;
  };
  $scope.toggleUnderline = function() {
    var value = $scope.isUnderline()
      ? getActiveStyle('textDecoration').replace('underline', '')
      : (getActiveStyle('textDecoration') + ' underline');

    setActiveStyle('textDecoration', value);
  };

  $scope.isLinethrough = function() {
    return getActiveStyle('textDecoration').indexOf('line-through') > -1;
  };
  $scope.toggleLinethrough = function() {
    var value = $scope.isLinethrough()
      ? getActiveStyle('textDecoration').replace('line-through', '')
      : (getActiveStyle('textDecoration') + ' line-through');

    setActiveStyle('textDecoration', value);
  };
  $scope.isOverline = function() {
    return getActiveStyle('textDecoration').indexOf('overline') > -1;
  };
  $scope.toggleOverline = function() {
    var value = $scope.isOverline()
      ? getActiveStyle('textDecoration').replace('overlin', '')
      : (getActiveStyle('textDecoration') + ' overline');

    setActiveStyle('textDecoration', value);
  };
  
  $scope.getText = function() {
    return getActiveProp('text');
  };
  $scope.setText = function(value) {
    setActiveProp('text', value);
  };

  $scope.getTextAlign = function() {
    return capitalize(getActiveProp('textAlign'));
  };
  $scope.setTextAlign = function(value) {
    setActiveProp('textAlign', value.toLowerCase());
  };

  $scope.getFontFamilygetStrokeColor = function() {
    return getActiveProp('fontFamily').toLowerCase();
  };
  $scope.setFontFamily = function(value) {
    setActiveProp('fontFamily', value.toLowerCase());
  };

  $scope.getBgColor = function() {
    return getActiveProp('backgroundColor');
  };
  $scope.setBgColor = function(value) {
    setActiveProp('backgroundColor', value);
  };

  $scope.getTextBgColor = function() {
    return getActiveProp('textBackgroundColor');
  };
  $scope.setTextBgColor = function(value) {
    setActiveProp('textBackgroundColor', value);
  };

  $scope.getStrokeColor = function() {
    return getActiveStyle('stroke');
  };
  $scope.setStrokeColor = function(value) {
    setActiveStyle('stroke', value);
  };

  $scope.getStrokeWidth = function() {
    return getActiveStyle('strokeWidth');
  };
  $scope.setStrokeWidth = function(value) {
    setActiveStyle('strokeWidth', parseInt(value, 10));
  };

  $scope.getFontSize = function() {
    return getActiveStyle('fontSize');
  };
  $scope.setFontSize = function(value) {
    setActiveStyle('fontSize', parseInt(value, 10));
  };

  $scope.getLineHeight = function() {
    return getActiveStyle('lineHeight');
  };
  $scope.setLineHeight = function(value) {
    setActiveStyle('lineHeight', parseFloat(value, 10));
  };

  $scope.getBold = function() {
    return getActiveStyle('fontWeight');
  };
  $scope.setBold = function(value) {
    setActiveStyle('fontWeight', value ? 'bold' : '');
  };

  $scope.getCanvasBgColor = function() {
    return canvas.backgroundColor;
  };
  $scope.setCanvasBgColor = function(value) {
    canvas.backgroundColor = value;
    canvas.renderAll();
  };

  $scope.addRect = function() {
    var coord = getRandomLeftTop();

    canvas.add(new fabric.Rect({
      left: coord.left,
      top: coord.top,
      fill: '#' + getRandomColor(),
      width: 50,
      height: 50,
      opacity: 0.7
    }));
  };

  $scope.addCircle = function() {
    var coord = getRandomLeftTop();

    canvas.add(new fabric.Circle({
      left: coord.left,
      top: coord.top,
      fill: '#' + getRandomColor(),
      radius: 50,
      opacity: 0.7
    }));
  };
  
  $scope.addEllipse = function() {
    var coord = getRandomLeftTop();

	canvas.add(new fabric.Ellipse({
		left: coord.left,
		top: coord.top,
		width: 50,
		height: 50,
		fill: '#' + getRandomColor(),
		rx: 100,
		ry: 70
	}));
  };

  

  $scope.addTriangle = function() {
    var coord = getRandomLeftTop();

    canvas.add(new fabric.Triangle({
      left: coord.left,
      top: coord.top,
      fill: '#' + getRandomColor(),
      width: 50,
      height: 50,
      opacity: 0.7
    }));
  };


	
	
  $scope.addText = function() {
    var text = 'Lorem ipsum dolor sit amet';

    var textSample = new fabric.Text(text.slice(0, getRandomInt(0, text.length)), {
      left: getRandomInt(350, 400),
      top: getRandomInt(350, 400),
      fontFamily: 'helvetica',
      angle: getRandomInt(-10, 10),
      fill: '#' + getRandomColor(),
      scaleX: 0.5,
      scaleY: 0.5,
      fontWeight: '',
      originX: 'left',
      hasRotatingPoint: true,
      centerTransform: true
    });

    canvas.add(textSample);
  };

  var addShape = function(shapeName) {

    console.log('adding shape', shapeName);

    var coord = getRandomLeftTop();

    fabric.loadSVGFromURL('../assets/' + shapeName + '.svg', function(objects, options) {

      var loadedObject = fabric.util.groupSVGElements(objects, options);

      loadedObject.set({
        left: coord.left,
        top: coord.top,
        angle: getRandomInt(-10, 10)
      })
      .setCoords();

      canvas.add(loadedObject);
    });
  };




  

  $scope.confirmDelete = function() {
    if (confirm('Are you sure?')) {
	  if(canvas.getActiveGroup()){
		canvas.getActiveGroup().forEachObject(function(o){ canvas.remove(o) });
		canvas.discardActiveGroup().renderAll();
	  } else {
		canvas.remove(canvas.getActiveObject());
	  }		
    }
  };
  
  $scope.confirmClear = function() {
    if (confirm('Are you sure?')) {

		canvas.clear();
		}
	};
  
  
  $scope.rasterize = function() {
    if (!fabric.Canvas.supports('toDataURL')) {
      alert('This browser doesn\'t provide means to serialize canvas to an image');
    }
    else {
      window.open(canvas.toDataURL('png'));
    }
  };

  $scope.rasterizeSVG = function() {
    window.open(
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(canvas.toSVG()));
  };

  $scope.rasterizeJSON = function() {
    alert(JSON.stringify(canvas));
  };



  $scope.getOriginX = function() {
    return getActiveProp('originX');
  };
  $scope.setOriginX = function(value) {
    setActiveProp('originX', value);
  };

  $scope.getOriginY = function() {
    return getActiveProp('originY');
  };
  $scope.setOriginY = function(value) {
    setActiveProp('originY', value);
  };

  $scope.sendBackwards = function() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.sendBackwards(activeObject);
    }
  };

  $scope.sendToBack = function() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.sendToBack(activeObject);
    }
  };

  $scope.bringForward = function() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.bringForward(activeObject);
    }
  };

  $scope.bringToFront = function() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.bringToFront(activeObject);
    }
  };

  var pattern = new fabric.Pattern({
    source: '/assets/escheresque.png',
    repeat: 'repeat'
  });

  $scope.patternify = function() {
    var obj = canvas.getActiveObject();

    if (!obj) return;

    if (obj.fill instanceof fabric.Pattern) {
      obj.fill = null;
    }
    else {
      if (obj instanceof fabric.PathGroup) {
        obj.getObjects().forEach(function(o) { o.fill = pattern; });
      }
      else {
        obj.fill = pattern;
      }
    }
    canvas.renderAll();
  };

  $scope.clip = function() {
    var obj = canvas.getActiveObject();
    if (!obj) return;

    if (obj.clipTo) {
      obj.clipTo = null;
    }
    else {
      var radius = obj.width < obj.height ? (obj.width / 2) : (obj.height / 2);
      obj.clipTo = function (ctx) {
        ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
      };
    }
    canvas.renderAll();
  };

  $scope.shadowify = function() {
    var obj = canvas.getActiveObject();
    if (!obj) return;

    if (obj.shadow) {
      obj.shadow = null;
    }
    else {
      obj.setShadow({
        color: 'rgba(0,0,0,0.3)',
        blur: 10,
        offsetX: 10,
        offsetY: 10
      });
    }
    canvas.renderAll();
  };

  $scope.gradientify = function() {
    var obj = canvas.getActiveObject();
    if (!obj) return;

    obj.setGradient('fill', {
      x1: 0,
      y1: 0,
      x2: (getRandomInt(0, 1) ? 0 : obj.width),
      y2: (getRandomInt(0, 1) ? 0 : obj.height),
      colorStops: {
        0: '#' + getRandomColor(),
        1: '#' + getRandomColor()
      }
    });
    canvas.renderAll();
  };

  $scope.execute = function() {
    if (!(/^\s+$/).test(consoleValue)) {
      eval(consoleValue);
    }
  };

  var _loadSVG = function(svg) {
    fabric.loadSVGFromString(svg, function(objects, options) {
      var obj = fabric.util.groupSVGElements(objects, options);
      canvas.add(obj).centerObject(obj).renderAll();
      obj.setCoords();
    });
  };

  var _loadSVGWithoutGrouping = function(svg) {
    fabric.loadSVGFromString(svg, function(objects) {
      canvas.add.apply(canvas, objects);
      canvas.renderAll();
    });
  };

  function initCustomization() {
    if (typeof Cufon !== 'undefined' && Cufon.fonts.delicious) {
      Cufon.fonts.delicious.offsetLeft = 75;
      Cufon.fonts.delicious.offsetTop = 25;
    }

    if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
      fabric.Object.prototype.cornerSize = 30;
    }

    fabric.Object.prototype.transparentCorners = false;

    if (document.location.search.indexOf('guidelines') > -1) {
      initCenteringGuidelines(canvas);
      initAligningGuidelines(canvas);
    }
  }

  initCustomization();

  $scope.getFreeDrawingMode = function() {
    return canvas.isDrawingMode;
  };
  $scope.setFreeDrawingMode = function(value) {
	
	canvas.isDrawingMode = !!value;
    $scope.$$phase || $scope.$digest();
	
  };

  $scope.freeDrawingMode = 'Pencil';

  $scope.getDrawingMode = function() {
    return $scope.freeDrawingMode;
  };
  $scope.setDrawingMode = function(type) {
    $scope.freeDrawingMode = type;

    canvas.freeDrawingBrush = new fabric[type + 'Brush'](canvas);

    $scope.$$phase || $scope.$digest();
  };

  $scope.getDrawingLineWidth = function() {
    if (canvas.freeDrawingBrush) {
      return canvas.freeDrawingBrush.width;
    }
  };
  $scope.setDrawingLineWidth = function(value) {
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.width = parseInt(value, 10) || 1;
    }
  };

  $scope.getDrawingLineColor = function() {
    if (canvas.freeDrawingBrush) {
      return canvas.freeDrawingBrush.color;
    }
  };
  $scope.setDrawingLineColor = function(value) {
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = value;
    }
  };
  


  $scope.getScaleBaseSize = function() {
	return getActiveStyle('BaseSize');
  };
  
  
  $scope.setScaleBaseSize  = function(value) {
	$scope.start();
	setActiveStyle('BaseSize' , value);
  }; 
  

   
   
   $scope.getLSAlg = function() {
	return  getActiveStyle('LSAlg');
     };
  
  $scope.setLSAlg = function(value) {
	
	$scope.start();
	setActiveStyle('LSAlg' , value);
	}; 
  
   
  $scope.getIteration = function() {
	return getActiveStyle('Iteration');
  };
	

  
  $scope.setIteration = function(value) {
	if (value != getActiveStyle('Iteration'))
	{
		$scope.start();
		setActiveStyle('Iteration' , value);
	
	}
  }; 
   
    $scope.getAngle = function() {
	
	return getActiveStyle('Angle');
  };
	
  
  
  $scope.setAngle = function(value) {
	if (value != getActiveStyle('Angle'))
	{
		$scope.start();
		setActiveStyle('Angle' , value);
	};
    
  }; 

  
    $scope.addImages = function(files) {

		
		for (var i = 0; i < files.length; i++) { 
			addImage(files[i]);
			console.log("add images");
		};
		
		function addImage(image){

			var file = image;

			var fr = new FileReader();

			var cnvsObj = [];
			
			fr.onload = function (event) { 

			
 				var imgObj = new Image();
				imgObj.src = event.target.result; 
				
				
 				imgObj.onload = function () {
					var image = new fabric.Image(imgObj);
					var coord = getRandomLeftTop();
					
					
					image.set({
						left: coord.left,
						top: coord.top,
						angle: 0,
						padding: 10,
						cornersize:10
					});				
					canvas.add(image);
				};
				
 				
				canvas.renderAll();  
		
			};
			fr.readAsDataURL(file);
		}
 
	};
  
  
}

function watchCanvas($scope) {

  function updateScope() {
    $scope.$$phase || $scope.$digest();
    canvas.renderAll();
  }

  function getMDpoint(event) {
	
	var p = $scope.getSelectedPoint(event.e);
	addRectan(p);
	
  }
  
  function addRectan(p){
  
    canvas.add(new fabric.Rect({
      left: p.x,
      top: p.y,
      fill: '#' + getRandomColor(),
      width: 50,
      height: 50,
      opacity: 0.3
    }));
  };
  
  
  
  canvas
	.on('object:created', updateScope)
    .on('object:selected', updateScope)
    .on('group:selected', updateScope)
    .on('selection:cleared', updateScope)
	
}



editor.controller('CanvasControls', function($scope) {
  
  $scope.canvas = canvas;
  $scope.getActiveStyle = getActiveStyle;
  $scope.lsAlgs = lsAlgs;
  $scope.curAlg = {alg: "empty"};

  
  addAccessors($scope);
  addTabLogic($scope);
  watchCanvas($scope);
});