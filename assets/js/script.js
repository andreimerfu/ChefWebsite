/* Parallax effect require jQuery*/

// $(document).ready(function () {
//     $(window).on('load scroll', function () {
//         var scrolled = $(this).scrollTop();
//         $('#title').css({
//             'transform': 'translate3d(0, ' + -(scrolled * 0.2) + 'px, 0)', // parallax (20% scroll rate)
//             'opacity': 1 - scrolled / 400 // fade out at 400px from top
//         });
//         $('#hero-vid').css('transform', 'translate3d(0, ' + -(scrolled * 0.25) + 'px, 0)'); // parallax (25% scroll rate)
//     });
    
// });

 // video controls
 $('#state').on('click', function () {
    var video = $('#hero-vid').get(0);
    var icons = $('#state > span');
    $('#overlay').toggleClass('fade');
    if (video.paused) {
        video.play();
        icons.removeClass('fa-play').addClass('fa-pause');
    } else {
        video.pause();
        icons.removeClass('fa-pause').addClass('fa-play');
    }
});

/* Responsive navbar */
function myFunction() {
    var x = document.getElementById("nav_mobile");
    if (x.className === "nav_mobile") {
        x.className += " responsive";
    } else {
        x.className = "nav_mobile";
    }
}


/*Scroll down*/
$(function() {
    $('a[href*=#]').on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
    });
  });


  function dropDown() {
    document.getElementById("retete_dropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("retete-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}