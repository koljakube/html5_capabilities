(function() {
  var positionCallback, positionErrorCallback;
  positionCallback = function(positionOptions) {
    var options;
    options = positionOptions;
    return function(position) {
      $('#current_position pre.result').text("position = {\n" + "  coords = {\n" + "    latitude          = " + position.coords.latitude + ",\n" + "    longitude         = " + position.coords.longitude + ",\n" + "    altitude          = " + position.coords.altitude + ",\n" + "    accuracy          = " + position.coords.accuracy + ",\n" + "    altitudeAccuracy  = " + position.coords.altitudeAccuracy + ",\n" + "    heading           = " + position.coords.heading + ",\n" + "    speed             = " + position.coords.speed + "\n" + "  },\n" + "  timestamp = " + position.timestamp + "\n" + "              (" + new Date(position.timestamp).toUTCString() + ")" + "\n" + "}");
      $('#current_position pre.result').slideDown('fast');
      return $.ajax({
        type: 'POST',
        url: '/tests/geolocation_api/current_position_transmit',
        data: 'position=' + $.toJSON(position) + '&positionOptions=' + $.toJSON(options),
        success: null,
        dataType: 'html'
      });
    };
  };
  positionErrorCallback = function(positionOptions) {
    var options;
    options = positionOptions;
    return function(error) {
      var codes;
      codes = ["UNKNOWN_ERROR", "PERMISSTION_DENIED", "POSITION_UNAVAILABLE", "TIMEOUT"];
      $('#current_position pre.error').text("error = {\n" + "  code    = " + error.code + " (" + codes[error.code] + "),\n" + "  message = " + error.message + "\n" + "}");
      $('#current_position pre.error').slideDown('fast');
      return $.ajax({
        type: 'POST',
        url: '/tests/geolocation_api/current_position_transmit',
        data: 'error=' + $.toJSON(error) + "&positionOptions=" + $.toJSON(options),
        success: null,
        dataType: 'html'
      });
    };
  };
  $(function() {
    var positionOptions;
    positionOptions = {
      enableHighAccuracy: false,
      timeout: 30000,
      maximumAge: 0
    };
    $('#current_position pre.result').hide();
    $('#current_position pre.error').hide();
    $('#normal-accuracy').click(function() {
      return navigator.geolocation.getCurrentPosition(positionCallback(positionOptions), positionErrorCallback(positionOptions), positionOptions);
    });
    $('#high-accuracy').click(function() {
      positionOptions.enableHighAccuracy = true;
      return navigator.geolocation.getCurrentPosition(positionCallback(positionOptions), positionErrorCallback(positionOptions), positionOptions);
    });
    $('#cached-position').click(function() {
      positionOptions.maximumAge = Infinity;
      return navigator.geolocation.getCurrentPosition(positionCallback(positionOptions), positionErrorCallback(positionOptions), positionOptions);
    });
    return $('#fresh-position').click(function() {
      positionOptions.maximumAge = 0;
      return navigator.geolocation.getCurrentPosition(positionCallback(positionOptions), positionErrorCallback(positionOptions), positionOptions);
    });
  });
}).call(this);
