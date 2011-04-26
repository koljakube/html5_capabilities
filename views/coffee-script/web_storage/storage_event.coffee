$ ->
  $('#sessionStorage .data').val(sessionStorage.data)
  $('#localStorage .data').val(localStorage.data)
  
  window.onstorage = (event) ->
#    alert('storage!')
    $('#storage-log ul').append('<li></li>')
    li = $('#storage-log ul li').last()
    li.text("Storage Event occurred.")
    li.append("<br />")
    li.append("<span class=\"key\">#{event.key}</span>:")
    li.append("<br />")
    li.append("#{event.oldValue} -> #{event.newValue}")
      
  
  $('#localStorage .data').change ->
    $('#storage-log ul').append('<li></li>')
    li = $('#storage-log ul li').last().text("localStorage data changed.")
    localStorage.data = $('#localStorage .data').val()

  $('#sessionStorage .data').change ->
    $('#storage-log ul').append('<li></li>')
    li = $('#storage-log ul li').last().text("sessionStorage data changed.")
    sessionStorage.setItem 'data', $('#sessionStorage .data').val()