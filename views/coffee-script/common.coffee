$.fn.appendText = (text, speed, callback) ->
  return this.each( ->
    el = $(this);
    
    finish = {
      width:  this.style.width,
      height: this.style.height
    }
    cur = {
      width:  el.width() + 'px',
      height: el.height() + 'px'
    }
    
    el.append(text);
    
    next = {
      width:  el.width() + 'px',
      height: el.height() + 'px'
    }
    
    
    el.css(cur)
    el.animate(next, speed, ->
      el.css(finish)
      callback() if $.isFunction(callback)
    )
  )
