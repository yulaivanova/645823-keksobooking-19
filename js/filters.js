'use strict';

(function () {

  var mapFilter = document.querySelector('.map__filters');

  var housingType = mapFilter.elements['housing-type'];
  var housingPrice = mapFilter.elements['housing-price'];
  var housingRooms = mapFilter.elements['housing-rooms'];
  var housingGuests = mapFilter.elements['housing-guests'];
  var housingFeatures = mapFilter.querySelector('#housing-features');

  var price = {
    low: {min: 0, max: 10000},
    middle: {min: 10000, max: 50000},
    high: {min: 50000, max: Number.MAX_VALUE},
  };

  var isAny = function (value) {
    return value === 'any';
  };

  var isEqual = function (data, value) {
    return data === value;
  };

  var isType = function (data, value) {
    return isAny(value) || isEqual(data, value);
  };

  var isNumber = function (data, value) {
    return isAny(value) || isEqual(data, parseInt(value, 10));
  };

  var isPrice = function (data, value) {
    return isAny(value) || (data >= price[value].min && data < price[value].max);
  };

  var isFeatures = function (data, featureElements) {
    var is = true;

    for (var i = 0; i < featureElements.length; i++) {
      var element = featureElements[i];
      if (!element.checked) {
        continue;
      }

      is = data.some(function (feature) {
        return feature === element.value;
      });

      if (!is) {
        return false;
      }
    }

    return true;
  };

  var filter = function (pins) {
    pins = pins.filter(function (pin) {
      return isType(pin.offer.type, housingType.value)
        && isPrice(pin.offer.price, housingPrice.value)
        && isNumber(pin.offer.rooms, housingRooms.value)
        && isNumber(pin.offer.guests, housingGuests.value)
        && isFeatures(pin.offer.features, housingFeatures.elements);
    });
    return pins;
  };

  var resetFilters = function () {
    mapFilter.reset();
  };

  var desableFilters = function (state) {
    window.util.toogleElements(mapFilter, state);
  };

  window.filters = {
    process: filter,
    reset: resetFilters,
    desableElements: desableFilters,
  };

})();
