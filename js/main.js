'use strict';

var HOUSING_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAP_WIDTH = 1200;
var MAP_TOP_Y = 130;
var MAP_BOTTOM_Y = 630;

var map = document.querySelector('.map');
var mapPinsList = map.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArrayElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var createPin = function (pinNumber) {
  var pin = {
    author: {
      avatar: 'img/avatars/user0' + (pinNumber + 1) + '.png',
    },
    offer: {
      title: 'Объявление',
      addres: 'location.' + getRandomIntInclusive(100, 900) + 'location.' + getRandomIntInclusive(100, 900),
      price: getRandomIntInclusive(100, 9000),
      type: getRandomArrayElement(HOUSING_TYPE),
      rooms: getRandomIntInclusive(1, 10),
      guests: getRandomIntInclusive(1, 20),
      checkin: getRandomArrayElement(CHECKIN_TIME),
      checkout: getRandomArrayElement(CHECKOUT_TIME),
      features: getRandomArrayElement(FEATURES),
      description: 'описание',
      photos: getRandomArrayElement(PHOTOS),
    },
    location: {
      x: getRandomIntInclusive(0, MAP_WIDTH - PIN_WIDTH),
      y: getRandomIntInclusive(MAP_TOP_Y, MAP_BOTTOM_Y),
    }
  };
  return pin;
};

var createPinsArray = function (quantity) {
  var arr = [];
  for (var i = 0; i < quantity; i++) {
    arr.push(createPin(i));
  }
  return arr;
};

var pins = createPinsArray(8);

var renderPin = function (pin) {
  var pinElement = mapPinTemplate.cloneNode(true);
  var mapPinImage = pinElement.querySelector('img');

  var pinX = pin.location.x + PIN_WIDTH / 2;
  var pinY = pin.location.y - PIN_HEIGHT / 2;

  pinElement.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
  mapPinImage.src = pin.author.avatar;
  mapPinImage.alt = pin.offer.title;

  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < pins.length; i++) {
  fragment.appendChild(renderPin(pins[i]));
}

mapPinsList.appendChild(fragment);

map.classList.remove('map--faded');


