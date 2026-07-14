// Create the Cesium 3D viewer
const viewer = new Cesium.Viewer("cesiumContainer", {

// Hide unnecessary controls for the moment
animation: false,
timeline: false,
geocoder: false,
homeButton: true,
sceneModePicker: false,
navigationHelpButton: false,
fullscreenButton: true,

// Basic globe
baseLayerPicker: true
});

// Set an initial camera position
viewer.camera.setView({
destination: Cesium.Cartesian3.fromDegrees(
0,          // Longitude
15,         // Latitude
25000000    // Camera altitude
)
});

// Improve the visual appearance of space
viewer.scene.backgroundColor = Cesium.Color.BLACK;

// Enable lighting on the globe
viewer.scene.globe.enableLighting = true;
