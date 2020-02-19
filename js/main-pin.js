'use strict';

(function () {
  var MIN_Y = 130;
  var MAX_Y = 630;
  var KEY_ENTER = 'Enter';

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var MAP_WIDTH = map.offsetWidth;

  var getAddres = function (isActive) {
    return Math.round(window.util.getPinX(parseInt(mapPinMain.style.left, 10))) +
     ' ,' + Math.round(window.util.getPinY(parseInt(mapPinMain.style.top, 10), isActive));
  };

  var isValidX = function (x) {
    return x >= 0 && x <= MAP_WIDTH;
  };

  var isValidY = function (y) {
    return y >= MIN_Y && y <= MAX_Y;
  };

  mapPinMain.addEventListener('click', function () {
    window.map.makePageActive();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_ENTER) {
      window.map.makePageActive();
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

      var offsetLeft = mapPinMain.offsetLeft - shift.x;
      var offsetTop = mapPinMain.offsetTop - shift.y;

      var x = window.util.getPinX(offsetLeft);
      var y = window.util.getPinY(offsetTop);

      if (isValidX(x) && isValidY(y)) {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
        window.form.updateAddressInput(window.form.addressInput, true);

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
      }

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

      window.map.makePageActive();

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  window.mainPin = {
    getAddres: getAddres,
  };

})();
