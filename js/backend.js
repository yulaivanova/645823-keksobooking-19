'use strict';

(function () {
  var SUCCESS_STATUS_CODE = 200;
  var TIMEOUT_IN_MS = 10000;

  var Url = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking/'
  };

  var request = function (url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT_IN_MS;

    var method = data ? 'POST' : 'GET';

    xhr.open(method, url);
    xhr.send(data);
  };

  var save = function (data, onLoad, onError) {
    request(Url.UPLOAD, onLoad, onError, data);
  };

  var load = function (onLoad) {
    request(Url.LOAD, onLoad, onLoadError);
  };

  var onLoadError = function () {
    window.messages.showTimeError();
  };


  window.backend = {
    save: save,
    load: load
  };

})();
