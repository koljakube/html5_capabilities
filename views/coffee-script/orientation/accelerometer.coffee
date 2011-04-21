$ ->
  $('.result').hide()
  $('.failure').hide()
  
  found = false

  if window.DeviceOrientationEvent
    found = true
    $('#result-deviceorientation').slideDown('fast')
    window.ondeviceorientation = (event) ->
      data = "alpha: #{if event.alpha then event.alpha else "null"},\n" +
        "beta:  #{if event.beta then event.beta else "null"},\n" +
        "gamma: #{if event.gamma then event.gamma else "null"}\n"
      $('#result-deviceorientation .data').text(data)
  if window.DeviceMotionEvent
    found = true
    $('#result-devicemotion').slideDown('fast')
    window.ondevicemotion = (event) ->
      acc = if event.acceleration
        a = event.acceleration
        "{\n    x: #{a.x},\n    y: #{a.y},\n    z: #{a.z}\n  }"
      else
        "no gyroscope"
      accIG = if event.accelerationIncludingGravity
        a = event.accelerationIncludingGravity
        "{\n    x: #{a.x},\n    y: #{a.y},\n    z: #{a.z}\n  }"
      else
        "no gyroscope"
      rr = if event.rotationRate
        r = event.rotationRate
        "{\n    alpha: #{r.alpha},\n    beta: #{r.beta},\n    gamma: #{r.gamma}\n  }"
      else
        "no gyroscope"
      data = "deviceMotion: {\n" +
        "  acceleration: #{acc},\n" +
        "  accelerationIncludingGravity: #{accIG},\n" +
        "  rotationRate: #{rr},\n" +
        "  interval: #{event.interval}\n" +
        "}"
      $('#result-devicemotion .data').text(data)
  
  if not found
    window.onMozOrientation = (event) ->
      $('#result-MozOrientation').slideDown('fast')
      data = "x: #{if event.x then event.x else "null"},\n" +
        "y: #{if event.y then event.y else "null"},\n" +
        "z: #{if event.z then event.z else "null"}\n"
      $('#result-MozOrientation .data').text(data)
      
    $('.failure').slideDown('fast')