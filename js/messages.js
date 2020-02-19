'use strict';

(function () {
  var errorMessage = null;
  var successMessage = null;

  var main = document.querySelector('main');

  var successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

  var errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

  var showSuccessMessage = function () {
    successMessage = successMessageTemplate.cloneNode(true);
    main.appendChild(successMessage);
    document.addEventListener('keydown', onMessagePress);
    document.addEventListener('click', closeMessage);
  };

  var showErrorMessage = function () {
    errorMessage = errorMessageTemplate.cloneNode(true);
    main.appendChild(errorMessage);
    document.addEventListener('keydown', onMessagePress);
    document.addEventListener('click', closeMessage);
  };

  var closeMessage = function () {
    if (errorMessage) {
      errorMessage.remove();
    } else {
      successMessage.remove();
    }
    document.removeEventListener('keydown', onMessagePress);
    document.removeEventListener('click', closeMessage);
  };

  var onMessagePress = function (evt) {
    if (evt.key) {
      closeMessage();
    }
  };

  window.messages = {
    showSuccess: showSuccessMessage,
    showError: showErrorMessage,
  };

})();
