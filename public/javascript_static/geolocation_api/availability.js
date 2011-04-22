(function() {
  $(function() {
    if (navigator.geolocation) {
      return $('#result').hide().addClass('success').text('Geolocation API is available.').slideDown(350);
    } else {
      return $('#result').hide().addClass('failure').text('Geolocation API is not available.').slideDown(350);
    }
  });
}).call(this);
