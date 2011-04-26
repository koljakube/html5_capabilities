(function() {
  var displayContacts, handleError;
  displayContacts = function(contacts) {
    var contact, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = contacts.length; _i < _len; _i++) {
      contact = contacts[_i];
      $('#contacts ul').append('<li></li>');
      _results.push($('#contacts ul li').last().text("" + contact.name.formatted + ", " + contact.emails[0].value));
    }
    return _results;
  };
  handleError = function(error) {
    var name;
    name = error.code === 20 ? "PERMISSION_DENIED_ERROR" : ["UNKNOWN_ERROR", "INVALID_ARGUMENT_ERROR", "TIMEOUT_ERROR", "PENDING_OPERATION_ERROR", "IO_ERROR", "NOT_SUPPORTED_ERROR"][error.code];
    return $('#contacts').append("<p>Error: " + name + "</p>");
  };
  $(function() {
    $('.failure').hide();
    if (!navigator.service || typeof navigator.service.contacts === 'undefined') {
      $('.failure').slideDown('fast');
    }
    $('#filter').keyup(function() {
      if (navigator.service) {
        return navigator.service.contacts.find(['name', 'emails'], displayContacts, handleError, {
          filter: $('#filter').val
        });
      }
    });
    return $('#filter').change(function() {
      if (navigator.service) {
        return navigator.service.contacts.find(['name', 'emails'], displayContacts, handleError, {
          filter: $('#filter').val
        });
      }
    });
  });
}).call(this);
