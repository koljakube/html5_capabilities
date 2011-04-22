(function() {
  $(function() {
    localStorage.visitCount || (localStorage.visitCount = 0);
    localStorage.visitCount++;
    return $('#data').text("" + localStorage.visitCount);
  });
}).call(this);
