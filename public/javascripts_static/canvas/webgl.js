(function() {
  /*
  Copyright 2010, Google Inc.
  All rights reserved.

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are
  met:

     * Redistributions of source code must retain the above copyright
  notice, this list of conditions and the following disclaimer.
     * Redistributions in binary form must reproduce the above
  copyright notice, this list of conditions and the following disclaimer
  in the documentation and/or other materials provided with the
  distribution.
     * Neither the name of Google Inc. nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
  "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
  A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
  OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
  SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
  DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
  THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
  OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  */
  /*
  @fileoverview This file contains functions every webgl program will need
  a version of one way or another.

  Instead of setting up a context manually it is recommended to
  use. This will check for success or failure. On failure it
  will attempt to present an approriate message to the user.

        gl = WebGLUtils.setupWebGL(canvas);

  For animated WebGL apps use of setTimeout or setInterval are
  discouraged. It is recommended you structure your rendering
  loop like this.

        function render() {
          window.requestAnimFrame(render, canvas);

          // do rendering
          ...
        }
        render();

  This will call your rendering function up to the refresh rate
  of your display but will stop rendering if your app is not
  visible.
  */  var WebGLUtils, animate, cubeVertexColorBuffer, cubeVertexIndexBuffer, cubeVertexPositionBuffer, degToRad, drawScene, getShader, gl, initBuffers, initGL, initShaders, lastTime, mvMatrix, mvMatrixStack, mvPopMatrix, mvPushMatrix, pMatrix, pyramidVertexColorBuffer, pyramidVertexPositionBuffer, rCube, rPyramid, setMatrixUniforms, shaderProgram, start, tick;
  WebGLUtils = (function() {
    /*
    Creates the HTML for a failure message
    @param {string} canvasContainerId id of container of th
           canvas.
    @return {string} The html.
    */    var GET_A_WEBGL_BROWSER, OTHER_PROBLEM, create3DContext, makeFailHTML, setupWebGL;
    makeFailHTML = function(msg) {
      return '' + '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' + '<td align="center">' + '<div style="display: table-cell; vertical-align: middle;">' + '<div style="">' + msg + '</div>' + '</div>' + '</td></tr></table>';
    };
    /*
    Mesasge for getting a webgl browser
    @type {string}
    */
    GET_A_WEBGL_BROWSER = '' + 'This page requires a browser that supports WebGL.<br/>' + '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';
    /*
    Mesasge for need better hardware
    @type {string}
    */
    OTHER_PROBLEM = '' + "It doesn't appear your computer can support WebGL.<br/>" + '<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>';
    /*
    Creates a webgl context. If creation fails it will
    change the contents of the container of the <canvas>
    tag to an error message with the correct links for WebGL.
    @param {Element} canvas. The canvas element to create a
        context from.
    @param {WebGLContextCreationAttirbutes} opt_attribs Any
        creation attributes you want to pass in.
    @param {function:(msg)} opt_onError An function to call
        if there is an error during creation.
    @return {WebGLRenderingContext} The created context.
    */
    setupWebGL = function(canvas, opt_attribs, opt_onError) {
      var context, handleCreationError;
      handleCreationError = function(msg) {
        var container, str;
        container = canvas.parentNode();
        if (container) {
          str = window.WebGLRenderingContext ? OTHER_PROBLEM : (GET_A_WEBGL_BROWSER, msg ? str += "<br/><br/>Status: " + msg : void 0);
          return container.innerHTML = makeFailHTML(str);
        }
      };
      opt_onError || (opt_onError = handleCreationError);
      if (canvas.addEventListener) {
        canvas.addEventListener("webglcontextcreationerror", function(event) {
          return opt_onError(event.statusMessage);
        }, false);
      }
      context = create3DContext(canvas, opt_attribs);
      if (!context) {
        if (!window.WebGLRenderingContext) {
          opt_onError("");
        }
      }
      return context;
    };
    /*
    Creates a webgl context.
    @param {!Canvas} canvas The canvas tag to get context
        from. If one is not passed in one will be created.
    @return {!WebGLContext} The created context.
    */
    create3DContext = function(canvas) {
      var context, name, names, _i, _len;
      names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
      context = null;
      for (_i = 0, _len = names.length; _i < _len; _i++) {
        name = names[_i];
        try {
          context = canvas.getContext(name);
        } catch (e) {
          alert(e);
        }
        if (context) {
          break;
        }
      }
      return context;
    };
    return {
      create3DContext: create3DContext,
      setupWebGL: setupWebGL
    };
  })();
  /*
  Provides requestAnimationFrame in a cross browser way.
  */
  window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback, element) {
      return window.setTimeout(callback, 1000 / 60);
    };
  })();
  gl = null;
  initGL = function(canvas) {
    try {
      gl = WebGLUtils.create3DContext(canvas);
      gl.viewportWidth = canvas.width;
      return gl.viewportHeight = canvas.height;
    } catch (e) {
      if (!gl) {
        return alert("Could not initialize WebGL, sorry :-(\n" + e);
      }
    }
  };
  getShader = function(gl, id) {
    var shader, shaderScript, str;
    shaderScript = document.getElementById(id);
    if (!shaderScript) {
      return null;
    }
    str = $(shaderScript).text();
    shader = null;
    if (shaderScript.type === "x-shader/x-fragment") {
      shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type === "x-shader/x-vertex") {
      shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
      return null;
    }
    gl.shaderSource(shader, str);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(shader));
      return null;
    }
    return shader;
  };
  shaderProgram = null;
  initShaders = function() {
    var fragmentShader, vertexShader;
    fragmentShader = getShader(gl, "shader-fs");
    vertexShader = getShader(gl, "shader-vs");
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert("Could not initialize shaders");
    }
    gl.useProgram(shaderProgram);
    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    return shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
  };
  mvMatrix = mat4.create();
  mvMatrixStack = [];
  pMatrix = mat4.create();
  mvPushMatrix = function() {
    var copy;
    copy = mat4.create();
    mat4.set(mvMatrix, copy);
    return mvMatrixStack.push(copy);
  };
  mvPopMatrix = function() {
    if (mvMatrixStack.length === 0) {
      throw "Invalid popMatrix!";
    }
    return mvMatrix = mvMatrixStack.pop();
  };
  setMatrixUniforms = function() {
    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
    return null;
  };
  degToRad = function(degrees) {
    return degrees * Math.PI / 180;
  };
  pyramidVertexPositionBuffer = null;
  pyramidVertexColorBuffer = null;
  cubeVertexPositionBuffer = null;
  cubeVertexColorBuffer = null;
  cubeVertexIndexBuffer = null;
  initBuffers = function() {
    var color, colors, cubeVertexIndices, i, unpackedColors, vertices, _i, _len;
    pyramidVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pyramidVertexPositionBuffer);
    vertices = [0.0, 1.0, 0.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 0.0, 1.0, 0.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 0.0, 1.0, 0.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 0.0, 1.0, 0.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    pyramidVertexPositionBuffer.itemSize = 3;
    pyramidVertexPositionBuffer.numItems = 12;
    pyramidVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pyramidVertexColorBuffer);
    colors = [1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    pyramidVertexColorBuffer.itemSize = 4;
    pyramidVertexColorBuffer.numItems = 12;
    cubeVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
    vertices = [-1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    cubeVertexPositionBuffer.itemSize = 3;
    cubeVertexPositionBuffer.numItems = 24;
    cubeVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer);
    colors = [[1.0, 0.0, 0.0, 1.0], [1.0, 1.0, 0.0, 1.0], [0.0, 1.0, 0.0, 1.0], [1.0, 0.5, 0.5, 1.0], [1.0, 0.0, 1.0, 1.0], [0.0, 0.0, 1.0, 1.0]];
    unpackedColors = [];
    for (_i = 0, _len = colors.length; _i < _len; _i++) {
      color = colors[_i];
      for (i = 0; i < 4; i++) {
        unpackedColors = unpackedColors.concat(color);
      }
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(unpackedColors), gl.STATIC_DRAW);
    cubeVertexColorBuffer.itemSize = 4;
    cubeVertexColorBuffer.numItems = 24;
    cubeVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
    cubeVertexIndices = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
    cubeVertexIndexBuffer.itemSize = 1;
    return cubeVertexIndexBuffer.numItems = 36;
  };
  rPyramid = 0;
  rCube = 0;
  drawScene = function() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, [-1.5, 0.0, -8.0]);
    mvPushMatrix();
    mat4.rotate(mvMatrix, degToRad(rPyramid), [0, 1, 0]);
    gl.bindBuffer(gl.ARRAY_BUFFER, pyramidVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, pyramidVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, pyramidVertexColorBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, pyramidVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLES, 0, pyramidVertexPositionBuffer.numItems);
    mvPopMatrix();
    mat4.translate(mvMatrix, [3.0, 0.0, 0.0]);
    mvPushMatrix();
    mat4.rotate(mvMatrix, degToRad(rCube), [1, 1, 1]);
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, cubeVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
    setMatrixUniforms();
    gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    return mvPopMatrix();
  };
  lastTime = 0;
  animate = function() {
    var elapsed, timeNow;
    timeNow = new Date().getTime();
    if (lastTime !== 0) {
      elapsed = timeNow - lastTime;
      rPyramid += (90 * elapsed) / 1000.0;
      rCube -= (75 * elapsed) / 1000.0;
    }
    return lastTime = timeNow;
  };
  tick = function() {
    requestAnimFrame(tick);
    drawScene();
    return animate();
  };
  start = function() {
    var canvas;
    canvas = $('#canvas')[0];
    canvas.width = 260;
    canvas.height = 260;
    initGL(canvas);
    initShaders();
    initBuffers();
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    return tick();
  };
  $(function() {
    return start();
  });
}).call(this);
