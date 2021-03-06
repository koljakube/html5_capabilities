$ ->
  canvas = $('#canvas')[0]
  
  canvas.width = 260;
  canvas.height = 260

  t = 0
  
  $(document).everyTime 50, do (canvas, t) ->
    ->
      pen = canvas.getContext('2d')
      r = Math.floor(128 * Math.sin(t) + 128)
      g = Math.floor(128 * Math.sin(2*t) + 128)
      b = Math.floor(128 * Math.sin(3*t) + 128)
      pen.fillStyle = "rgb(#{r}, #{g}, #{b})"
      pen.fillRect 0, 0, 260, 260
      t += 0.1
