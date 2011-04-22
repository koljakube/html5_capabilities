(function() {
  $(function() {
    return $('#click-me').click(function() {
      return $('#result').hide().addClass('success').text("JavaScript works!").slideDown(350);
    });
  });
}).call(this);
