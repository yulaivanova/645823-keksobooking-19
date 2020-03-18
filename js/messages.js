'use strict';

(function () {
  var errorMessage = null;
  var successMessage = null;
  var timeErrorMessage = null;
  var errorButton = null;

  var main = document.querySelector('main');

  var successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

  var errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

  var timeErrorMessageTemplate = document.querySelector('#time-error')
  .content
  .querySelector('.error');

  var showSuccessMessage = function () {
    successMessage = successMessageTemplate.cloneNode(true);
    main.appendChild(successMessage);
    document.addEventListener('keydown', onMessagePress);
    document.addEventListener('click', onMessageClick);
  };

  var showErrorMessage = function () {
    errorMessage = errorMessageTemplate.cloneNode(true);
    main.appendChild(errorMessage);
    document.addEventListener('keydown', onMessagePress);
    document.addEventListener('click', onMessageClick);
  };

  var showTimeErrorMessage = function () {
    timeErrorMessage = timeErrorMessageTemplate.cloneNode(true);
    main.appendChild(timeErrorMessage);
    errorButton = document.querySelector('.error__button');
    errorButton.addEventListener('click', onErrorButtonPress);
    document.addEventListener('keydown', onTimeErrorMessageEscPress);
  };

  var closeMessage = function () {
    if (errorMessage) {
      errorMessage.remove();
    } else if (successMessage) {
      successMessage.remove();
    } else {
      timeErrorMessage.remove();
    }

    document.removeEventListener('keydown', onMessagePress);
    document.removeEventListener('click', onMessageClick);

    if (errorButton) {
      errorButton.removeEventListener('click', onErrorButtonPress);
      document.removeEventListener('keydown', onTimeErrorMessageEscPress);
    }
  };

  var onMessageClick = function () {
    closeMessage();
  };

  var onMessagePress = function (evt) {
    if (evt.key) {
      closeMessage();
    }
  };

  var onErrorButtonPress = function () {
    closeMessage();
    window.map.makePageActive();
  };

  var onTimeErrorMessageEscPress = function (evt) {
    if (window.util.isEsc(evt)) {
      closeMessage();
      window.map.makePageNotActive();
    }
  };

  window.messages = {
    showSuccess: showSuccessMessage,
    showError: showErrorMessage,
    showTimeError: showTimeErrorMessage,
  };

})();
