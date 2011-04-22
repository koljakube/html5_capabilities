(function() {
  $(function() {
    $('pre').hide();
    if (window.navigator.device) {
      return $('pre.success').text(window.navigator.device).slideDown('fast');
    } else {
      if (navigator.device) {
        return $('pre.success').text(navigator.device).slideDown('fast');
      } else {
        return $('pre.error').text("window.navigator.device not available").slideDown('fast');
      }
    }
  });
}).call(this);
