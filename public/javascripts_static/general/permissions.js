(function() {
  $(function() {
    var feature, level, levelString, tr, _ref;
    $('.failure').hide();
    if (!(navigator.permissionLevel != null)) {
      $('.failure').slideDown('fast');
      $('#permissions').hide();
      return false;
    } else {
      _ref = naviator.privilegedFeatures;
      for (feature in _ref) {
        level = _ref[feature];
        levelString = (function() {
          switch (level) {
            case -2:
              return "USER_DENIED";
            case -1:
              return "DEFAULT_DENIED";
            case 1:
              return "DEFAULT_ALLOWED";
            case 2:
              return "USER_ALLOWED";
          }
        })();
        $('#permissions').append('<tr></tr>');
        tr = $('#permissions tr').last();
        tr.append("<td>" + feature + "</td>");
        tr.append("<td>" + levelString + "</td>");
      }
      return true;
    }
  });
}).call(this);
