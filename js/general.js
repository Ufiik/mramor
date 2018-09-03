// КОД ДЛЯ АНИМАЦИИ ПРЕЛОАДЕРА

(function ($, undefined) {
  var $preloader = $('.preloader'),
      $preloaderLogo = $('.preloader__logo'),
      $preloaderSVG = $('.preloader__logo svg');

  $preloaderSVG.animate({
    'opacity': 1,
    'height': '59px',
    'width': '57px'
  }, {
    'duration': 500,
    'complete': prealoaderAnimation
  });

  var progressOptions = {
      value: 1,
      size: 150,
      fill: '#ffffff',
      thickness: 1,
      animation: {
        duration: 1
      }
      }

  function scalledWrapper() {
    var $wrapper = $('.wrapper');

    (function () {
      $wrapper
        .removeClass('scld2 no-scroll')
        .on('transitionend webkitTransitionEnd oTransitionEnd', function () {
          $(document.body).removeClass('no-scroll');
        })
    }())
  }

  function animationEndHandler() {
    $preloader.animate({
      'opacity': 'hide',
      'display': 'none'
    }, scalledWrapper)
  }

  function prealoaderAnimation() {
    $('.preloader')
      .circleProgress(progressOptions)
      .on('circle-animation-end', animationEndHandler)
  }

})(jQuery);

// КНОПКА ГАМБУРГЕР

(function ($, undefined) {
  var $hamburgerLink = $('.hamburger'),
      $wrapperNav = $('.wrapper-nav'),
      $navContainer = $('.nav__container');

  $hamburgerLink.on('click', function (e) {
    e.preventDefault();

    $(this).toggleClass('pushed');

    $wrapperNav.toggleClass('hidden-nav');

    setTimeout(function () {
      $navContainer.toggleClass('r-lines');
    }, 1000)
  });
})(jQuery);

// МОДАЛЬНАЯ ФОРМА ALERT

(function ($, undefined) {
  var $joinTo = $('.nav__join-to');

  $joinTo.on('click', function () {
    swal({
      title: 'Вступить в клуб',
      showCloseButton: true,
      animation: false,
      customClass: 'animated zoomInUp custom-alert',
      backdrop: '#fff',
      confirmButtonText: 'Отправить',
      confirmButtonColor: '#8bb4af',
      showLoaderOnConfirm: true,
      confirmButtonClass: 'join-confirm-btn',

      html:
      '<span>Ваше полное имя</span>' +
      '<input id="swal-input1" class="swal2-input" placeholder="Фамилия Имя Отчество">' +
      '<span>Ваша дата рождения (цифрами через точку)</span>' +
      '<input id="swal-input2" class="swal2-input" placeholder="ГОД.МЕСЯЦ.ЧИСЛО">'+
      '<span>Ваш род деятельности (несколько слов)</span>' +
      '<input id="swal-input3" class="swal2-input" placeholder="Чем я занимаюсь">'+
      '<span>Ссылки на соц.сети (не обязательно)</span>' +
      '<input id="swal-input4" class="swal2-input" placeholder="vk.com/idxxxxxxxxx">'+
      '<span>Ваш номер телефона</span>' +
      '<input id="swal-input5" class="swal2-input">'+
      '<span>Как вы узнали о клубе? (Не обязательно)</span>' +
      '<input id="swal-input6" class="swal2-input" placeholder="От друзей; По рекомендации знакомых; Свой вариант">' +
      '<span>Даю согласие на обработку персональных данных</span>' +
      '<input id="swal-input7" type="checkbox" class="swal2-input">'
    });
  });
})(jQuery)
