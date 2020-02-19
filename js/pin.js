'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var createPinElement = function (pin) {
    var pinElement = mapPinTemplate.cloneNode(true);
    var mapPinImage = pinElement.querySelector('img');

    var pinX = pin.location.x - PIN_WIDTH / 2;
    var pinY = pin.location.y - PIN_HEIGHT;

    pinElement.style.left = pinX + 'px';
    pinElement.style.top = pinY + 'px';
    mapPinImage.src = pin.author.avatar;
    mapPinImage.alt = pin.offer.title;

    return pinElement;
  };

  window.pin = {
    createElement: createPinElement,
  };

})();
