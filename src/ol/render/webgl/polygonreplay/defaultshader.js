// This file is automatically generated, do not edit
/* eslint openlayers-internal/no-missing-requires: 0 */
import _ol_ from '../../../index';
import _ol_webgl_Fragment_ from '../../../webgl/fragment';
import _ol_webgl_Vertex_ from '../../../webgl/vertex';
var _ol_render_webgl_polygonreplay_defaultshader_ = {};

/**
 * @constructor
 * @extends {ol.webgl.Fragment}
 * @struct
 */
_ol_render_webgl_polygonreplay_defaultshader_.Fragment = function() {
  _ol_webgl_Fragment_.call(this, _ol_render_webgl_polygonreplay_defaultshader_.Fragment.SOURCE);
};
_ol_.inherits(_ol_render_webgl_polygonreplay_defaultshader_.Fragment, _ol_webgl_Fragment_);


/**
 * @const
 * @type {string}
 */
_ol_render_webgl_polygonreplay_defaultshader_.Fragment.DEBUG_SOURCE = 'precision mediump float;\n\n\n\nuniform vec4 u_color;\nuniform float u_opacity;\n\nvoid main(void) {\n  gl_FragColor = u_color;\n  float alpha = u_color.a * u_opacity;\n  if (alpha == 0.0) {\n    discard;\n  }\n  gl_FragColor.a = alpha;\n}\n';


/**
 * @const
 * @type {string}
 */
_ol_render_webgl_polygonreplay_defaultshader_.Fragment.OPTIMIZED_SOURCE = 'precision mediump float;uniform vec4 e;uniform float f;void main(void){gl_FragColor=e;float alpha=e.a*f;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}';


/**
 * @const
 * @type {string}
 */
_ol_render_webgl_polygonreplay_defaultshader_.Fragment.SOURCE = _ol_.DEBUG_WEBGL ?
  _ol_render_webgl_polygonreplay_defaultshader_.Fragment.DEBUG_SOURCE :
  _ol_render_webgl_polygonreplay_defaultshader_.Fragment.OPTIMIZED_SOURCE;


_ol_render_webgl_polygonreplay_defaultshader_.fragment = new _ol_render_webgl_polygonreplay_defaultshader_.Fragment();


/**
 * @constructor
 * @extends {ol.webgl.Vertex}
 * @struct
 */
_ol_render_webgl_polygonreplay_defaultshader_.Vertex = function() {
  _ol_webgl_Vertex_.call(this, _ol_render_webgl_polygonreplay_defaultshader_.Vertex.SOURCE);
};
_ol_.inherits(_ol_render_webgl_polygonreplay_defaultshader_.Vertex, _ol_webgl_Vertex_);


/**
 * @const
 * @type {string}
 */
_ol_render_webgl_polygonreplay_defaultshader_.Vertex.DEBUG_SOURCE = '\n\nattribute vec2 a_position;\n\nuniform mat4 u_projectionMatrix;\nuniform mat4 u_offsetScaleMatrix;\nuniform mat4 u_offsetRotateMatrix;\n\nvoid main(void) {\n  gl_Position = u_projectionMatrix * vec4(a_position, 0.0, 1.0);\n}\n\n\n';


/**
 * @const
 * @type {string}
 */
_ol_render_webgl_polygonreplay_defaultshader_.Vertex.OPTIMIZED_SOURCE = 'attribute vec2 a;uniform mat4 b;uniform mat4 c;uniform mat4 d;void main(void){gl_Position=b*vec4(a,0.0,1.0);}';


/**
 * @const
 * @type {string}
 */
_ol_render_webgl_polygonreplay_defaultshader_.Vertex.SOURCE = _ol_.DEBUG_WEBGL ?
  _ol_render_webgl_polygonreplay_defaultshader_.Vertex.DEBUG_SOURCE :
  _ol_render_webgl_polygonreplay_defaultshader_.Vertex.OPTIMIZED_SOURCE;


_ol_render_webgl_polygonreplay_defaultshader_.vertex = new _ol_render_webgl_polygonreplay_defaultshader_.Vertex();


/**
 * @constructor
 * @param {WebGLRenderingContext} gl GL.
 * @param {WebGLProgram} program Program.
 * @struct
 */
_ol_render_webgl_polygonreplay_defaultshader_.Locations = function(gl, program) {

  /**
   * @type {WebGLUniformLocation}
   */
  this.u_color = gl.getUniformLocation(
      program, _ol_.DEBUG_WEBGL ? 'u_color' : 'e');

  /**
   * @type {WebGLUniformLocation}
   */
  this.u_offsetRotateMatrix = gl.getUniformLocation(
      program, _ol_.DEBUG_WEBGL ? 'u_offsetRotateMatrix' : 'd');

  /**
   * @type {WebGLUniformLocation}
   */
  this.u_offsetScaleMatrix = gl.getUniformLocation(
      program, _ol_.DEBUG_WEBGL ? 'u_offsetScaleMatrix' : 'c');

  /**
   * @type {WebGLUniformLocation}
   */
  this.u_opacity = gl.getUniformLocation(
      program, _ol_.DEBUG_WEBGL ? 'u_opacity' : 'f');

  /**
   * @type {WebGLUniformLocation}
   */
  this.u_projectionMatrix = gl.getUniformLocation(
      program, _ol_.DEBUG_WEBGL ? 'u_projectionMatrix' : 'b');

  /**
   * @type {number}
   */
  this.a_position = gl.getAttribLocation(
      program, _ol_.DEBUG_WEBGL ? 'a_position' : 'a');
};
export default _ol_render_webgl_polygonreplay_defaultshader_;
