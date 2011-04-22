(function() {
  var n;
  n = 1;
  setInterval(function() {
    var found, i, _ref;
    n += 1;
    found = true;
    for (i = 2, _ref = Math.floor(Math.sqrt(n)); (2 <= _ref ? i <= _ref : i >= _ref); (2 <= _ref ? i += 1 : i -= 1)) {
      if (n % i === 0) {
        found = false;
        break;
      }
    }
    if (found) {
      return postMessage(n);
    }
  }, 100);
}).call(this);
