'use strict';

(function () {

  var KEY_ENTER = 'Enter';
  var ESC_KEY = 'Escape';
  var PIN_QUANTITY = 8;

  var map = document.querySelector('.map');
  var mapPinsList = map.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('.ad-form fieldset');
  var adFromAddressInput = adForm.querySelector('#address');
  var mapFilters = document.querySelector('.map__filters-container');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var mapFormInputs = mapFiltersContainer.querySelectorAll('.map__filters-container input');
  var mapFormSelects = mapFiltersContainer.querySelectorAll('.map__filters-container select');
  var mapPinMain = map.querySelector('.map__pin--main');


  var generatedPins = window.pin.createElements(PIN_QUANTITY);

  var closePinCard = function () {
    map.querySelector('.map__card').remove();
    document.removeEventListener('keydown', onPinCardEscPress);
  };

  var onPinCardEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closePinCard();
    }
  };

  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(window.pin.createElement(pins[i]));
    }
    mapPinsList.appendChild(fragment);
  };


  var renderPinCard = function (pin) {
    map.insertBefore(window.pinCard.createElement(pin), mapFilters);

    var pinCardCloseButton = map.querySelector('.popup__close');
    pinCardCloseButton.addEventListener('click', function () {
      closePinCard();
    });

    document.addEventListener('keydown', onPinCardEscPress);
  };

  var makePageActive = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.form.toogleElements(mapFormInputs, false);
    window.form.toogleElements(mapFormSelects, false);
    window.form.toogleElements(adFormFieldsets, false);
    window.form.updateAddressInput(adFromAddressInput, true);
    renderPins(generatedPins);

    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin, i) {
      pin.addEventListener('click', function () {
        var pinCard = map.querySelector('.map__card');
        if (pinCard) {
          pinCard.remove();
          renderPinCard(generatedPins[i]);
        } else {
          renderPinCard(generatedPins[i]);
        }
      });

      pin.addEventListener('keydown', function (evt) {
        if (evt.key === KEY_ENTER) {
          var pinCard = map.querySelector('.map__card');
          if (pinCard) {
            pinCard.remove();
            renderPinCard(generatedPins[i]);
          } else {
            renderPinCard(generatedPins[i]);
          }
        }
      });
    });
  };

  mapPinMain.addEventListener('click', function () {
    makePageActive();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_ENTER) {
      makePageActive();
    }
  });

  window.form.toogleElements(mapFormInputs, true);
  window.form.toogleElements(mapFormSelects, true);
  window.form.toogleElements(adFormFieldsets, true);
  window.form.updateAddressInput(adFromAddressInput, false);

})();
