(function() {
  $(function() {
    $('#sessionStorage .data').val(sessionStorage.data);
    $('#localStorage .data').val(localStorage.data);
    window.onstorage = function(event) {
      var li;
      $('#storage-log ul').append('<li></li>');
      li = $('#storage-log ul li').last();
      li.text("Storage Event occurred.");
      li.append("<br />");
      li.append("<span class=\"key\">" + event.key + "</span>:");
      li.append("<br />");
      return li.append("" + event.oldValue + " -> " + event.newValue);
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
