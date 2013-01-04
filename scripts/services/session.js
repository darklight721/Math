'use strict';

MathApp.factory('session', function() {
  
  var baseRef = new Firebase('https://darksmint.firebaseio.com'),
  	  gamesRef = baseRef.child('games'),
  	  gameRef = null;

  // Public API here
  return {
    createGame: function(callback) {
    	gameRef = gamesRef.push({
    		state: 'ready',
    		owner: null,
    		players: null
    	}, function(success){
    		if (success) {
    			var ownerRef = gameRef.child('players').push({
    				name: 'Guest' // get the player's name
    			});
    			gameRef.update({owner: ownerRef.name()});
    		}
    		callback && callback(success);
    	});
    }
  };
});
