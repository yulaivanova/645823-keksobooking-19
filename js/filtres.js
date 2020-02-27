'use strict';

(function () {

  var mapFilter = document.querySelector('.map__filters');
  var housingType = mapFilter.querySelector('#housing-type');
  var housingPrice = mapFilter.querySelector('#housing-price');
  var housingRooms = mapFilter.querySelector('#housing-rooms');
  var housingGuests = mapFilter.querySelector('#housing-guests');

  var price = {
    low: {min: 0, max: 10000},
    middle: {min: 10000, max: 50000},
    high: {min: 50000, max: Number.MAX_VALUE},
  };

  var filter = function (pins) {
    var typeValue = housingType.value;
    var priceValue = housingPrice.value;
    var roomsValue = housingRooms.value;
    var guestsValue = housingGuests.value;
    pins = pins.filter(function (pin) {
      var validType = (typeValue === 'any') ? true : pin.offer.type === typeValue;
      var validPrice = (priceValue === 'any') ? true : price[priceValue].min <= pin.offer.price && pin.offer.price < price[priceValue].max;
      var validRooms = (roomsValue === 'any') ? true : pin.offer.rooms === Number(roomsValue);
      var validGuests = (guestsValue === 'any') ? true : pin.offer.guests === Number(guestsValue);
      var checkboxesInput = mapFilter.querySelectorAll('.map__checkbox:checked');
      var checkboxValue = true;

      for (var i = 0; i < checkboxesInput.length; i++) {
        checkboxValue = pin.offer.features.some(function (it) {
          return it === checkboxesInput[i].value;
        });
        if (!checkboxValue) {
          break;
        }
      }
      return validType && validPrice && validRooms && validGuests && checkboxValue;
    });
    return pins;
  };

  var resetFiltres = function () {
    housingType.value = 'any';
    housingPrice.value = 'any';
    housingRooms.value = 'any';
    housingGuests.value = 'any';
    var checkboxesInput = mapFilter.querySelectorAll('.map__checkbox:checked');
    checkboxesInput.forEach(function (checkbox) {
      checkbox.checked = false;
    });
  };

  window.filtres = {
    map: filter,
    reset: resetFiltres,
  };

})();
