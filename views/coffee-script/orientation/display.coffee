$ ->
  $('.failure').hide()
  $('.result').hide()

  if window.orientation?
    $('.result').slideDown('fast')# unless typeof window.orientation == 'undefined'
    window.onorientationchange = ->
      orientation = window.orientation
      $('#orientation-display').text("#{orientation}")
  else
    $('.failure').slideDown('fast')
    
