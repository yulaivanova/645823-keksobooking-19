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
var PIN_QUANTITY = 8;
var MIN_PRICE = 100;
var MAX_PRICE = 99000;
var ROOMS = ['1', '2', '3'];
var GUEST = ['0', '1', '2'];

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

var getRandomElements = function (elements) {
  return elements[getRandomIntInclusive(0, elements.length - 1)];
};

var createLocation = function () {
  var location = {
    x: getRandomIntInclusive(PIN_WIDTH / 2, MAP_WIDTH - PIN_WIDTH),
    y: getRandomIntInclusive(MAP_TOP_Y + PIN_HEIGHT, MAP_BOTTOM_Y),
  };
  return location;
};

var createPin = function (pinNumber) {
  var location = createLocation();

  var pin = {
    author: {
      avatar: 'img/avatars/user0' + (pinNumber + 1) + '.png',
    },
    offer: {
      title: 'Объявление',
      addres: location.x + ', ' + location.y,
      price: getRandomIntInclusive(MIN_PRICE, MAX_PRICE),
      type: getRandomElements(HOUSING_TYPE),
      rooms: getRandomElements(ROOMS),
      guests: getRandomElements(GUEST),
      checkin: getRandomElements(CHECKIN_TIME),
      checkout: getRandomElements(CHECKOUT_TIME),
      features: getRandomElements(FEATURES),
      description: 'описание',
      photos: getRandomElements(PHOTOS),
    },
    location: location,
  };
  return pin;
};

var createPins = function (quantity) {
  var arr = [];
  for (var i = 0; i < quantity; i++) {
    arr.push(createPin(i));
  }
  return arr;
};

var pins = createPins(PIN_QUANTITY);

var renderPin = function (pin) {
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

var renderPins = function (pinsArr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pinsArr.length; i++) {
    fragment.appendChild(renderPin(pinsArr[i]));
  }
  return fragment;
};

map.classList.remove('map--faded');

mapPinsList.appendChild(renderPins(pins));
