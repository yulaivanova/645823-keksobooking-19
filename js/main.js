'use strict';

var HOUSE_TYPE = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  palace: 'Дворец',
  house: 'Дом',
};
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
var GUEST = ['1', '2'];

var map = document.querySelector('.map');
var mapPinsList = map.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var mapCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

var mapFilters = document.querySelector('.map__filters-container');

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

var getPinTypeText = function (pin) {
  return HOUSE_TYPE[pin.offer.type];
};


var declension = function (number, words) {
  var cases = [2, 0, 1, 1, 1, 2];
  return words[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[
        number % 10 < 5
          ? number % 10
          : 5
      ]
  ];
};

var getPinCapacityText = function (pin) {
  var rooms = pin.offer.rooms + ' ' + declension(pin.offer.rooms, ['комната', 'комнаты', 'комнат']);
  var guests = pin.offer.guests + ' ' + declension(pin.offer.guests, ['гостя', 'гостей']);
  return rooms + ' для ' + guests;
};

var getPinTimeText = function (pin) {
  return 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
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
      type: getRandomElements(Object.keys(HOUSE_TYPE)),
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

var generatedPins = createPins(PIN_QUANTITY);

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

var createPinCardElement = function (pin) {
  var cardElement = mapCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = pin.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = pin.offer.addres;
  cardElement.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getPinTypeText(pin);
  cardElement.querySelector('.popup__text--capacity').textContent = getPinCapacityText(pin);
  cardElement.querySelector('.popup__text--time').textContent = getPinTimeText(pin);
  cardElement.querySelector('.popup__features').textContent = pin.offer.features;
  cardElement.querySelector('.popup__description').textContent = pin.offer.description;
  cardElement.querySelector('.popup__photos').querySelector('.popup__photo').src = pin.offer.photos;
  cardElement.querySelector('.popup__avatar').src = pin.author.avatar;

  return cardElement;
};

var renderPins = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(createPinElement(pins[i]));
  }
  mapPinsList.appendChild(fragment);
};

var renderPinCard = function (pin) {
  map.insertBefore(createPinCardElement(pin), mapFilters);
};

renderPins(generatedPins);
renderPinCard(generatedPins[0]);
map.classList.remove('map--faded');
