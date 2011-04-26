(function() {
  $(function() {
    $('.failure').hide();
    $('.result').hide();
    if (window.orientation != null) {
      $('.result').slideDown('fast');
      return window.onorientationchange = function() {
        var orientation;
        orientation = window.orientation;
        return $('#orientation-display').text("" + orientation);
      };
    } else {
      return $('.failure').slideDown('fast');
    }
  });
}).call(this);
