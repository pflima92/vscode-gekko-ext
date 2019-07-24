/**
 * Raw `Strategy` boilerplate.
 *
 * Wiki documentation for how to create a strategy: https://github.com/jspare-projects/gekko/wiki/strategies_creating_a_strategy
 */
var method = {};

// Prepara a estratégia
method.init = function () {
    this.name = 'strategy-name';
};

// What happens on every new candle?
method.update = function (candle) {
    // do nothing!
};

method.log = function () {
    // do nothing!
}

// Checkage logic
method.check = function (candle) {
}

module.exports = method;
