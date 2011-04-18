$ ->
  if navigator.geolocation
    $('#result').addClass('success').text('Geolocation API is available.')
  else
    $('#result').addClass('failure').text('Geolocation API is not available.')