(function() {
  $(function() {
    $('.failure').hide();
    $('.result').hide();
    return window.onorientationchange = function() {
      var orientation;
      alert("Called!");
      orientation = window.orientation;
      $('#orientation-display').text("" + orientation);
      return $('.result').slideDown('fast');
    };
  });
}).call(this);
