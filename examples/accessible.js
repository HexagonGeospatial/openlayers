import _ol_Map_ from '../src/ol/map';
import _ol_View_ from '../src/ol/view';
import _ol_control_ from '../src/ol/control';
import _ol_layer_Tile_ from '../src/ol/layer/tile';
import _ol_source_OSM_ from '../src/ol/source/osm';


var map = new _ol_Map_({
  layers: [
    new _ol_layer_Tile_({
      source: new _ol_source_OSM_()
    })
  ],
  target: 'map',
  controls: _ol_control_.defaults({
    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
      collapsible: false
    })
  }),
  view: new _ol_View_({
    center: [0, 0],
    zoom: 2
  })
});

document.getElementById('zoom-out').onclick = function() {
  var view = map.getView();
  var zoom = view.getZoom();
  view.setZoom(zoom - 1);
};

document.getElementById('zoom-in').onclick = function() {
  var view = map.getView();
  var zoom = view.getZoom();
  view.setZoom(zoom + 1);
};
