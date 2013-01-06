'use strict';

MathApp.factory('session', function() {
  
  var baseRef = new Firebase('https://darksmint.firebaseio.com'),
  	  gamesRef = baseRef.child('games'),
  	  gameRef = null,
      game = {};

  // Public API here
  return {
    createGame: function(callback) {
      // i think theres no need for this game obj.
      // in this createGame, just create the gameRef
      // game obj will be populated in loadGame.
      game = {
        owner: null,
        state: 'ready',
        players: null
      };

    	gameRef = gamesRef.push(game, function(success){
    		if (success) {
          game.id = gameRef.name();

          // add self to list of players
          game.players = [{
            name: 'Guest' // should get players name here
          }];

    			var ownerRef = gameRef.child('players').push(game.players[0]);

          // update game owner
          game.owner = ownerRef.name();
    			gameRef.update({owner: game.owner});
    		}

    		callback && callback(success, game.id);
    	});
    },
    getGameId: function() {
      return (game && game.id) ? game.id : null;
    },
    loadGame: function(gameId, callback) {
      gameRef = gamesRef.child(gameId);
      gameRef.once('value', function(data){
        game = data.val();
        game.id = gameId;
        callback && callback();
      });
    }
  };
});
