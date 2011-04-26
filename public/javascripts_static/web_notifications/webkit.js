(function() {
  var log;
  log = function(string) {
    var t;
    t = $('#log').text();
    return $('#log').text("" + t + "\n" + string);
  };
  $(function() {
    $('.success').hide();
    $('.failure').hide();
    if (window.webkitNotifications) {
      $('.success').slideDown('fast');
    } else {
      $('.failure').slideDown('fast');
    }
    $('#request').click(function() {
      return window.webkitNotifications.requestPermission();
    });
    $(document).everyTime(300, "check-permissions", function() {
      return $('#permissions span').text(window.webkitNotifications.checkPermission() === 0 ? 'allowed' : 'denied');
    });
    $('#generate').click(function() {
      var notification;
      if (!window.webkitNotifications.checkPermission() === 0) {
        log("Access denied!");
        return;
      }
      try {
        log("Creating notification...");
        notification = window.webkitNotifications.createNotification('/favicon.png', 'Title', 'Content...');
        notification.ondisplay = function() {
          return log("Notification started displaying.");
        };
        notification.onclose = function() {
          return log("Notification was closed.");
        };
        notification.onclick = function() {
          return log("Notification was clicked.");
        };
        return notification.show();
      } catch (error) {
        log("Exception occurred while trying to create a notification");
        return log("Error: " + error);
      }
    });
    return $('#generate-html').click(function() {
      var notification;
      if (!window.webkitNotifications.checkPermission() === 0) {
        log("Access denied!");
        return;
      }
      try {
        log("Creating HTML notification...");
        notification = window.webkitNotifications.createHTMLNotification('/');
        notification.ondisplay = function() {
          return log("HTML Notification started displaying.");
        };
        notification.onclose = function() {
          return log("HTML Notification was closed.");
        };
        notification.onclick = function() {
          return log("HTML Notification was clicked.");
        };
        return notification.show();
      } catch (error) {
        log("Exception occurred while trying to create a notification");
        return log("Error: " + error);
      }
    });
  });
}).call(this);
