$ ->
  $('.failure').hide()
  
  if not navigator.permissionLevel?
    $('.failure').slideDown('fast')
    $('#permissions').hide()
    false
  else
    for feature, level of naviator.privilegedFeatures
      levelString = switch level
        when -2 then "USER_DENIED"
        when -1 then "DEFAULT_DENIED"
        when  1 then "DEFAULT_ALLOWED"
        when  2 then "USER_ALLOWED"
      $('#permissions').append('<tr></tr>')
      tr = $('#permissions tr').last()
      tr.append("<td>#{feature}</td>")
      tr.append("<td>#{levelString}</td>")
    true
