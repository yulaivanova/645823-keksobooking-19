'use strict';

(function () {
  // var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
  // var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
  // var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  // var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  // var MIN_PRICE = 100;
  // var MAX_PRICE = 99000;
  // var ROOMS = ['1', '2', '3'];
  // var GUEST = ['1', '2'];
  // var HOUSE_TYPE = {
  //   flat: 'Квартира',
  //   bungalo: 'Бунгало',
  //   palace: 'Дворец',
  //   house: 'Дом',
  // };
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  // var MAP_WIDTH = 1200;
  // var MAP_TOP_Y = 130;
  // var MAP_BOTTOM_Y = 630;

  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  // var createLocation = function () {
  //   var location = {
  //     x: window.util.getRandomIntInclusive(PIN_WIDTH / 2, MAP_WIDTH - PIN_WIDTH),
  //     y: window.util.getRandomIntInclusive(MAP_TOP_Y + PIN_HEIGHT, MAP_BOTTOM_Y),
  //   };
  //   return location;
  // };

  // var createPin = function (pinNumber) {
  //   var location = createLocation();

  //   var pin = {
  //     author: {
  //       avatar: 'img/avatars/user0' + (pinNumber + 1) + '.png',
  //     },
  //     offer: {
  //       title: 'Объявление',
  //       addres: location.x + ', ' + location.y,
  //       price: window.util.getRandomIntInclusive(MIN_PRICE, MAX_PRICE),
  //       type: window.util.getRandomElement(Object.keys(HOUSE_TYPE)),
  //       rooms: window.util.getRandomElement(ROOMS),
  //       guests: window.util.getRandomElement(GUEST),
  //       checkin: window.util.getRandomElement(CHECKIN_TIME),
  //       checkout: window.util.getRandomElement(CHECKOUT_TIME),
  //       features: FEATURES,
  //       description: 'описание',
  //       photos: PHOTOS,
  //     },
  //     location: location,
  //   };
  //   return pin;
  // };

  // var createPins = function (quantity) {
  //   var arr = [];
  //   for (var i = 0; i < quantity; i++) {
  //     arr.push(createPin(i));
  //   }
  //   return arr;
  // };

  var createPinElement = function (pin) {
    var pinElement = mapPinTemplate.cloneNode(true);
    var mapPinImage = pinElement.querySelector('img');

    var pinX = pin.location.x - PIN_WIDTH / 2;
    var pinY = pin.location.y - PIN_HEIGHT;

    pinElement.style.left = pinX + 'px';
    pinElement.style.top = pinY + 'px';
    mapPinImage.src = pin.author.avatar;
    mapPinImage.alt = pin.offer.title;

    return pinElement;
  };

  window.pin = {
    createElement: createPinElement,
  };

})();
