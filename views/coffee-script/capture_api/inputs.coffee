displayInfo = (fileData) ->
  data = "mediaFileData = {\n" +
    "  codecs = #{fileData.codecs},\n" +
    "  bitrate = #{fileData.bitrate},\n" + 
    "  height = #{fileData.height},\n" +
    "  width = #{fileData.width},\n" +
    "  duration = #{fileData.duration}\n}"
  $("\##{name}-info").text(data)


handleError = (error) ->
  data = "MediaFileDataError = #{error.code == 0 ? "UNKNOWN_ERROR" : "TIMEOUT_ERROR"}"
  $("\##{name}-info").text(data)


handleChange = (name) ->
  elem = document.forms[0][name]
  file = elem.files[0]
  file.getFormatData(do (name) ->
    displayInfo
  ,
    do (name) ->
      handleError
  )

    
$ ->
  $('.failure').hide()
  if typeof MediaFile == 'undefined'
    $('.failure').slideDown('fast')

  $('#filesystem').change ->
    handleChange('filesystem')
  $('#microphone').change ->
    handleChange('microphone')
