// =====================================================
// NTN ORBIT SIMULATOR
// EARTH + LEO ORBIT + MOVING SATELLITE
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
// 2. SPACE AND EARTH APPEARANCE
// -----------------------------------------------------

viewer.scene.backgroundColor = Cesium.Color.BLACK;
viewer.scene.globe.enableLighting = true;


// =====================================================
// 3. LEO ORBIT
// =====================================================

// Temporary altitude for visualization
const LEO_ALTITUDE = 2000000; // 2,000 km

const leoOrbitPositions = [];


// Create complete equatorial orbit
for (let longitude = -180; longitude <= 180; longitude += 1) {

  leoOrbitPositions.push(
    Cesium.Cartesian3.fromDegrees(
      longitude,
      0,
      LEO_ALTITUDE
    )
  );

}


// Draw orbit
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
// 4. MOVING SATELLITE
// =====================================================

// Initial satellite longitude
let satelliteLongitude = -30;


// Satellite speed
// Increase this value to make it move faster
const SATELLITE_SPEED = 0.05;


// Time of previous animation frame
let previousTime = performance.now();


// Dynamic position
const satellitePosition =
  new Cesium.CallbackPositionProperty(
    function () {

      return Cesium.Cartesian3.fromDegrees(
        satelliteLongitude,
        0,
        LEO_ALTITUDE
      );

    },
    false
  );


// Create moving satellite
const leoSatellite = viewer.entities.add({

  name: "LEO Satellite",

  position: satellitePosition,


  point: {

    pixelSize: 30,

    color: Cesium.Color.YELLOW,

    outlineColor: Cesium.Color.RED,

    outlineWidth: 5,

    disableDepthTestDistance:
      Number.POSITIVE_INFINITY
  },


  label: {

    text: "LEO SATELLITE",

    font: "bold 20px Arial",

    fillColor: Cesium.Color.YELLOW,

    outlineColor: Cesium.Color.BLACK,

    outlineWidth: 3,

    style:
      Cesium.LabelStyle.FILL_AND_OUTLINE,

    showBackground: true,

    backgroundColor:
      Cesium.Color.BLACK.withAlpha(0.8),

    pixelOffset:
      new Cesium.Cartesian2(0, -50),

    horizontalOrigin:
      Cesium.HorizontalOrigin.CENTER,

    verticalOrigin:
      Cesium.VerticalOrigin.BOTTOM,

    disableDepthTestDistance:
      Number.POSITIVE_INFINITY
  }

});


// =====================================================
// 5. SATELLITE ANIMATION
// =====================================================

function animateSatellite(currentTime) {

  // Calculate elapsed time
  const deltaTime =
    currentTime - previousTime;

  previousTime = currentTime;


  // Move satellite
  satelliteLongitude +=
    SATELLITE_SPEED * deltaTime;


  // Reset longitude after complete orbit
  if (satelliteLongitude > 180) {

    satelliteLongitude = -180;

  }


  // Request next animation frame
  requestAnimationFrame(
    animateSatellite
  );

}


// Start animation
requestAnimationFrame(
  animateSatellite
);


// =====================================================
// 6. CAMERA POSITION
// =====================================================

viewer.camera.setView({

  destination:
    Cesium.Cartesian3.fromDegrees(
      -30,
      15,
      22000000
    ),

  orientation: {

    heading:
      Cesium.Math.toRadians(0),

    pitch:
      Cesium.Math.toRadians(-90),

    roll: 0

  }

});
