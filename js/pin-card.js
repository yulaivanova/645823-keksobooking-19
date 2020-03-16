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

  var pinCard = null;


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
      var featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature');
      featureItem.classList.add('popup__feature--' + feature);
      featuresFragment.appendChild(featureItem);
    });

    return featuresFragment;
  };

  var createPhotosPinCard = function (pin) {
    var photosFragment = document.createDocumentFragment();

    pin.offer.photos.forEach(function (photo) {
      var photoItem = photoCardTemplate.cloneNode(true);
      photoItem.src = photo;
      photosFragment.appendChild(photoItem);
    });

    return photosFragment;
  };

  var createPinCard = function (pin) {
    var card = mapCardTemplate.cloneNode(true);

    card.querySelector('.popup__title').textContent = pin.offer.title;
    card.querySelector('.popup__text--address').textContent = pin.offer.addres;
    card.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = getPinTypeText(pin);
    card.querySelector('.popup__text--capacity').textContent = getPinCapacityText(pin);
    card.querySelector('.popup__text--time').textContent = getPinTimeText(pin);
    card.querySelector('.popup__features').appendChild(createFeaturesPinCard(pin));
    card.querySelector('.popup__description').textContent = pin.offer.description;
    card.querySelector('.popup__photos').innerHTML = '';
    card.querySelector('.popup__photos').appendChild(createPhotosPinCard(pin));
    card.querySelector('.popup__avatar').src = pin.author.avatar;

    return card;
  };

  var onPinCardEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closePinCard();
    }
  };

  var closePinCard = function () {
    if (pinCard) {
      pinCard.remove();
      document.removeEventListener('keydown', onPinCardEscPress);
    }
  };

  var renderPinCard = function (pin) {
    closePinCard();
    pinCard = createPinCard(pin);
    map.insertAdjacentElement('beforeend', pinCard);

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
