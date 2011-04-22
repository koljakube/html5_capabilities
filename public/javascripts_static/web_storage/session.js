(function() {
  $(function() {
    $('#data').val(sessionStorage.data);
    return $('#data').change(function() {
      sessionStorage.data = $('#data').val();
      return alert($('#data').val());
    });
  });
}).call(this);
