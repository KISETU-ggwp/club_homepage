$(function() {

  var
    winW = $(window).width(),
    winH = $(window).height(),
    nav = $('#mainnav ul a'),
    curPos = $(this).scrollTop();

  if (winW < 880) {
    var headerH = 0;
  }
  else {
    var headerH = 63;
  }

  $(nav).on('click', function() {
    nav.removeClass('active');
    var $el = $(this),
      id = $el.attr('href');
    $('html, body').animate({
      scrollTop: $(id).offset().top - headerH
    }, 500);
    $(this).addClass('active');
    if (winW < 880) {
      $('#menuWrap').next().slideToggle();
      $('#menuBtn').removeClass('close');
    }
    return false;
  });

  var timer = false;
  $(window).bind('load resize', function() {
    if (timer !== false) { clearTimeout(timer); }
    timer = setTimeout(function() {
      var
        w = $(window).innerWidth(),
        bg = $('.bg'),
        bgH = bg.height();

      if (w > 800) {
        $(function() {
          $(".vMid").css('height', bgH);
        });
      }
      else {
        $(function() {
          $(".vMid").css({ 'height': 'auto', 'padding': '50px 20px' });
        });
      }
    });
  });

  $('.panel').hide();
  $('#menuWrap').toggle(function() {
    $(this).next().slideToggle();
    $('#menuBtn').toggleClass('close');
  },
    function() {
      $(this).next().slideToggle();
      $('#menuBtn').removeClass('close');
    });

  $(window).on('scroll', function() {
    var curPos = $(this).scrollTop();
    if (curPos > 80) {
      $('#mainnav').addClass('changeNav');
    }
    else {
      $('#mainnav').removeClass('changeNav');
    }
  });


});
$(function() {
  // Time wasted here: 3 hours

  // For card rotation
  $(".btn-rotate").click(function() {
    // Long explanation: The button that is clicked, will have its grand parent add a class to its child. The main reason I couldn't use .parent() was that it gets the closest positioned parent, either relative or absolute. The problem was that the card-front got the .rotate-container as its parent, but the card-back was being the closest positioned element as the parent of the button. In order to circumvent this I either needed to use 3 offsetparent() and have really messy code, or just use the .closest() which as its name suggests gets the closest named or unnamed element. So in the end, I get the grand parent of the button which is the .rotate container and I find its children which are the .card-front and .card-back and toggle the rotation classes on them. Also if I didn't specify which button's ancestor would assign the class, whenever any btn-rotate button is clicked, all three cards would rotate at once which makes for a funny yet unhelpful design.
    var $parent = $(this).closest(".rotate-container");

    // Probably easier to use an id, but I made it work
    $parent.children(".card-front").toggleClass(" rotate-card-front");
    $parent.children(".card-back").toggleClass(" rotate-card-back");
  });
});