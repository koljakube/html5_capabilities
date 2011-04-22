(function() {
  var FILE_ERROR_NAMES;
  FILE_ERROR_NAMES = ["", "NOT_FOUND_ERR", "SECURITY_ERR", "ABORT_ERR", "NOT_READABLE_ERR", "ENCODING_ERR"];
  $(function() {
    if (typeof FileReaderSync === 'undefined') {
      $('#file-input').attr('disabled', 'disabled');
      $('#not-available').hide().text("The FileReaderSync() interface is not available.");
      return $('#not-available').slideDown('fast');
    } else {
      $('#file-input').change(function() {
        var file, files, li, noun, reader, text, _i, _len, _results;
        files = document.forms[0]['file-input'].files;
        noun = files.length === 1 ? 'file' : 'files';
        $('#filelist-information').html("<p>" + files.length + " " + noun + " selected.</p>");
        if (files.length > 0) {
          $('#filelist-information').append("<ol></ol>");
          _results = [];
          for (_i = 0, _len = files.length; _i < _len; _i++) {
            file = files[_i];
            $('#filelist-information ol').append("<li>");
            li = $('#filelist-information ol li').last();
            li.append("<span class=\"header\">File information</span>");
            li.append("<span class=\"file_name\">" + file.name + "</span>");
            li.append("<span class=\"file_lastModifiedDate\">" + file.lastModifiedDate + "</span>");
            li.append("<span class=\"header\">Blob information</span>");
            li.append("<span class=\"file_size\">Size: " + file.size + " bytes</span>");
            li.append("<span class=\"file_type\">Type: " + file.type + "</span>");
            if (/^image\//.test(file.type)) {
              li.append("<span class=\"header\">Image</span>");
              reader = new FileReader();
              reader.onerror = (function(li, file) {
                return function(event) {
                  return li.append("<span class=\"error\">Error: " + FILE_ERROR_NAMES[reader.error.code] + "</span>");
                };
              })(li, file);
              reader.onloadstart = (function(li, file) {
                return function(event) {
                  return li.append("<span>Load Start!</span>");
                };
              })(li, file);
              reader.onprogress = (function(li, file) {
                return function(event) {
                  return li.append("<span>Progress: " + (reader.readyState === reader.LOADING ? 'loading' : 'done') + "</span>");
                };
              })(li, file);
              reader.onloadend = (function(li, file) {
                return function(event) {
                  li.append("<span>Load End!</span>");
                  if (event.target.readyState === event.target.DONE) {
                    return li.append("<img src=\"" + event.target.result + "\" title=\"" + file.name + "\" />");
                  }
                };
              })(li, file);
              reader.readAsDataURL(file);
            }
            _results.push((function() {
              if (/^text\//.test(file.type)) {
                li.append("<span class=\"header\">Text</span>");
                reader = new FileReaderSync();
                try {
                  text = reader.readAsText(file);
                  return li.append("<pre class=\"data\">" + text + "</pre>");
                } catch (error) {
                  return li.append("<span class=\"error\">" + FILE_ERROR_NAMES[error.code] + "</span>");
                }
              }
            })());
          }
          return _results;
        }
      });
      return $('#file-input').change();
    }
  });
}).call(this);
