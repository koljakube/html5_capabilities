$ ->
  $('.failure').hide()
  $('.result').hide()

  # unless typeof window.orientation == 'undefined'
  window.onorientationchange = ->
    alert("Called!")
    orientation = window.orientation
    $('#orientation-display').text("#{orientation}")
    $('.result').slideDown('fast')
  # else
  #   $('.failure').slideDown('fast')
    
