'use strict';

(function () {
  var declension = function (number, words) {
    var cases = [2, 0, 1, 1, 1, 2];
    return words[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[
          number % 10 < 5
            ? number % 10
            : 5
        ]
    ];
  };

  var getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomElement = function (elements) {
    return elements[getRandomIntInclusive(0, elements.length - 1)];
  };

  window.util = {
    declension: declension,
    getRandomIntInclusive: getRandomIntInclusive,
    getRandomElement: getRandomElement,
  };

})();
