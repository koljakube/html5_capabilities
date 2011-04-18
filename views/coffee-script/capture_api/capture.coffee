success = (data) ->
  for i in data
    $('#capture').append('<img src="' + i.uri + '" />')

error = (err) ->
  alert(err.message + " (" + err.code + ")")

$ ->
  navigator.device.captureImage(success, error, { maxNumberOfMediaFiles: 1 })
