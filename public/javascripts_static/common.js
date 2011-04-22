(function() {
  $.fn.appendText = function(text, speed, callback) {
    return this.each(function() {
      var cur, el, finish, next;
      el = $(this);
      finish = {
        width: this.style.width,
        height: this.style.height
      };
      cur = {
        width: el.width() + 'px',
        height: el.height() + 'px'
      };
      el.append(text);
      next = {
        width: el.width() + 'px',
        height: el.height() + 'px'
      };
      el.css(cur);
      return el.animate(next, speed, function() {
        el.css(finish);
        if ($.isFunction(callback)) {
          return callback();
        }
      });
    });
  };
}).call(this);
