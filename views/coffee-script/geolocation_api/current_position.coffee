positionCallback = (positionOptions) ->
  options = positionOptions
  (position) ->
    $('#current_position pre.result').text(
      "position = {\n" +
      "  coords = {\n" +
      "    latitude          = " + position.coords.latitude + ",\n" +
      "    longitude         = " + position.coords.longitude + ",\n" +
      "    altitude          = " + position.coords.altitude + ",\n" +
      "    accuracy          = " + position.coords.accuracy + ",\n" +
      "    altitudeAccuracy  = " + position.coords.altitudeAccuracy + ",\n" +
      "    heading           = " + position.coords.heading + ",\n" +
      "    speed             = " + position.coords.speed + "\n" +
      "  },\n" +
      "  timestamp = " + position.timestamp + "\n" +
      "              (" + new Date(position.timestamp).toUTCString() + ")" + "\n" +
      "}")
    $('#current_position pre.result').slideDown(350)
    $.ajax({
      type: 'POST',
      url: '/tests/geolocation_api/current_position_transmit',
      data: 'position=' + $.toJSON(position) + '&positionOptions=' + $.toJSON(options),
      success: null,
      dataType: 'html'
    })

positionErrorCallback = (positionOptions) ->
  options = positionOptions
  (error) ->
    codes = ["UNKNOWN_ERROR", "PERMISSTION_DENIED", "POSITION_UNAVAILABLE", "TIMEOUT"]
    $('#current_position pre.error').text(
      "error = {\n" +
      "  code    = " + error.code + " (" + codes[error.code] + "),\n" +
      "  message = " + error.message + "\n" +
      "}")
    $('#current_position pre.error').slideDown(350)
    $.ajax({
      type: 'POST',
      url: '/tests/geolocation_api/current_position_transmit',
      data: 'error=' + $.toJSON(error) + "&positionOptions=" + $.toJSON(options),
      success: null,
      dataType: 'html'
    })


$ ->
  positionOptions = {
    enableHighAccuracy: false,
    timeout: 30000,
    maximumAge: 0
  }
  $('#current_position pre.result').hide()
  $('#current_position pre.error').hide()
  $('#normal-accuracy').click ->
    navigator.geolocation.getCurrentPosition(
      positionCallback(positionOptions),
      positionErrorCallback(positionOptions),
      positionOptions)
  $('#high-accuracy').click ->
    positionOptions.enableHighAccuracy = true
    navigator.geolocation.getCurrentPosition(
      positionCallback(positionOptions),
      positionErrorCallback(positionOptions),
      positionOptions)
  $('#cached-position').click ->
    positionOptions.maximumAge = Infinity
    navigator.geolocation.getCurrentPosition(
      positionCallback(positionOptions),
      positionErrorCallback(positionOptions),
      positionOptions)
  $('#fresh-position').click ->
    positionOptions.maximumAge = 0
    navigator.geolocation.getCurrentPosition(
      positionCallback(positionOptions),
      positionErrorCallback(positionOptions),
      positionOptions)
