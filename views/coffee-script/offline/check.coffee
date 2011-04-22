$ ->
  $('.success').hide()
  $('.failure').hide()

  if navigator.onLine
    $('.success').slideDown('fast')
  else
    $('.failure').slideDown('fast')