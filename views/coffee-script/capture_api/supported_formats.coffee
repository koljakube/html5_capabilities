addFormat = (list, key, format) ->
  if $("#{list} li").text() == 'none'
    $(list).html("<li>#{key}: #{format}</li>")
  else
    $(list).append("<li>#{key}: #{format}</li>")

$ ->
#  formats = {foo: 'bar', baz: 'qux'}
  formats = navigator.device.supportedImageFormats
  addFormat '#image-formats', key, format for key, format of formats
  formats = navigator.device.supportedVideoFormats
  addFormat '#video-formats', key, format for key, format of formats
  formats = navigator.device.supportedAudioFormats
  addFormat '#audio-formats', key, format for key, format of formats