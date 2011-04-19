positionCallback = (position) ->
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


positionErrorCallback = (error) ->
  codes = ["UNKNOWN_ERROR", "PERMISSTION_DENIED", "POSITION_UNAVAILABLE", "TIMEOUT"]
  $('#current_position pre.error').text(
    "error = {\n" +
    "  code    = " + error.code + " (" + codes[error.code] + "),\n" +
    "  message = " + error.message + "\n" +
    "}")
  $('#current_position pre.error').slideDown(350)
  


$ ->
  positionOptions = {
    enableHighAccuracy: false,
    timeout: 30000,
    maximumAge: 0
  }
  $('#current_position pre.result').hide()
  $('#current_position pre.error').hide()
  $('#normal-accuracy').click ->
    navigator.geolocation.getCurrentPosition(positionCallback, positionErrorCallback, positionOptions)
  $('#high-accuracy').click ->
    positionOptions.enableHighAccuracy = true
    navigator.geolocation.getCurrentPosition(positionCallback, positionErrorCallback, positionOptions)
  $('#cached-position').click ->
    positionOptions.maximumAge = Infinity
    navigator.geolocation.getCurrentPosition(positionCallback, positionErrorCallback, positionOptions)
  $('#fresh-position').click ->
    positionOptions.maximumAge = 0
    navigator.geolocation.getCurrentPosition(positionCallback, positionErrorCallback, positionOptions)
