'use strict';

MathApp.factory('session', function() {

  var Player = function() {
		this.id = null;
		this.name = 'Player';
		this.wins = 0;
		return this;
	};
	Player.prototype.load = function() {
		var player = JSON.parse(localStorage.getItem('player')) || {};
		for (var key in player) {
			if (_.has(this, key)) {
				this[key] = player[key] || this[key];
			}
		}
		this.id = null; // have to reset the id
		return this;
	};
	Player.prototype.save = function() {
		localStorage.setItem('player', _.pick(this, 'name', 'wins'));
	};
	Player.prototype.joinGame = function(gameRef) {
		var playerRef = gameRef.child('players').push({
			name: this.name
		});
		playerRef.removeOnDisconnect();
		
		this.id = playerRef.name();
	};
  
  var baseRef = new Firebase('https://darksmint.firebaseio.com'),
  	  gamesRef = baseRef.child('games'),
  	  gameRef = null,
      game = {},
			player = (new Player()).load();

  // Public API here
  return {
    createGame: function(callback) {
      gameRef = gamesRef.push({
        owner: null,
        state: 'ready',
        players: null
      }, function(success){
    		if (success) {
					player.joinGame(gameRef);
          // update game owner to this player
    			gameRef.update({owner: player.id});
    		}
    		callback && callback(success, gameRef.name());
    	});
    },
    loadGame: function(gameId, callback) {
      if (gameRef == null || gameRef.name() !== gameId) {
        gameRef = gamesRef.child(gameId);
      }
			
			gameRef.child('players').once('value', function(data){
				var players = data.val();
        console.log('join player')
        console.log(players);
				if (!_.isEmpty(players) && !_.has(players, player.id)) {
					player.joinGame(gameRef);
				}
        gameRef.on('value', function(data){
          game = data.val();
          console.log(game);
          callback && callback(game);
        });
			});
    },
		isOwner: function(gameOwner) {
			return player ? player.id === gameOwner : false;
		}
  };
});
