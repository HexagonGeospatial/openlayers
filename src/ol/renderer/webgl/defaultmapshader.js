// This file is automatically generated, do not edit
/* eslint openlayers-internal/no-missing-requires: 0 */
import _ol_ from '../../index';
import _ol_webgl_Fragment_ from '../../webgl/fragment';
import _ol_webgl_Vertex_ from '../../webgl/vertex';
var _ol_renderer_webgl_defaultmapshader_ = {};

/**
 * @constructor
 * @extends {ol.webgl.Fragment}
 * @struct
 */
_ol_renderer_webgl_defaultmapshader_.Fragment = function() {
  _ol_webgl_Fragment_.call(this, _ol_renderer_webgl_defaultmapshader_.Fragment.SOURCE);
};
_ol_.inherits(_ol_renderer_webgl_defaultmapshader_.Fragment, _ol_webgl_Fragment_);


/**
 * @const
 * @type {string}
 */
_ol_renderer_webgl_defaultmapshader_.Fragment.DEBUG_SOURCE = 'precision mediump float;\nvarying vec2 v_texCoord;\n\n\nuniform float u_opacity;\nuniform sampler2D u_texture;\n\nvoid main(void) {\n  vec4 texColor = texture2D(u_texture, v_texCoord);\n  gl_FragColor.rgb = texColor.rgb;\n  gl_FragColor.a = texColor.a * u_opacity;\n}\n';


/**
 * @const
 * @type {string}
 */
_ol_renderer_webgl_defaultmapshader_.Fragment.OPTIMIZED_SOURCE = 'precision mediump float;varying vec2 a;uniform float f;uniform sampler2D g;void main(void){vec4 texColor=texture2D(g,a);gl_FragColor.rgb=texColor.rgb;gl_FragColor.a=texColor.a*f;}';


/**
 * @const
 * @type {string}
 */
_ol_renderer_webgl_defaultmapshader_.Fragment.SOURCE = _ol_.DEBUG_WEBGL ?
  _ol_renderer_webgl_defaultmapshader_.Fragment.DEBUG_SOURCE :
  _ol_renderer_webgl_defaultmapshader_.Fragment.OPTIMIZED_SOURCE;


_ol_renderer_webgl_defaultmapshader_.fragment = new _ol_renderer_webgl_defaultmapshader_.Fragment();


/**
 * @constructor
 * @extends {ol.webgl.Vertex}
 * @struct
 */
_ol_renderer_webgl_defaultmapshader_.Vertex = function() {
  _ol_webgl_Vertex_.call(this, _ol_renderer_webgl_defaultmapshader_.Vertex.SOURCE);
};
_ol_.inherits(_ol_renderer_webgl_defaultmapshader_.Vertex, _ol_webgl_Vertex_);


/**
 * @const
 * @type {string}
 */
_ol_renderer_webgl_defaultmapshader_.Vertex.DEBUG_SOURCE = 'varying vec2 v_texCoord;\n\n\nattribute vec2 a_position;\nattribute vec2 a_texCoord;\n\nuniform mat4 u_texCoordMatrix;\nuniform mat4 u_projectionMatrix;\n\nvoid main(void) {\n  gl_Position = u_projectionMatrix * vec4(a_position, 0., 1.);\n  v_texCoord = (u_texCoordMatrix * vec4(a_texCoord, 0., 1.)).st;\n}\n\n\n';


/**
 * @const
 * @type {string}
 */
_ol_renderer_webgl_defaultmapshader_.Vertex.OPTIMIZED_SOURCE = 'varying vec2 a;attribute vec2 b;attribute vec2 c;uniform mat4 d;uniform mat4 e;void main(void){gl_Position=e*vec4(b,0.,1.);a=(d*vec4(c,0.,1.)).st;}';


/**
 * @const
 * @type {string}
 */
_ol_renderer_webgl_defaultmapshader_.Vertex.SOURCE = _ol_.DEBUG_WEBGL ?
  _ol_renderer_webgl_defaultmapshader_.Vertex.DEBUG_SOURCE :
  _ol_renderer_webgl_defaultmapshader_.Vertex.OPTIMIZED_SOURCE;


_ol_renderer_webgl_defaultmapshader_.vertex = new _ol_renderer_webgl_defaultmapshader_.Vertex();


/**
 * @constructor
 * @param {WebGLRenderingContext} gl GL.
 * @param {WebGLProgram} program Program.
 * @struct
 */
_ol_renderer_webgl_defaultmapshader_.Locations = function(gl, program) {

  /**
   * @type {WebGLUniformLocation}
   */
  this.u_opacity = gl.getUniformLocation(
      program, _ol_.DEBUG_WEBGL ? 'u_opacity' : 'f');

  /**
   * @type {WebGLUniformLocation}
   */
  this.u_projectionMatrix = gl.getUniformLocation(
      program, _ol_.DEBUG_WEBGL ? 'u_projectionMatrix' : 'e');

  /**
   * @type {WebGLUniformLocation}
   */
  this.u_texCoordMatrix = gl.getUniformLocation(
      program, _ol_.DEBUG_WEBGL ? 'u_texCoordMatrix' : 'd');

  /**
   * @type {WebGLUniformLocation}
   */
  this.u_texture = gl.getUniformLocation(
      program, _ol_.DEBUG_WEBGL ? 'u_texture' : 'g');

  /**
   * @type {number}
   */
  this.a_position = gl.getAttribLocation(
      program, _ol_.DEBUG_WEBGL ? 'a_position' : 'b');

  /**
   * @type {number}
   */
  this.a_texCoord = gl.getAttribLocation(
      program, _ol_.DEBUG_WEBGL ? 'a_texCoord' : 'c');
};
export default _ol_renderer_webgl_defaultmapshader_;
