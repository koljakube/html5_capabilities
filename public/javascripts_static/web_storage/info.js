(function() {
  var getStorageData;
  getStorageData = function(storage, elem) {
    var i, key, _ref, _results;
    $("" + elem + "-length").text(storage.length);
    _results = [];
    for (i = 0, _ref = storage.length; (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
      if ($("\#" + elem + "-items li").first().text() === 'None') {
        $("\#" + elem + "-items").html("<li id=\"" + elem + "-item" + i + "\"></li>");
      } else {
        $("\#" + elem + "-items").append("<li id=\"" + elem + "-item" + i + "\"></li>");
      }
      key = storage.key(i);
      $("\#" + elem + "-items li\#" + elem + "-item" + i).html("<span class=\"key\">" + key + "</span>: <pre></pre>");
      _results.push($("\#" + elem + "-items li\#" + elem + "-item" + i + " pre").text(storage.getItem(key)));
    }
    return _results;
  };
  $(function() {
    getStorageData(sessionStorage, 'sessionStorage');
    return getStorageData(localStorage, 'localStorage');
  });
}).call(this);
