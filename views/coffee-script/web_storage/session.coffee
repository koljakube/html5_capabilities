$ ->
  $('#data').val(sessionStorage.data)
  
  $('#data').change ->
    sessionStorage.data = $('#data').val()
    alert($('#data').val())
