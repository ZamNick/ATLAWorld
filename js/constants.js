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
		},
		{
			"name": "AangBanishmentOnSouthPole",
			"markerType": "marker_water",
			"x": -190,
			"y": -736,
			"z": 10
		},
		{
			"name": "SouthAirTample",
			"markerType": "marker_air",
			"x": -262,
			"y": -442,
			"z": 10
		}
	],

	LABELS: {
		SETTINGS: {
			FONT: './fonts/CloisterBlack%20BT_Regular.json',
			SIZE: 24,
			HEIGHT: 1,
			CURVE_SEGMENTS: 20,
			COLOR: 0x707070
		},
		ARRAY: [
			{
				"TEXT": "South Pole",
				"X": -150,
				"Y": -850,
				"Z": 10
			},
			{
				"TEXT": "Earth Kingdom",
				"X": 0,
				"Y": 0,
				"Z": 10
			}
		]
	}
};