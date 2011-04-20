$ ->
  $('#indicator').hide()
  
  start = ->
    stop = do (worker) ->
      ->
        worker.terminate()
        $('#toggle-calculations').text("Start calculations")
        $('#indicator').slideUp('fast')
        start

    worker = new Worker('/javascripts/workers/prime_worker.js')
    worker.onerror = (event) ->
      $('#primes').append("<p class=\"error\">Error: #{event.message}</p>")
    worker.onmessage = (event) ->
      $('#primes #highscore').text(event.data)
    $('#toggle-calculations').text("Stop calculations")
    $('#indicator').slideDown('fast')
    
    stop

  func = start

  $('#toggle-calculations').click ->
    # start returns stop and vice versa
    func = func()