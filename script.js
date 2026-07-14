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


// =====================================================
// LEO ORBIT - TEST VISIBLE
// =====================================================

// Para la primera prueba usamos 2,000 km
// para confirmar claramente que la línea funciona.
const LEO_ALTITUDE = 2000000;

const leoOrbitPositions = [];

for (let longitude = -180; longitude <= 180; longitude += 1) {
  leoOrbitPositions.push(
    Cesium.Cartesian3.fromDegrees(
      longitude,
      0,
      LEO_ALTITUDE
    )
  );
}

const leoOrbit = viewer.entities.add({
  name: "LEO Orbit",

  polyline: {
    positions: leoOrbitPositions,
    width: 8,
    material: Cesium.Color.CYAN,
    arcType: Cesium.ArcType.NONE
  }
});

// Automatically adjust the camera to show the orbit
viewer.zoomTo(leoOrbit);
