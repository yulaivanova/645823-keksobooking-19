'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var ImgProperty = {
    HEIGHT: 70,
    WIDTH: 70,
    BORDER_RADIUS: '5px'
  };
  var photo = null;

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__avatar');
  var avatarImg = document.querySelector('.ad-form-header__avatar');

  var photoContainer = document.querySelector('.ad-form__photo-container');
  var photoChooser = photoContainer.querySelector('.ad-form__upload input[type=file]');
  var photoPreview = photoContainer.querySelector('.ad-form__photo');

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  photoChooser.addEventListener('change', function () {
    var file = photoChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var img = document.createElement('img');
        photo = photoPreview.cloneNode(true);
        img.src = reader.result;
        img.height = ImgProperty.HEIGHT;
        img.width = ImgProperty.WIDTH;
        img.style.borderRadius = ImgProperty.BORDER_RADIUS;

        photo.appendChild(img);
        photoPreview.remove();
        photoContainer.appendChild(photo);
      });

      reader.readAsDataURL(file);
    }
  });

  var resetPhotos = function () {
    avatarImg.src = 'img/muffin-grey.svg';

    if (photo) {
      photoContainer.querySelectorAll('.ad-form__photo').forEach(function (element) {
        element.remove();
      });
      photoContainer.appendChild(photoPreview);
    }
  };

  window.photoUpload = {
    default: resetPhotos,
  };

})();
