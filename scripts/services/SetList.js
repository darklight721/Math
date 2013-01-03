'use strict';

MathApp.factory('SetList', function() {
	// default params
	var defaults = {
		count: 10,
		operation: '* / + -'
	};
	
	function randomOperand(max) {
		return _.random(0, max || 1000);
	}
	
	function random1to9() {
		return _.random(0,1) ? _.random(1,9) : -_.random(1,9);
	}
	
	var ProblemGenerator = {};
	ProblemGenerator['+'] = function() {
		return [randomOperand(),'+',randomOperand()];
	};
	ProblemGenerator['-'] = function() {
		var operand = randomOperand();
		return [operand,'-',randomOperand(operand)];
	};
	ProblemGenerator['*'] = function() {
		return [randomOperand(100),'*',randomOperand(100)];
	};
	ProblemGenerator['/'] = function() {
		var divisor = randomOperand(9) + 1, // 1 to 10
				dividend = divisor * randomOperand(10);	
		return [dividend,'/',divisor];
	};
	
	function generateChoices(answer) {
		return _.shuffle([
			answer,
			answer + random1to9(),
			answer + 10 * random1to9(),
			answer + random1to9() + 10 * random1to9()
		]);
	}
	
	function constructSet(operation) {
		if (_.has(ProblemGenerator, operation)) {
			var set = {};
			set.problem = ProblemGenerator[operation]();
			set.answer = eval(set.problem.join(''));
			set.choices = generateChoices(set.answer);
			return set;
		}
		return null;
	}
	
	return {
		generate: function(options) {
			options = _.extend(defaults, options);
			var operations = options.operation.split(' '),
					setlist = [];
			
			for(var i = 0; i < options.count; i++) {
				var index = _.random(0, operations.length-1);
				var set = constructSet(operations[index]);
				set && setlist.push(set);
			}
			
			return setlist;
		}
	};
});
