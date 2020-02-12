'use strict';

(function () {
  window.randomization = {
    getRandomIntInclusive: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomElements: function (elements) {
      return elements[this.getRandomIntInclusive(0, elements.length - 1)];
    },
  };

})();
