'use strict';

(function () {
  var mapFilter = document.querySelector('.map__filters');
  var housingType = mapFilter.querySelector('#housing-type');

  var filterType = function (pins) {
    var typeValue = housingType.value;
    if (typeValue === 'any') {
      return pins;
    } else {
      pins = pins.filter(function (pin) {
        return pin.offer.type === typeValue;
      });
      return pins;
    }
  };

  window.filtres = {
    type: filterType,
  };

})();
