'use strict';

(function () {

  var KEY_ENTER = 'Enter';
  var ESC_KEY = 'Escape';
  var PIN_QUANTITY = 8;

  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 65;
  var PIN_MAIN_ARROW = 16;

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

  var MAP_WIDTH = map.offsetWidth;
  var MAP_HEIGHT = map.offsetHeight - mapFilters.offsetHeight;

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
      var element = window.pin.createElement(pins[i]);
      var clickPinHandler = createClickPinHandler(i);
      element.addEventListener('click', clickPinHandler);
      element.addEventListener('keydown', function (evt) {
        if (evt.keyCode === KEY_ENTER) {
          clickPinHandler();
        }
      });
      fragment.appendChild(element);
    }
    mapPinsList.appendChild(fragment);
  };

  var createClickPinHandler = function (index) {
    var clickPinHandler = function () {
      var pinCard = map.querySelector('.map__card');
      if (pinCard) {
        pinCard.remove();
        renderPinCard(generatedPins[index]);
      } else {
        renderPinCard(generatedPins[index]);
      }
    };
    return clickPinHandler;
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
  };

  mapPinMain.addEventListener('click', function () {
    makePageActive();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_ENTER) {
      makePageActive();
    }
  });

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var offsetLeft = mapPinMain.offsetLeft - shift.x;
      var offsetTop = mapPinMain.offsetTop - shift.y;

      if (offsetLeft < MAP_WIDTH - PIN_MAIN_WIDTH && offsetLeft > 0 && offsetTop > PIN_MAIN_HEIGHT && offsetTop < MAP_HEIGHT - PIN_MAIN_HEIGHT - PIN_MAIN_ARROW) {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }

      window.form.updateAddressInput(adFromAddressInput, true);

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mapPinMain.removeEventListener('click', onClickPreventDefault);
        };
        mapPinMain.addEventListener('click', onClickPreventDefault);
      }

      makePageActive();

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  window.form.toogleElements(mapFormInputs, true);
  window.form.toogleElements(mapFormSelects, true);
  window.form.toogleElements(adFormFieldsets, true);
  window.form.updateAddressInput(adFromAddressInput, false);

})();
