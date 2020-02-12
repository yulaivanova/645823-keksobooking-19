'use strict';

(function () {
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
  var featuresCardTemplate = mapCardTemplate.querySelector('.popup__feature ');

  var getPinTypeText = function (pin) {
    return HOUSE_TYPE[pin.offer.type];
  };

  var getPinTimeText = function (pin) {
    return 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
  };

  var getPinCapacityText = function (pin) {
    var rooms = pin.offer.rooms + ' ' + window.declension(pin.offer.rooms, ['комната', 'комнаты', 'комнат']);
    var guests = pin.offer.guests + ' ' + window.declension(pin.offer.guests, ['гостя', 'гостей']);
    return rooms + ' для ' + guests;
  };

  var createFeaturesPinCard = function (pin) {
    var featuresFragment = document.createDocumentFragment();
    featuresCardTemplate.classList.remove('popup__feature--wifi');

    for (var i = 0; i < pin.offer.features.length; i++) {
      var featureElement = featuresCardTemplate.cloneNode(true);
      featureElement.classList.add('popup__feature--' + pin.offer.features[i]);
      featuresFragment.appendChild(featureElement);
    }

    return featuresFragment;
  };

  var createPhotosPinCard = function (pin) {
    var photosFragment = document.createDocumentFragment();

    for (var i = 0; i < pin.offer.photos.length; i++) {
      var photoElement = photoCardTemplate.cloneNode(true);
      photoElement.src = pin.offer.photos[i];
      photosFragment.appendChild(photoElement);
    }
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
    cardElement.querySelector('.popup__features').innerHTML = '';
    cardElement.querySelector('.popup__features').appendChild(createFeaturesPinCard(pin));
    cardElement.querySelector('.popup__description').textContent = pin.offer.description;
    cardElement.querySelector('.popup__photos').innerHTML = '';
    cardElement.querySelector('.popup__photos').appendChild(createPhotosPinCard(pin));
    cardElement.querySelector('.popup__avatar').src = pin.author.avatar;

    return cardElement;
  };

  window.pinCard = {
    createElement: createPinCardElement,
  };

})();
