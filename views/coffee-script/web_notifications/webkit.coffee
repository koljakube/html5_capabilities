log = (string) ->
  t = $('#log').text()
  $('#log').text("#{t}\n#{string}")

$ ->
  $('.success').hide()
  $('.failure').hide()
  
  if window.webkitNotifications
    $('.success').slideDown('fast')
  else
    $('.failure').slideDown('fast')
  
  $('#request').click ->
    window.webkitNotifications.requestPermission();

  $(document).everyTime 300, "check-permissions", ->
    $('#permissions span').text(if window.webkitNotifications.checkPermission() == 0 then 'allowed' else 'denied')
  
  $('#generate').click ->
    if not window.webkitNotifications.checkPermission() == 0
      log("Access denied!")
      return
    try
      log("Creating notification...")
      notification = window.webkitNotifications.createNotification(
        '/favicon.png',
        'Title',
        'Content...'
      )
      notification.ondisplay = ->
        log("Notification started displaying.")
      notification.onclose = ->
        log("Notification was closed.")
      notification.onclick = ->
        log("Notification was clicked.")
      notification.show()
    catch error
      log("Exception occurred while trying to create a notification")
      log("Error: #{error}")

  $('#generate-html').click ->
    if not window.webkitNotifications.checkPermission() == 0
      log("Access denied!")
      return
    try
      log("Creating HTML notification...")
      notification = window.webkitNotifications.createHTMLNotification(
        '/'
      )
      notification.ondisplay = ->
        log("HTML Notification started displaying.")
      notification.onclose = ->
        log("HTML Notification was closed.")
      notification.onclick = ->
        log("HTML Notification was clicked.")
      notification.show()
    catch error
      log("Exception occurred while trying to create a notification")
      log("Error: #{error}")
