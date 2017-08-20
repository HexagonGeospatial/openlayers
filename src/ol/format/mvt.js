//FIXME Implement projection handling

import _ol_ from '../index';
import _ol_ext_PBF_ from 'pbf';
import {VectorTile as _ol_ext_vectortile_VectorTile_} from '@mapbox/vector-tile';
import _ol_format_Feature_ from '../format/feature';
import _ol_format_FormatType_ from '../format/formattype';
import _ol_geom_GeometryLayout_ from '../geom/geometrylayout';
import _ol_geom_GeometryType_ from '../geom/geometrytype';
import _ol_geom_LineString_ from '../geom/linestring';
import _ol_geom_MultiLineString_ from '../geom/multilinestring';
import _ol_geom_MultiPoint_ from '../geom/multipoint';
import _ol_geom_Point_ from '../geom/point';
import _ol_geom_Polygon_ from '../geom/polygon';
import _ol_proj_Projection_ from '../proj/projection';
import _ol_proj_Units_ from '../proj/units';
import _ol_render_Feature_ from '../render/feature';

/**
 * @classdesc
 * Feature format for reading data in the Mapbox MVT format.
 *
 * @constructor
 * @extends {ol.format.Feature}
 * @param {olx.format.MVTOptions=} opt_options Options.
 * @api
 */
var _ol_format_MVT_ = function(opt_options) {

  _ol_format_Feature_.call(this);

  var options = opt_options ? opt_options : {};

  /**
   * @type {ol.proj.Projection}
   */
  this.defaultDataProjection = new _ol_proj_Projection_({
    code: '',
    units: _ol_proj_Units_.TILE_PIXELS
  });

  /**
   * @private
   * @type {function((ol.geom.Geometry|Object.<string,*>)=)|
   *     function(ol.geom.GeometryType,Array.<number>,
   *         (Array.<number>|Array.<Array.<number>>),Object.<string,*>,number)}
   */
  this.featureClass_ = options.featureClass ?
    options.featureClass : _ol_render_Feature_;

  /**
   * @private
   * @type {string|undefined}
   */
  this.geometryName_ = options.geometryName;

  /**
   * @private
   * @type {string}
   */
  this.layerName_ = options.layerName ? options.layerName : 'layer';

  /**
   * @private
   * @type {Array.<string>}
   */
  this.layers_ = options.layers ? options.layers : null;

  /**
   * @private
   * @type {ol.Extent}
   */
  this.extent_ = null;

};

_ol_.inherits(_ol_format_MVT_, _ol_format_Feature_);


/**
 * @inheritDoc
 * @api
 */
_ol_format_MVT_.prototype.getLastExtent = function() {
  return this.extent_;
};


/**
 * @inheritDoc
 */
_ol_format_MVT_.prototype.getType = function() {
  return _ol_format_FormatType_.ARRAY_BUFFER;
};


/**
 * @private
 * @param {Object} rawFeature Raw Mapbox feature.
 * @param {string} layer Layer.
 * @param {olx.format.ReadOptions=} opt_options Read options.
 * @return {ol.Feature} Feature.
 */
_ol_format_MVT_.prototype.readFeature_ = function(
    rawFeature, layer, opt_options) {
  var feature = new this.featureClass_();
  var id = rawFeature.id;
  var values = rawFeature.properties;
  values[this.layerName_] = layer;
  if (this.geometryName_) {
    feature.setGeometryName(this.geometryName_);
  }
  var geometry = _ol_format_Feature_.transformWithOptions(
      _ol_format_MVT_.readGeometry_(rawFeature), false,
      this.adaptOptions(opt_options));
  feature.setGeometry(geometry);
  feature.setId(id);
  feature.setProperties(values);
  return feature;
};


/**
 * @private
 * @param {Object} rawFeature Raw Mapbox feature.
 * @param {string} layer Layer.
 * @return {ol.render.Feature} Feature.
 */
_ol_format_MVT_.prototype.readRenderFeature_ = function(rawFeature, layer) {
  var coords = rawFeature.loadGeometry();
  var ends = [];
  var flatCoordinates = [];
  _ol_format_MVT_.calculateFlatCoordinates_(coords, flatCoordinates, ends);

  var type = rawFeature.type;
  /** @type {ol.geom.GeometryType} */
  var geometryType;
  if (type === 1) {
    geometryType = coords.length === 1 ?
      _ol_geom_GeometryType_.POINT : _ol_geom_GeometryType_.MULTI_POINT;
  } else if (type === 2) {
    if (coords.length === 1) {
      geometryType = _ol_geom_GeometryType_.LINE_STRING;
    } else {
      geometryType = _ol_geom_GeometryType_.MULTI_LINE_STRING;
    }
  } else if (type === 3) {
    geometryType = _ol_geom_GeometryType_.POLYGON;
  }

  var values = rawFeature.properties;
  values[this.layerName_] = layer;
  var id = rawFeature.id;

  return new this.featureClass_(geometryType, flatCoordinates, ends, values, id);
};


/**
 * @inheritDoc
 * @api
 */
_ol_format_MVT_.prototype.readFeatures = function(source, opt_options) {
  var layers = this.layers_;

  var pbf = new _ol_ext_PBF_(/** @type {ArrayBuffer} */ (source));
  var tile = new _ol_ext_vectortile_VectorTile_(pbf);
  var features = [];
  var featureClass = this.featureClass_;
  var layer, feature;
  for (var name in tile.layers) {
    if (layers && layers.indexOf(name) == -1) {
      continue;
    }
    layer = tile.layers[name];

    var rawFeature;
    for (var i = 0, ii = layer.length; i < ii; ++i) {
      rawFeature = layer.feature(i);
      if (featureClass === _ol_render_Feature_) {
        feature = this.readRenderFeature_(rawFeature, name);
      } else {
        feature = this.readFeature_(rawFeature, name, opt_options);
      }
      features.push(feature);
    }
    this.extent_ = layer ? [0, 0, layer.extent, layer.extent] : null;
  }

  return features;
};


/**
 * @inheritDoc
 * @api
 */
_ol_format_MVT_.prototype.readProjection = function(source) {
  return this.defaultDataProjection;
};


/**
 * Sets the layers that features will be read from.
 * @param {Array.<string>} layers Layers.
 * @api
 */
_ol_format_MVT_.prototype.setLayers = function(layers) {
  this.layers_ = layers;
};


/**
 * @private
 * @param {Object} coords Raw feature coordinates.
 * @param {Array.<number>} flatCoordinates Flat coordinates to be populated by
 *     this function.
 * @param {Array.<number>} ends Ends to be populated by this function.
 */
_ol_format_MVT_.calculateFlatCoordinates_ = function(
    coords, flatCoordinates, ends) {
  var end = 0;
  for (var i = 0, ii = coords.length; i < ii; ++i) {
    var line = coords[i];
    var j, jj;
    for (j = 0, jj = line.length; j < jj; ++j) {
      var coord = line[j];
      // Non-tilespace coords can be calculated here when a TileGrid and
      // TileCoord are known.
      flatCoordinates.push(coord.x, coord.y);
    }
    end += 2 * j;
    ends.push(end);
  }
};


/**
 * @private
 * @param {Object} rawFeature Raw Mapbox feature.
 * @return {ol.geom.Geometry} Geometry.
 */
_ol_format_MVT_.readGeometry_ = function(rawFeature) {
  var type = rawFeature.type;
  if (type === 0) {
    return null;
  }

  var coords = rawFeature.loadGeometry();
  var ends = [];
  var flatCoordinates = [];
  _ol_format_MVT_.calculateFlatCoordinates_(coords, flatCoordinates, ends);

  var geom;
  if (type === 1) {
    geom = coords.length === 1 ?
      new _ol_geom_Point_(null) : new _ol_geom_MultiPoint_(null);
  } else if (type === 2) {
    if (coords.length === 1) {
      geom = new _ol_geom_LineString_(null);
    } else {
      geom = new _ol_geom_MultiLineString_(null);
    }
  } else if (type === 3) {
    geom = new _ol_geom_Polygon_(null);
  }

  geom.setFlatCoordinates(_ol_geom_GeometryLayout_.XY, flatCoordinates,
      ends);

  return geom;
};


/**
 * Not implemented.
 * @override
 */
_ol_format_MVT_.prototype.readFeature = function() {};


/**
 * Not implemented.
 * @override
 */
_ol_format_MVT_.prototype.readGeometry = function() {};


/**
 * Not implemented.
 * @override
 */
_ol_format_MVT_.prototype.writeFeature = function() {};


/**
 * Not implemented.
 * @override
 */
_ol_format_MVT_.prototype.writeGeometry = function() {};


/**
 * Not implemented.
 * @override
 */
_ol_format_MVT_.prototype.writeFeatures = function() {};
export default _ol_format_MVT_;
