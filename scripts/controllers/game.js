'use strict';

MathApp.controller('GameCtrl', ['$scope', '$location', 'session', function($scope, $location, session) {
  $scope.link = $location.absUrl();
}]);
