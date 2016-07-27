$( document ).ready(function() {

  // Get started!
  $(".mobile-nav-toggle").click(function() {
    $(".mobile-nav-toggle").toggleClass("is-open");
    $(".mobile-nav").toggleClass("is-open");
  });
});
