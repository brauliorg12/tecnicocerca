$(function () {

  "use strict";

  //===== Prealoder

  $(window).on('load', function (event) {
    $('.preloader').delay(500).fadeOut(500);
  });


  //===== Sticky

  $(window).on('scroll', function (event) {
    var scroll = $(window).scrollTop();
    if (scroll < 20) {
      $(".navbar-area").removeClass("sticky");
      $(".navbar-area img").attr("src", "https://tecnicocerca.com/images/logo-tc.png?crc=395163101");
    } else {
      $(".navbar-area").addClass("sticky");
      $(".navbar-area img").attr("src", "https://tecnicocerca.com/images/logo-tc_blue.png?crc=395163101");
    }
  });


  //===== Section Menu Active

  var scrollLink = $('.page-scroll');
  // Active link switching
  $(window).scroll(function () {
    var scrollbarLocation = $(this).scrollTop();

    scrollLink.each(function () {

      var sectionOffset = $(this.hash).offset().top - 73;

      if (sectionOffset <= scrollbarLocation) {
        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');
      }
    });
  });


  //===== Back to top

  // Show or hide the sticky footer button
  $(window).on('scroll', function (event) {
    if ($(this).scrollTop() > 600) {
      $('.back-to-top').fadeIn(200)
    } else {
      $('.back-to-top').fadeOut(200)
    }
  });


  //Animate the scroll to yop
  $('.back-to-top').on('click', function (event) {
    event.preventDefault();

    $('html, body').animate({
      scrollTop: 0,
    }, 1500);
  });


  //===== 
















});
