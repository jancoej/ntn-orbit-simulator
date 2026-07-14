// =====================================================
// NTN ORBIT SIMULATOR
// EARTH + LEO + MEO + GEO
// THREE SATELLITES
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

// Altitudes in meters

const LEO_ALTITUDE = 2000000;   // 2,000 km
const MEO_ALTITUDE = 10000000;  // 10,000 km
const GEO_ALTITUDE = 35786000;  // 35,786 km


// =====================================================
// 4. CREATE ORBIT FUNCTION
// =====================================================

function createOrbit(
  name,
  altitude,
  color,
  width = 4
) {

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
// 5. CREATE THREE ORBITS
// =====================================================


// LEO
const leoOrbit = createOrbit(

  "LEO Orbit",

  LEO_ALTITUDE,

  Cesium.Color.CYAN,

  5

);


// MEO
const meoOrbit = createOrbit(

  "MEO Orbit",

  MEO_ALTITUDE,

  Cesium.Color.ORANGE,

  5

);


// GEO
const geoOrbit = createOrbit(

  "GEO Orbit",

  GEO_ALTITUDE,

  Cesium.Color.LIME,

  5

);


// =====================================================
// 6. SATELLITE POSITIONS
// =====================================================


// LEO satellite
let leoLongitude = -30;


// MEO satellite
let meoLongitude = 80;


// GEO satellite
const geoLongitude = 20;


// =====================================================
// 7. SATELLITE SPEEDS
// =====================================================


// LEO moves fastest
const LEO_SPEED = 0.05;


// MEO moves slower
const MEO_SPEED = 0.015;


// GEO remains fixed relative to Earth


// =====================================================
// 8. DYNAMIC LEO POSITION
// =====================================================

const leoPosition =

  new Cesium.CallbackPositionProperty(

    function () {

      return Cesium.Cartesian3.fromDegrees(

        leoLongitude,

        0,

        LEO_ALTITUDE

      );

    },

    false

  );


// =====================================================
// 9. DYNAMIC MEO POSITION
// =====================================================

const meoPosition =

  new Cesium.CallbackPositionProperty(

    function () {

      return Cesium.Cartesian3.fromDegrees(

        meoLongitude,

        0,

        MEO_ALTITUDE

      );

    },

    false

  );


// =====================================================
// 10. CREATE SATELLITE FUNCTION
// =====================================================

function createSatellite(

  name,

  position,

  color,

  labelColor

) {

  return viewer.entities.add({

    name: name,

    position: position,


    point: {

      pixelSize: 22,

      color: color,

      outlineColor: Cesium.Color.WHITE,

      outlineWidth: 3,

      disableDepthTestDistance:
        Number.POSITIVE_INFINITY

    },


    label: {

      text: name,

      font: "bold 17px Arial",

      fillColor: labelColor,

      outlineColor:
        Cesium.Color.BLACK,

      outlineWidth: 3,

      style:
        Cesium.LabelStyle.FILL_AND_OUTLINE,

      showBackground: true,

      backgroundColor:
        Cesium.Color.BLACK.withAlpha(0.8),

      pixelOffset:
        new Cesium.Cartesian2(
          0,
          -40
        ),

      horizontalOrigin:
        Cesium.HorizontalOrigin.CENTER,

      verticalOrigin:
        Cesium.VerticalOrigin.BOTTOM,

      disableDepthTestDistance:
        Number.POSITIVE_INFINITY

    }

  });

}


// =====================================================
// 11. CREATE LEO SATELLITE
// =====================================================

const leoSatellite = createSatellite(

  "LEO SATELLITE",

  leoPosition,

  Cesium.Color.YELLOW,

  Cesium.Color.CYAN

);


// =====================================================
// 12. CREATE MEO SATELLITE
// =====================================================

const meoSatellite = createSatellite(

  "MEO SATELLITE",

  meoPosition,

  Cesium.Color.ORANGE,

  Cesium.Color.ORANGE

);


// =====================================================
// 13. CREATE GEO SATELLITE
// =====================================================

const geoPosition =

  Cesium.Cartesian3.fromDegrees(

    geoLongitude,

    0,

    GEO_ALTITUDE

  );


const geoSatellite = createSatellite(

  "GEO SATELLITE",

  geoPosition,

  Cesium.Color.LIME,

  Cesium.Color.LIME

);


// =====================================================
// 14. ANIMATION
// =====================================================

let previousTime =
  performance.now();


function animateSatellites(
  currentTime
) {

  const deltaTime =

    currentTime -
    previousTime;


  previousTime =
    currentTime;


  // ------------------------
  // Move LEO
  // ------------------------

  leoLongitude +=

    LEO_SPEED *
    deltaTime;


  // ------------------------
  // Move MEO
  // ------------------------

  meoLongitude +=

    MEO_SPEED *
    deltaTime;


  // ------------------------
  // Longitude reset
  // ------------------------

  if (
    leoLongitude > 180
  ) {

    leoLongitude = -180;

  }


  if (
    meoLongitude > 180
  ) {

    meoLongitude = -180;

  }


  // Next frame

  requestAnimationFrame(
    animateSatellites
  );

}


// Start animation

requestAnimationFrame(
  animateSatellites
);


// =====================================================
// 15. CAMERA
// =====================================================

viewer.flyTo(

  [

    leoOrbit,

    meoOrbit,

    geoOrbit

  ],

  {

    duration: 3

  }

);
