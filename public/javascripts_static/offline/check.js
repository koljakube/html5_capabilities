(function() {
  $(function() {
    $('.success').hide();
    $('.failure').hide();
    if (navigator.onLine) {
      return $('.success').slideDown('fast');
    } else {
      return $('.failure').slideDown('fast');
    }
  });
}).call(this);
