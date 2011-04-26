log = (string) ->
  t = $('#log').text()
  $('#log').text("#{t}\n#{string}")

$ ->
  $('.failure').hide()
  if not Notification?
    $('.failure').slideDown('fast')
    $('#notification').hide()

  if navigator.permissionLevel?
    if navigator.permissionLevel('notifications') > 0
      $('#permissions span').text('allowed')
    else
      $('#permissions span').text('not allowed')
    
  $('#notify').click ->
    if navigator.permissionLevel? and navigator.permissionLevel('notifications') > 0
      notification = new Notification('/favicon.png', "Notification message")
      notification.onshow = ->
        log("Notification started showing.")
      notification.onclose = ->
        log("Notification was closed.")
      notification.onclick = ->
        log("Notification was clicked.")
      notification.onerror = ->
        log("Error in notification!")
      notification.show()
      