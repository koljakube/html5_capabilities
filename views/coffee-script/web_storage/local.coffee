$ ->
  localStorage.visitCount ||= 0
  # Other incrementation methods don't treat the value as a number
  localStorage.visitCount++
  $('#data').text("#{localStorage.visitCount}")