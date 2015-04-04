
var editor = angular.module('editor', []);

editor.config(function($interpolateProvider) {
  $interpolateProvider
    .startSymbol('{[')
    .endSymbol(']}');
});

editor.directive('bindValueTo', function() {
  return {
    restrict: 'A',

    link: function ($scope, $element, $attrs) {

      var prop = capitalize($attrs.bindValueTo),
          getter = 'get' + prop,
          setter = 'set' + prop;

       $element.on('select change update', function() {
        $scope[setter] && $scope[setter](this.value);
      }); 

       $scope.$watch($scope[getter], function(newVal) {
		
         if ($element[0].type === 'radio') {
          var radioGroup = document.getElementsByName($element[0].name);
          for (var i = 0, len = radioGroup.length; i < len; i++) {
            radioGroup[i].checked = radioGroup[i].value === newVal;
          }
        }
        else 
		{

          $element.val(newVal);
        }
      }); 
	  
    }
  };
});


editor.directive('objectButtonsEnabled', function() {
  return {
    restrict: 'A',

    link: function ($scope, $element, $attrs) {
      $scope.$watch($attrs.objectButtonsEnabled, function(newVal) {

        $($element).find('.btn-object-action')
          .prop('disabled', !newVal);
      });
    }
  };
});



editor.directive('tab', function() {
    return {
        restrict: 'A',
        link: function($scope, $element, $attrs) {
			$scope.$watch('selected', function (element) {	
				$scope.setFreeDrawingMode(element == "draw");
		  });
        }
    }
});

editor.directive('pcFileUpload', function() {
  'use strict';
  return {
    restrict: "A",
    link: function (scope, element, attrs) {
		
		
		element.bind('change', function(e) {
			console.log(e);
             if (!e.target.files.length) return;
			console.log("Stage1");
            scope.files = [];
			var tooBig = [];
			
			
            for (var i = 0; i < e.target.files.length; i++) {
                var file = e.target.files[i];
                scope.files.push(file);
 
                if (file.size > 50 * 1048576) {
                    tooBig.push(file);
                }
            }
            if (tooBig.length > 0) {
                raiseError(tooBig, 'MAX_SIZE_EXCEEDED', "Files are larger than the specified max (" + scope.maxFileSizeMb + "MB)");
                return;
            } 
			
			scope.addImages(scope.files);

			function raiseError(files, type, msg) {
               console.log(files, type, msg);
                    }
 

        });
	}
  }
});


