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
// LEO ORBIT
// =====================================================

const EARTH_RADIUS = 6371000; // meters
const LEO_ALTITUDE = 550000;  // 550 km

const leoOrbitPositions = [];

// Generate a complete circular orbit
for (let angle = 0; angle <= 360; angle += 2) {

  leoOrbitPositions.push(
    Cesium.Cartesian3.fromDegrees(
      angle,          // Longitude
      0,              // Latitude
      LEO_ALTITUDE    // Altitude above Earth
    )
  );

}

// Draw the LEO orbit
viewer.entities.add({

  name: "LEO Orbit",

  polyline: {
    positions: leoOrbitPositions,

    width: 3,

    material: Cesium.Color.CYAN,

    arcType: Cesium.ArcType.NONE
  }

});
