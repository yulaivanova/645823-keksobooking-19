'use strict';

(function () {
  // Это не перечисление, это маппинг
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
    return pin.offer.checkin && pin.offer.checkout
      ? 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout
      : '';
  };

  var getPinCapacityText = function (pin) {
    var rooms = pin.offer.rooms + ' ' + window.util.declension(pin.offer.rooms, ['комната', 'комнаты', 'комнат']);
    var guests = pin.offer.guests + ' ' + window.util.declension(pin.offer.guests, ['гостя', 'гостей', 'гостей']);
    if (pin.offer.rooms >= 0 && pin.offer.guests >= 0) {
      return rooms + ' для ' + guests;
    } else {
      return '';
    }
  };

  var createFeaturesPinCard = function (pin) {
    if (pin.offer.features && pin.offer.features.length) {
      var featuresFragment = document.createDocumentFragment();

      pin.offer.features.forEach(function (feature) {
        var featureItem = document.createElement('li');
        featureItem.classList.add('popup__feature');
        featureItem.classList.add('popup__feature--' + feature);
        featuresFragment.appendChild(featureItem);
      });

      return featuresFragment;
    } else {
      return '';
    }
  };

  var createPhotosPinCard = function (pin) {
    if (pin.offer.photos && pin.offer.photos.length) {
      var photosFragment = document.createDocumentFragment();

      pin.offer.photos.forEach(function (photo) {
        var photoItem = photoCardTemplate.cloneNode(true);
        photoItem.src = photo;
        photosFragment.appendChild(photoItem);
      });

      return photosFragment;
    } else {
      return '';
    }
  };

  var isRender = function (value, element, onRender) {
    if (value || value === 0) {
      return onRender(element, value);
    }
    return element.remove();
  };

  var createPinCard = function (pin) {
    var card = mapCardTemplate.cloneNode(true);

    var onRenderTextContent = function (element, value) {
      element.textContent = value;
    };

    var onRenderAppendChild = function (element, value) {
      element.appendChild(value);
    };

    isRender(pin.offer.title, card.querySelector('.popup__title'), onRenderTextContent);
    isRender(pin.offer.addres, card.querySelector('.popup__text--address'), onRenderTextContent);
    isRender(pin.offer.price + '₽/ночь', card.querySelector('.popup__text--price'), onRenderTextContent);
    isRender(getPinTypeText(pin), card.querySelector('.popup__type'), onRenderTextContent);
    isRender(getPinCapacityText(pin), card.querySelector('.popup__text--capacity'), onRenderTextContent);
    isRender(getPinTimeText(pin), card.querySelector('.popup__text--time'), onRenderTextContent);
    isRender(pin.offer.description, card.querySelector('.popup__description'), onRenderTextContent);
    isRender(createFeaturesPinCard(pin), card.querySelector('.popup__features'), onRenderAppendChild);
    removeChildren(card.querySelector('.popup__photos'));
    isRender(createPhotosPinCard(pin), card.querySelector('.popup__photos'), onRenderAppendChild);
    if (pin.author.avatar) {
      card.querySelector('.popup__avatar').src = pin.author.avatar;
    }

    return card;
  };


  var removeChildren = function (element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };

  var onPinCardEscPress = function (evt) {
    if (window.util.isEsc(evt)) {
      closePinCard();
      window.pin.disable();
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
      window.pin.disable();
    });

    document.addEventListener('keydown', onPinCardEscPress);
  };

  window.pinCard = {
    render: renderPinCard,
    close: closePinCard,
  };

})();
