jQuery(document).ready(function () {
  $.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
      if (o[this.name]) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  };

  // index banner link
  $("#index-banner-1").click(function(){
    $("#more-link").trigger('click');
  })
  $("#index-banner-2").click(function(){
    $("#solution-link").trigger('click');
  })

  // video show & close
  $('#videoTrigger').click(function (event) {
    event.stopPropagation();
    $("#videoBox").css('display', 'block');
    $('#indexVideo')[0].play();
    ga('send', 'event', 'Videos', 'play', 'Product film');
  });
  $('#videoClose').click(function () {
    $('#indexVideo')[0].pause();
    $("#videoBox").css('display', 'none');
    var myVideo = document.getElementById("indexVideo");
    ga('send', 'event', 'Videos', 'close', 'Product film', parseInt(myVideo.currentTime));
  })

    // video show & close
    $('#videoTrigger100').click(function (event) {
      event.stopPropagation();
      $("#videoBox100").css('display', 'block');
      $('#indexVideo100')[0].play();
      ga('send', 'event', 'Videos100', 'play', 'Product film');
    });
    $('#videoClose100').click(function () {
      $('#indexVideo100')[0].pause();
      $("#videoBox100").css('display', 'none');
      var myVideo = document.getElementById("indexVideo100");
      ga('send', 'event', 'Videos100', 'close', 'Product film', parseInt(myVideo.currentTime));
    })

  /* login analytics */
  $('#login').click(function(event) {
    ga('send', 'event', 'Login');
  })

  // lightbox option
  lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true,
    'disableScrolling': true
  });

  // navbar
  $(document).scroll(function () {
    if ($(document).scrollTop() > 100) {
      $(".navbar").addClass('navbar-with-background');
    } else {
      $(".navbar").removeClass('navbar-with-background');
    };
  });

  // navbar convert click to hover
  if($(document).width()>=880) {
    $(".navbar-default .navbar-nav > li").mouseenter(function(){
      $(this).children("ul").show();
    })
    $(".navbar-default .navbar-nav > li").mouseleave(function(){
      $(this).children("ul").hide();
    })
  }

  // register
  $(".register-sumbit-button").click(function () {
    var inputList = $(".form-control") || [];
    var isValid = true;
    // check form status
    $.each(inputList, function(index, input) {
      if(input.value.length === 0) {
        isValid = false;
        input.setCustomValidity("不能为空");
      } else {
        input.setCustomValidity("");
      }
    })
    isValid && $.ajax({
      type: "POST",
      url: 'https://hooks.slack.com/services/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',
      data: JSON.stringify({
        text: '#新客户！ ' + JSON.stringify($('.register-form').serializeObject())
      })
    }).success(function() {
			alert("提交成功");
			$('.register-form')[0].reset();
		})
  });

  /* google analytics */
  (function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments);
    };
    i[r].l = 1 * new Date();
    a = s.createElement(o);
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
  ga('create', 'UA-91873933-1', 'auto');
  ga('send', 'pageview');
  ga('set', 'userId', 'USER_ID');


  // fengchao structure
  // width < 1200px
  if (document.getElementById("fengchao-structure-img")) {
    const img = document.getElementById("fengchao-structure-img")
    const urlArray = $('#fengchao-structure-img').attr('src').split('/')
    const srcArray = ['fengchao-structure-before.png', 'fengchao-structure-after.png']
    const len = srcArray.length - 1
    let index = 0
    setInterval(function() {
        img.style.transition='opacity 1s ease-in 0s'
        img.style.opacity=0.2
        setTimeout(function(){
            urlArray.splice(urlArray.length-1,1,srcArray[index])
            img.src = urlArray.join('/')
            img.style.transition='opacity 1s ease-out 0s'
            img.style.opacity=1
        },1000)
        setTimeout(function(){
            img.style.transition='none'
        },2000)
        if(++index > len) {
            index = 0
        }
    },4000)
  }
  // width >= 1200px
  $('#squeegee').mousemove(function (event) {
    var Ev= event || window.event;
    var pointX = Ev.clientX
    var warp = $('#squeegee')[0]
    var wrapX = warp.offsetLeft
    var wrapWidth = warp.offsetWidth
    var afterWidth = Ev.clientX - wrapX
    var beforeWidth = wrapWidth - afterWidth
    afterWidth = afterWidth > 900 ? 900 : afterWidth
    beforeWidth = beforeWidth < 40 ? 40 : beforeWidth
    $('#squeegee .squeegee-before').width(beforeWidth)
    $('#squeegee .squeegee-after').width(afterWidth)
    $('#squeegee .squeegee-handle').css({left: afterWidth})
  })

  // click bottom about-us 4 links
  function linkTab(){
    $('[href$=' + hash + ']').parent().siblings().removeClass("in active")
    $(hash).siblings().removeClass("in active")
    $('[href$=' + hash + ']').parent().addClass("in active")
    $(hash).addClass("in active")
    $('html,body').animate({ scrollTop: 0 })
  }
  var hash = "#about-baishan"
  window.onhashchange = function(){
    hash = window.location.hash
    if(document.getElementById("more-nav-tabs")){
      linkTab()
    }
  }
  hash = window.location.hash
  if(hash){
    linkTab()
  }
});