$ ->
  if navigator.geolocation
    $('#result').hide().addClass('success').text('Geolocation API is available.').slideDown(350)
  else
    $('#result').hide().addClass('failure').text('Geolocation API is not available.').slideDown(350)