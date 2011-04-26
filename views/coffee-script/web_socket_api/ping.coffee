log = (string) ->
  t = $('#communications').text()
  $('#communications').text("#{t}\n#{string}")

$ ->
  socket = new WebSocket('ws://0.0.0.0:7654')
  
  socket.onopen = (event) ->
    log('\n-- connected to server.')
    log("   url:      #{socket.url}")
    log("   URL:      #{socket.URL}")
    log("   protocol: #{socket.protocol}")
  
  socket.onclose = (event) ->
    clean = if event.wasClean then 'clean' else 'unclean'
    log("\n-- disconnected from server (#{clean}).")
    log("   code:   #{event.code}")
    log("   reason: #{event.reason}")
  
  socket.onerror = (error) ->
    log("ERROR: #{error}")
  
  socket.onmessage = (message) ->
    log("\nmessage: '#{message.data}'")
  
      

  $('#send').click do (socket) ->
    ->
      if socket.readyState == WebSocket.CONNECTING
        log("\nStill connecting.")
      else if socket.readyState == WebSocket.CLOSING
        log("\nConnection is closing.")
      else if socket.readyState == WebSocket.CLOSED
        log("\nConnection is closed.")
      else if socket.readyState == WebSocket.OPEN
        try
          socket.send($('#message').val())
        catch exception
          log("\nEXCEPTION: #{exception}")
  
  
  $('#close').click do (socket) ->
    ->
      socket.close()