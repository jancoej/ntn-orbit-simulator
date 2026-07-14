// =====================================================
// NTN ORBIT SIMULATOR
// EARTH + LEO ORBIT + VISIBLE SATELLITE
// =====================================================


// -----------------------------------------------------
// 1. CREATE CESIUM VIEWER
// -----------------------------------------------------

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


// -----------------------------------------------------
// 2. SPACE APPEARANCE
// -----------------------------------------------------

viewer.scene.backgroundColor = Cesium.Color.BLACK;
viewer.scene.globe.enableLighting = true;


// =====================================================
// 3. LEO ORBIT
// =====================================================

// Temporary altitude for better visualization.
// Later we will change it to 550 km.
const LEO_ALTITUDE = 2000000; // 2,000 km

const leoOrbitPositions = [];


// Create complete equatorial orbit
for (let longitude = -180; longitude <= 180; longitude += 1) {

  const position = Cesium.Cartesian3.fromDegrees(
    longitude,
    0,
    LEO_ALTITUDE
  );

  leoOrbitPositions.push(position);
}


// Draw LEO orbit
const leoOrbit = viewer.entities.add({

  name: "LEO Orbit",

  polyline: {
    positions: leoOrbitPositions,
    width: 5,
    material: Cesium.Color.CYAN,
    arcType: Cesium.ArcType.NONE
  }

});


// =====================================================
// 4. SATELLITE
// =====================================================

// Satellite position on the orbit
const SATELLITE_LONGITUDE = -30;
const SATELLITE_LATITUDE = 0;


// Create satellite marker
const leoSatellite = viewer.entities.add({

  name: "LEO Satellite",

  position: Cesium.Cartesian3.fromDegrees(
    SATELLITE_LONGITUDE,
    SATELLITE_LATITUDE,
    LEO_ALTITUDE
  ),

  point: {

    // Very large temporarily so we can clearly see it
    pixelSize: 35,

    color: Cesium.Color.YELLOW,

    outlineColor: Cesium.Color.RED,

    outlineWidth: 5,

    // Keep point visible
    disableDepthTestDistance: Number.POSITIVE_INFINITY
  },

  label: {

    text: "LEO SATELLITE",

    font: "bold 20px Arial",

    fillColor: Cesium.Color.YELLOW,

    outlineColor: Cesium.Color.BLACK,

    outlineWidth: 3,

    style: Cesium.LabelStyle.FILL_AND_OUTLINE,

    showBackground: true,

    backgroundColor: Cesium.Color.BLACK.withAlpha(0.8),

    pixelOffset: new Cesium.Cartesian2(0, -50),

    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,

    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,

    disableDepthTestDistance: Number.POSITIVE_INFINITY
  }

});


// =====================================================
// 5. CAMERA POSITION
// =====================================================

// Important:
// We do NOT use viewer.zoomTo() here because it was
// placing the camera almost directly above the pole.

viewer.camera.setView({

  destination: Cesium.Cartesian3.fromDegrees(
    -30,        // Longitude
    15,         // Latitude
    22000000    // Camera distance
  ),

  orientation: {

    heading: Cesium.Math.toRadians(0),

    pitch: Cesium.Math.toRadians(-90),

    roll: 0
  }

});
