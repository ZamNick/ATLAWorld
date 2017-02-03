'use strict';

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

	LOADER: {
		SPINNER: {
			START: '.start-spinner',
			LOCATION: '.load-location-spinner',
			CONTEXT: '2d',
			RADIUS: 50,
			LOADED: {
				LINE_WIDTH: 5,
				STROKE_STYLE: 'lightblue',
				SHADOW_COLOR: 'white',
				SHADOW_BLUR: 20
			},
			UNLOADED: {
				LINE_WIDTH: 1,
				STROKE_STYLE: 'white'
			}
		}
	},

	LABEL_INFO: {
		CLASS: '.location-label-info',
		SLIDE_DOWN_DURATION: 500,
		FADE_OUT_DURATION: 250,
		DRAG_AREA: {
			CLASS: '.location-label-info-drag',
			TRANSITION_CLASS: 'location-label-info-drag-transition',
			FADE_IN_DURATION: 500,
			FADE_IN_DELAY: 300,
			MAX_TOP: 85,
			COMPRESS_COEFFICIENT: 10
		}
	},

	IMAGES: [
		'img/map.png',
		'img/cloud.png',
		'img/cloud_2.png',
		'img/cloud_3.png',
		'img/cloud_4.png',
		'img/water.png',
		'img/air.png',
		'img/earth.png',
		'img/fire.png',
		'/materials/AangBanishmentOnSouthPole/AangBanishmentOnSouthPole_1.jpg',
		'/materials/CrescentIsland/CrescentIsland_1.jpg',
		'/materials/FireNationPrisonRig/FireNationPrisonRig_1.jpg',
		'/materials/GaipanVillage/GaipanVillage_1.jpg',
		'/materials/HakodaTribe/HakodaTribe_1.jpg',
		'/materials/HarborTown/HarborTown_1.jpg',
		'/materials/KyoshiIsland/KyoshiIsland_1.jpg',
		'/materials/MiningVillage/MiningVillage_1.jpg',
		'/materials/Omashu/Omashu_1.jpg',
		'/materials/ScorchedForest/ScorchedForest_1.jpg',
		'/materials/SenlinVillage/SenlinVillage_1.jpg',
		'/materials/SouthernAirTemple/SouthernAirTemple_1.jpg',
		'/materials/TheGreatDivide/TheGreatDivide_1.jpg',
		'/materials/TradingVillage/TradingVillage_1.jpg',
		'/materials/TreetopHideout/TreetopHideout_1.jpg',
		'/materials/WarshipOnSouthPole/WarshipOnSouthPole_1.jpg',
		'/materials/WaterfallLagoon/WaterfallLagoon_1.jpg',
		'/materials/HerbalistInstitute/HerbalistInstitute_1.jpg',
		'/materials/PohuaiStronghold/PohuaiStronghold_1.jpg',
		'/materials/RuinsOfTaku/RuinsOfTaku_1.jpg',
		'/materials/MakapuVillage/MakapuVillage_1.jpg',
		'/materials/TheAbbey/TheAbbey_1.jpg',
		'/materials/FireNationColonialVillage/FireNationColonialVillage_1.jpg',
		"/materials/NorthernAirTemple/NorthernAirTemple_1.jpg",
		"/materials/NorthernWaterTribe/NorthernWaterTribe_1.jpg"
	],

	MARKER: {
		HEIGHT: 30,
		WIDTH: 30,
		SEGMENTS: 32
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
			HEIGHT: 1,
			CURVE_SEGMENTS: 20
		},
		ARRAY: [
			{
				TEXT: "South Pole",
				COLOR: 0x505050,
				SIZE: 40,
				LETTER_SPACE: 50,
				TYPE: 1,
				X: -350,
				Y: -850,
				Z: 9
			},
			{
				TEXT: "North Pole",
				COLOR: 0x505050,
				SIZE: 40,
				LETTER_SPACE: 50,
				TYPE: 1,
				X: -350,
				Y: 800,
				Z: 9
			},
			{
				TEXT: "Earth",
				COLOR: 0x9F9F9F,
				SIZE: 40,
				LETTER_SPACE: 50,
				TYPE: 1,
				X: 300,
				Y: 300,
				Z: 9
			},
			{
				TEXT: "Kingdom",
				COLOR: 0x9F9F9F,
				SIZE: 40,
				LETTER_SPACE: 50,
				TYPE: 1,
				X: 230,
				Y: 100,
				Z: 9
			},
			{
				TEXT: "Fire Nation",
				COLOR: 0xAFAFAF,
				SIZE: 40,
				LETTER_SPACE: 50,
				TYPE: 1,
				X: -1050,
				Y: -70,
				Z: 9
			},
			{
				TEXT: "Mo Ce Sea",
				COLOR: 0xAFAFAF,
				SIZE: 20,
				LETTER_SPACE: 32,
				TYPE: 2,
				X: -350,
				Y: 200,
				Z: 9
			},
			{
				TEXT: "Si Wong",
				COLOR: 0x9F9F9F,
				SIZE: 20,
				LETTER_SPACE: 25,
				TYPE: 2,
				X: 340,
				Y: 40,
				Z: 9
			},
			{
				TEXT: "Desert",
				COLOR: 0x9F9F9F,
				SIZE: 20,
				LETTER_SPACE: 25,
				TYPE: 2,
				X: 350,
				Y: -20,
				Z: 9
			},
			{
				TEXT: "Full Moon",
				COLOR: 0x9F9F9F,
				SIZE: 15,
				LETTER_SPACE: 20,
				TYPE: 2,
				X: 330,
				Y: 250,
				Z: 9
			},
			{
				TEXT: "Bay",
				COLOR: 0x9F9F9F,
				SIZE: 15,
				LETTER_SPACE: 20,
				TYPE: 2,
				X: 390,
				Y: 190,
				Z: 9
			},
			{
				TEXT: "Kolau",
				COLOR: 0x9F9F9F,
				SIZE: 15,
				LETTER_SPACE: 20,
				TYPE: 2,
				X: 150,
				Y: 20,
				Z: 9
			},
			{
				TEXT: "Mountains",
				COLOR: 0x9F9F9F,
				SIZE: 15,
				LETTER_SPACE: 20,
				TYPE: 2,
				X: 110,
				Y: -40,
				Z: 9
			},
			{
				TEXT: "Patola",
				COLOR: 0x0F0F0F,
				SIZE: 20,
				LETTER_SPACE: 25,
				TYPE: 2,
				X: -310,
				Y: -480,
				Z: 9
			},
			{
				TEXT: "Mountains",
				COLOR: 0x0F0F0F,
				SIZE: 20,
				LETTER_SPACE: 25,
				TYPE: 2,
				X: -355,
				Y: -540,
				Z: 9
			},
			{
				TEXT: "South Sea",
				COLOR: 0x9F9F9F,
				SIZE: 20,
				LETTER_SPACE: 25,
				TYPE: 2,
				X: -150,
				Y: -620,
				Z: 9
			},
			{
				TEXT: "Earth Kingdom",
				COLOR: 0x9F9F9F,
				SIZE: 20,
				LETTER_SPACE: 40,
				TYPE: 2,
				X: -500,
				Y: 500,
				Z: 9
			},
			{
				TEXT: "Forest",
				COLOR: 0x9F9F9F,
				SIZE: 20,
				LETTER_SPACE: 40,
				TYPE: 2,
				X: -370,
				Y: 420,
				Z: 9
			},
			{
				TEXT: "Jet",
				COLOR: 0x9F9F9F,
				SIZE: 15,
				LETTER_SPACE: 15,
				TYPE: 2,
				X: 125,
				Y: 150,
				Z: 9
			},
			{
				TEXT: "Forest",
				COLOR: 0x9F9F9F,
				SIZE: 15,
				LETTER_SPACE: 15,
				TYPE: 2,
				X: 100,
				Y: 120,
				Z: 9
			},
			{
				TEXT: "Wulong",
				COLOR: 0x9F9F9F,
				SIZE: 12,
				LETTER_SPACE: 15,
				TYPE: 2,
				X: -470,
				Y: 260,
				Z: 9
			},
			{
				TEXT: "Forest",
				COLOR: 0x9F9F9F,
				SIZE: 15,
				LETTER_SPACE: 15,
				TYPE: 2,
				X: -475,
				Y: 230,
				Z: 9
			}
		]
	},

	MAP: {
		SETTINGS: {
			NAME: 'map',
			SEGMENTS: 32,
			SIZE: {
				X: 3600,
				Y: 1844
			},
			BOUNDING_BOX: {
				X: 4000,
				Y: 2000,
				HALF_X: 2000,
				HALF_Y: 1000
			}
		},
		ARRAY: [
			{
				NAME: "HakodaTribe",
				MARKER: "water",
				X: -147,
				Y: -748,
				Z: 10
			},
			{
				NAME: "WarshipOnSouthPole",
				MARKER: "water",
				X: -215,
				Y: -742,
				Z: 10
			},
			{
				NAME: "AangBanishmentOnSouthPole",
				MARKER: "water",
				X: -190,
				Y: -736,
				Z: 10
			},
			{
				NAME: "SouthernAirTemple",
				MARKER: "air",
				X: -262,
				Y: -442,
				Z: 10
			},
			{
				NAME: "KyoshiIsland",
				MARKER: "earth",
				X: 90,
				Y: -300,
				Z: 10
			},
			{
				NAME: "Omashu",
				MARKER: "earth",
				X: 180,
				Y: 5,
				Z: 10
			},
			{
				NAME: "MiningVillage",
				MARKER: "earth",
				X: 0,
				Y: -4,
				Z: 10
			},
			{
				NAME: "FireNationPrisonRig",
				MARKER: "fire",
				X: 0,
				Y: -30,
				Z: 10
			},
			{
				NAME: "ScorchedForest",
				MARKER: "earth",
				X: -55,
				Y: 75,
				Z: 10
			},
			{
				NAME: "SenlinVillage",
				MARKER: "earth",
				X: -10,
				Y: 75,
				Z: 10
			},
			{
				NAME: "CrescentIsland",
				MARKER: "fire",
				X: -180,
				Y: 120,
				Z: 10
			},
			{
				NAME: "TradingVillage",
				MARKER: "earth",
				X: -30,
				Y: 185,
				Z: 10
			},
			{
				NAME: "WaterfallLagoon",
				MARKER: "earth",
				X: 0,
				Y: 185,
				Z: 10
			},
			{
				NAME: "TreetopHideout",
				MARKER: "earth",
				X: 240,
				Y: 137,
				Z: 10
			},
			{
				NAME: "GaipanVillage",
				MARKER: "earth",
				X: 205,
				Y: 135,
				Z: 10
			},
			{
				NAME: "TheGreatDivide",
				MARKER: "earth",
				X: 170,
				Y: 243,
				Z: 10
			},
			{
				NAME: "HarborTown",
				MARKER: "earth",
				X: -60,
				Y: 265,
				Z: 10
			},
			{
				NAME: "HerbalistInstitute",
				MARKER: "earth",
				X: -27,
				Y: 350,
				Z: 10
			},
			{
				NAME: "PohuaiStronghold",
				MARKER: "fire",
				X: -39,
				Y: 377,
				Z: 10
			},
			{
				NAME: "RuinsOfTaku",
				MARKER: "earth",
				X: -27,
				Y: 317,
				Z: 10
			},
			{
				NAME: "MakapuVillage",
				MARKER: "earth",
				X: -107,
				Y: 321,
				Z: 10
			},
			{
				NAME: "TheAbbey",
				MARKER: "earth",
				X: -225,
				Y: 385,
				Z: 10
			},
			{
				NAME: "FireNationColonialVillage",
				MARKER: "fire",
				X: -307,
				Y: 595,
				Z: 10
			},
			{
				NAME: "NorthernAirTemple",
				MARKER: "air",
				X: 210,
				Y: 670,
				Z: 10
			},
			{
				NAME: "NorthernWaterTribe",
				MARKER: "water",
				X: -45,
				Y: 760,
				Z: 10
			}
		]
	}
};