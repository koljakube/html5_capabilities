(function() {
  $(function() {
    $('.success').hide();
    $('.failure').hide();
    if (typeof Worker === 'undefined') {
      $('.failure').text("Web Workers are not available");
      return $('.failure').slideDown('fast');
    } else {
      $('.success').text("Web Workers are available");
      return $('.success').slideDown('fast');
    }
  });
}).call(this);
