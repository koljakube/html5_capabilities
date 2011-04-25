displayContacts = (contacts) ->
  for i in contacts
    $('#contacts ul').append('<li></li>')
    li = $('#contacts ul li').last()
      c = contacts[i]
      li.text("#{c.name.formatted}, #{c.emails[0].value}")


handleError = (error) ->
  name = if error.code == 20
    "PERMISSION_DENIED_ERROR"
  else
    ["UNKNOWN_ERROR",
     "INVALID_ARGUMENT_ERROR",
     "TIMEOUT_ERROR",
     "PENDING_OPERATION_ERROR",
     "IO_ERROR",
     "NOT_SUPPORTED_ERROR"][error.code]
  $('#contacts').append("<p>Error: #{name}</p>")


$ ->
  $('.failure').hide()
  
  if navigator.service and typeof navigator.service.contacts == 'undefined'
    $('.failure').slideDown('fast')
  
  $('#filter').keyup ->
    if navigator.service
      navigator.service.contacts.find(['name', 'emails'],
                                      displayContacts, handleError,
                                      {filter: $('#filter').val })

  $('#filter').change ->
    if navigator.service
      navigator.service.contacts.find(['name', 'emails'],
                                      displayContacts, handleError,
                                      {filter: $('#filter').val })
