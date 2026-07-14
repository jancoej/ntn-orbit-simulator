// =====================================================
// 5. LEO SATELLITE - HIGH VISIBILITY
// =====================================================

const SATELLITE_LONGITUDE = 0;
const SATELLITE_LATITUDE = 0;

const leoSatellite = viewer.entities.add({
  name: "LEO Satellite",

  position: Cesium.Cartesian3.fromDegrees(
    SATELLITE_LONGITUDE,
    SATELLITE_LATITUDE,
    LEO_ALTITUDE
  ),

  point: {
    pixelSize: 30,
    color: Cesium.Color.YELLOW,
    outlineColor: Cesium.Color.RED,
    outlineWidth: 5,

    // Force the point to remain visible
    disableDepthTestDistance: Number.POSITIVE_INFINITY
  },

  label: {
    text: "LEO SATELLITE",
    font: "bold 18px Arial",
    fillColor: Cesium.Color.YELLOW,

    showBackground: true,
    backgroundColor: Cesium.Color.BLACK.withAlpha(0.8),

    pixelOffset: new Cesium.Cartesian2(0, -45),

    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,

    // Force the label to remain visible
    disableDepthTestDistance: Number.POSITIVE_INFINITY
  }
});
