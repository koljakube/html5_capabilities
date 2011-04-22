getStorageData = (storage, elem) ->
  $("#{elem}-length").text(storage.length)
  for i in [0...storage.length]
    if $("\##{elem}-items li").first().text() == 'None'
      $("\##{elem}-items").html("<li id=\"#{elem}-item#{i}\"></li>")
    else
      $("\##{elem}-items").append("<li id=\"#{elem}-item#{i}\"></li>")
    key = storage.key(i)
    $("\##{elem}-items li\##{elem}-item#{i}").html("<span class=\"key\">#{key}</span>: <pre></pre>")
    $("\##{elem}-items li\##{elem}-item#{i} pre").text(storage.getItem(key))

$ ->
  getStorageData sessionStorage, 'sessionStorage'
  getStorageData localStorage, 'localStorage'