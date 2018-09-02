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
      thickness: 1
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


// КОД ДЛЯ АНИМАЦИИ ПРЕЛОАДЕРА

(function ($, undefined) {
  var $hamburgerLink = $('.hamburger__link');

  $hamburgerLink.on('click', function () {
    alert(12321)
  });
})(jQuery);
