'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var adFormRoomNumber = adForm.querySelector('#room_number');
  var adFormCapacity = adForm.querySelector('#capacity');
  var adFormPriceInput = adForm.querySelector('#price');
  var adFormTypeInput = adForm.querySelector('#type');
  var adFormCheckInInput = adForm.querySelector('#timein');
  var adFormCheckOutInput = adForm.querySelector('#timeout');
  var adFromAddressInput = adForm.querySelector('#address');
  var adFormFieldsets = adForm.querySelectorAll('.ad-form fieldset');

  var updateAddressInput = function (addressInput, isActive) {
    addressInput.value = window.mainPin.getAddres(isActive);
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
      return roomNumber + window.util.declension(roomNumber, [' комната', ' комнаты', ' комнат']) + window.util.declension(roomNumber,
          [' подходит', ' подходят']) + ' только для ' + roomNumber + window.util.declension(roomNumber, [' гостя', ' гостей']);
    }
  };

  var getMessageValidityPrice = function () {
    var price = parseInt(adFormPriceInput.value, 10);
    var type = adFormTypeInput.value;

    if ((type === 'flat' && price >= 1000) || (type === 'house' && price >= 5000) || (type === 'palace' && price >= 10000)) {
      return '';
    } else if (type === 'flat' && price < 1000) {
      return 'Для квартиры минимальная цена за ночь 1 000';
    } else if (type === 'house' && price < 5000) {
      return 'Для дома минимальная цена за ночь 5 000';
    } else {
      return 'Для дворца минимальная цена за ночь 10 000';
    }
  };

  var checkInOutValidation = function () {
    adFormCheckInInput.addEventListener('change', function () {
      adFormCheckOutInput.value = adFormCheckInInput.value;
    });

    adFormCheckOutInput.addEventListener('change', function () {
      adFormCheckInInput.value = adFormCheckOutInput.value;
    });
  };

  adForm.addEventListener('change', function () {
    adFormCapacity.setCustomValidity(getMessageValidityCapacity());
    adFormPriceInput.setCustomValidity(getMessageValidityPrice());
    checkInOutValidation();
  });

  var toogleFormElements = function (formElements, state) {
    formElements.forEach(function (element) {
      element.disabled = state;
    });
  };

  window.form = {
    updateAddressInput: updateAddressInput,
    toogleElements: toogleFormElements,
    addressInput: adFromAddressInput,
    fieldsets: adFormFieldsets,
  };

})();
