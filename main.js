$.mask.definitions['5'] = "[0-5]"

angular.module('MyApp', [])
  .controller('MyCtrl', function($scope) {
    $scope.number = 345648;
    $scope.setField = function() {
      console.log("setting field");
      $scope.number = 122323;
    };
  })
  .directive('uiMask', function() {
    return {
      require: 'ngModel',
      scope: {
        uiMask: '='
      },
      link: function($scope, element, attrs, controller) {
        controller.$render = function() {
          var value = controller.$viewValue || '';
          console.log('Rendering value: ', value);
          element.val(value);
          return element.mask($scope.uiMask);
        };
        controller.$parsers.push(function(value) {
          var isValid;
          console.log('parsing', value);
          isValid = element.mask().length === 6;
          console.log('isvalid', isValid);
          controller.$setValidity('mask', isValid);
          if (isValid) {
            console.log('returning', element.mask());
            return element.mask();
          } else {
            return null;
          }
        });
        return element.bind('keyup', function() {
          console.log('change');
          return $scope.$apply(function() {
            return controller.$setViewValue(element.mask());
          });
        });
      }
    };
  });
