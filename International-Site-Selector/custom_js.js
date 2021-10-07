/* custom search things */
// function waitForSearch(selector, time) {
//   if(jQuery(selector).length != 0) {
//     // console.log('ready!');
//
//     // run once to start, then make sure the search results are the correct size each time they are opened and a keystroke is made
//     searchSizeHandler();
//     jQuery('.basel-search-inner').each(function(){ $(this).on('mouseenter', function(){ searchSizeHandler(); }); });
//     jQuery('.basel-search-inner form input[type=text]').each(function(){ $(this).on('keydown', function(){ searchSizeHandler(); }); });
//
//     return;
//   } else {
//     setTimeout(function() {
//       // console.log('waiting for the element');
//       waitForSearch(selector, time);
//     }, time);
//   }
// }

// handle the widget size and position
function searchSizeHandler() {
  // get the search form width
  var searchWidth = jQuery('.basel-search-inner form').outerWidth();

  // set the search results element width
  jQuery('.snize-ac-results').css({'width': searchWidth + 'px'});
}

// window events for scroll and touchmove
// function scrollAction() {
//   // on desktop make sure that the search closes on scroll
//   $(window).on('scroll', function(){
//     if($(window).width() > 991) {
//       $('body').removeClass('basel-search-opened');
//       $('.basel-search-wrapper').removeClass('search-overlap');
//       $('.snize-ac-results').hide();
//     }
//   });
//
//   // on mobile make sure that the search input field loses focus on scroll
//   $(window).on('touchmove', function(){
//     if($(window).width() <= 991) {
//       $('.basel-search-inner form input[type=text]').each(function(){ $(this).trigger('blur'); });
//     }
//   });
// }

function mobileSearchHandler() {
  // if we're at a mobile window size
  if($(window).width() < 991) {
    // remove existing click events on the sticky header search icon, then create a click event to trigger scrollTo top and open the main header search
    $('.sticky-header .search-button')
      .replaceWith('<button class="search-button-placeholder"><i class="fal fa-search"></i></button>');
    $('.sticky-header .search-button-placeholder').on('click', function(){
      window.scrollTo(0,0);
      setTimeout(function(){ $('.main-header .search-button a').trigger('click'); }, 100);
    });
  }
}
//
// add this function to file for international site selector
//
function InternationalSelectHandler() {
  // set the trigger button labels to reflect the current site
  var currentSite = $('#currentSite').val();
  var thisSiteLabel = $('#international-modal').attr('data-current-site');
  $('.international-selector-trigger span').each(function(){
    $(this).text(thisSiteLabel);
  });

  // event listener for change to dropdown select to change site
  $('#international-select').on('change', function(){
    // get the selected value
    var selectedSite = $(this).find(":selected").val();
    var modalButton = $('#international-modal .international-modal__btn');

    // if the selected option is different from the current site, enable the button to trigger the site switch, otherwise disable it
    if(selectedSite != currentSite){
      // console.log('get ready to go to ' + selectedSite);
      modalButton.attr('aria-label', 'Go').text('Go').off('click').on('click', function () {
        window.location.href = selectedSite;
      });
    } else {
      // console.log('we\'re staying here folks');
      modalButton.attr('aria-label','Back').text('Back').off('click').on('click', function(){
        MicroModal.close('international-modal');
      })
    }
  });
}

jQuery(document).ready(function() {
  // $('.basel-search-full-screen').on('click', function(){
  //   waitForSearch('.snize-ac-results', 100);
  // });

  jQuery('.basel-search-inner').each(function(){ $(this).on('mouseenter', function(){ searchSizeHandler(); }); });
  jQuery('.basel-search-inner form input[type=text]').each(function(){ $(this).on('keydown', function(){ searchSizeHandler(); }); });

  // scrollAction();

  // run once to get things started, and then again anytime the page is resized
  mobileSearchHandler();
  $(window).resize(function(){
    mobileSearchHandler();
  });

//
// add this to file for international site selector
//
  // initialize the international site selector
  InternationalSelectHandler();

  // automatic smooth scroll using anchor hash links
  $('a[href^="#"]').on('click',function (e) {
    e.preventDefault();

    var $target = $(this.hash),
    headerHeight = $('.sticky-header').outerHeight();

    if($target.offset() != undefined) { // prevent errors
      $('html, body').stop().animate({
        'scrollTop': $target.offset().top - headerHeight
      }, 750, 'swing');
    }
  });

});
