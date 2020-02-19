'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinsList = map.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');

  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();

    pins.forEach(function (pin) {
      var element = window.pin.createElement(pin);
      var clickPinHandler = createClickPinHandler(pin);
      element.addEventListener('click', clickPinHandler);
      fragment.appendChild(element);
    });

    mapPinsList.appendChild(fragment);
  };

  var createClickPinHandler = function (pin) {
    var clickPinHandler = function () {
      window.pinCard.renderElement(pin);
    };

    return clickPinHandler;
  };

  var hidePins = function () {
    var mapPins = map.querySelectorAll(('.map__pin:not(.map__pin--main)'));
    mapPins.forEach(function (pin) {
      pin.style.display = 'none';
    });
  };

  var makePageActive = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.form.disableElements(false);
    window.backend.load(renderPins, window.backend.errorHandler);
  };

  window.form.disableElements(true);

  window.map = {
    makePageActive: makePageActive,
    hidePins: hidePins,
  };
})();
