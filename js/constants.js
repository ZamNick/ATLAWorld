var CONSTANTS = {

	CAMERA: {
		FRUSTUM: 45,
		ASPECT_RATIO: window.innerWidth / window.innerHeight,
		NEAR: 1,
		FAR: 10000,
		START_Z_POSITION: 2200
	},

	SCALE: {
		MAX: 2200,
		MIN: 700
	},

	IMAGES: {
		MAP: 'img/map.png',
		CLOUD: 'img/cloud.png',
		CLOUD_2: 'img/cloud_2.png',
		CLOUD_3: 'img/cloud_3.png',
		CLOUD_4: 'img/cloud_4.png',
		MARKER_WATER: 'img/marker_water.png',
		MARKER_AIR: 'img/marker_air.png',
		MARKER_EARTH: 'img/marker_earth.png',
		MARKER_FIRE: 'img/marker_fire.png'
	},

	MAP: [
		{
			"name": "HakodaTribe",
			"markerType": "marker_water",
			"x": -147,
			"y": -748,
			"z": 10
		},
		{
			"name": "WarshipOnSouthPole",
			"markerType": "marker_water",
			"x": -215,
			"y": -742,
			"z": 10
		}
	]
};