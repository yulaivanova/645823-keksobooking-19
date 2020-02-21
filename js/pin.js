'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PIN_QUANTITY = 5;

  var map = document.querySelector('.map');
  var mapPinsList = map.querySelector('.map__pins');
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

  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();
    var pinsCopy = pins.slice();
    pinsCopy.length = (pinsCopy.length > PIN_QUANTITY) ? PIN_QUANTITY : pinsCopy.length;

    pinsCopy.forEach(function (pin) {
      var element = window.pin.createElement(pin);
      var conPinClick = createClickOnPin(pin);
      element.addEventListener('click', conPinClick);
      fragment.appendChild(element);
    });

    mapPinsList.appendChild(fragment);
  };

  var createClickOnPin = function (pin) {
    var onPinClick = function () {
      window.pinCard.renderElement(pin);
    };

    return onPinClick;
  };

  window.pin = {
    createElement: createPinElement,
    render: renderPins,
  };

})();
