// =====================================================
// NTN ORBIT SIMULATOR
// EARTH + LEO + MEO + GEO
// MOVING LEO SATELLITE
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
// 2. SPACE AND EARTH
// -----------------------------------------------------

viewer.scene.backgroundColor = Cesium.Color.BLACK;
viewer.scene.globe.enableLighting = true;


// =====================================================
// 3. ORBIT ALTITUDES
// =====================================================

// meters

const LEO_ALTITUDE = 2000000;   // 2,000 km
const MEO_ALTITUDE = 10000000;  // 10,000 km
const GEO_ALTITUDE = 35786000;  // 35,786 km


// =====================================================
// 4. FUNCTION TO CREATE AN ORBIT
// =====================================================

function createOrbit(name, altitude, color, width = 4) {

  const positions = [];

  for (
    let longitude = -180;
    longitude <= 180;
    longitude += 1
  ) {

    positions.push(
      Cesium.Cartesian3.fromDegrees(
        longitude,
        0,
        altitude
      )
    );

  }

  return viewer.entities.add({

    name: name,

    polyline: {

      positions: positions,

      width: width,

      material: color,

      arcType: Cesium.ArcType.NONE
    }

  });

}


// =====================================================
// 5. CREATE LEO, MEO AND GEO ORBITS
// =====================================================

const leoOrbit = createOrbit(
  "LEO Orbit",
  LEO_ALTITUDE,
  Cesium.Color.CYAN,
  5
);


const meoOrbit = createOrbit(
  "MEO Orbit",
  MEO_ALTITUDE,
  Cesium.Color.ORANGE,
  5
);


const geoOrbit = createOrbit(
  "GEO Orbit",
  GEO_ALTITUDE,
  Cesium.Color.LIME,
  5
);


// =====================================================
// 6. MOVING LEO SATELLITE
// =====================================================

let satelliteLongitude = -30;


// Movement speed
const SATELLITE_SPEED = 0.05;


// Previous animation time
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


// Create satellite
const leoSatellite = viewer.entities.add({

  name: "LEO Satellite",

  position: satellitePosition,


  point: {

    pixelSize: 25,

    color: Cesium.Color.YELLOW,

    outlineColor: Cesium.Color.RED,

    outlineWidth: 4,

    disableDepthTestDistance:
      Number.POSITIVE_INFINITY

  },


  label: {

    text: "LEO SATELLITE",

    font: "bold 18px Arial",

    fillColor: Cesium.Color.YELLOW,

    outlineColor: Cesium.Color.BLACK,

    outlineWidth: 3,

    style:
      Cesium.LabelStyle.FILL_AND_OUTLINE,

    showBackground: true,

    backgroundColor:
      Cesium.Color.BLACK.withAlpha(0.8),

    pixelOffset:
      new Cesium.Cartesian2(0, -45),

    horizontalOrigin:
      Cesium.HorizontalOrigin.CENTER,

    verticalOrigin:
      Cesium.VerticalOrigin.BOTTOM,

    disableDepthTestDistance:
      Number.POSITIVE_INFINITY

  }

});


// =====================================================
// 7. SATELLITE ANIMATION
// =====================================================

function animateSatellite(currentTime) {

  const deltaTime =
    currentTime - previousTime;

  previousTime = currentTime;


  satelliteLongitude +=
    SATELLITE_SPEED * deltaTime;


  if (satelliteLongitude > 180) {

    satelliteLongitude = -180;

  }


  requestAnimationFrame(
    animateSatellite
  );

}


// Start animation

requestAnimationFrame(
  animateSatellite
);


// =====================================================
// 8. CAMERA POSITION
// =====================================================

// Camera far enough to see GEO orbit

viewer.camera.setView({

  destination:
    Cesium.Cartesian3.fromDegrees(
      -20,
      20,
      90000000
    ),

  orientation: {

    heading:
      Cesium.Math.toRadians(0),

    pitch:
      Cesium.Math.toRadians(-90),

    roll: 0

  }

});
