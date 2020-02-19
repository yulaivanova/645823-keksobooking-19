'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinsList = map.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var mapFormInputs = mapFiltersContainer.querySelectorAll('.map__filters-container input');
  var mapFormSelects = mapFiltersContainer.querySelectorAll('.map__filters-container select');

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

  var makePageActive = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.form.toogleElements(mapFormInputs, false);
    window.form.toogleElements(mapFormSelects, false);
    window.form.toogleElements(window.form.fieldsets, false);
    window.form.updateAddressInput(window.form.addressInput, true);
    window.backend.load(renderPins, window.backend.errorHandler);
  };

  window.form.toogleElements(mapFormInputs, true);
  window.form.toogleElements(mapFormSelects, true);
  window.form.toogleElements(window.form.fieldsets, true);
  window.form.updateAddressInput(window.form.addressInput, false);

  window.map = {
    makePageActive: makePageActive,
  };
})();
