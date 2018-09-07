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
      $navContainer = $('.nav__container'),
      $header = $('.header');

  $hamburgerLink.on('click', function (e) {
    e.preventDefault();

    $(this).toggleClass('pushed');

    $wrapperNav.toggleClass('hidden-nav');

    setTimeout(function () {
      $navContainer.toggleClass('r-lines');
    }, 1000)
  });
})(jQuery);

//------------------------- МОДАЛЬНАЯ ФОРМА ЗАЯВКИ --------------------------

(function ($, undefined) {
  var $joinTo = $('.nav__join-to');

  function validDate(dateStr) {
    if (/(19|20)\d\d-((0[1-9]|1[012])-(0[1-9]|[12]\d)|(0[13-9]|1[012])-30|(0[13578]|1[02])-31)/.test(dateStr)) {
      return true;
    }
    return false;
  }

  function validCirilic(str) {
    if(/^[?!,.а-яА-ЯёЁ0-9\s]+$/.test(str)) {
      return true;
    }
    return false;
  }

  function validPhone(phone) {
    if(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(phone)) {
      return true;
    }
    return false;
  }

  $joinTo.on('click', function () {
    swal({
      title: 'Вступить в клуб',
      showCloseButton: true,
      animation: false,
      customClass: 'animated zoomInUp custom-alert',
      backdrop: '#ffffff',
      confirmButtonText: 'Отправить',
      confirmButtonColor: '#8bb4af',
      showLoaderOnConfirm: true,
      confirmButtonClass: 'join-confirm-btn',

      html:
      '<span>Ваше полное имя</span>' +
      '<input id="swal-input1" class="swal2-input" placeholder="Фамилия Имя Отчество">' +
      '<span>Ваша дата рождения</span>' +
      '<input id="swal-input2" class="swal2-input" placeholder="ГГГГ-ММ-ЧЧ">'+
      '<span>Ваш род деятельности (несколько слов)</span>' +
      '<input id="swal-input3" class="swal2-input" placeholder="Чем я занимаюсь">'+
      '<span>Ссылки на соц.сети (не обязательно)</span>' +
      '<input id="swal-input4" class="swal2-input" placeholder="vk.com/idxxxxxxxxx">'+
      '<span>Ваш номер телефона</span>' +
      '<input id="swal-input5" class="swal2-input">'+
      '<span>Как вы узнали о клубе? (Не обязательно)</span>' +
      '<input id="swal-input6" class="swal2-input" placeholder="От друзей; По рекомендации знакомых; Свой вариант">' +
      '<span>Даю согласие на обработку персональных данных</span>' +
      '<input id="swal-input7" type="checkbox" class="swal2-input">',

      preConfirm: function (some) {
        var $values = $('.swal2-content input'),
            errors = [];

        if ($values[0].value.length < 5 || $values[0].value.length > 30) {
          errors.push("- Указано некорректное имя.<br>");
        }

        if (!validDate($values[1].value)) {
          errors.push("- Некорректная дата рождения. Дата должна быть формата ГГГГ-ММ-ЧЧ.<br>");
        }

        if (!validCirilic($values[2].value) || $values[2].value.length > 30) {
          errors.push("- Что-то не так с вашим родом деятельности. Нужно всего пару слов на русском языке.<br>");
        }

        if ($values[3].value.length > 30) {
          errors.push("- Слишком длинные ссылки на соц.сети.<br>");
        }

        if (!validPhone($values[4].value)) {
          errors.push("- Неверный формат телефонного номера.<br>");
        }

        if ($values[5].value.length > 30) {
          errors.push("- Нужно всего несколько слов от том, как вы узнали о нас.<br>");
        }

        if (!$($values[6]).hasClass('chkd')) {
          errors.push("- Чтобы отправить заявку вы должны согласиться на обработку персональных данных<br>");
        }

        if (errors.length !== 0) {
          var errorsStr = '';
          errors.forEach(function (item) {
            errorsStr += item;
          });

          swal.showValidationError(errorsStr);
          errors = [];
        }
      }
    });

    // sweetalert2 странно работатет с чекбоксами, небольшой костыль
    $('#swal-input7').on('click', function () {
      $(this).toggleClass('chkd');
    });
  });
})(jQuery);

//---------------------------- ССЫЛКИ ИЗ НАВИГАЦИИ  -----------------------

(function ($, undefined) {
    var $content = $('.content'),
        $links = $('.nav__link'),
        $wrapperNav = $('.wrapper-nav'),
        $hamburgerLink = $('.hamburger'),
        $navContainer = $('.nav__container'),

        $aboutLink = $($links[0]);

// Функция insertContent занимается ajxa-запросами и плавными переходами,
// второй аргумент callback-функция

        function insertContent(contentURL, animationCallback) {
          $wrapperNav.toggleClass('hidden-nav');
          $hamburgerLink.toggleClass('pushed');

          setTimeout(function () {
            $navContainer.toggleClass('r-lines');
          }, 1000)

          setTimeout(function () {
            $content.fadeTo(1500, 0, function () {
              $(this).empty();

              $(this).load(contentURL, function () {
                $(this).fadeTo(0, 1, animationCallback);
              });
            });
          }, 500);
         }


// -------------------------------- Ссылка "О НАС" --------------------------

        $aboutLink.on('click', function () {
          insertContent('html/about.html', animateAbout);
        });

        function animateAbout() {
          document.title = 'О клубе';

          var $about = $('.about'),
              $aboutCaption = $('.about__caption'),
              $aboutButtons = $('.about__buttons'),
              $aboutText = $about.find('.about__text');

            $aboutCaption.fadeTo(0,0);

            $aboutText.each(function (i, item) {
              $(item).fadeTo(0, 0);
            });

            $aboutButtons.fadeTo(0,0);

          $about.animate({
            'min-height': '420px'
          }, {
            'duration': 1000,
            'complete': function () {
              $aboutCaption.addClass('animated fadeInUp');

              $aboutText.each(function (i, item) {
                $(item).addClass('animated fadeInUp');
              });

              $aboutButtons.addClass('animated fadeInRight');
            }
          });

          // SWAlert для кнопки "Подробнее"

          var $aboutButton = $('.about__button');

          $aboutButton.on('click', function (e) {
            e.preventDefault();

            swal({
              title: 'О нас',
              showCloseButton: true,
              animation: false,
              backdrop: '#fff',
              width: '70%',
              customClass: 'animated zoomInUp custom-alert',
              showConfirmButton: false,

              html:
                '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</br> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'
            })
          });
        }

// ---------------------- Ссылка "Календарь событий" -------------------------
      var $calendarButton = $($links[1]);

      function initPopUps() {
        $('.calendar__date-day_event').tooltipster({
          animation: 'grow',
          maxWidth: 400
        });
      }

      function calendarAnimate() {
        document.title = 'Календарь событий';

        var pageflip = new RocketPageFlip('.bb-bookblock', {
          current: 0, // page to display
          navigation: false, // show pagination
          directionalNav: true, // show prev/next navigation buttons
          prevText: '<img src="css/img/icons/left-arrow.svg" alt="left-arrow">', // text for prev button
          nextText: '<img src="css/img/icons/right-arrow.svg" alt="rights-arrow">' // text for next button
        });

        var $calendarBoockblock = $('#bb-bookblock'),
            $calendar = $('.calendar'),
            $firstPage = $($calendar.find('.page')[0]),

            $firstPageCaption = $($firstPage.find('.calendar__caption')),
            $firstPageDates = $($firstPage.find('.calendar__date')),
            $firstPageYear = $($firstPage.find('.calendar__year')),

            $flipPrev = $calendar.find('.flip-prev'),
            $flipNext = $calendar.find('.flip-next');


        console.log($('.flip-next'));

        $firstPageCaption.fadeTo(0,0);
        $firstPageDates.fadeTo(0,0);
        $firstPageYear.fadeTo(0,0);

        $calendarBoockblock.animate({
          'opacity': '1',
          'height': '800px'
        }, {
          'duration': 500,
          'complete': function () {
            $firstPageCaption.addClass('animated fadeInUp');
            $firstPageDates.addClass('animated fadeInRight');
            $firstPageYear.addClass('animated fadeInUp');

            $calendar.addClass('notepad-shadow');

            $flipPrev.addClass('animated zoomInLeft slow');
            $flipNext.addClass('animated zoomInRight slow');
          }
        });

        initPopUps();
      }

      $calendarButton.on('click', function () {
        insertContent('html/calendar.html', calendarAnimate);
      });
})(jQuery);
