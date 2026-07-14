// Create the Cesium 3D viewer
const viewer = new Cesium.Viewer("cesiumContainer", {
  animation: false,
  timeline: false,
  geocoder: false,
  homeButton: true,
  sceneModePicker: false,
  navigationHelpButton: false,
  fullscreenButton: true,
  baseLayerPicker: true
});

// Initial camera position
viewer.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(
    0,
    15,
    25000000
  )
});

// Space background
viewer.scene.backgroundColor = Cesium.Color.BLACK;

// Enable Earth lighting
viewer.scene.globe.enableLighting = true;


// Draw LEO orbit
const leoOrbit = viewer.entities.add({
  name: "LEO Orbit",

  polyline: {
    positions: leoOrbitPositions,
    width: 8,
    material: Cesium.Color.CYAN,
    arcType: Cesium.ArcType.NONE
  }
});


// =====================================================
// LEO SATELLITE
// =====================================================

const satelliteLongitude = 30;
const satelliteLatitude = 0;

const leoSatellite = viewer.entities.add({
  name: "LEO Satellite",

  position: Cesium.Cartesian3.fromDegrees(
    satelliteLongitude,
    satelliteLatitude,
    LEO_ALTITUDE
  ),

  point: {
    pixelSize: 16,
    color: Cesium.Color.YELLOW,
    outlineColor: Cesium.Color.WHITE,
    outlineWidth: 3
  },

  label: {
    text: "LEO Satellite",
    font: "16px Arial",
    fillColor: Cesium.Color.WHITE,
    showBackground: true,
    backgroundColor: Cesium.Color.BLACK.withAlpha(0.7),
    pixelOffset: new Cesium.Cartesian2(0, -30)
  }
});


// Adjust camera to show the orbit
viewer.zoomTo(leoOrbit);
