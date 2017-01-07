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
		MARKER_WATER: 'img/water.png',
		MARKER_AIR: 'img/air.png',
		MARKER_EARTH: 'img/earth.png',
		MARKER_FIRE: 'img/fire.png'
	},

	MARKER: {
		HEIGHT: 30,
		WIDTH: 30,
		SEGMENTS: 32
	},

	SLICK: {
		CONTAINER: '.container',
		SETTINGS: {
			dots: true,
			arrows: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			speed: 300
		}
	},

	CLOUDS: [
		{
			NAME: "cloud",
			COUNT: 125,
			SEGMENTS: 32,
			Z_INDEX: 1000,
			Z_COEFFICIENT: 200
		},
		{
			NAME: "cloud_2",
			COUNT: 125,
			SEGMENTS: 32,
			Z_INDEX: 1500,
			Z_COEFFICIENT: 200
		},
		{
			NAME: "cloud_3",
			COUNT: 50,
			SEGMENTS: 32,
			Z_INDEX: 1200,
			Z_COEFFICIENT: 200
		},
		{
			NAME: "cloud_4",
			COUNT: 100,
			SEGMENTS: 32,
			Z_INDEX: 1300,
			Z_COEFFICIENT: 200
		}
	],

	LABELS: {
		SETTINGS: {
			FONT: './fonts/Coffee%20Mocha_Regular.json',
			SIZE: 40,
			HEIGHT: 1,
			CURVE_SEGMENTS: 20
		},
		ARRAY: [
			{
				TEXT: "South Pole",
				COLOR: 0x505050,
				X: -350,
				Y: -850,
				Z: 9
			},
			{
				TEXT: "North Pole",
				COLOR: 0x505050,
				X: -350,
				Y: 800,
				Z: 9
			},
			{
				TEXT: "Earth",
				COLOR: 0x9F9F9F,
				X: 300,
				Y: 300,
				Z: 9
			},
			{
				TEXT: "Kingdom",
				COLOR: 0x9F9F9F,
				X: 230,
				Y: 100,
				Z: 9
			},
			{
				TEXT: "Fire Nation",
				COLOR: 0xAFAFAF,
				X: -1000,
				Y: -70,
				Z: 9
			}
		]
	},

	MAP: {
		SETTINGS: {
			NAME: 'map',
			SEGMENTS: 32,
			BOUNDING_BOX: {
				X: 4000,
				Y: 2000,
				HALF_X: 2000,
				HALF_Y: 1000
			}
		},
		ARRAY: [
			{
				"NAME": "HakodaTribe",
				"MARKER": "water",
				"X": -147,
				"Y": -748,
				"Z": 10
			},
			{
				"NAME": "WarshipOnSouthPole",
				"MARKER": "water",
				"X": -215,
				"Y": -742,
				"Z": 10
			},
			{
				"NAME": "AangBanishmentOnSouthPole",
				"MARKER": "water",
				"X": -190,
				"Y": -736,
				"Z": 10
			},
			{
				"NAME": "SouthernAirTemple",
				"MARKER": "air",
				"X": -262,
				"Y": -442,
				"Z": 10
			},
			{
				"NAME": "KyoshiIsland",
				"MARKER": "earth",
				"X": 90,
				"Y": -300,
				"Z": 10
			},
			{
				"NAME": "Omashu",
				"MARKER": "earth",
				"X": 180,
				"Y": 5,
				"Z": 10
			},
			{
				"NAME": "HaruVillage",
				"MARKER": "earth",
				"X": 0,
				"Y": -4,
				"Z": 10
			},
			{
				"NAME": "FireNationPrisonRig",
				"MARKER": "fire",
				"X": 0,
				"Y": -30,
				"Z": 10
			},
			{
				"NAME": "HeiBeiForest",
				"MARKER": "earth",
				"X": -55,
				"Y": 75,
				"Z": 10
			}
		]
	}
};