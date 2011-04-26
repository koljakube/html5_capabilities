(function() {
  var log;
  log = function(string) {
    var t;
    t = $('#log').text();
    return $('#log').text("" + t + "\n" + string);
  };
  $(function() {
    $('.failure').hide();
    if (!(typeof Notification != "undefined" && Notification !== null)) {
      $('.failure').slideDown('fast');
      $('#notification').hide();
    }
    if (navigator.permissionLevel != null) {
      if (navigator.permissionLevel('notifications') > 0) {
        $('#permissions span').text('allowed');
      } else {
        $('#permissions span').text('not allowed');
      }
    }
    return $('#notify').click(function() {
      var notification;
      if ((navigator.permissionLevel != null) && navigator.permissionLevel('notifications') > 0) {
        notification = new Notification('/favicon.png', "Notification message");
        notification.onshow = function() {
          return log("Notification started showing.");
        };
        notification.onclose = function() {
          return log("Notification was closed.");
        };
        notification.onclick = function() {
          return log("Notification was clicked.");
        };
        notification.onerror = function() {
          return log("Error in notification!");
        };
        return notification.show();
      }
    });
  });
}).call(this);
