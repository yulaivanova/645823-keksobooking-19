'use strict';

(function () {
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 65;
  var PIN_MAIN_ARROW = 16;

  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adFormRoomNumber = adForm.querySelector('#room_number');
  var adFormCapacity = adForm.querySelector('#capacity');

  var getPinMainX = function () {
    var addresX = parseInt(mapPinMain.style.left, 10);
    return addresX + PIN_MAIN_WIDTH / 2;
  };

  var getPinMainY = function (isActive) {
    var addresY = parseInt(mapPinMain.style.top, 10);
    if (isActive) {
      return PIN_MAIN_HEIGHT + addresY + PIN_MAIN_ARROW;
    } else {
      return PIN_MAIN_HEIGHT / 2 + addresY;
    }
  };

  var updateAddressInput = function (addressInput, isActive) {
    var addres = Math.round(getPinMainX()) + ', ' + Math.round(getPinMainY(isActive));
    addressInput.value = addres;
    return addressInput.value;
  };

  var getMessageValidityCapacity = function () {
    var roomNumber = parseInt(adFormRoomNumber.value, 10);
    var capacity = parseInt(adFormCapacity.value, 10);
    if ((roomNumber >= capacity && roomNumber !== 100) || (roomNumber === 100 && capacity === 0)) {
      return '';
    } else if (roomNumber === 100 && capacity !== 0) {
      return 'Для 100 комнат вы должны выбрать вариант "Не для гостей"';
    } else {
      return roomNumber + window.declension(roomNumber, [' комната', ' комнаты', ' комнат']) + window.declension(roomNumber,
          [' подходит', ' подходят']) + ' только для ' + roomNumber + window.declension(roomNumber, [' гостя', ' гостей']);
    }
  };

  adForm.addEventListener('change', function () {
    adFormCapacity.setCustomValidity(getMessageValidityCapacity());
  });

  var toogleFormElements = function (formElements, state) {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].disabled = state;
    }
  };

  window.form = {
    updateAddressInput: updateAddressInput,
    toogleElements: toogleFormElements,
  };

})();
