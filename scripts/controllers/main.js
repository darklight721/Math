'use strict';

MathApp.controller('MainCtrl', ['$scope', '$location', 'session', function($scope, $location, session) {

	$scope.create = function() {
		console.log('create');
		session.createGame(function(success, gameId){
			if (success) {
				console.log('Game ' + gameId + ' was created successfully.');
				$scope.$apply($location.path(gameId));
			}
			else {
				console.log('game was not created.');
			}
		});
	};

	$scope.join = function() {
		console.log('join');
	}
}]);
