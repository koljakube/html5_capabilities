FILE_ERROR_NAMES = ["", 
                   "NOT_FOUND_ERR",
                   "SECURITY_ERR",
                   "ABORT_ERR",
                   "NOT_READABLE_ERR",
                   "ENCODING_ERR"]


$ ->
  if typeof FileReader == 'undefined'
    $('#file-input').attr('disabled', 'disabled')
    $('#not-available').hide().text("The FileReader() interface is not available.")
    $('#not-available').slideDown('fast')
  else
    $('#file-input').change ->
      files = document.forms[0]['file-input'].files
      noun = if files.length == 1 then 'file' else 'files'
      $('#filelist-information').html("<p>#{files.length} #{noun} selected.</p>")
      if files.length > 0
        $('#filelist-information').append("<ol></ol>")
        for file in files
          $('#filelist-information ol').append("<li>")
          li = $('#filelist-information ol li').last()
          li.append("<span class=\"header\">File information</span>")
          li.append("<span class=\"file_name\">#{file.name}</span>")
          li.append("<span class=\"file_lastModifiedDate\">#{file.lastModifiedDate}</span>")
          li.append("<span class=\"header\">Blob information</span>")
          li.append("<span class=\"file_size\">Size: #{file.size} bytes</span>")
          li.append("<span class=\"file_type\">Type: #{file.type}</span>")
          
          if /^image\//.test(file.type)
            li.append("<span class=\"header\">Image</span>")
            reader = new FileReader()
            reader.onerror = do (li, file) ->
              (event) ->
                li.append("<span class=\"error\">Error: #{FILE_ERROR_NAMES[reader.error.code]}</span>")
            reader.onloadstart = do (li, file) ->
              (event) ->
                li.append("<span>Load Start!</span>")
            reader.onprogress = do (li, file) ->
              (event) ->
                li.append("<span>Progress: #{if reader.readyState == reader.LOADING then 'loading' else 'done'}</span>")
            reader.onloadend = do (li, file) ->
              (event) ->
                li.append("<span>Load End!</span>")
                if event.target.readyState == event.target.DONE
                  li.append("<img src=\"#{event.target.result}\" title=\"#{file.name}\" />")
            reader.readAsDataURL(file)
          
          if /^text\//.test(file.type)
            li.append("<span class=\"header\">Text</span>")
            reader = new FileReader()
            reader.onerror = do (li, file) ->
              (event) ->
                li.append("<span class=\"error\">Error: #{FILE_ERROR_NAMES[reader.error.code]}</span>")
            reader.onloadstart = do (li, file) ->
              (event) ->
                li.append("<span>Load Start!</span>")
            reader.onprogress = do (li, file) ->
              (event) ->
                li.append("<span>Progress: #{if reader.readyState == reader.LOADING then 'loading' else 'done'}</span>")
            reader.onloadend = do (li, file) ->
              (event) ->
                li.append("<span>Load End!</span>")
                if event.target.readyState == event.target.DONE
                  li.append("<pre class=\"data\">#{event.target.result}</pre>")
            reader.readAsText(file)
          

    $('#file-input').change()