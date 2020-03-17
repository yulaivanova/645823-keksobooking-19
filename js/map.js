'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapFilter = document.querySelector('.map__filters');

  var pinsData = [];

  var onLoadSucces = function (data) {
    pinsData = data;
    renderPinsOnMap();
  };

  var renderPinsOnMap = function () {
    var pinsToRender = window.filters.process(pinsData);
    window.pin.render(pinsToRender);
  };

  var makePageActive = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.form.disableElements(false);
    window.filters.disable(false);
    window.backend.load(onLoadSucces);
  };

  var makePageNotActive = function () {
    window.pin.remove();
    window.pinCard.close();
    window.form.disableElements(true);
    window.filters.disable(true);
    adForm.reset();
    window.filters.reset();
    window.mainPin.reset();
    window.form.updateAddressInput(window.form.addressInput, true);
    window.photoUpload.reset();
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
  };

  var onFilterClick = window.util.debounce(function () {
    window.pinCard.close();
    renderPinsOnMap();
  });

  mapFilter.addEventListener('change', onFilterClick);

  window.form.disableElements(true);
  window.filters.disable(true);

  window.map = {
    makePageActive: makePageActive,
    makePageNotActive: makePageNotActive,
  };

})();
