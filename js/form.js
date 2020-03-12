'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormInputs = adForm.querySelectorAll('.ad-form input');
  var adFormRoomNumber = adForm.querySelector('#room_number');
  var adFormCapacity = adForm.querySelector('#capacity');
  var adFormPriceInput = adForm.querySelector('#price');
  var adFormTypeInput = adForm.querySelector('#type');
  var adFormCheckInInput = adForm.querySelector('#timein');
  var adFormCheckOutInput = adForm.querySelector('#timeout');
  var adFromAddressInput = adForm.querySelector('#address');
  var adformResetButton = adForm.querySelector('.ad-form__reset');

  var updateAddressInput = function (addressInput, isActive) {
    addressInput.value = window.mainPin.getAddres(isActive);
    return addressInput.value;
  };

  var getMessageValidityCapacity = function () {
    var roomNumber = parseInt(adFormRoomNumber.value, 10);
    var capacity = parseInt(adFormCapacity.value, 10);
    if ((roomNumber >= capacity && roomNumber !== 100 && capacity !== 0) || (roomNumber === 100 && capacity === 0)) {
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

    if (type === 'flat' && price < 1000) {
      return 'Для квартиры минимальная цена за ночь 1 000';
    } else if (type === 'house' && price < 5000) {
      return 'Для дома минимальная цена за ночь 5 000';
    } else if (type === 'palace' && price < 10000) {
      return 'Для дворца минимальная цена за ночь 10 000';
    } else {
      return '';
    }
  };

  var priceValidation = function () {
    var type = adFormTypeInput.value;

    switch (type) {
      case 'flat':
        adFormPriceInput.placeholder = 1000;
        break;

      case 'house':
        adFormPriceInput.placeholder = 5000;
        break;

      case 'palace':
        adFormPriceInput.placeholder = 10000;
        break;

      case 'bungalo':
        adFormPriceInput.placeholder = 0;
        break;
    }
  };

  var inputValidation = function () {
    adFormInputs.forEach(function (input) {
      if (input.checkValidity() === false) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = '';
      }
    });
  };

  var disableElements = function (state) {
    window.util.toogleElements(adForm, state);
    updateAddressInput(adFromAddressInput, !state);
  };

  var onSaveSuccess = function () {
    window.map.makePageNotActive();
    window.messages.showSuccess();
  };

  var onSaveError = function () {
    window.messages.showError();
    inputValidation();
  };

  adForm.addEventListener('change', function () {
    adFormCapacity.setCustomValidity(getMessageValidityCapacity());
    adFormPriceInput.setCustomValidity(getMessageValidityPrice());
    priceValidation();
    inputValidation();
  });

  adFormCheckInInput.addEventListener('change', function () {
    adFormCheckOutInput.value = adFormCheckInInput.value;
  });

  adFormCheckOutInput.addEventListener('change', function () {
    adFormCheckInInput.value = adFormCheckOutInput.value;
  });

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), onSaveSuccess, onSaveError);
    evt.preventDefault();
  });

  adformResetButton.addEventListener('click', function () {
    window.map.makePageNotActive();
  });

  window.form = {
    updateAddressInput: updateAddressInput,
    disableElements: disableElements,
    addressInput: adFromAddressInput,
  };

})();
