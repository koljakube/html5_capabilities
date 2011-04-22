(function() {
  var counter, positionCallback, positionErrorCallback;
  counter = 0;
  positionCallback = function(positionOptions) {
    var options;
    options = positionOptions;
    return function(position) {
      counter += 1;
      $('#current_position').show().append(("<pre class=\"result number" + counter + "\">position = {\n") + "  coords = {\n" + "    latitude          = " + position.coords.latitude + ",\n" + "    longitude         = " + position.coords.longitude + ",\n" + "    altitude          = " + position.coords.altitude + ",\n" + "    accuracy          = " + position.coords.accuracy + ",\n" + "    altitudeAccuracy  = " + position.coords.altitudeAccuracy + ",\n" + "    heading           = " + position.coords.heading + ",\n" + "    speed             = " + position.coords.speed + "\n" + "  },\n" + "  timestamp = " + position.timestamp + "\n" + "              (" + new Date(position.timestamp).toUTCString() + ")" + "\n" + "}</pre>");
      $;
      $('html, body').animate({
        scrollTop: $("#content").height()
      }, 'fast');
      return $.ajax({
        type: 'POST',
        url: '/tests/geolocation_api/watch_position_submit',
        data: 'position=' + $.toJSON(position) + "&options=" + $.toJSON(options),
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
      counter += 1;
      $('#current_position').append(("<pre class=\"error number" + counter + "\">error = {\n") + "  code    = " + error.code + " (" + codes[error.code] + "),\n" + "  message = " + error.message + "\n" + "}</pre>");
      $('html, body').animate({
        scrollTop: $("#content").height()
      }, 'fast');
      return $.ajax({
        type: 'POST',
        url: '/tests/geolocation_api/watch_position_submit',
        data: 'error=' + $.toJSON(error) + "&options=" + $.toJSON(options),
        success: null,
        dataType: 'html'
      });
    };
  };
  $(function() {
    var positionOptions, watchId;
    watchId = 0;
    positionOptions = {
      enableHighAccuracy: false,
      timeout: 30000,
      maximumAge: 0
    };
    $('#current_position pre').hide();
    $('#watching-indicator').hide();
    $('#clear-results').click(function() {
      $('#current_position pre.result').slideUp(function() {
        return $(this).text("");
      });
      return $('#current_position pre.error').slideUp(function() {
        return $(this).text("");
      });
    });
    $('#stop-watching').click(function() {
      navigator.geolocation.clearWatch(watchId);
      $('#watching-indicator').slideUp('fast');
      return watchId = 0;
    });
    $('#normal-accuracy').click(function() {
      if (watchId === 0) {
        $('#watching-indicator').slideDown('fast');
        return watchId = navigator.geolocation.watchPosition(positionCallback(positionOptions), positionErrorCallback(positionOptions), positionOptions);
      }
    });
    $('#high-accuracy').click(function() {
      if (watchId === 0) {
        $('#watching-indicator').slideDown('fast');
        positionOptions.enableHighAccuracy = true;
        return watchId = navigator.geolocation.watchPosition(positionCallback(positionOptions), positionErrorCallback(positionOptions), positionOptions);
      }
    });
    $('#cached-position').click(function() {
      if (watchId === 0) {
        $('#watching-indicator').slideDown('fast');
        positionOptions.maximumAge = Infinity;
        return watchId = navigator.geolocation.watchPosition(positionCallback(positionOptions), positionErrorCallback(positionOptions), positionOptions);
      }
    });
    return $('#fresh-position').click(function() {
      if (watchId === 0) {
        $('#watching-indicator').slideDown('fast');
        positionOptions.maximumAge = 0;
        return watchId = navigator.geolocation.watchPosition(positionCallback(positionOptions), positionErrorCallback(positionOptions), positionOptions);
      }
    });
  });
}).call(this);
