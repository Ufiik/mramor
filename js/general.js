(function ($, undefined) {
  var $preloader = $('.preloader'),
      $preloaderLogo = $('.preloader__logo');

  $preloaderLogo.show('slow' , function () {
    $('.preloader')
      .circleProgress(progressOptions)
      .on('circle-animation-end', animationEndHandler)
  });

  var progressOptions = {
      value: 1,
      size: 150,
      fill: '#ffffff',
      thickness: 1,
      }

  function animationEndHandler() {
    $preloader.animate({
      'opacity': 'hide',
      'display': 'none'
    })
  }
})(jQuery);
