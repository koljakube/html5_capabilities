(function() {
  var displayInfo, handleChange, handleError;
  displayInfo = function(fileData) {
    var data;
    data = "mediaFileData = {\n" + ("  codecs = " + fileData.codecs + ",\n") + ("  bitrate = " + fileData.bitrate + ",\n") + ("  height = " + fileData.height + ",\n") + ("  width = " + fileData.width + ",\n") + ("  duration = " + fileData.duration + "\n}");
    return $("\#" + name + "-info").text(data);
  };
  handleError = function(error) {
    var data, _ref;
    data = "MediaFileDataError = " + ((_ref = error.code === 0) != null ? _ref : {
      "UNKNOWN_ERROR": "TIMEOUT_ERROR"
    });
    return $("\#" + name + "-info").text(data);
  };
  handleChange = function(name) {
    var elem, file;
    elem = document.forms[0][name];
    file = elem.files[0];
    return file.getFormatData((function(name) {
      return displayInfo;
    })(name), (function(name) {
      return handleError;
    })(name));
  };
  $(function() {
    $('.failure').hide();
    if (typeof MediaFile === 'undefined') {
      $('.failure').slideDown('fast');
    }
    $('#filesystem').change(function() {
      return handleChange('filesystem');
    });
    return $('#microphone').change(function() {
      return handleChange('microphone');
    });
  });
}).call(this);
