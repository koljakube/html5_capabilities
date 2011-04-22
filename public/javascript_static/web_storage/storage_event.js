(function() {
  $(function() {
    $('#sessionStorage .data').val(sessionStorage.data);
    $('#localStorage .data').val(localStorage.data);
    window.onstorage = function(event) {
      return alert('storage!');
    };
    $('#localStorage .data').change(function() {
      var li;
      $('#storage-log ul').append('<li></li>');
      li = $('#storage-log ul li').last().text("localStorage data changed.");
      return localStorage.data = $('#localStorage .data').val();
    });
    return $('#sessionStorage .data').change(function() {
      var li;
      $('#storage-log ul').append('<li></li>');
      li = $('#storage-log ul li').last().text("sessionStorage data changed.");
      return sessionStorage.setItem('data', $('#sessionStorage .data').val());
    });
  });
}).call(this);
