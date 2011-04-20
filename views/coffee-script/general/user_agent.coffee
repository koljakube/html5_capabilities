$ ->
  $('.success').hide()

  $.ajax({
    type: 'POST',
    url: '/tests/general/user_agent_submit',
    data: '',
    success: ->
      $('.success').slideDown('fast')
    ,
    dataType: 'html'
  })
