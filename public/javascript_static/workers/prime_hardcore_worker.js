(function() {
  var found, i, n, _ref;
  n = 1;
  while (true) {
    n += 1;
    found = true;
    for (i = 2, _ref = Math.floor(Math.sqrt(n)); (2 <= _ref ? i <= _ref : i >= _ref); (2 <= _ref ? i += 1 : i -= 1)) {
      if (n % i === 0) {
        found = false;
        break;
      }
    }
    if (found) {
      postMessage(n);
    }
  }
}).call(this);
