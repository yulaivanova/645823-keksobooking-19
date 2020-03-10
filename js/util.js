'use strict';

(function () {
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 65;
  var PIN_MAIN_ARROW = 16;
  var DEBOUNCE_INTERVAL = 500; // ms

  var debounce = function (cb, interval) {
    var lastTimeout = null;

    if (!interval) {
      interval = DEBOUNCE_INTERVAL;
    }

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, interval);
    };
  };

  var toogleElements = function (elements, state) {
    Array.prototype.forEach.call(elements, function (element) {
      element.disabled = state;
    });
  };

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
    getPinX: getPinX,
    getPinY: getPinY,
    debounce: debounce,
    toogleElements: toogleElements,
  };

})();
