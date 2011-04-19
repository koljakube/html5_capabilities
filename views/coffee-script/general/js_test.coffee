$ ->
  $('#click-me').click -> 
    $('#result').hide().addClass('success').text("JavaScript works!").slideDown(350)