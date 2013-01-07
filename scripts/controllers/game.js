'use strict';

MathApp.controller('GameCtrl', ['$scope', '$location', 'session', function($scope, $location, session) {
  var gameId = $location.path().substr(1); // remove '/' from the path to get the gameid

  $scope.link = $location.absUrl();
  session.loadGame(gameId, function(game){
    $scope.$apply(function(){
  		$scope.players = game.players;
			$scope.isOwner = session.isOwner(game.owner);
  	});
  });
	
}]);
