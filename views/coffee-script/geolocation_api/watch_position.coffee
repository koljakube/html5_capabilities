counter = 0;

positionCallback = (positionOptions) ->
  options = positionOptions
  (position) ->
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
    $.ajax({
      type: 'POST',
      url: '/tests/geolocation_api/watch_position_transmit',
      data: 'position=' + $.toJSON(position) + "&options=" + $.toJSON(options),
      success: null,
      dataType: 'html'
    })



positionErrorCallback = (positionOptions) ->
  options = positionOptions
  (error) ->
    codes = ["UNKNOWN_ERROR", "PERMISSTION_DENIED", "POSITION_UNAVAILABLE", "TIMEOUT"]
    counter += 1
    $('#current_position').append(
      "<pre class=\"error number#{counter}\">error = {\n" +
      "  code    = " + error.code + " (" + codes[error.code] + "),\n" +
      "  message = " + error.message + "\n" +
      "}</pre>")
    $('html, body').animate({ scrollTop: $("#content").height() }, 'fast')
    $.ajax({
      type: 'POST',
      url: '/tests/geolocation_api/watch_position_transmit',
      data: 'error=' + $.toJSON(error) + "&options=" + $.toJSON(options),
      success: null,
      dataType: 'html'
    })
  

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
      watchId = navigator.geolocation.watchPosition(
        positionCallback(positionOptions),
        positionErrorCallback(positionOptions),
        positionOptions)
  $('#high-accuracy').click ->
    if watchId == 0
      $('#watching-indicator').slideDown('fast')
      positionOptions.enableHighAccuracy = true
      watchId = navigator.geolocation.watchPosition(
        positionCallback(positionOptions),
        positionErrorCallback(positionOptions),
        positionOptions)
  $('#cached-position').click ->
    if watchId == 0
      $('#watching-indicator').slideDown('fast')
      positionOptions.maximumAge = Infinity
      watchId = navigator.geolocation.watchPosition(
        positionCallback(positionOptions),
        positionErrorCallback(positionOptions),
        positionOptions)
  $('#fresh-position').click ->
    if watchId == 0
      $('#watching-indicator').slideDown('fast')
      positionOptions.maximumAge = 0
      watchId = navigator.geolocation.watchPosition(
        positionCallback(positionOptions),
        positionErrorCallback(positionOptions),
        positionOptions)
