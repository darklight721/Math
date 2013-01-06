'use strict';

MathApp.factory('session', function() {
  
  var baseRef = new Firebase('https://darksmint.firebaseio.com'),
  	  gamesRef = baseRef.child('games'),
  	  gameRef = null,
      game = {};

  // Public API here
  return {
    createGame: function(callback) {
      gameRef = gamesRef.push({
        owner: null,
        state: 'ready',
        players: null
      }, function(success){
    		if (success) {
          // add self to list of players
          var ownerRef = gameRef.child('players').push({
            name: 'Guest' // should get players name here
          });

          // update game owner
    			gameRef.update({owner: ownerRef.name()});
    		}

    		callback && callback(success, gameRef.name());
    	});
    },
    getGameId: function() {
      return gameRef ? gameRef.name() : null;
    },
    loadGame: function(gameId, callback) {
      if (gameRef == null || gameRef.name() === gameId) {
        gameRef = gamesRef.child(gameId);
      }
      gameRef.on('value', function(data){
        game = data.val();
        game.id = gameId;
        console.log(game);
        callback && callback(game);
      });
    }
  };
});
