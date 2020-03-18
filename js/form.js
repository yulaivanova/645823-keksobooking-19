'use strict';

(function () {
  // Это не перечисление, это маппинг
  var PRICE_TYPE = {
    flat: 1000,
    bungalo: 0,
    palace: 10000,
    house: 5000,
  };

  var adForm = document.querySelector('.ad-form');
  var adFormFields = adForm.elements;
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
      var declinedRooms = window.util.declension(roomNumber, [' комната', ' комнаты', ' комнат']);
      var declinedGuests = window.util.declension(roomNumber, [' гостя', ' гостей']);
      var declinedMatch = window.util.declension(roomNumber, [' подходит', ' подходят']);

      return roomNumber + declinedRooms + declinedMatch + ' только для ' + roomNumber + declinedGuests;
    }
  };

  var getMessageValidityPrice = function () {
    var price = parseInt(adFormPriceInput.value, 10);
    var type = adFormTypeInput.value;

    if (type === 'flat' && price < PRICE_TYPE[type]) {
      return 'Для квартиры минимальная цена за ночь 1 000';
    } else if (type === 'house' && price < PRICE_TYPE[type]) {
      return 'Для дома минимальная цена за ночь 5 000';
    } else if (type === 'palace' && price < PRICE_TYPE[type]) {
      return 'Для дворца минимальная цена за ночь 10 000';
    }

    return '';
  };

  var validatePrice = function () {
    var type = adFormTypeInput.value;
    adFormPriceInput.placeholder = PRICE_TYPE[type];
  };

  var validateInput = function () {
    Array.prototype.forEach.call(adFormFields, function (field) {
      if (!field.checkValidity()) {
        addInvalidOnField(field);
      } else {
        removeInvalidOnField(field);
      }
    });
  };

  var removeInvalidOnField = function (field) {
    field.parentNode.classList.remove('ad-form__element--invalid');
  };

  var addInvalidOnField = function (field) {
    field.parentNode.classList.add('ad-form__element--invalid');
  };

  var disable = function (state) {
    window.util.toogleElements(adForm, state);
    updateAddressInput(adFromAddressInput, !state);
  };

  var onSaveSuccess = function () {
    window.map.makePageNotActive();
    window.messages.showSuccess();
    validatePrice();
  };

  var onSaveError = function () {
    window.messages.showError();
    validateInput();
  };

  adForm.addEventListener('change', function () {
    adFormCapacity.setCustomValidity(getMessageValidityCapacity());
    adFormPriceInput.setCustomValidity(getMessageValidityPrice());
    validatePrice();
    validateInput();
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
    Array.prototype.forEach.call(adFormFields, function (field) {
      removeInvalidOnField(field);
    });
  });

  window.form = {
    updateAddressInput: updateAddressInput,
    disableElements: disable,
    addressInput: adFromAddressInput,
  };

})();
