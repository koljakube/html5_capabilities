$ ->
  $('#indicator').hide()

  running = false
  
  # Start returns a function closure that contains the worker and can be used
  # to stop it.
  
  start = ->
    running = true
    $('#indicator').slideDown('fast')
    $('#toggle-calculations').text('Stop calculations')
    worker = new Worker('/javascripts/workers/prime_hardcore_worker.js')
    worker.onerror = (event) ->
      $('#primes').append("<p class=\"error\">Error: #{event.message}</p>")
    worker.onmessage = (event) ->
      $('#primes #highscore').text(event.data)
      
    stop = do (worker) ->
      ->
        running = false
        $('#indicator').slideUp('fast')
        $('#toggle-calculations').text('Start calculations')
        worker.terminate()
        start

    stop

  $('#toggle-calculations').click do (start) ->
    func = start
    ->
      func = func()
