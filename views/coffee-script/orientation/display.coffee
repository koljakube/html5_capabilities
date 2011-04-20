$ ->
  $('.failure').hide()
  $('.result').hide()

  unless typeof window.orientation == 'undefined'
    window.onorientationchange = ->
      orientation = window.orientation
      $('#orientation-display').text("#{orientation}")
    $('#orientation-display').text(window.orientation)
    $('.result').slideDown('fast')
  else
    $('.failure').slideDown('fast')
    
