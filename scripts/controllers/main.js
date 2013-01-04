'use strict';

MathApp.controller('MainCtrl', ['$scope', 'session', function($scope, session) {

	$scope.create = function() {
		console.log('create');
		session.createGame(function(success){
			if (success) {
				console.log('create game success.');
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
