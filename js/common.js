$(function () {
  // 隐藏移动端菜单
  $(document).on('click', '.mobile-header .header-nav-link', function () {
    $('#header').removeClass('mobile-header')
  })

  const start_time = '2019-04-01 19:56'
  const startTime = new Date(start_time).getTime()
  setInterval(() => {
    weCount(startTime)
  }, 1000)

  // 显示分享弹框
  $('#shareBar .share-btn').click(function () {
    $('#shareBar .share-list').toggle()
  })

  // 打赏
  $('#reward-btn').on('click', function () {
    $('#reward').fadeIn(150)
    $('#rewardMask').fadeIn(150)
  })
  $('#reward .modal-close, #rewardMask').on('click', function () {
    $('#rewardMask').fadeOut(100)
    $('#reward').fadeOut(100)
  })

  let os = function() {
      var ua = navigator.userAgent,
      isWindowsPhone = /(?:Windows Phone)/.test(ua),
      isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone, 
      isAndroid = /(?:Android)/.test(ua), 
      isFireFox = /(?:Firefox)/.test(ua), 
      isChrome = /(?:Chrome|CriOS)/.test(ua),
      isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
      isPhone = /(?:iPhone)/.test(ua) && !isTablet,
      isPc = !isPhone && !isAndroid && !isSymbian;
      return {
          isTablet: isTablet,
          isPhone: isPhone,
          isAndroid : isAndroid,
          isPc : isPc
      };
  }();

  // 回到顶部
  let upperLimit = 600
  let scrollElem = $('#toTop')
  scrollElem.hide()
  $(document).scroll(function () {
    let scrollTop = $(document).scrollTop()
    if (scrollTop > upperLimit) {
      if (os.isPc) {
        $('#header').fadeOut()
      }
      $(scrollElem).fadeIn()
    } else {
      if (os.isPc) {
        $('#header').fadeIn()
      }
      $(scrollElem).fadeOut()
    }
  })
  $(scrollElem).click(function () {
    $(document).scrollTop(0)
  })

  // 显示文章目录
  $('#tocBotBtn').click(function () {
    $('#tocBotWrap').fadeIn(150)
  })
  $('#tocBotClose').click(function () {
    $('#tocBotWrap').fadeOut(100)
  })

  // 搜索
  var $searchWrap = $('.search-form-wrap'),
    isSearchAnim = false,
    searchAnimDuration = 200

  var startSearchAnim = function () {
    isSearchAnim = true
  }

  var stopSearchAnim = function (callback) {
    setTimeout(function () {
      isSearchAnim = false
      callback && callback()
    }, searchAnimDuration)
  }

  $('.header-search').on('click', function () {
    if (isSearchAnim) {
      return
    }
    $('#app').removeClass('body-no-scroll').addClass('body-no-scroll')
    startSearchAnim()
    $searchWrap.addClass('on')
    stopSearchAnim(function () {
      $('.local-search-input').focus()
    })
  })

  $(document).mouseup(function (e) {
    var _con = $('.local-search')
    if (!_con.is(e.target) && _con.has(e.target).length === 0) {
      $searchWrap.removeClass('on')
      $('#app').removeClass('body-no-scroll')
    }
  })

  // 生成search.xml
  $.getScript('/js/search.js', function () {
    searchFunc('/search.xml', 'local-search-input', 'local-search-result')
  })

  // 高亮导航
  let curPath = location.pathname.replace(/\//g, '')
  $('#siteMenu .header-nav-link').each(i => {
    let thePath = $('#siteMenu .header-nav-link').eq(i).attr('href').replace(/\//g, '')
    $('#siteMenu .header-nav-link').eq(i).removeClass('active')
    if (curPath === thePath) {
      $('#siteMenu .header-nav-link').eq(i).addClass('active')
    }
  })
})

// we 计时器
function weCount(startTime) {
  const togetherDom = $('#weTogether')
  const curTime = new Date().getTime()
  const together = distanceTime(curTime, startTime)
  togetherDom.text(together)
}

// 移动端切换菜单
let showMenu = false
function toggleMenu() {
  showMenu = !showMenu
  if (showMenu) {
    $('#header').addClass('mobile-header')
    $('.layout').addClass('transform-layout')
    $('.header-menu .icon-close').removeClass('hidden').addClass('show')
    $('.header-menu .icon-menu').removeClass('show').addClass('hidden')
  } else {
    $('#header').removeClass('mobile-header')
    $('.layout').removeClass('transform-layout')
    $('.header-menu .icon-menu').removeClass('hidden').addClass('show')
    $('.header-menu .icon-close').removeClass('show').addClass('hidden')
  }
}

const distanceTime = (endTime, startTime) => {
  let distance = endTime - startTime
  if (distance > 0) {
    let res = ''
    const year = Math.floor(distance / (365 * 24 * 60 * 60 * 1000))
    distance -= 365 * 24 * 60 * 60 * 1000 * year
    const day = Math.floor(distance / (24 * 60 * 60 * 1000))
    distance -= 24 * 60 * 60 * 1000 * day
    const hour = Math.floor(distance / (60 * 60 * 1000))
    distance -= 60 * 60 * 1000 * hour
    const minute = Math.floor(distance / (60 * 1000))
    distance -= 60 * 1000 * minute
    const second = Math.floor(distance / 1000)
    if (year > 0) {
      res = year + ' 年 '
    }
    if (day > 0) {
      res = res + String(day).padStart(2, '0') + ' 天 '
    }
    if (hour > 0) {
      res = res + String(hour).padStart(2, '0') + ' 时 '
    }
    if (minute > 0) {
      res = res + String(minute).padStart(2, '0') + ' 分 '
    }
    res = res + String(second).padStart(2, '0') + ' 秒'
    return res
  } else {
    return ''
  }
}
