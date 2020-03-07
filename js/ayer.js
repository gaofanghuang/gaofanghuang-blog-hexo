(function ($) {
  //
  // Search
  var $searchWrap = $('.search-form-wrap'),
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function () {
    isSearchAnim = true;
  };

  var stopSearchAnim = function (callback) {
    setTimeout(function () {
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $('.nav-item-search').on('click', function () {
    if (isSearchAnim) return;
    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function () {
      $('.local-search-input').focus();
    });
  });

  $(document).mouseup(function (e) {
    var _con = $('.local-search');
    if (!_con.is(e.target) && _con.has(e.target).length === 0) {
      $searchWrap.removeClass('on');
    }
  });

  //
  // 移动设备侦测
  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  //
  // 建议在移动端不初始化，其实 /search.xml 文件还挺大的，
  if ($('.local-search').size()) {
    $.getScript('/js/search.js', function () {
      searchFunc("/search.xml", 'local-search-input', 'local-search-result');
    });
  }

  //
  // Share
  $('.share-outer').click(()=>$('.share-wrap').fadeToggle())

  //
  // fancybox
  if ($.fancybox) {
    $('[data-fancybox]').fancybox({
      protect: true
    });
  }

  //
  // lazyload
  $("img.lazy").lazyload({
    effect: "fadeIn"
  });

  //
  // justifiedGallery
  $('#gallery').justifiedGallery({
    rowHeight: 200,
    margins: 5
  });

  // scroll down
  $(document).ready(function ($) {
    $('.anchor').click(function (e) {
      e.preventDefault();
      $('main').animate({ scrollTop: $('.cover').height() }, 'smooth');
    });
  });

  // To top
  (function ($) {
    // When to show the scroll link
    // higher number = scroll link appears further down the page
    var upperLimit = 1000;

    // Our scroll link element
    var scrollElem = $('#totop');

    // Scroll to top speed
    var scrollSpeed = 1600;

    // Show and hide the scroll to top link based on scroll position
    scrollElem.hide();
    $('.content').scroll(function () {
      var scrollTop = $('.content').scrollTop();
      if (scrollTop > upperLimit) {
        $(scrollElem).stop().fadeTo(300, 1); // fade back in
      } else {
        $(scrollElem).stop().fadeTo(300, 0); // fade out
      }
    });

    // Scroll to top animation on click
    $(scrollElem).click(function () {
      $('.content').animate({ scrollTop: 0 }, scrollSpeed); return false;
    });
  })(jQuery);

  // Mobile nav
  var $content = $('.content'),
    $sidebar = $('.sidebar');

  $('.navbar-toggle').on('click', function () {
    $content.toggleClass('on');
    $sidebar.toggleClass('on');
  });

  $($content).on('click', function () {
    $content.removeClass('on');
    $sidebar.removeClass('on');
  });

  if (window.matchMedia("(min-width: 768px)").matches) {
    $content.addClass('on');
    $sidebar.addClass('on');
  }

  // reward
  $('#reward-btn').on('click', function () {
    $('#reward').fadeIn(150)
    $('#mask').fadeIn(150)
  });
  $('#reward .close, #mask').on('click', function () {
    $('#mask').fadeOut(100)
    $('#reward').fadeOut(100)
  })
})(jQuery);

$(function() {
  // togather
  const start_time = '2019-04-01 19:56';
  const startTime = new Date(start_time).getTime();
  const togatherDom = $('#weTogather');
  $('.we-wrap').hover(function() {
    const curTime = new Date().getTime();
    const togather = distanceTime(curTime, startTime);
    togatherDom.text(togather);
  })
})

const distanceTime = (endTime, startTime) => {
  let distance = endTime - startTime;
  if (distance > 0) {
    let res = '';
    const day = Math.floor(distance / 86400000);
    distance -= 86400000 * day;
    const hour = Math.floor(distance / 3600000);
    distance -= 3600000 * hour;
    const minute = Math.floor(distance / 60000);
    distance -= 60000 * minute;
    const second = Math.floor(distance / 1000);
    if (day > 0) {
      res = String(day).padStart(2, '0') + ' 天 ';
    }
    if (hour > 0) {
      res = res + String(hour).padStart(2, '0') + ' 时 ';
    }
    if (minute > 0) {
      res = res + String(minute).padStart(2, '0') + ' 分 ';
    }
    res = res + String(second).padStart(2, '0') + ' 秒';
    return res;
  } else {
    return '';
  }
};


