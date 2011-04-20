$ ->
  $('.success').hide()
  $('.failure').hide()
  if typeof Worker == 'undefined'
    $('.failure').text("Web Workers are not available")
    $('.failure').slideDown('fast')
  else
    $('.success').text("Web Workers are available")
    $('.success').slideDown('fast')