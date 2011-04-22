(function() {
  var addFormat;
  addFormat = function(list, key, format) {
    if ($("" + list + " li").text() === 'none') {
      return $(list).html("<li>" + key + ": " + format + "</li>");
    } else {
      return $(list).append("<li>" + key + ": " + format + "</li>");
    }
  };
  $(function() {
    var format, formats, key, _results;
    formats = navigator.device.supportedImageFormats;
    for (key in formats) {
      format = formats[key];
      addFormat('#image-formats', key, format);
    }
    formats = navigator.device.supportedVideoFormats;
    for (key in formats) {
      format = formats[key];
      addFormat('#video-formats', key, format);
    }
    formats = navigator.device.supportedAudioFormats;
    _results = [];
    for (key in formats) {
      format = formats[key];
      _results.push(addFormat('#audio-formats', key, format));
    }
    return _results;
  });
}).call(this);
