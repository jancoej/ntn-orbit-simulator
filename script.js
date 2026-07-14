// =====================================================
// NTN ORBIT SIMULATOR
// STEP 3: EARTH + LEO ORBIT + SATELLITE
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
// 2. INITIAL CAMERA POSITION
// -----------------------------------------------------

viewer.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(
    0,          // Longitude
    15,         // Latitude
    25000000    // Camera altitude
  )
});


// -----------------------------------------------------
// 3. SPACE AND EARTH APPEARANCE
// -----------------------------------------------------

viewer.scene.backgroundColor = Cesium.Color.BLACK;

// Enable lighting on Earth
viewer.scene.globe.enableLighting = true;


// =====================================================
// 4. LEO ORBIT
// =====================================================

// For now we use 2,000 km altitude
// so the orbit is easy to see.
//
// Later we will change this to a more typical
// LEO altitude such as 550 km.

const LEO_ALTITUDE = 2000000; // meters

const leoOrbitPositions = [];


// Generate the complete circular orbit
for (let longitude = -180; longitude <= 180; longitude += 1) {

  const position = Cesium.Cartesian3.fromDegrees(
    longitude,
    0,
    LEO_ALTITUDE
  );

  leoOrbitPositions.push(position);
}


// Create the orbit line
const leoOrbit = viewer.entities.add({

  name: "LEO Orbit",

  polyline: {

    positions: leoOrbitPositions,

    width: 6,

    material: Cesium.Color.CYAN,

    arcType: Cesium.ArcType.NONE
  }
});


// =====================================================
// 5. LEO SATELLITE
// =====================================================

const SATELLITE_LONGITUDE = 30;
const SATELLITE_LATITUDE = 0;


// Create satellite
const leoSatellite = viewer.entities.add({

  name: "LEO Satellite",

  position: Cesium.Cartesian3.fromDegrees(
    SATELLITE_LONGITUDE,
    SATELLITE_LATITUDE,
    LEO_ALTITUDE
  ),


  // Satellite marker
  point: {

    pixelSize: 18,

    color: Cesium.Color.YELLOW,

    outlineColor: Cesium.Color.WHITE,

    outlineWidth: 3
  },


  // Satellite label
  label: {

    text: "LEO Satellite",

    font: "16px Arial",

    fillColor: Cesium.Color.WHITE,

    showBackground: true,

    backgroundColor:
      Cesium.Color.BLACK.withAlpha(0.7),

    pixelOffset:
      new Cesium.Cartesian2(0, -35),

    horizontalOrigin:
      Cesium.HorizontalOrigin.CENTER,

    verticalOrigin:
      Cesium.VerticalOrigin.BOTTOM
  }
});


// =====================================================
// 6. ADJUST CAMERA TO SHOW THE ORBIT
// =====================================================

viewer.zoomTo([
  leoOrbit,
  leoSatellite
]);
