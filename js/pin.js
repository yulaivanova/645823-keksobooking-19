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
      renderedPins.forEach(function (pin) {
        pin.remove();
      });
      renderedPins = [];
    }
  };

  var createPin = function (pin) {
    var pinItem = mapPinTemplate.cloneNode(true);
    var mapPinImage = pinItem.querySelector('img');

    var pinX = pin.location.x - PIN_WIDTH / 2;
    var pinY = pin.location.y - PIN_HEIGHT;

    pinItem.style.left = pinX + 'px';
    pinItem.style.top = pinY + 'px';
    mapPinImage.src = pin.author.avatar;
    mapPinImage.alt = pin.offer.title;

    pinItem.addEventListener('click', function () {
      if (!pinItem.classList.contains('map__pin--active')) {
        var activePin = mapPinsList.querySelector('.map__pin--active');
        if (activePin) {
          activePin.classList.remove('map__pin--active');
        }
        pinItem.classList.add('map__pin--active');
      }
    });

    return pinItem;
  };

  var renderPins = function (pins) {
    removePins();

    var fragment = document.createDocumentFragment();
    var pinsCopy = pins.slice();
    pinsCopy.length = (pinsCopy.length > PIN_QUANTITY) ? PIN_QUANTITY : pinsCopy.length;

    pinsCopy.forEach(function (pin) {
      var element = createPin(pin);
      var onPinClick = createClickOnPin(pin);
      element.addEventListener('click', onPinClick);
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

  var makePinNotActive = function () {
    var activePin = document.querySelector('.map__pin--active');
    activePin.classList.remove('map__pin--active');
  };

  window.pin = {
    render: renderPins,
    remove: removePins,
    quantity: PIN_QUANTITY,
    desable: makePinNotActive,
  };

})();
