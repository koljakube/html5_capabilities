(function() {
  $(function() {
    var found;
    $('.result').hide();
    $('.failure').hide();
    found = false;
    if (window.DeviceOrientationEvent) {
      found = true;
      $('#result-deviceorientation').slideDown('fast');
      window.ondeviceorientation = function(event) {
        var data;
        data = ("alpha: " + (event.alpha ? event.alpha : "null") + ",\n") + ("beta:  " + (event.beta ? event.beta : "null") + ",\n") + ("gamma: " + (event.gamma ? event.gamma : "null") + "\n");
        return $('#result-deviceorientation .data').text(data);
      };
    }
    if (window.DeviceMotionEvent) {
      found = true;
      $('#result-devicemotion').slideDown('fast');
      window.ondevicemotion = function(event) {
        var a, acc, accIG, data, r, rr;
        acc = event.acceleration ? (a = event.acceleration, "{\n    x: " + a.x + ",\n    y: " + a.y + ",\n    z: " + a.z + "\n  }") : "no gyroscope";
        accIG = event.accelerationIncludingGravity ? (a = event.accelerationIncludingGravity, "{\n    x: " + a.x + ",\n    y: " + a.y + ",\n    z: " + a.z + "\n  }") : "no gyroscope";
        rr = event.rotationRate ? (r = event.rotationRate, "{\n    alpha: " + r.alpha + ",\n    beta: " + r.beta + ",\n    gamma: " + r.gamma + "\n  }") : "no gyroscope";
        data = "deviceMotion: {\n" + ("  acceleration: " + acc + ",\n") + ("  accelerationIncludingGravity: " + accIG + ",\n") + ("  rotationRate: " + rr + ",\n") + ("  interval: " + event.interval + "\n") + "}";
        return $('#result-devicemotion .data').text(data);
      };
    }
    if (!found) {
      window.onMozOrientation = function(event) {
        var data;
        $('#result-MozOrientation').slideDown('fast');
        data = ("x: " + (event.x ? event.x : "null") + ",\n") + ("y: " + (event.y ? event.y : "null") + ",\n") + ("z: " + (event.z ? event.z : "null") + "\n");
        return $('#result-MozOrientation .data').text(data);
      };
      return $('.failure').slideDown('fast');
    }
  });
}).call(this);
