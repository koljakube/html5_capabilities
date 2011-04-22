(function() {
  $(function() {
    $('.success').hide();
    return $.ajax({
      type: 'POST',
      url: '/tests/general/user_agent_submit',
      data: '',
      success: function() {
        return $('.success').slideDown('fast');
      },
      dataType: 'html'
    });
  });
}).call(this);
