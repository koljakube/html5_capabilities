$ ->
  $('pre').hide()
  if window.navigator.device
    $('pre.success').text(window.navigator.device).slideDown('fast')
  else
    if navigator.device
      $('pre.success').text(navigator.device).slideDown('fast')
    else
      $('pre.error').text("window.navigator.device not available").slideDown('fast')
