'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var HOUSE_TYPE = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    palace: 'Дворец',
    house: 'Дом',
  };

  var mapCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var photoCardTemplate = mapCardTemplate.querySelector('.popup__photo');
  var map = document.querySelector('.map');

  var pinCardElement = null;


  var getPinTypeText = function (pin) {
    return HOUSE_TYPE[pin.offer.type];
  };

  var getPinTimeText = function (pin) {
    return 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
  };

  var getPinCapacityText = function (pin) {
    var rooms = pin.offer.rooms + ' ' + window.util.declension(pin.offer.rooms, ['комната', 'комнаты', 'комнат']);
    var guests = pin.offer.guests + ' ' + window.util.declension(pin.offer.guests, ['гостя', 'гостей', 'гостей']);
    if (pin.offer.rooms > 0 && pin.offer.guests > 0) {
      return rooms + ' для ' + guests;
    } else {
      return '';
    }
  };

  var createFeaturesPinCard = function (pin) {
    var featuresFragment = document.createDocumentFragment();

    pin.offer.features.forEach(function (feature) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature');
      featureElement.classList.add('popup__feature--' + feature);
      featuresFragment.appendChild(featureElement);
    });

    return featuresFragment;
  };

  var createPhotosPinCard = function (pin) {
    var photosFragment = document.createDocumentFragment();

    pin.offer.photos.forEach(function (photo) {
      var photoElement = photoCardTemplate.cloneNode(true);
      photoElement.src = photo;
      photosFragment.appendChild(photoElement);
    });

    return photosFragment;
  };

  var createPinCardElement = function (pin) {
    var cardElement = mapCardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = pin.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = pin.offer.addres;
    cardElement.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = getPinTypeText(pin);
    cardElement.querySelector('.popup__text--capacity').textContent = getPinCapacityText(pin);
    cardElement.querySelector('.popup__text--time').textContent = getPinTimeText(pin);
    cardElement.querySelector('.popup__features').appendChild(createFeaturesPinCard(pin));
    cardElement.querySelector('.popup__description').textContent = pin.offer.description;
    cardElement.querySelector('.popup__photos').innerHTML = '';
    cardElement.querySelector('.popup__photos').appendChild(createPhotosPinCard(pin));
    cardElement.querySelector('.popup__avatar').src = pin.author.avatar;

    return cardElement;
  };

  var onPinCardEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closePinCard();
    }
  };

  var closePinCard = function () {
    if (pinCardElement) {
      pinCardElement.remove();
      document.removeEventListener('keydown', onPinCardEscPress);
    }
  };

  var renderPinCard = function (pin) {
    closePinCard();
    pinCardElement = createPinCardElement(pin);
    map.insertAdjacentElement('beforeend', pinCardElement);

    var pinCardCloseButton = map.querySelector('.popup__close');
    pinCardCloseButton.addEventListener('click', function () {
      closePinCard();
    });

    document.addEventListener('keydown', onPinCardEscPress);
  };

  window.pinCard = {
    render: renderPinCard,
    close: closePinCard,
  };

})();
