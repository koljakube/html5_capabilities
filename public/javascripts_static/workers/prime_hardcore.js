(function() {
  $(function() {
    var running, start;
    $('#indicator').hide();
    running = false;
    start = function() {
      var stop, worker;
      running = true;
      $('#indicator').slideDown('fast');
      $('#toggle-calculations').text('Stop calculations');
      worker = new Worker('/javascripts/workers/prime_hardcore_worker.js');
      worker.onerror = function(event) {
        return $('#primes').append("<p class=\"error\">Error: " + event.message + "</p>");
      };
      worker.onmessage = function(event) {
        return $('#primes #highscore').text(event.data);
      };
      stop = (function(worker) {
        return function() {
          running = false;
          $('#indicator').slideUp('fast');
          $('#toggle-calculations').text('Start calculations');
          worker.terminate();
          return start;
        };
      })(worker);
      return stop;
    };
    return $('#toggle-calculations').click((function(start) {
      var func;
      func = start;
      return function() {
        return func = func();
      };
    })(start));
  });
}).call(this);
