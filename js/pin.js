'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PIN_QUANTITY = 5;

  var mapPinsList = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderedPins = [];

  var removePins = function () {
    if (renderedPins.length) {
      renderedPins.forEach(function (pinElement) {
        pinElement.remove();
      });
      renderedPins = [];
    }
  };

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
    removePins();

    var fragment = document.createDocumentFragment();
    var pinsCopy = pins.slice();
    pinsCopy.length = (pinsCopy.length > PIN_QUANTITY) ? PIN_QUANTITY : pinsCopy.length;

    pinsCopy.forEach(function (pin) {
      var element = createPinElement(pin);
      var conPinClick = createClickOnPin(pin);
      element.addEventListener('click', conPinClick);
      fragment.appendChild(element);
      renderedPins.push(element);
    });

    mapPinsList.appendChild(fragment);
  };

  var createClickOnPin = function (pin) {
    var onPinClick = function () {
      window.pinCard.render(pin);
    };

    return onPinClick;
  };

  window.pin = {
    render: renderPins,
    remove: removePins
  };

})();
