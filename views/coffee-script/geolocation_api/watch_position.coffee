counter = 0;

positionCallback = (position) ->
  counter += 1
  $('#current_position').show().append(
    "<pre class=\"result number#{counter}\">position = {\n" +
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
    "}</pre>")
  $
  $('html, body').animate({ scrollTop: $("#content").height() }, 'fast')



positionErrorCallback = (error) ->
  codes = ["UNKNOWN_ERROR", "PERMISSTION_DENIED", "POSITION_UNAVAILABLE", "TIMEOUT"]
  counter += 1
  $('#current_position').append(
    "<pre class=\"error number#{counter}\">error = {\n" +
    "  code    = " + error.code + " (" + codes[error.code] + "),\n" +
    "  message = " + error.message + "\n" +
    "}</pre>")
  $('html, body').animate({ scrollTop: $("#content").height() }, 'fast')
  

$ ->
  watchId = 0
  positionOptions = {
    enableHighAccuracy: false,
    timeout: 30000,
    maximumAge: 0
  }
  
  $('#current_position pre').hide()
  $('#watching-indicator').hide()
  
  $('#clear-results').click ->
    $('#current_position pre.result').slideUp( ->
      $(this).text("")
    )
    $('#current_position pre.error').slideUp( ->
      $(this).text("")
    )
  
  $('#stop-watching').click ->
    navigator.geolocation.clearWatch(watchId)
    $('#watching-indicator').slideUp('fast')
    watchId = 0
  
  $('#normal-accuracy').click ->
    if watchId == 0
      $('#watching-indicator').slideDown('fast')
      watchId = navigator.geolocation.watchPosition(positionCallback, positionErrorCallback, positionOptions)
  $('#high-accuracy').click ->
    if watchId == 0
      $('#watching-indicator').slideDown('fast')
      positionOptions.enableHighAccuracy = true
      navigator.geolocation.getCurrentPosition(positionCallback, positionErrorCallback, positionOptions)
  $('#cached-position').click ->
    if watchId == 0
      $('#watching-indicator').slideDown('fast')
      positionOptions.maximumAge = Infinity
      navigator.geolocation.getCurrentPosition(positionCallback, positionErrorCallback, positionOptions)
  $('#fresh-position').click ->
    if watchId == 0
      $('#watching-indicator').slideDown('fast')
      positionOptions.maximumAge = 0
      navigator.geolocation.getCurrentPosition(positionCallback, positionErrorCallback, positionOptions)
