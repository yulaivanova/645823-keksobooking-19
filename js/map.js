'use strict';

(function () {

  var map = document.querySelector('.map');

  var adForm = document.querySelector('.ad-form');
  var mapFilter = document.querySelector('.map__filters');

  var onLoadSucces = function (data) {
    var pinsList = window.filtres.type(data);
    window.pin.render(pinsList);
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
    window.backend.load(onLoadSucces, window.backend.onLoadError);
  };

  var onTypeFilterClick = function () {
    hidePins();
    window.pinCard.close();
    window.backend.load(onLoadSucces, window.backend.onLoadError);
  };

  mapFilter.addEventListener('change', onTypeFilterClick);

  window.form.disableElements(true);

  window.map = {
    makePageActive: makePageActive,
    hidePins: hidePins,
  };

})();
