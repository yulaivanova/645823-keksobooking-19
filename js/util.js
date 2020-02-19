'use strict';

(function () {
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 65;
  var PIN_MAIN_ARROW = 16;

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

  var getPinX = function (left) {
    return left + PIN_MAIN_WIDTH / 2;
  };

  var getPinY = function (top, isActive) {
    if (isActive) {
      return PIN_MAIN_HEIGHT + top + PIN_MAIN_ARROW;
    } else {
      return PIN_MAIN_HEIGHT / 2 + top;
    }
  };

  window.util = {
    declension: declension,
    getRandomIntInclusive: getRandomIntInclusive,
    getRandomElement: getRandomElement,
    getPinX: getPinX,
    getPinY: getPinY,
  };

})();
