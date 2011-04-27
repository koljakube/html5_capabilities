class CanvasController < Controller
  
  def canvas2d
  end
  
  def webgl
    @additional_head_data = <<EOF
<script id="shader-fs" type="x-shader/x-fragment">
#ifdef GL_ES
precision highp float;
#endif

varying vec4 vColor;

void main(void) {
  gl_FragColor = vColor;
}
</script>

<script id="shader-vs" type="x-shader/x-vertex">
attribute vec3 aVertexPosition;
attribute vec4 aVertexColor;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec4 vColor;

void main(void) {
  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
  vColor = aVertexColor;
}
</script>
EOF
  end
  
end