const { combineStats, makeAuto } = require('../facilitators.js');
const { gunCalcNames, smshskl, base } = require('../constants.js');
const g = require('../gunvals.js');
const ensureIsClass = (Class, str) => {
    if ("object" == typeof str) {
        return str;
    }
    if (str in Class) {
        return Class[str];
    }
    throw Error(`Definition ${str} is attempted to be gotten but does not exist!`);
};
const eggnoughtBody = {
	SPEED: base.SPEED * 0.8,
	HEALTH: base.HEALTH * 1.75,
	SHIELD: base.SHIELD * 1.5,
	REGEN: base.REGEN * 1.5,
	FOV: base.FOV * 1.1,
	RESIST: base.RESIST * 1.5,
	DENSITY: base.DENSITY * 1.5,
};
const squarenoughtBody = {
	SPEED: base.SPEED * 0.675,
	HEALTH: base.HEALTH * 2.5,
	SHIELD: base.SHIELD * 2,
	REGEN: base.REGEN * 2,
	FOV: base.FOV * 1.15,
	RESIST: base.RESIST * 2,
	DENSITY: base.DENSITY * 2,
};
const trinoughtBody = {
	SPEED: base.SPEED * 0.55,
	HEALTH: base.HEALTH * 3.5,
	SHIELD: base.SHIELD * 2.5,
	REGEN: base.REGEN * 2.5,
	FOV: base.FOV * 1.15,
	RESIST: base.RESIST * 2.5,
	DENSITY: base.DENSITY * 2.5,
};
const pentanoughtBody = {
	SPEED: base.SPEED * 0.425,
	HEALTH: base.HEALTH * 4.25,
	SHIELD: base.SHIELD * 3,
	REGEN: base.REGEN * 3,
	FOV: base.FOV * 1.2,
	RESIST: base.RESIST * 3,
	DENSITY: base.DENSITY * 3,
};
const hexnoughtBody = {
	SPEED: base.SPEED * 0.3,
	HEALTH: base.HEALTH * 5,
	SHIELD: base.SHIELD * 3.5,
	REGEN: base.REGEN * 3.5,
	FOV: base.FOV * 1.2,
	RESIST: base.RESIST * 3.5,
	DENSITY: base.DENSITY * 3.5,
};

module.exports = ({ Class }) => {
	// Comment out the line below to enable this addon, uncomment it to disable this addon (WARNING: Increases load time by approximately 3x).
	//return console.log('--- Snowdreads addon [snowdreads.js] is disabled. ---');

	// Set the below variable to true to enable hex dreadnought building (WARNING: increases load time by approximately 10x)
	const buildHexnoughts = true;
	
	// Comment out lines from the arrays below to disable that branch of the tree from being generated.
	const eggnoughtWeapons = [
		// "swordSnowdread",
		// "pacifierSnowdread",
		"peacekeeperSnowdread",
		// "invaderSnowdread",
		// "centaurSnowdread",
	];
	const eggnoughtBodies = [
		"byteSnowdread", 
		"atmosphereSnowdread", 
		"juggernautSnowdread",
	];

	// Snowdread Building Functions --------------
	// Guns
	function addNormal({length = 18, width = 8, aspect = 1, x = 0, y = 0, angle = 0, delay = 0}, BASE = 6, stats = [g.basic]) {
		return [
			{ // Main barrel
				POSITION: [length, width, 1, x, y, angle, delay],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats(stats),
					TYPE: "bullet",
					COLOR: { BASE, BRIGHTNESS_SHIFT: -20, SATURATION_SHIFT: 0.5 }
				},
			},
			{
				POSITION: [length - 3, width * 0.85, 0.9, x, y, angle, delay],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([...stats, g.fake]),
					TYPE: "bullet",
					COLOR: { BASE, BRIGHTNESS_SHIFT: -27.5, SATURATION_SHIFT: 0.5 },
					BORDERLESS: true,
				},
			},
			{
				POSITION: [length - 3, width * 0.5, -0.7, 0, 0, angle, delay],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([...stats, g.fake]),
					TYPE: "bullet",
					COLOR: { BASE, BRIGHTNESS_SHIFT: -32.5, SATURATION_SHIFT: 0.5 },
					BORDERLESS: true,
				},
			},
			{
				POSITION: [1.5, width * 0.7, -0.6, length - 3.5, y, angle, delay],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([...stats, g.fake]),
					TYPE: "bullet",
					COLOR: { BASE, BRIGHTNESS_SHIFT: -10 },
				},
			},
		];
	}
	function addSpam({length = 18, width = 8, aspect = 1, x = 0, y = 0, angle = 0, delay = 0}, BASE = 6, stats = [g.basic]) {
		return [
			{ // Main barrel
				POSITION: [length, width, aspect, x, y, angle, delay],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats(stats),
					TYPE: "bullet",
					COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 15 }
				},
			},
			{
				POSITION: [length - 1.2, width, aspect * (length - 2) / length, x, y, angle, delay],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([...stats, g.fake]),
					TYPE: "bullet",
					COLOR: { BASE, BRIGHTNESS_SHIFT: -5, SATURATION_SHIFT: 0.5 }
				},
			},
			{
				POSITION: [length - 2, width - 1, aspect - 0.3, x, y, angle, delay],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([...stats, g.fake]),
					TYPE: "bullet",
					COLOR: { BASE, SATURATION_SHIFT: 0.5 },
					BORDERLESS: true,
				},
			},
		];
	}
	function addGunner({length = 18, width = 8, aspect = 1, x = 0, y = 0, angle = 0, delay = 0}, BASE = 6, stats = [g.basic]) {
		return [
			{ // Main barrel
				POSITION: [length, width, 1, x, y, angle, delay],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats(stats),
					TYPE: "bullet",
					COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 15 }
				},
			},
			{
				POSITION: [length, width * 0.8, -0.8, x, y, angle, delay],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([...stats, g.fake]),
					TYPE: "bullet",
					COLOR: { BASE, BRIGHTNESS_SHIFT: -5, SATURATION_SHIFT: 0.5 }
				},
			},
			{
				POSITION: [4, width * 1.3, 1, x, y, angle, 0],
				PROPERTIES: { COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 5 } },
			},
		];
	}
	function addHeavy({length = 18, width = 8, aspect = 1, x = 0, y = 0, angle = 0, delay = 0}, BASE = 6, stats = [g.basic]) {
		return [
			
		];
	}
	function addSniper({length = 18, width = 8, aspect = 1, x = 0, y = 0, angle = 0, delay = 0}, BASE = 6, stats = [g.basic]) {
		let output = [
			{ // Main barrel
				POSITION: [length, width, 1, x, y, angle, delay],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats(stats),
					TYPE: "bullet",
					COLOR: { BASE, BRIGHTNESS_SHIFT: -20, SATURATION_SHIFT: 0.5 }
				},
			},
			{
				POSITION: [length - 3.2, width * 0.8, -0.65, x, y, angle, delay],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([...stats, g.fake]),
					TYPE: "bullet",
					COLOR: { BASE, BRIGHTNESS_SHIFT: -10 },
					BORDERLESS: true,
				},
			},
			{
				POSITION: [length - 1.5, width * 0.6, -0.65, x, y, angle, delay],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([...stats, g.fake]),
					TYPE: "bullet",
					COLOR: { BASE, BRIGHTNESS_SHIFT: -25, SATURATION_SHIFT: 0.5 },
					BORDERLESS: true,
				},
			},
		];
		for (let i = 0; i < 2; i++) {
			output.push(
				{
					POSITION: [0.6, width * 0.7, -0.9, x + length - 2 - i * 2.5, y, angle, delay],
					PROPERTIES: {
						SHOOT_SETTINGS: combineStats([...stats, g.fake]),
						TYPE: "bullet",
						COLOR: { BASE, BRIGHTNESS_SHIFT: -32.5, SATURATION_SHIFT: 0.5 },
					},
				},
			)
		}
		return output;
	}
	function addAssassin({length = 18, width = 8, aspect = 1, x = 0, y = 0, angle = 0, delay = 0}, BASE = 6, stats = [g.basic]) {
		return [
			{
				POSITION: [(length - x) * 0.6, width, -1.6, x, y, angle, delay],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([...stats, g.fake]),
					TYPE: "bullet",
					COLOR: { BASE, BRIGHTNESS_SHIFT: -25, SATURATION_SHIFT: 0.5 },
				},
			},
			...addSniper({length, width, aspect, x: 0, y, angle, delay}, BASE, stats),
			{
				POSITION: [5, width, -1.6, x, y, angle, delay],
				PROPERTIES: {
					COLOR: { BASE, BRIGHTNESS_SHIFT: -20, SATURATION_SHIFT: 0.5 },
				},
			},
			{
				POSITION: [5, width - 1.5, -1.6, x - 1, y, angle, delay],
				PROPERTIES: {
					COLOR: { BASE, BRIGHTNESS_SHIFT: -15, SATURATION_SHIFT: 0.5 },
					BORDERLESS: true,
				},
			},
		];
	}
	function addRifle({length = 18, width = 8, aspect = 1, x = 0, y = 0, angle = 0, delay = 0}, BASE = 6, stats = [g.basic]) {
		return [

		];
	}
	function addRailgun({length = 18, width = 8, aspect = 1, x = 0, y = 0, angle = 0, delay = 0}, BASE = 6, stats = [g.basic]) {
		return [

		];
	}
	function addDrone({length = 18, width = 8, aspect = 1, x = 0, y = 0, angle = 0, delay = 0}, BASE = 6, stats = [g.basic]) {
		return [

		];
	}
	function addMinion({length = 18, width = 8, aspect = 1, x = 0, y = 0, angle = 0, delay = 0}, BASE = 6, stats = [g.basic]) {
		return [

		];
	}
	function addAutoDrone({length = 18, width = 8, aspect = 1, x = 0, y = 0, angle = 0, delay = 0}, BASE = 6, stats = [g.basic]) {
		return [

		];
	}
	function addSwarm({length = 18, width = 8, aspect = 1, x = 0, y = 0, angle = 0, delay = 0}, BASE = 6, stats = [g.basic]) {
		return [

		];
	}
	function addTrap({length = 18, width = 8, aspect = 1, x = 0, y = 0, angle = 0, delay = 0}, BASE = 6, stats = [g.basic]) {
		return [

		];
	}
	function addBox({length = 18, width = 8, aspect = 1, x = 0, y = 0, angle = 0, delay = 0}, BASE = 6, stats = [g.basic]) {
		return [

		];
	}
	function addThruster({length = 18, width = 8, aspect = 1, x = 0, y = 0, angle = 0, delay = 0}, BASE = 6, stats = [g.basic]) {
		return [

		];
	}

	// Deco bodies
	Class.baseEggOuter1 = {
		SHAPE: [
			[0.71, 0.71], [0.64, 0.77], [0.57, 0.82], [0.49, 0.87], [0.4, 0.91], [0.32, 0.95], 
			[0.23, 0.97], [0.14, 0.99], [0.05, 1], [-0.05, 1], [-0.14, 0.99], [-0.23, 0.97], 
			[-0.32, 0.95], [-0.4, 0.91], [-0.49, 0.87], [-0.57, 0.82], [-0.64, 0.77], [-0.71, 0.71], 
			[-0.6, 0.6], [-0.54, 0.65], [-0.48, 0.7], [-0.41, 0.74], [-0.34, 0.78], [-0.27, 0.81], 
			[-0.19, 0.83], [-0.12, 0.84], [-0.04, 0.85], [0.04, 0.85], [0.12, 0.84], [0.19, 0.83], 
			[0.27, 0.81], [0.34, 0.78], [0.41, 0.74], [0.48, 0.7], [0.54, 0.65], [0.6, 0.6]
		],
		COLOR: {
			BASE: 17,
			BRIGHTNESS_SHIFT: 10,
		},
		MIRROR_MASTER_ANGLE: true,
		GUNS: [ {
				POSITION: [4, 1.3, 0.001, 9, 0, 50, 0],
				PROPERTIES: {
					COLOR: { BASE: 6, BRIGHTNESS_SHIFT: -20 },
					DRAW_ABOVE: true,
				},
			}, {
				POSITION: [3.5, 1.7, 0.001, 9, 0, 90, 0],
				PROPERTIES: {
					COLOR: { BASE: 6, BRIGHTNESS_SHIFT: -20 },
					DRAW_ABOVE: true,
				},
			}, {
				POSITION: [4, 1.3, 0.001, 9, 0, 130, 0],
				PROPERTIES: {
					COLOR: { BASE: 6, BRIGHTNESS_SHIFT: -20 },
					DRAW_ABOVE: true,
				},
			}, {
				POSITION: [1.5, 1.3, 0, 7.5, 0, 50, 0],
				PROPERTIES: {
					COLOR: { BASE: 6, BRIGHTNESS_SHIFT: -20 },
					DRAW_ABOVE: true,
				},
			}, {
				POSITION: [1, 1.7, 0, 8, 0, 90, 0],
				PROPERTIES: {
					COLOR: { BASE: 6, BRIGHTNESS_SHIFT: -20 },
					DRAW_ABOVE: true,
				},
			}, {
				POSITION: [1.5, 1.3, 0, 7.5, 0, 130, 0],
				PROPERTIES: {
					COLOR: { BASE: 6, BRIGHTNESS_SHIFT: -20 },
					DRAW_ABOVE: true,
				},
			}, ]
	}
	Class.baseEggOuter2 = {
		SHAPE: [
			[0.79, 0.33], [0.77, 0.35], [0.76, 0.38], [0.75, 0.41], [0.73, 0.43], [0.72, 0.46], 
			[0.7, 0.48], [0.68, 0.51], [0.66, 0.53], [0.64, 0.56], [0.62, 0.58], [0.6, 0.6], 
			[0.54, 0.54], [0.56, 0.52], [0.58, 0.5], [0.6, 0.48], [0.62, 0.46], [0.63, 0.44], 
			[0.65, 0.42], [0.66, 0.39], [0.68, 0.37], [0.69, 0.34], [0.7, 0.32], [0.71, 0.29]
		],
		COLOR: {
			BASE: 17,
			BRIGHTNESS_SHIFT: 10,
		},
		MIRROR_MASTER_ANGLE: true,
	}
	Class.baseEggCross2 = {
		COLOR: 6,
		MIRROR_MASTER_ANGLE: true,
		SHAPE: [[0, 0]],
		GUNS: [],
	}
	for(let i = 0; i < 2; i++) {
		Class.baseEggCross2.GUNS.push(
			{
				POSITION: [10, 9, 0.6, 0, 0, 180*i+55, 0],
				PROPERTIES: {
					COLOR: { BASE: 6, BRIGHTNESS_SHIFT: -12.5, SATURATION_SHIFT: 0.85 },
					DRAW_ABOVE: true,
					BORDERLESS: true,
				}
			},
			{
				POSITION: [10, 9, 0.6, 0, 0, 180*i+125, 0],
				PROPERTIES: {
					COLOR: { BASE: 6, BRIGHTNESS_SHIFT: -12.5, SATURATION_SHIFT: 0.85 },
					DRAW_ABOVE: true,
					BORDERLESS: true,
				}
			},
		)
	}
	function addBaseEgg(type = 2) {
		switch (type) {
			case 2: // Normal
				return [
					{
						POSITION: [15, 0, 0, 0, 0, 1],
						TYPE: "baseEggCross2",
					},
					{
						POSITION: [20, 0, 0, 0, 0, 1],
						TYPE: "baseEggOuter2",
					},
					{
						POSITION: [20, 0, 0, 112.5, 0, 1],
						TYPE: "baseEggOuter2",
					},
					{
						POSITION: [20, 0, 0, 180, 0, 1],
						TYPE: "baseEggOuter2",
					},
					{
						POSITION: [20, 0, 0, 180+112.5, 0, 1],
						TYPE: "baseEggOuter2",
					},
					{
						POSITION: [20, 0, 0, 0, 0, 1],
						TYPE: "baseEggOuter1",
					},
					{
						POSITION: [20, 0, 0, 180, 0, 1],
						TYPE: "baseEggOuter1",
					},
				];
			case 1: // Thruster
				return [
					
				];
			case 0: // Smasher
				return [
					
				];
		}
	}

	// Auras
	Class.auraSmall = {
		PARENT: ["auraBase"],
		LAYER: 30,
		FACING_TYPE: "auraspin",
		LABEL: "Aura",
		COLOR: 0,
		BODY: {
			DAMAGE: 0.25,
		},
		BORDER_FIRST: true,
		SHAPE: "M 1 0 L 0.715 0.519 L 0.309 0.951 L -0.273 0.84 L -0.809 0.588 L -0.883 0 L -0.809 -0.588 L -0.273 -0.84 L 0.309 -0.951 L 0.715 -0.519 L 1 0" + 
			"L 0.309 0.951 L -0.809 0.588 L -0.809 -0.588 L 0.309 -0.951 L 1 0" + 
			"L 0 0 L 0.309 0.951 M 0 0 L -0.809 0.588 M 0 0 L -0.809 -0.588 M 0 0 L 0.309 -0.951",
	}
	Class.healAuraSmall = {
		PARENT: ["auraSmall"],
		LABEL: "Heal Aura",
		HEALER: true,
		COLOR: 12,
		BODY: {
			DAMAGE: 0.25/3,
		},
	}
	Class.auraMedium = {
		PARENT: ["auraBase"],
		LAYER: 30,
		FACING_TYPE: "auraspin",
		LABEL: "Aura",
		COLOR: 0,
		BODY: {
			DAMAGE: 0.25,
		},
		BORDER_FIRST: true,
		SHAPE: "M 1 0 L 0.809 0.588 L 1 0 L 0.809 0.588 L 0.309 0.951 L -0.309 0.951 L -0.809 0.588 L -1 0 L -0.809 -0.588 L -0.309 -0.951 L 0.309 -0.951 L 0.809 -0.588 L 1 0" + 
			"L 0.856 0.278 L 0.809 0.588 L 0.551 0.759 L 0.309 0.951 L 0 0.9 L -0.309 0.951 L -0.551 0.759 L -0.809 0.588 L -0.856 0.278 L -1 0 L -0.892 -0.29 L -0.809 -0.588 L -0.529 -0.728 L -0.309 -0.951 L 0 -0.938 L 0.309 -0.951 L 0.529 -0.728 L 0.809 -0.588 L 0.892 -0.29 L 1 0" + 
			"M 0.856 0.278 L 0.551 0.759 L 0 0.9 L -0.551 0.759 L -0.856 0.278 L -0.892 -0.29 L -0.529 -0.728 L 0 -0.938 L 0.529 -0.728 L 0.892 -0.29 L 0.856 0.278" + 
			"M 0.892 -0.29 L 0.546 -0.178 L 0.856 0.278 L 0.338 0.465 L 0.551 0.759 M 0.338 0.465 L 0 0.9 L -0.338 0.465 L -0.551 0.759 M -0.338 0.465 L -0.856 0.278 L -0.546 -0.178 L -0.892 -0.29 M -0.546 -0.178 L -0.529 -0.728 L 0 -0.575 L 0 -0.938 M 0 -0.575 L 0.529 -0.728 L 0.546 -0.178" + 
			"L 0.338 0.465 L 0 0 L 0.546 -0.178 L 0 -0.575 L 0 0 L -0.546 -0.178 L -0.338 0.465 L 0 0 M 0 -0.575 L -0.546 -0.178 M -0.338 0.465 L 0.338 0.465",
	}
	Class.healAuraMedium = {
		PARENT: ["auraMedium"],
		LABEL: "Heal Aura",
		HEALER: true,
		COLOR: 12,
		BODY: {
			DAMAGE: 0.25/3,
		},
	}
	Class.auraLarge = {
		PARENT: ["auraBase"],
		LAYER: 30,
		FACING_TYPE: "auraspin",
		LABEL: "Aura",
		COLOR: 0,
		BODY: {
			DAMAGE: 0.25,
		},
		BORDER_FIRST: true,
		SHAPE: "M 1 0 L 0.988 0.156 L 0.951 0.309 L 0.891 0.454 L 0.809 0.588 L 0.707 0.707 L 0.588 0.809 L 0.454 0.891 L 0.309 0.951 L 0.156 0.988 L 0 1 L -0.156 0.988 L -0.309 0.951 L -0.454 0.891 L -0.588 0.809 L -0.707 0.707 L -0.809 0.588 L -0.891 0.454 L -0.951 0.309 L -0.988 0.156 L -1 0 L -0.988 -0.156 L -0.951 -0.309 L -0.891 -0.454 L -0.809 -0.588 L -0.707 -0.707 L -0.588 -0.809 L -0.454 -0.891 L -0.309 -0.951 L -0.156 -0.988 L 0 -1 L 0.156 -0.988 L 0.309 -0.951 L 0.454 -0.891 L 0.588 -0.809 L 0.707 -0.707 L 0.809 -0.588 L 0.891 -0.454 L 0.951 -0.309 L 0.988 -0.156 L 1 0" + 
			"M 0.988 -0.156 L 0.988 0.156 L 0.891 0.454 L 0.707 0.707 L 0.454 0.891 L 0.156 0.988 L -0.156 0.988 L -0.454 0.891 L -0.707 0.707 L -0.891 0.454 L -0.988 0.156 L -0.988 -0.156 L -0.891 -0.454 L -0.707 -0.707 L -0.454 -0.891 L -0.156 -0.988 L 0.156 -0.988 L 0.454 -0.891 L 0.707 -0.707 L 0.891 -0.454 L 0.988 -0.156 L 0.949 0" + 
			"L 0.988 0.156 L 0.891 0.256 L 0.891 0.454 L 0.739 0.537 L 0.707 0.707 L 0.519 0.769 L 0.454 0.891 L 0.293 0.902 L 0.156 0.988 L 0.032 0.927 L -0.156 0.988 L -0.282 0.869 L -0.454 0.891 L -0.571 0.731 L -0.707 0.707 L -0.768 0.558 L -0.891 0.454 L -0.871 0.317 L -0.988 0.156 L -0.914 0 L -0.988 -0.156 L -0.871 -0.317 L -0.891 -0.454 L -0.768 -0.558 L -0.707 -0.707 L -0.571 -0.731 L -0.454 -0.891 L -0.282 -0.869 L -0.156 -0.988 L 0.032 -0.927 L 0.156 -0.988 L 0.293 -0.902 L 0.454 -0.891 L 0.519 -0.769 L 0.707 -0.707 L 0.739 -0.537 L 0.891 -0.454 L 0.891 -0.256 L 0.988 -0.156 L 0.949 0" + 
			"L 0.891 0.256 L 0.739 0.537 L 0.519 0.769 L 0.293 0.902 L 0.032 0.927 L -0.282 0.869 L -0.571 0.731 L -0.768 0.558 L -0.871 0.317 L -0.914 0 L -0.871 -0.317 L -0.768 -0.558 L -0.571 -0.731 L -0.282 -0.869 L 0.032 -0.927 L 0.293 -0.902 L 0.519 -0.769 L 0.739 -0.537 L 0.891 -0.256 L 0.949 0" + 
			"M 0.834 0 L 0.891 0.256 L 0.704 0.291 L 0.739 0.537 L 0.495 0.579 L 0.519 0.769 L 0.258 0.793 L 0.032 0.927 L -0.06 0.759 L -0.282 0.869 L -0.398 0.649 L -0.571 0.731 L -0.674 0.49 L -0.871 0.317 L -0.741 0.178 L -0.914 0 L -0.741 -0.178 L -0.871 -0.317 L -0.674 -0.49 L -0.571 -0.731 L -0.398 -0.649 L -0.282 -0.869 L -0.06 -0.759 L 0.032 -0.927 L 0.258 -0.793 L 0.519 -0.769 L 0.495 -0.579 L 0.739 -0.537 L 0.704 -0.291 L 0.891 -0.256 L 0.834 0" + 
			"L 0.704 0.291 L 0.495 0.579 L 0.258 0.793 L -0.06 0.759 L -0.398 0.649 L -0.674 0.49 L -0.741 0.178 L -0.741 -0.178 L -0.674 -0.49 L -0.398 -0.649 L -0.06 -0.759 L 0.258 -0.793 L 0.495 -0.579 L 0.704 -0.291 L 0.834 0" + 
			"M 0.592 0 L 0.704 0.291 L 0.413 0.3 L 0.495 0.579 L 0.183 0.563 L -0.06 0.759 L -0.158 0.485 L -0.398 0.649 L -0.479 0.348 L -0.741 0.178 L -0.51 0 L -0.741 -0.178 L -0.479 -0.348 L -0.398 -0.649 L -0.158 -0.485 L -0.06 -0.759 L 0.183 -0.563 L 0.495 -0.579 L 0.413 -0.3 L 0.704 -0.291 L 0.592 0" + 
			"L 0.413 0.3 L 0.183 0.563 L -0.158 0.485 L -0.479 0.348 L -0.51 0 L -0.479 -0.348 L -0.158 -0.485 L 0.183 -0.563 L 0.413 -0.3 L 0.592 0" + 
			"M 0.292 0 L 0.413 0.3 L 0.09 0.277 L -0.158 0.485 L -0.236 0.171 L -0.51 0 L -0.236 -0.171 L -0.158 -0.485 L 0.09 -0.277 L 0.413 -0.3 L 0.292 0 L 0.09 0.277" + 
			"L -0.236 0.171 L -0.236 -0.171 L 0.09 -0.277 L 0.292 0 M 0 0 L 0.949 0" + 
			"M 0 0 L 0.293 0.902 M 0 0 L -0.768 0.558 M 0 0 L -0.768 -0.558 M 0 0 L 0.293 -0.902",
	}
	Class.healAuraLarge = {
		PARENT: ["auraLarge"],
		LABEL: "Heal Aura",
		HEALER: true,
		COLOR: 12,
		BODY: {
			DAMAGE: 0.25/3,
		},
	}
	Class.auraSymbolSnowdreads = {
		PARENT: ["genericTank"],
		CONTROLLERS: [["spin", { speed: -0.04 }]],
		INDEPENDENT: true,
		COLOR: 0,
		BORDER_FIRST: true,
		SHAPE: "M 1 0 L 0.797 0.46 L 0.52 0.3 L 0.52, -0.3 L 0.797, -0.46 " + 
			"M 0.797 0.46 L 0.5 0.866 L 0 0.92 L 0 0.6 L 0.52 0.3 L 0.797 0.46 " + 
			"M -0.797 0.46 L -0.5 0.866 L 0 0.92 L 0 0.6 L -0.52 0.3 L -0.797 0.46 " + 
			"M -1 0 L -0.797 0.46 L -0.52 0.3 L -0.52, -0.3 L -0.797, -0.46 L -1 0 " + 
			"M -0.797 -0.46 L -0.5 -0.866 L 0 -0.92 L 0 -0.6 L -0.52 -0.3 L -0.797 -0.46 " + 
			"M 0.797 -0.46 L 0.5 -0.866 L 0 -0.92 L 0 -0.6 L 0.52 -0.3 L 0.797 -0.46 L 1 0",
	};
	function addAura(damageFactor = 1, sizeFactor = 1, opacity = 0.3, auraColor, auraSize = "Medium") {
		let isHeal = damageFactor < 0;
		let auraType = isHeal ? "healAura" + auraSize : "aura" + auraSize;
		let symbolType = isHeal ? "healerSymbol" : "auraSymbolSnowdreads";
		auraColor = auraColor ?? (isHeal ? 12 : 0);
		return {
			PARENT: ["genericTank"],
			INDEPENDENT: true,
			LABEL: "",
			COLOR: 17,
			GUNS: [
				{
					POSITION: [0, 20, 1, 0, 0, 0, 0,],
					PROPERTIES: {
						SHOOT_SETTINGS: combineStats([g.aura, { size: sizeFactor, damage: damageFactor }]),
						TYPE: [auraType, {COLOR: auraColor, ALPHA: opacity}],
						MAX_CHILDREN: 1,
						AUTOFIRE: true,
						SYNCS_SKILLS: true,
					}, 
				}, 
			],
			TURRETS: [
				{
					POSITION: [10 * !isHeal, 0, 0, 0, 0, 1],
					TYPE: ["egg", {COLOR: auraColor}],
				},
				{
					POSITION: [20 - 5 * isHeal, 0, 0, 0, 360, 1],
					TYPE: [symbolType, {COLOR: auraColor, INDEPENDENT: true}],
				},
			]
		};
	}

	// Misc
	Class.genericDreadnoughtSnowdread = {
		PARENT: ["genericTank"],
		SKILL_CAP: Array(10).fill(smshskl),
		REROOT_UPGRADE_TREE: "dreadSnowdread",
	}
	Class.genericEggnought = {
		PARENT: ["genericDreadnoughtSnowdread"],
		BODY: eggnoughtBody,
	    SHAPE: 0,
	    COLOR: 6,
	    SIZE: 13.75,
		DANGER: 8,
	}
	Class.genericSquarenought = {
		PARENT: ["genericDreadnoughtSnowdread"],
		BODY: squarenoughtBody,
	    SHAPE: 4,
	    COLOR: 13,
	    SIZE: 15,
		DANGER: 9,
	}
	Class.genericTrinought = {
		PARENT: ["genericDreadnoughtSnowdread"],
		BODY: trinoughtBody,
	    SHAPE: 3.5,
	    COLOR: 2,
	    SIZE: 20,
		DANGER: 10,
	}
	Class.genericPentanought = {
		PARENT: ["genericDreadnoughtSnowdread"],
		BODY: pentanoughtBody,
	    SHAPE: 5.5,
	    COLOR: 14,
	    SIZE: 25,
		DANGER: 11,
	}
	Class.genericHexnought = {
		PARENT: ["genericDreadnoughtSnowdread"],
		BODY: hexnoughtBody,
	    SHAPE: 6,
	    COLOR: 0,
	    SIZE: 30,
		DANGER: 12,
	}

	Class.spamAutoTurret = {
		PARENT: ["autoTankGun"],
		INDEPENDENT: true,
		GUNS: [
			{
				POSITION: [21, 10, 1, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.auto]),
					TYPE: "bullet",
				},
			},
		],
	}
	Class.mediumAutoSnowdread = {
		PARENT: ["autoTankGun"],
		INDEPENDENT: true,
		COLOR: {
			BASE: 6,
			BRIGHTNESS_SHIFT: -20,
			SATURATION_SHIFT: 0.5,
		},
		GUNS: [
			{
				POSITION: [18, 12, 1, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.fake]),
					TYPE: "bullet",
					COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 5 },
				},
			},
			{ // Main gun
				POSITION: [22, 10, 1, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto]),
					TYPE: "bullet",
					COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -20, SATURATION_SHIFT: 0.5 },
				},
			},
			{
				POSITION: [18.5, 6.5, 1, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.fake]),
					TYPE: "bullet",
					COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -10, SATURATION_SHIFT: 0.5 },
					BORDERLESS: true,
				},
			},
			{
				POSITION: [14.5, 2, 1, 0, 5, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.fake]),
					TYPE: "bullet",
					COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 15 },
				},
			},
			{
				POSITION: [14.5, 2, 1, 0, -5, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.fake]),
					TYPE: "bullet",
					COLOR: { BASE: 17, BRIGHTNESS_SHIFT: 15 },
				},
			},
		],
		TURRETS: [
			{
				POSITION: [14.5, 0, 0, 0, 0, 1],
				TYPE: ["egg", { COLOR: { BASE: -1, BRIGHTNESS_SHIFT: -20, SATURATION_SHIFT: 0.5 } }],
			},
			{
				POSITION: [8, 0, 0, 0, 0, 1],
				TYPE: ["egg", { COLOR: { BASE: -1 } }]
			},
		]
	}
	for(let i = 0; i < 4; i++) {
		Class.mediumAutoSnowdread.GUNS.push(
			{
				POSITION: [10, 6, 0.5, 0, 0, 90*i+45, 0],
				PROPERTIES: { 
					COLOR: 17,
					DRAW_ABOVE: true,
				}
			}
		)
	}
	Class.supermissile = {
		PARENT: ["bullet"],
		LABEL: "Missile",
		INDEPENDENT: true,
		BODY: {
			RANGE: 120,
		},
		GUNS: [
			{
				POSITION: [14, 6, 1, 0, -2, 130, 0],
				PROPERTIES: {
					AUTOFIRE: true,
					SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
					TYPE: ["bullet", {PERSISTS_AFTER_DEATH: true}],
					STAT_CALCULATOR: gunCalcNames.thruster,
				},
			},
			{
				POSITION: [14, 6, 1, 0, 2, 230, 0],
				PROPERTIES: {
					AUTOFIRE: true,
					SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
					TYPE: ["bullet", {PERSISTS_AFTER_DEATH: true}],
					STAT_CALCULATOR: gunCalcNames.thruster,
				},
			},
			{
				POSITION: [14, 6, 1, 0, 0, 0, 0.2],
				PROPERTIES: {
					AUTOFIRE: true,
					SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.morespeed, g.morespeed]),
					TYPE: ["bullet", {PERSISTS_AFTER_DEATH: true}],
				},
			},
		],
	};
	Class.betadrone = {
		PARENT: ["drone"],
		TURRETS: [
			{
				POSITION: [10, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {COLOR: -1}],
			},
		]
	}

	// T0
	Class.dreadSnowdread = {
		PARENT: ["genericEggnought"],
	    LABEL: "Dreadnought",
		LEVEL: 90,
		EXTRA_SKILL: 18,
	}

	// T1 Weapons
	Class.swordSnowdread = {
	    PARENT: ["genericEggnought"],
	    LABEL: "Sword",
	    GUNS: [],
		TURRETS: [...addBaseEgg()],
	}
	for (let i = 0; i < 2; i++) {
		Class.swordSnowdread.GUNS.push(
			...addSniper({length: 20, width: 7, angle: 180 * i}, 6, [g.basic, g.sniper, g.assass, {reload: 0.85}])
		)
	}
	Class.pacifierSnowdread = {
	    PARENT: ["genericEggnought"],
	    LABEL: "Pacifier",
	    GUNS: [],
		TURRETS: [...addBaseEgg()],
	}
	for (let i = 0; i < 2; i++) {
		Class.pacifierSnowdread.GUNS.push(
			...addNormal({length: 15, width: 7.5, angle: 180 * i}, 6, [g.basic, {reload: 0.8}])
		)
	}
	Class.peacekeeperSnowdread = {
	    PARENT: ["genericEggnought"],
	    LABEL: "Peacekeeper",
	    GUNS: [],
	}
	for (let i = 0; i < 2; i++) {
		Class.peacekeeperSnowdread.GUNS.push(
			{
				POSITION: [17, 9, 1, 0, 0, 180*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, {reload: 1.2, damage: 1.5}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.invaderSnowdread = {
	    PARENT: ["genericEggnought"],
	    LABEL: "Invader",
	    GUNS: [],
	}
	for (let i = 0; i < 2; i++) {
		Class.invaderSnowdread.GUNS.push(
			{
				POSITION: [5, 9.5, 1.2, 8, 0, 180*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.over, {reload: 0.85}]),
					TYPE: "drone",
					MAX_CHILDREN: 4,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
				},
			},
		)
	}
	Class.centaurSnowdread = {
	    PARENT: ["genericEggnought"],
	    LABEL: "Centaur",
	    GUNS: [],
	}
	for (let i = 0; i < 2; i++) {
		Class.centaurSnowdread.GUNS.push(
			{
				POSITION: [13, 7.5, 1, 0, 0, 180*i, 0],
			},
			{
				POSITION: [3, 7.5, 1.4, 13, 0, 180*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, {health: 2}]),
					TYPE: "trap",
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
		)
	}

	// T1 Bodies
	Class.byteSnowdread = {
	    PARENT: ["genericEggnought"],
		LABEL: "Byte",
	    TURRETS: [
			{
				POSITION: [15.5, 0, 0, 0, 0, 1],
				TYPE: 'egg',
			},
			{
				POSITION: [10, 0, 0, 0, 360, 1],
				TYPE: 'mediumAutoSnowdread',
			}
		],
	}
	Class.atmosphereAuraSnowdread = addAura();
	Class.atmosphereSnowdread = {
	    PARENT: ["genericEggnought"],
	    LABEL: "Atmosphere",
	    TURRETS: [
			{
				POSITION: [14, 0, 0, 0, 0, 1],
				TYPE: 'egg',
			},
			{
				POSITION: [11, 0, 0, 0, 360, 1],
				TYPE: 'atmosphereAuraSnowdread',
			},
		],
	}
	Class.juggernautSnowdread = {
	    PARENT: ["genericEggnought"],
	    LABEL: "Juggernaut",
		BODY: {
			HEALTH: 1.6,
			SHIELD: 1.6,
			REGEN: 1.5,
			SPEED: 0.8,
		},
	    TURRETS: [
			{
				POSITION: [15, 0, 0, 0, 0, 1],
				TYPE: 'egg',
			},
			{
				POSITION: [24, 0, 0, 0, 0, 0],
				TYPE: ['egg', {COLOR: 9}]
			},
		],
	}

	// T2 Weapons
	Class.sabreSnowdread = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Sabre",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.sabreSnowdread.GUNS.push(
			...addAssassin({length: 24, width: 7, x: 7, angle: 90*i}, 13, [g.basic, g.sniper, g.assass, g.assass, {reload: 0.85}])
		)
	}
	Class.gladiusSnowdread = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Gladius",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.gladiusSnowdread.GUNS.push(
			{
				POSITION: [17, 8, 1, 0, 0, 90*i, 0],
			},
			{
				POSITION: [19.5, 5, 1, 0, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, {health: 1.3}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.mediatorSnowdread = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Mediator",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.mediatorSnowdread.GUNS.push(
			{
				POSITION: [15, 7, 1, 0, 4.25, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.twin, {reload: 0.85}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [15, 7, 1, 0, -4.25, 90*i, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.twin, {reload: 0.85}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.negotiatorSnowdread = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Negotiator",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.negotiatorSnowdread.GUNS.push(
			{
				POSITION: [9, 8, 1.4, 6, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, {size: 0.8, health: 1.3}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.enforcerSnowdread = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Enforcer",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.enforcerSnowdread.GUNS.push(
			{
				POSITION: [17, 9, 1, 0, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.pound, {reload: 0.9}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.executorSnowdread = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Executor",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.executorSnowdread.GUNS.push(
			{
				POSITION: [11, 6, 1, 8, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.halfspeed, {reload: 0.8}]),
					TYPE: "missile",
					STAT_CALCULATOR: gunCalcNames.sustained,
				},
			},
			{
				POSITION: [17, 9, 1, 0, 0, 90*i, 0],	
			},
		)
	}
	Class.inquisitorSnowdread = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Inquisitor",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.inquisitorSnowdread.GUNS.push(
			{
				POSITION: [5, 11, 1.1, 8, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.over, g.over, {size: 1.5, reload: 0.6}]),
					TYPE: "drone",
					MAX_CHILDREN: 3,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
				},
			},
		)
	}
	Class.assailantMinionSnowdread = {
		PARENT: ["minion"],
		BODY: {
			SPEED: 0.5,
		},
		SHAPE: 4,
	    COLOR: 13,
		GUNS: []
	}
	for (let i = 0; i < 4; i++) {
		Class.assailantMinionSnowdread.GUNS.push(
			{
				POSITION: [15, 7.5, 1, 0, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.assass, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
		)
	}
	Class.assailantSnowdread = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Assailant",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.assailantSnowdread.GUNS.push(
			{
				POSITION: [5, 11, 1, 10.5, 0, 90*i, 0],
			},
			{
				POSITION: [1.5, 12, 1, 15.5, 0, 90*i, 0],
				PROPERTIES: {
					MAX_CHILDREN: 4,
					SHOOT_SETTINGS: combineStats([g.factory, {size: 0.9, reload: 0.5}]),
					TYPE: "assailantMinionSnowdread",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					MAX_CHILDREN: 2,
				},
			},
			{
				POSITION: [12.2, 12, 1, 0, 0, 90*i, 0],
			},
		)
	}
	Class.daemonSnowdread = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Daemon",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.daemonSnowdread.GUNS.push(
			{
				POSITION: [11.5, 4.5, 1, 0, 4.5, 90*i, 0],
			},
			{
				POSITION: [2, 4.5, 1.6, 11.5, 4.5, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.twin, {health: 2}]),
					TYPE: "trap",
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
			{
				POSITION: [11.5, 4.5, 1, 0, -4.5, 90*i, 0],
			},
			{
				POSITION: [2, 4.5, 1.6, 11.5, -4.5, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.twin, {health: 2}]),
					TYPE: "trap",
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
		)
	}
	Class.minotaurSnowdread = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Minotaur",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.minotaurSnowdread.GUNS.push(
			{
				POSITION: [13, 7, 1, 0, 0, 90*i, 0],
			},
			{
				POSITION: [4, 7, 1.6, 13, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.block, {health: 2}]),
					TYPE: "unsetTrap",
				},
			},
		)
	}

	// T2 Bodies
	Class.automationSnowdread = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Automation",
	    TURRETS: [
			{
				POSITION: [11, 0, 0, 0, 0, 1],
				TYPE: ["square", {MIRROR_MASTER_ANGLE: true}],
			},
		],
	}
	for (let i = 0; i < 4; i++) {
		Class.automationSnowdread.TURRETS.push(
			{
				POSITION: [4, 9, 0, 90*i+45, 180, 1],
				TYPE: ["mediumAutoSnowdread", { COLOR: 13 }],
			},
		)
	}
	Class.kilobyteTurretSnowdread = {
		PARENT: ["autoTankGun"],
		INDEPENDENT: true,
		GUNS: [
			{
				POSITION: [26, 10, 1, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.assass, g.auto, {health: 1.2, speed: 0.8}]),
					TYPE: "bullet",
				},
			},
		],
	}
	Class.kilobyteSnowdread = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Kilobyte",
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 0, 0, 1],
				TYPE: ["square", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [10, 0, 0, 0, 360, 1],
				TYPE: "kilobyteTurretSnowdread",
			},
		],
	}
	Class.coronaAuraSnowdread = addAura(1.5);
	Class.coronaSnowdread = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Corona",
	    TURRETS: [
			{
				POSITION: [14, 0, 0, 0, 0, 1],
				TYPE: ["square", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [11, 0, 0, 0, 360, 1],
				TYPE: "coronaAuraSnowdread",
			},
		],
	}
	Class.thermosphereAuraSnowdread = addAura(-1, 1.5);
	Class.thermosphereSnowdread = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Thermosphere",
	    TURRETS: [
			{
				POSITION: [15, 0, 0, 0, 0, 1],
				TYPE: ["square", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [12, 0, 0, 0, 360, 1],
				TYPE: "thermosphereAuraSnowdread",
			},
		],
	}
	Class.jumboSnowdread = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Jumbo",
	    BODY: {
			HEALTH: 2.4,
			SHIELD: 2.4,
			REGEN: 2,
			SPEED: 0.65,
		},
	    TURRETS: [
			{
				POSITION: [15, 0, 0, 0, 0, 1],
				TYPE: ['square', {MIRROR_MASTER_ANGLE: true}]
			},
			{
				POSITION: [24, 0, 0, 0, 0, 0],
				TYPE: ['square', {COLOR: 9, MIRROR_MASTER_ANGLE: true}]
			},
		],
	}
	Class.colossalTopSnowdread = {
	    PARENT: ["genericSquarenought"],
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.colossalTopSnowdread.GUNS.push(
			{
				POSITION: [4, 17.5, 0.001, 9, 0, 90*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	Class.colossalSnowdread = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Colossal",
		BODY: {
			SPEED: 1.75,
			HEALTH: 0.65,
		},
		GUNS: [],
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 0, 0, 1],
				TYPE: ['colossalTopSnowdread', {MIRROR_MASTER_ANGLE: true}]
			},
		],
	}
	for (let i = 0; i < 4; i++) {
		Class.colossalSnowdread.GUNS.push(
			{
				POSITION: [4, 17.5, 0.001, 9, 0, 90*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}

	// T3 Weapons
	Class.bayonetSnowdread = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Bayonet",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.bayonetSnowdread.GUNS.push(
			{
				POSITION: [28, 7, 1, 0, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.assass, g.assass, {reload: 0.8}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [5, 7, -1.6, 7, 0, 120*i, 0],
			},
		)
	}
	Class.bladeSnowdread = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Blade",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.bladeSnowdread.GUNS.push(
			{
				POSITION: [17, 1, 1, 0, 6, 120*i, 0],
			},
			{
				POSITION: [17, 1, 1, 0, -6, 120*i, 0],
			},
			{
				POSITION: [18, 5, 1, 0, 3, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.twin, {speed: 0.8, health: 1.5}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [18, 5, 1, 0, -3, 120*i, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.twin, {speed: 0.8, health: 1.5}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.mitigatorSnowdread = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Mitigator",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.mitigatorSnowdread.GUNS.push(
			{
				POSITION: [13.5, 8, 1, 0, 5, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, {reload: 0.85}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [13.5, 8, 1, 0, -5, 120*i, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, {reload: 0.85}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.appeaserSnowdread = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Appeaser",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.appeaserSnowdread.GUNS.push(
			{
				POSITION: [7, 10, 1.4, 6, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, {size: 0.8}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [7, 9.5, 1.3, 8, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, {size: 0.8, reload: 0.95}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.suppressorSnowdread = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Suppressor",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.suppressorSnowdread.GUNS.push(
			{
				POSITION: [17, 11, 1, 0, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, {reload: 0.85}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.inhibitorSnowdread = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Inhibitor",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.inhibitorSnowdread.GUNS.push(
			{
				POSITION: [10, 14, -0.5, 7, 0, 120*i, 0],
			},
			{
				POSITION: [15, 15, 1, 0, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.skim, g.halfspeed, {reload: 0.8}]),
					TYPE: "supermissile",
					STAT_CALCULATOR: gunCalcNames.sustained,
				},
			},
		)
	}
	Class.infiltratorSnowdread = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Infiltrator",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.infiltratorSnowdread.GUNS.push(
			{
				POSITION: [5, 6, 1.4, 6, 5.5, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.over, g.over, {size: 1.5, reload: 0.6}]),
					TYPE: "drone",
					MAX_CHILDREN: 2,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
				},
			},
			{
				POSITION: [5, 6, 1.4, 6, -5.5, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.over, g.over, {size: 1.5, reload: 0.6}]),
					TYPE: "drone",
					MAX_CHILDREN: 2,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
				},
			},
			{
				POSITION: [5, 6, 1.4, 8, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.over, g.over, g.pound, {size: 2, reload: 0.4}]),
					TYPE: "betadrone",
					MAX_CHILDREN: 2,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
				},
			},
		)
	}
	Class.aggressorMinionSnowdread = {
		PARENT: ["minion"],
		SHAPE: 3.5,
		COLOR: 2,
		BODY: {
			SPEED: 0.8,
		},
		GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.aggressorMinionSnowdread.GUNS.push(
			{
				POSITION: [15, 8.5, 1, 0, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.bitlessspeed, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
		)
	}
	Class.aggressorSnowdread = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Aggressor",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.aggressorSnowdread.GUNS.push(
			{
				POSITION: [5, 12, 1, 10.5, 0, 120*i, 0],
			},
			{
				POSITION: [1.5, 13, 1, 15.5, 0, 120*i, 0],
				PROPERTIES: {
					MAX_CHILDREN: 4,
					SHOOT_SETTINGS: combineStats([g.factory, {size: 0.9, reload: 0.5}]),
					TYPE: "aggressorMinionSnowdread",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					MAX_CHILDREN: 2,
				},
			},
			{
				POSITION: [12.2, 13, 1, 0, 0, 120*i, 0],
			},
		)
	}
	Class.hydraSnowdread = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Hydra",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.hydraSnowdread.GUNS.push(
			{
				POSITION: [6, 3.5, 1, 4, 8, 120*i, 0],
			},
			{
				POSITION: [2, 3.5, 1.8, 10, 8, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.pound, g.fast]),
					TYPE: "trap",
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
			{
				POSITION: [6, 3.5, 1, 4, -8, 120*i, 0],
			},
			{
				POSITION: [2, 3.5, 1.8, 10, -8, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.pound, g.fast]),
					TYPE: "trap",
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
			{
				POSITION: [12, 5, 1, 0, 0, 120*i, 0],
			},
			{
				POSITION: [2, 5, 1.6, 12, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.block, g.twin, g.pound, g.fast]),
					TYPE: "unsetTrap",
				},
			},
		)
	}
	Class.beelzebubSnowdread = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Beelzebub",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.beelzebubSnowdread.GUNS.push(
			{
				POSITION: [13, 10, 1, 0, 0, 120*i, 0],
			},
			{
				POSITION: [4, 10, 1.6, 13, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.block, g.pound, g.morespeed, {health: 2}]),
					TYPE: "unsetTrap",
				},
			},
		)
	}

	// T3 Bodies
	Class.mechanismSnowdread = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Mechanism",
	    TURRETS: [
			{
				POSITION: [11, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.mechanismSnowdread.TURRETS.push(
			{
				POSITION: [3.5, 6.2, 0, 120*i, 180, 1],
				TYPE: "spamAutoTurret",
			},
			{
				POSITION: [3.5, 10.5, 0, 120*i+60, 180, 1],
				TYPE: "spamAutoTurret",
			},
		)
	}
	Class.trinoughtBigAura = addAura(2, 1.5);
	Class.fusionSnowdread = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Fusion",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [9.5, 0, 0, 0, 360, 1],
				TYPE: "trinoughtBigAura",
			},
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.fusionSnowdread.TURRETS.push(
			{
				POSITION: [3.5, 10.5, 0, 120*i+60, 180, 1],
				TYPE: "spamAutoTurret",
			},
		)
	}
	Class.binarySnowdread = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Binary",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.binarySnowdread.TURRETS.push(
			{
				POSITION: [3.5, 10.5, 0, 120*i+60, 180, 1],
				TYPE: "spamAutoTurret",
			},
		)
	}
	Class.binarySnowdread.TURRETS.push(
		{
			POSITION: [10, 0, 0, 0, 360, 1],
			TYPE: "kilobyteTurretSnowdread",
		},
	)
	Class.trinoughtBigHealAura = addAura(-1.5, 1.5);
	Class.exosphereSnowdread = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Exosphere",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [9.5, 0, 0, 0, 360, 1],
				TYPE: "trinoughtBigHealAura",
			},
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.exosphereSnowdread.TURRETS.push(
			{
				POSITION: [3.5, 10.5, 0, 120*i+60, 180, 1],
				TYPE: "spamAutoTurret",
			},
		)
	}
	Class.megabyteTurretSnowdread = {
		PARENT: ["autoTankGun"],
		INDEPENDENT: true,
		GUNS: [
			{
				POSITION: [24, 13, 1, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.pound, g.auto, {health: 1.2, speed: 0.8}]),
					TYPE: "bullet",
				},
			},
		],
	}
	Class.megabyteSnowdread = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Megabyte",
	    TURRETS: [
			{
				POSITION: [15, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [11, 0, 0, 0, 360, 1],
				TYPE: "megabyteTurretSnowdread",
			},
		],
	}
	Class.trinoughtSmallAura = addAura(1, 2.1, 0.15, 0, "Small");
	Class.trojanSnowdread = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Trojan",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.trojanSnowdread.TURRETS.push(
			{
				POSITION: [3.5, 10.5, 0, 120*i+60, 360, 1],
				TYPE: "trinoughtSmallAura",
			},
		)
	}
	Class.trojanSnowdread.TURRETS.push(
		{
			POSITION: [10, 0, 0, 0, 360, 1],
			TYPE: "kilobyteTurretSnowdread",
		},
	)
	Class.trinoughtSmallHealAura = addAura(-2/3, 2.1, 0.15);
	Class.hardwareSnowdread = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Hardware",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.hardwareSnowdread.TURRETS.push(
			{
				POSITION: [3.5, 10.5, 0, 120*i+60, 360, 1],
				TYPE: "trinoughtSmallHealAura",
			},
		)
	}
	Class.hardwareSnowdread.TURRETS.push(
		{
			POSITION: [10, 0, 0, 0, 360, 1],
			TYPE: "kilobyteTurretSnowdread",
		},
	)
	Class.chromosphereSnowdread = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Chromosphere",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [9.5, 0, 0, 0, 360, 1],
				TYPE: "trinoughtBigAura",
			},
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.chromosphereSnowdread.TURRETS.push(
			{
				POSITION: [3.5, 10.5, 0, 120*i+60, 360, 1],
				TYPE: "trinoughtSmallAura",
			},
		)
	}
	Class.mesosphereSnowdread = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Mesosphere",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [9.5, 0, 0, 0, 360, 1],
				TYPE: "trinoughtBigHealAura",
			},
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.mesosphereSnowdread.TURRETS.push(
			{
				POSITION: [3.5, 10.5, 0, 120*i+60, 360, 1],
				TYPE: "trinoughtSmallHealAura",
			},
		)
	}
	Class.goliathSnowdread = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Goliath",
	    BODY: {
			HEALTH: 3.2,
			SHIELD: 3.2,
			REGEN: 2.5,
			SPEED: 0.5,
		},
	    TURRETS: [
			{
				POSITION: [14, 0, 0, 180, 0, 1],
				TYPE: ['triangle', {COLOR: 9, MIRROR_MASTER_ANGLE: true}]
			},
			{
				POSITION: [24, 0, 0, 180, 0, 0],
				TYPE: ['triangle', {COLOR: 9, MIRROR_MASTER_ANGLE: true}]
			},
		],
	}
	Class.planetSnowdread = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Planet",
		BODY: {
			HEALTH: 2.4,
			SHIELD: 2.4,
			REGEN: 2,
			SPEED: 0.65,
		},
	    TURRETS: [
			{
				POSITION: [24, 0, 0, 180, 0, 0],
				TYPE: ['triangle', {COLOR: 9, MIRROR_MASTER_ANGLE: true}]
			},
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			}
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.planetSnowdread.TURRETS.push(
			{
				POSITION: [3.5, 10.5, 0, 120*i+60, 360, 1],
				TYPE: "trinoughtSmallAura",
			},
		)
	}
	Class.moonSnowdread = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Moon",
		BODY: {
			HEALTH: 2.4,
			SHIELD: 2.4,
			REGEN: 2,
			SPEED: 0.65,
		},
	    TURRETS: [
			{
				POSITION: [24, 0, 0, 180, 0, 0],
				TYPE: ['triangle', {COLOR: 9, MIRROR_MASTER_ANGLE: true}]
			},
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			}
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.moonSnowdread.TURRETS.push(
			{
				POSITION: [3.5, 10.5, 0, 120*i+60, 360, 1],
				TYPE: "trinoughtSmallHealAura",
			},
		)
	}
	Class.titanTopSnowdread = {
	    PARENT: ["genericTrinought"],
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.titanTopSnowdread.GUNS.push(
			{
				POSITION: [5, 26, 0.001, 8, 0, 120*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	Class.titanSnowdread = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Titan",
		BODY: {
			SPEED: 2.15,
			HEALTH: 0.5,
		},
		GUNS: [],
	    TURRETS: [
			{
				POSITION: [11, 0, 0, 0, 0, 1],
				TYPE: ["titanTopSnowdread", {MIRROR_MASTER_ANGLE: true}]
			}
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.titanSnowdread.GUNS.push(
			{
				POSITION: [5, 26, 0.001, 8, 0, 120*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	Class.sirenSnowdread = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Siren",
		BODY: {
			SPEED: 1.75,
			HEALTH: 0.65,
		},
		GUNS: [],
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			}
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.sirenSnowdread.GUNS.push(
			{
				POSITION: [5, 26, 0.001, 8, 0, 120*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
		Class.sirenSnowdread.TURRETS.push(
			{
				POSITION: [3.5, 10.5, 0, 120*i+60, 360, 1],
				TYPE: "trinoughtSmallAura",
			},
		)
	}
	Class.harpySnowdread = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Harpy",
		BODY: {
			SPEED: 1.75,
			HEALTH: 0.65,
		},
		GUNS: [],
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {MIRROR_MASTER_ANGLE: true}],
			}
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.harpySnowdread.GUNS.push(
			{
				POSITION: [5, 26, 0.001, 8, 0, 120*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
		Class.harpySnowdread.TURRETS.push(
			{
				POSITION: [3.5, 10.5, 0, 120*i+60, 360, 1],
				TYPE: "trinoughtSmallHealAura",
			},
		)
	}

	// T4 Weapons
	Class.javelinSnowdread = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Javelin",
	    GUNS: [],
	}
  	for (let i = 0; i < 5; i++) {
		Class.javelinSnowdread.GUNS.push(
			{
				POSITION: [28, 7, 1, 0, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.assass, g.assass, g.assass, {reload: 0.8}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [5, 7, -1.6, 7, 0, 72*i, 0],
			},
		)
	}
	Class.rapierSnowdread = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Rapier",
	    GUNS: [],
	}
  	for (let i = 0; i < 5; i++) {
		Class.rapierSnowdread.GUNS.push(
			{
				POSITION: [17, 1, 1, 0, 6, 72*i, 0],
			},
			{
				POSITION: [17, 1, 1, 0, -6, 72*i, 0],
			},
			{
				POSITION: [18, 5, 1, 0, 3, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, {speed: 0.8, health: 1.5}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [18, 5, 1, 0, -3, 72*i, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, {speed: 0.8, health: 1.5}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.diplomatSnowdread = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Diplomat",
	    GUNS: [],
	}
  	for (let i = 0; i < 5; i++) {
		Class.diplomatSnowdread.GUNS.push(
			{
				POSITION: [13, 7, 1, 0, 3, 72*i, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.spam, g.spam, {size: 0.85}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [13, 7, 1, 0, -3, 72*i, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.spam, g.spam, {size: 0.85}]),
					TYPE: "bullet",
				},
			},
      		{
				POSITION: [15, 7, 1, 0, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.spam, g.spam, {size: 0.85}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.arbitratorSnowdread = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Arbitrator",
	    GUNS: [],
	}
  	for (let i = 0; i < 5; i++) {
		Class.arbitratorSnowdread.GUNS.push(
			{
				POSITION: [8, 10, 1.4, 5.5, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.spam, g.spam, {size: 0.7, reload: 1.2}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [8, 9.5, 1.33, 7.5, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.spam, g.spam, {size: 0.7, reload: 1.125}]),
					TYPE: "bullet",
				},
			},
      		{
				POSITION: [8, 7.5, 1.2, 9.5, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.spam, g.spam, {size: 0.7, reload: 1.05}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.retardantSnowdread = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Retardant",
	    GUNS: [],
	}
  	// for (let i = 0; i < 5; i++) {
	// 	Class.retardantSnowdread.GUNS.push(
	// 		{
	// 			POSITION: [17, 11, 1, 0, 0, 72*i, 0],
	// 			PROPERTIES: {
	// 				SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni, {reload: 0.9, health: 1.1}]),
	// 				TYPE: "bullet",
	// 			},
	// 		},
	// 	)
	// }
	for(let i = 0; i < 5; i++) {
		Class.retardantSnowdread.GUNS.push(
			...addSpam({length: 16, width: 4, y: 4.5, angle: 72*i}, 0, [g.basic, g.mini, g.pound, g.morereload]),
			...addSpam({length: 13, width: 4, y: 4.5, angle: 72*i, delay: 0.5}, 0, [g.basic, g.mini, g.pound, g.morereload]),
			...addSpam({length: 16, width: 4, y: -4.5, angle: 72*i}, 0, [g.basic, g.mini, g.pound, g.morereload]),
			...addSpam({length: 13, width: 4, y: -4.5, angle: 72*i, delay: 0.5}, 0, [g.basic, g.mini, g.pound, g.morereload]),
			...addGunner({length: 8, width: 2, x: 10, y: 2.25, angle: 72*i}, 0, [g.basic, g.gunner, g.power, g.twin]),
			...addGunner({length: 8, width: 2, x: 10, y: -2.25, angle: 72*i, delay: 0.5}, 0, [g.basic, g.gunner, g.power, g.twin]),
			{
				POSITION: [12.5, 9, 1, 0, 0, 72*i, 0],
				PROPERTIES: { COLOR: 0 }
			},
		)
	}
	Class.tyrantSnowdread = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Tyrant",
	    GUNS: [],
	}
  	for (let i = 0; i < 5; i++) {
		Class.tyrantSnowdread.GUNS.push(
			{
				POSITION: [10, 10, -0.5, 6, 0, 72*i, 0],
			},
			{
				POSITION: [14.5, 11, 1, 0, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.destroy, g.arty, g.skim, g.halfspeed, {reload: 0.8}]),
					TYPE: "supermissile",
					STAT_CALCULATOR: gunCalcNames.sustained,
				},
			},
		)
	}
	Class.raiderSnowdread = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Raider",
	    GUNS: [],
	}
	for (let i = 0; i < 5; i++) {
		Class.raiderSnowdread.GUNS.push(
			{
				POSITION: [4, 5, 2.1, 7.5, 3, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.over, g.over, g.over, {size: 1.5, reload: 0.6}]),
					TYPE: ["drone", {COLOR: 5}],
					MAX_CHILDREN: 2,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
				},
			},
			{
				POSITION: [4, 5, 2.1, 7.5, -3, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.over, g.over, g.over, {size: 1.5, reload: 0.6}]),
					TYPE: ["drone", {COLOR: 5}],
					MAX_CHILDREN: 2,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
				},
			},
			{
				POSITION: [5, 6, 1.4, 8.5, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.over, g.over, g.over, g.pound, {size: 2, reload: 0.4}]),
					TYPE: ["betadrone", {COLOR: 5}],
					MAX_CHILDREN: 2,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
				},
			},
		)
	}
	Class.gladiatorGenericMinionSnowdread = {
	    PARENT: ["minion"],
		BODY: {
			SPEED: 1,
		},
		SHAPE: 3.5,
	    COLOR: 5,
		GUNS: [],
	}
	Class.gladiatorTritankMinionSnowdread = {
	    PARENT: ["gladiatorGenericMinionSnowdread"],
		GUNS: [],
	}
	Class.gladiatorTritrapMinionSnowdread = {
	    PARENT: ["gladiatorGenericMinionSnowdread"],
		GUNS: [],
	}
	Class.gladiatorTriswarmMinionSnowdread = {
	    PARENT: ["gladiatorGenericMinionSnowdread"],
		GUNS: [],
	}
	Class.gladiatorAutoMinionSnowdread = makeAuto({
	    PARENT: ["gladiatorGenericMinionSnowdread"],
	}, "Minion", {size: 12, angle: 0});
	Class.gladiatorAuraMinionAuraSnowdread = addAura(1, 1.2);
	Class.gladiatorAuraMinionSnowdread = {
	    PARENT: ["gladiatorGenericMinionSnowdread"],
		TURRETS: [
			{
				POSITION: [12, 0, 0, 0, 360, 1],
				TYPE: "gladiatorAuraMinionAuraSnowdread",
			}
		]
	}
	Class.gladiatorHealAuraMinionAuraSnowdread = addAura(-2/3, 1.2);
	Class.gladiatorHealAuraMinionSnowdread = {
	    PARENT: ["gladiatorGenericMinionSnowdread"],
		TURRETS: [
			{
				POSITION: [12, 0, 0, 0, 360, 1],
				TYPE: "gladiatorHealAuraMinionAuraSnowdread",
			}
		]
	}
	for (let i = 0; i < 3; i++) {
		Class.gladiatorTritankMinionSnowdread.GUNS.push(
			{
				POSITION: [15, 8.5, 1, 0, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.slow, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: ["bullet", {COLOR: 5}],
				},
			},
		);
		Class.gladiatorTritrapMinionSnowdread.GUNS.push(
			{
				POSITION: [13, 7, 1, 0, 0, 120*i, 0],
			},
			{
				POSITION: [3, 7, 1.7, 13, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.flank, g.minion]),
					TYPE: "trap",
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
		);
		Class.gladiatorTriswarmMinionSnowdread.GUNS.push(
			{
				POSITION: [7, 8.5, -1.5, 7, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.swarm, {size: 1.6, range: 0.5}]),
					TYPE: ["swarm", {COLOR: 5}],
					STAT_CALCULATOR: gunCalcNames.swarm,
				},
			},
		);
	}
	Class.gladiatorSnowdread = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Gladiator",
	    GUNS: [],
	}
	for (let i = 0; i < 5; i++) {
		Class.gladiatorSnowdread.GUNS.push(
			{
				POSITION: [4.5, 12, 1, 10, 0, 72*i, 0],
			},
			{
				POSITION: [1.5, 13, 1, 14.5, 0, 72*i, 0],
				PROPERTIES: {
					MAX_CHILDREN: 4,
					SHOOT_SETTINGS: combineStats([g.factory, {size: 0.9, reload: 0.5}]),
					TYPE: "minion",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					MAX_CHILDREN: 2,
				},
			},
			{
				POSITION: [11.75, 13, 1, 0, 0, 72*i, 0],
			},
		)
	}
	Class.gladiatorSnowdread.GUNS[1].PROPERTIES.TYPE = "gladiatorTritankMinionSnowdread";
	Class.gladiatorSnowdread.GUNS[4].PROPERTIES.TYPE = "gladiatorTritrapMinionSnowdread";
	Class.gladiatorSnowdread.GUNS[7].PROPERTIES.TYPE = "gladiatorTriswarmMinionSnowdread";
	Class.gladiatorSnowdread.GUNS[10].PROPERTIES.TYPE = "gladiatorAutoMinionSnowdread";
	Class.gladiatorSnowdread.GUNS[13].PROPERTIES.TYPE = "gladiatorAuraMinionSnowdread";
	Class.cerberusSnowdread = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Cerberus",
	    GUNS: [],
	}
	for (let i = 0; i < 5; i++) {
		Class.cerberusSnowdread.GUNS.push(
			{
				POSITION: [11.5, 3.5, 1, 0, 2.5, 72*i+10, 0],
			},
			{
				POSITION: [2, 3.5, 1.8, 11.5, 2.5, 72*i+10, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.pound, g.fast]),
					TYPE: "trap",
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
			{
				POSITION: [11.5, 3.5, 1, 0, -2.5, 72*i-10, 0],
			},
			{
				POSITION: [2, 3.5, 1.8, 11.5, -2.5, 72*i-10, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.pound, g.fast]),
					TYPE: "trap",
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
			{
				POSITION: [14, 5, 1, 0, 0, 72*i, 0],
			},
			{
				POSITION: [2, 5, 1.75, 14, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.block, g.twin, g.pound, g.fast]),
					TYPE: "unsetTrap",
				},
			},
		)
	}
	Class.luciferSnowdread = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Lucifer",
	    GUNS: [],
	}
	for (let i = 0; i < 5; i++) {
		Class.luciferSnowdread.GUNS.push(
			{
				POSITION: [13, 10, 1, 0, 0, 72*i, 0],
			},
			{
				POSITION: [3.5, 10, 1.55, 13, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.block, g.pound, g.morespeed, {health: 2}]),
					TYPE: "unsetTrap",
				},
			},
		)
	}

	// T4 Bodies
	Class.skynetSnowdread = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Skynet",
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			}
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.skynetSnowdread.TURRETS.push(
			{
				POSITION: [3.25, 4.5, 0, 72*i, 180, 1],
				TYPE: "spamAutoTurret",
			},
		)
	}
	for (let i = 0; i < 5; i++) {
		Class.skynetSnowdread.TURRETS.push(
			{
				POSITION: [3.25, 8, 0, 72*i+36, 180, 1],
				TYPE: "spamAutoTurret",
			},
		)
	}
	Class.pentanoughtBigAura = addAura(2.5, 1.5, 0.3, 0, "Large");
	Class.supernovaSnowdread = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Supernova",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [9, 0, 0, 0, 360, 1],
				TYPE: "pentanoughtBigAura",
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.supernovaSnowdread.TURRETS.push(
			{
				POSITION: [3.25, 9, 0, 72*i+36, 180, 1],
				TYPE: "spamAutoTurret",
			},
		)
	}
	Class.cipherSnowdread = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Cipher",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.cipherSnowdread.TURRETS.push(
			{
				POSITION: [3.25, 9, 0, 72*i+36, 180, 1],
				TYPE: "spamAutoTurret",
			},
		)
	}
	Class.cipherSnowdread.TURRETS.push(
		{
			POSITION: [11.5, 0, 0, 0, 360, 1],
			TYPE: "megabyteTurretSnowdread",
		},
	)
	Class.pentanoughtBigHealAura = addAura(-2, 1.5);
	Class.interstellarSnowdread = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Interstellar",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [9.5, 0, 0, 0, 360, 1],
				TYPE: "pentanoughtBigHealAura",
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.interstellarSnowdread.TURRETS.push(
			{
				POSITION: [3.25, 9, 0, 72*i+36, 180, 1],
				TYPE: "spamAutoTurret",
			},
		)
	}
	Class.gigabyteTurretSnowdread = {
		PARENT: ["autoTankGun"],
		INDEPENDENT: true,
		GUNS: [
			{
				POSITION: [24, 13, 1, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy, g.auto, {speed: 1.1, health: 0.8}]),
					TYPE: "bullet",
				},
			},
		],
	}
	Class.gigabyteSnowdread = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Gigabyte",
	    TURRETS: [
			{
				POSITION: [15, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [13.5, 0, 0, 0, 360, 1],
				TYPE: "gigabyteTurretSnowdread",
			},
		],
	}
	Class.malwareSnowdread = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Malware",
	    TURRETS: [
			{
				POSITION: [14, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.malwareSnowdread.TURRETS.push(
			{
				POSITION: [4, 8.5, 0, 72*i+36, 360, 1],
				TYPE: "trinoughtSmallAura",
			},
		)
	}
	Class.malwareSnowdread.TURRETS.push(
		{
			POSITION: [12, 0, 0, 0, 360, 1],
			TYPE: "megabyteTurretSnowdread",
		},
	)
	Class.softwareSnowdread = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Software",
	    TURRETS: [
			{
				POSITION: [14, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.softwareSnowdread.TURRETS.push(
			{
				POSITION: [4, 8.5, 0, 72*i+36, 360, 1],
				TYPE: "trinoughtSmallHealAura",
			},
		)
	}
	Class.softwareSnowdread.TURRETS.push(
		{
			POSITION: [12, 0, 0, 0, 360, 1],
			TYPE: "megabyteTurretSnowdread",
		},
	)
	Class.photosphereSmallAuraSnowdread = addAura(1, 1.75, 0.15);
	Class.photosphereBigAuraSnowdread = addAura(1.5, 4);
	Class.photosphereSnowdread = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Photosphere",
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.photosphereSnowdread.TURRETS.push(
			{
				POSITION: [3.5, 8.75, 0, 72*i+36, 360, 1],
				TYPE: "photosphereSmallAuraSnowdread",
			},
		)
	}
	for (let i = 0; i < 5; i++) {
		Class.photosphereSnowdread.TURRETS.push(
			{
				POSITION: [3, 4, 0, 72*i, 360, 1],
				TYPE: "photosphereBigAuraSnowdread",
			},
		)
	}
	Class.stratosphereSnowdread = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Stratosphere",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [9.5, 0, 0, 0, 360, 1],
				TYPE: "pentanoughtBigHealAura",
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.stratosphereSnowdread.TURRETS.push(
			{
				POSITION: [4, 8.5, 0, 72*i+36, 360, 1],
				TYPE: "trinoughtSmallHealAura",
			},
		)
	}
	Class.behemothSnowdread = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Behemoth",
		BODY: {
			HEALTH: 4,
			SHIELD: 4,
			REGEN: 2.5,
			SPEED: 0.4,
		},
	    TURRETS: [
			{
				POSITION: [15, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {COLOR: 9, MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [24, 0, 0, 180, 0, 0],
				TYPE: ["pentagon", {COLOR: 9, MIRROR_MASTER_ANGLE: true}],
			},
		],
	}
	Class.astronomicSnowdread = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Astronomic",
		BODY: {
			HEALTH: 3.2,
			SHIELD: 3.2,
			REGEN: 2.5,
			SPEED: 0.5,
		},
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [24, 0, 0, 180, 0, 0],
				TYPE: ["pentagon", {COLOR: 9,MIRROR_MASTER_ANGLE: true}],
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.astronomicSnowdread.TURRETS.push(
			{
				POSITION: [4, 8.5, 0, 72*i+36, 360, 1],
				TYPE: "trinoughtSmallAura",
			},
		)
	}
	Class.grandioseSnowdread = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Grandiose",
		BODY: {
			HEALTH: 3.2,
			SHIELD: 3.2,
			REGEN: 2.5,
			SPEED: 0.5,
		},
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
			{
				POSITION: [24, 0, 0, 180, 0, 0],
				TYPE: ["pentagon", {COLOR: 9,MIRROR_MASTER_ANGLE: true}],
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.grandioseSnowdread.TURRETS.push(
			{
				POSITION: [4, 8.5, 0, 72*i+36, 360, 1],
				TYPE: "trinoughtSmallHealAura",
			},
		)
	}
	Class.pentagonLeviathanTopSnowdread = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Leviathan",
		MIRROR_MASTER_ANGLE: true,
	    GUNS: [],
	}
	for (let i = 0; i < 5; i++) {
		Class.pentagonLeviathanTopSnowdread.GUNS.push(
			{
				POSITION: [6, 13.5, 0.001, 9, 0, 72*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	Class.hexagonLeviathanTopSnowdread = {
	    PARENT: ["genericHexnought"],
	    LABEL: "Leviathan",
		MIRROR_MASTER_ANGLE: true,
	    GUNS: [],
	}
	for (let i = 0; i < 6; i++) {
		Class.hexagonLeviathanTopSnowdread.GUNS.push(
			{
				POSITION: [6, 10, 0.001, 9.5, 0, 60*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	Class.leviathanSnowdread = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Leviathan",
		GUNS: [],
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 0, 0, 1],
				TYPE: ["pentagonLeviathanTopSnowdread", {MIRROR_MASTER_ANGLE: true}]
			}
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.leviathanSnowdread.GUNS.push(
			{
				POSITION: [6.5, 16, 0.001, 9, 0, 72*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	Class.valrayvnSnowdread = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Valrayvn",
		GUNS: [],
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.valrayvnSnowdread.GUNS.push(
			{
				POSITION: [6.5, 16, 0.001, 9, 0, 72*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
		Class.valrayvnSnowdread.TURRETS.push(
			{
				POSITION: [4, 8.5, 0, 72*i+36, 360, 1],
				TYPE: "trinoughtSmallAura",
			},
		)
	}
	Class.pegasusSnowdread = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Pegasus",
		GUNS: [],
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {MIRROR_MASTER_ANGLE: true}],
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.pegasusSnowdread.GUNS.push(
			{
				POSITION: [7, 17, 0.001, 9, 0, 72*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
		Class.pegasusSnowdread.TURRETS.push(
			{
				POSITION: [4, 8.5, 0, 72*i+36, 360, 1],
				TYPE: "trinoughtSmallHealAura",
			},
		)
	}

	Class.addons.UPGRADES_TIER_0.push("dreadSnowdread");
		Class.dreadSnowdread.UPGRADES_TIER_1 = ["swordSnowdread", "pacifierSnowdread", "peacekeeperSnowdread", "invaderSnowdread", "centaurSnowdread"];

			Class.swordSnowdread.UPGRADES_TIER_M1 = ["gladiusSnowdread", "sabreSnowdread"];
				Class.gladiusSnowdread.UPGRADES_TIER_M1 = ["bladeSnowdread"];
					Class.bladeSnowdread.UPGRADES_TIER_M1 = ["rapierSnowdread"];
				Class.sabreSnowdread.UPGRADES_TIER_M1 = ["bayonetSnowdread"];
					Class.bayonetSnowdread.UPGRADES_TIER_M1 = ["javelinSnowdread"];

			Class.pacifierSnowdread.UPGRADES_TIER_M1 = ["mediatorSnowdread", "negotiatorSnowdread"];
				Class.mediatorSnowdread.UPGRADES_TIER_M1 = ["mitigatorSnowdread"];
					Class.mitigatorSnowdread.UPGRADES_TIER_M1 = ["diplomatSnowdread"];
				Class.negotiatorSnowdread.UPGRADES_TIER_M1 = ["appeaserSnowdread"];
					Class.appeaserSnowdread.UPGRADES_TIER_M1 = ["arbitratorSnowdread"];

			Class.peacekeeperSnowdread.UPGRADES_TIER_M1 = ["enforcerSnowdread", "executorSnowdread"];
				Class.enforcerSnowdread.UPGRADES_TIER_M1 = ["suppressorSnowdread"];
					Class.suppressorSnowdread.UPGRADES_TIER_M1 = ["retardantSnowdread"];
				Class.executorSnowdread.UPGRADES_TIER_M1 = ["inhibitorSnowdread"];
					Class.inhibitorSnowdread.UPGRADES_TIER_M1 = ["tyrantSnowdread"];

			Class.invaderSnowdread.UPGRADES_TIER_M1 = ["inquisitorSnowdread", "assailantSnowdread"];
				Class.inquisitorSnowdread.UPGRADES_TIER_M1 = ["infiltratorSnowdread"];
					Class.infiltratorSnowdread.UPGRADES_TIER_M1 = ["raiderSnowdread"];
				Class.assailantSnowdread.UPGRADES_TIER_M1 = ["aggressorSnowdread"];
					Class.aggressorSnowdread.UPGRADES_TIER_M1 = ["gladiatorSnowdread"];

			Class.centaurSnowdread.UPGRADES_TIER_M1 = ["daemonSnowdread", "minotaurSnowdread"];
				Class.daemonSnowdread.UPGRADES_TIER_M1 = ["hydraSnowdread"];
					Class.hydraSnowdread.UPGRADES_TIER_M1 = ["cerberusSnowdread"];
				Class.minotaurSnowdread.UPGRADES_TIER_M1 = ["beelzebubSnowdread"];
					Class.beelzebubSnowdread.UPGRADES_TIER_M1 = ["luciferSnowdread"];

			Class.byteSnowdread.UPGRADES_TIER_M1 = ["automationSnowdread", "kilobyteSnowdread"];

				Class.automationSnowdread.UPGRADES_TIER_M1 = ["mechanismSnowdread", "fusionSnowdread", "binarySnowdread", "exosphereSnowdread"];
					Class.mechanismSnowdread.UPGRADES_TIER_M1 = ["skynetSnowdread"];
					Class.fusionSnowdread.UPGRADES_TIER_M1 = ["supernovaSnowdread"];
					Class.binarySnowdread.UPGRADES_TIER_M1 = ["cipherSnowdread"];
					Class.exosphereSnowdread.UPGRADES_TIER_M1 = ["interstellarSnowdread"];

				Class.kilobyteSnowdread.UPGRADES_TIER_M1 = ["megabyteSnowdread", "binarySnowdread", "trojanSnowdread", "hardwareSnowdread"];
					Class.megabyteSnowdread.UPGRADES_TIER_M1 = ["gigabyteSnowdread"];
					// Class.binarySnowdread.UPGRADES_TIER_M1 = ["cipherSnowdread"];
					Class.trojanSnowdread.UPGRADES_TIER_M1 = ["malwareSnowdread"];
					Class.hardwareSnowdread.UPGRADES_TIER_M1 = ["softwareSnowdread"];

			Class.atmosphereSnowdread.UPGRADES_TIER_M1 = ["coronaSnowdread", "thermosphereSnowdread"];

				Class.coronaSnowdread.UPGRADES_TIER_M1 = ["chromosphereSnowdread", "fusionSnowdread", "trojanSnowdread", "planetSnowdread"];
					Class.chromosphereSnowdread.UPGRADES_TIER_M1 = ["photosphereSnowdread"];
					// Class.fusionSnowdread.UPGRADES_TIER_M1 = ["supernovaSnowdread"];
					// Class.trojanSnowdread.UPGRADES_TIER_M1 = ["malwareSnowdread"];
					Class.planetSnowdread.UPGRADES_TIER_M1 = ["astronomicSnowdread"];

				Class.thermosphereSnowdread.UPGRADES_TIER_M1 = ["mesosphereSnowdread", "exosphereSnowdread", "hardwareSnowdread", "moonSnowdread"];
					Class.mesosphereSnowdread.UPGRADES_TIER_M1 = ["stratosphereSnowdread"];
					// Class.exosphereSnowdread.UPGRADES_TIER_M1 = ["interstellarSnowdread"];
					// Class.hardwareSnowdread.UPGRADES_TIER_M1 = ["softwareSnowdread"];
					Class.moonSnowdread.UPGRADES_TIER_M1 = ["grandioseSnowdread"];

			Class.juggernautSnowdread.UPGRADES_TIER_M1 = ["jumboSnowdread", "colossalSnowdread"];

				Class.jumboSnowdread.UPGRADES_TIER_M1 = ["goliathSnowdread", "planetSnowdread", "moonSnowdread"];
					Class.goliathSnowdread.UPGRADES_TIER_M1 = ["behemothSnowdread"];
					// Class.planetSnowdread.UPGRADES_TIER_M1 = ["astronomicSnowdread"];
					// Class.moonSnowdread.UPGRADES_TIER_M1 = ["grandioseSnowdread"];

				Class.colossalSnowdread.UPGRADES_TIER_M1 = ["titanSnowdread", "sirenSnowdread", "harpySnowdread"];
					Class.titanSnowdread.UPGRADES_TIER_M1 = ["leviathanSnowdread"];
					Class.sirenSnowdread.UPGRADES_TIER_M1 = ["valrayvnSnowdread"];
					Class.harpySnowdread.UPGRADES_TIER_M1 = ["pegasusSnowdread"];

	const hexDreadNames = {
		Javelin: {
			Javelin: 'Javelin',
			Rapier: 'Lance',
			Diplomat: 'Envoy',
			Arbitrator: 'Cutlass',
			Retardant: 'Rebel',
			Tyrant: 'Autocrat',
			Raider: 'Pirate',
			Gladiator: 'Pillager',
			Cerberus: 'Argonaut',
			Lucifer: 'Kitsune',
		},
		Rapier: {
			Rapier: 'Rapier',
			Diplomat: 'Emissary',
			Arbitrator: 'Umpire',
			Retardant: 'Impeder',
			Tyrant: 'Oppressor',
			Raider: 'Bandit',
			Gladiator: 'Bruiser',
			Cerberus: 'Cyclops',
			Lucifer: 'Damocles',
		},
		Diplomat: {
			Diplomat: 'Diplomat',
			Arbitrator: 'Moderator',
			Retardant: 'Insurgent',
			Tyrant: 'Dictator',
			Raider: 'Marauder',
			Gladiator: 'Champion',
			Cerberus: 'Orion',
			Lucifer: 'Manticore',
		},
		Arbitrator: {
			Arbitrator: 'Arbitrator',
			Retardant: 'Extinguisher',
			Tyrant: 'Shogun',
			Raider: 'Buccaneer',
			Gladiator: 'Warrior',
			Cerberus: 'Gorgon',
			Lucifer: 'Keres',
		},
		Retardant: {
			Retardant: 'Retardant',
			Tyrant: 'Anarchist',
			Raider: 'Freebooter',
			Gladiator: 'Combatant',
			Cerberus: 'Gigantes',
			Lucifer: 'Demogorgon',
		},
		Tyrant: {
			Tyrant: 'Tyrant',
			Raider: 'Corsair',
			Gladiator: 'Amazon',
			Cerberus: 'Ouroboros',
			Lucifer: 'Raiju',
		},
		Raider: {
			Raider: 'Raider',
			Gladiator: 'Filibuster',
			Cerberus: 'Wyvern',
			Lucifer: 'Kraken',
		},
		Gladiator: {
			Gladiator: 'Gladiator',
			Cerberus: 'Ogre',
			Lucifer: 'Wendigo',
		},
		Cerberus: {
			Cerberus: 'Cerberus',
			Lucifer: 'Oni',
		},
		Lucifer: {
			Lucifer: 'Lucifer',
		},
	};

	const hexnoughtScaleFactor = 0.9;
	function mergeHexnoughtV2(weapon1, weapon2, body) {
		weapon1 = ensureIsClass(Class, weapon1);
		weapon2 = ensureIsClass(Class, weapon2);
		body = ensureIsClass(Class, body);

		let PARENT = Class.genericHexnought,
			BODY = JSON.parse(JSON.stringify(PARENT.BODY)),
			GUNS = [],
			gunsOnOneSide = [],
			weapon2GunsOnOneSide = [],
			TURRETS = [],
			bodyLabel = body.LABEL;

		// Label
		let name1 = hexDreadNames[weapon1.LABEL][weapon2.LABEL],
			name2 = hexDreadNames[weapon2.LABEL][weapon1.LABEL],
			weaponName = "",
			orientationId = 0;
		if(name1) {
			weaponName = name1;
		} else {
			weaponName = name2,
			orientationId = 1;
		}
		let LABEL = weaponName + "-" + bodyLabel,
			className = weaponName.toLowerCase() + orientationId + bodyLabel.toLowerCase() + "Snowdread";
		
		// Guns ----------------------
		if (body.GUNS) gunsOnOneSide.push(...JSON.parse(JSON.stringify(body.GUNS.slice(0, body.GUNS.length / 5 * 2))));
		for (let g in gunsOnOneSide) {
			gunsOnOneSide[g].POSITION[5] *= 5 / 6;
			gunsOnOneSide[g].POSITION[1] *= hexnoughtScaleFactor;
		}
		if (weapon1.GUNS) gunsOnOneSide.push(...JSON.parse(JSON.stringify(weapon1.GUNS.slice(0, weapon1.GUNS.length / 5))));
		if (weapon2.GUNS) weapon2GunsOnOneSide = JSON.parse(JSON.stringify(weapon2.GUNS.slice(0, weapon2.GUNS.length / 5)));

		for (let g in weapon2GunsOnOneSide) weapon2GunsOnOneSide[g].POSITION[5] += 60;
		gunsOnOneSide.push(...weapon2GunsOnOneSide)

		// Scale to fit size constraints
		for (let g in gunsOnOneSide) {
			gunsOnOneSide[g].POSITION[1] *= hexnoughtScaleFactor ** 2;
			gunsOnOneSide[g].POSITION[4] *= hexnoughtScaleFactor ** 2;
		}

		for (let i = 0; i < 3; i++) {
			for (let g in gunsOnOneSide) {
				let gun = JSON.parse(JSON.stringify(gunsOnOneSide[g]));
				gun.POSITION[5] += 120 * i;
				GUNS.push(gun);
			}
		};

		// Gladiator
		if (weapon1.LABEL == "Gladiator" || weapon2.LABEL == "Gladiator") {
			let droneSpawnerIndex = 0
			for (let g in GUNS) {
				let gun = GUNS[g];
				if (gun.PROPERTIES && gun.PROPERTIES.TYPE == "gladiatorTritankMinionSnowdread") {
					switch (droneSpawnerIndex) {
						case 1:
							gun.PROPERTIES.TYPE = "gladiatorTritrapMinionSnowdread";
							break;
						case 2:
							gun.PROPERTIES.TYPE = "gladiatorTriswarmMinionSnowdread";
							break;
						case 3:
							gun.PROPERTIES.TYPE = "gladiatorAutoMinionSnowdread";
							break;
						case 4:
							gun.PROPERTIES.TYPE = "gladiatorAuraMinionSnowdread";
							break;
						case 5:
							gun.PROPERTIES.TYPE = "gladiatorHealAuraMinionSnowdread";
							break;
					}
					droneSpawnerIndex++;
				}
			}
		}
		
		// Turrets --------------------
		let turretRingLoopLength = Math.floor(body.TURRETS.length / 5);
  
    	// Turret adding
		for (let t = 0; t < body.TURRETS.length; t++) {
			let turret = body.TURRETS[t];
			if (turret.TYPE[0].indexOf('pentagon') >= 0) { // Replace pentagons with hexagons
				TURRETS.push(
					{
						POSITION: [turret.POSITION[0], 0, 0, 0, 0, turret.POSITION[5]],
						TYPE: ['hexagon' + turret.TYPE[0].substring(8), turret.TYPE[1]],
					}
				);
			} else if (turret.POSITION[1]) { // Do whole turret loop at once
				for (let i = 0; i < turretRingLoopLength; i++) {
					for (let j = 0; j < 6; j++) {
						turret = body.TURRETS[t + i * 5];
						TURRETS.push(
							{
								POSITION: [turret.POSITION[0] * hexnoughtScaleFactor, turret.POSITION[1] * hexnoughtScaleFactor ** 0.5, turret.POSITION[2], turret.POSITION[3] / 6 * 5 + 60 * j, turret.POSITION[4], turret.POSITION[5]],
								TYPE: turret.TYPE,
							}
						)
					}
				}
				t += 5 * turretRingLoopLength - 1;
			} else { // Centered turrets
				TURRETS.push(
					{
						POSITION: [turret.POSITION[0] * hexnoughtScaleFactor ** 0.5, 0, 0, turret.POSITION[3], turret.POSITION[4], turret.POSITION[5]],
						TYPE: turret.TYPE,
					}
				) 
      		}
		}
		
		// Body stat modification
		if (weapon1.BODY) for (let m in weapon1.BODY) BODY[m] *= weapon1.BODY[m];
		if (weapon2.BODY) for (let m in weapon2.BODY) BODY[m] *= weapon2.BODY[m];
		if (body.BODY) for (let m in body.BODY) BODY[m] *= body.BODY[m];

		// Smash it together
		Class[className] = {
			PARENT, BODY, LABEL, GUNS, TURRETS,
		};
		return className;
	}

	// Merge function
	let mergedDreads = [];
	const pentanoughtWeapons = ["rapierSnowdread", "javelinSnowdread", "diplomatSnowdread", "arbitratorSnowdread", "retardantSnowdread", "tyrantSnowdread", "raiderSnowdread", "gladiatorSnowdread", "cerberusSnowdread", "luciferSnowdread"];

	function mergeDreadv2(weapon, body) {
		let className = weapon.split("_")[0] + body;

		weapon = ensureIsClass(Class, weapon);
		body = ensureIsClass(Class, body);

		let PARENT = ensureIsClass(Class, weapon.PARENT[0]),
			BODY = JSON.parse(JSON.stringify(PARENT.BODY)),
			GUNS = [],
			TURRETS = [],
			LABEL = weapon.LABEL + "-" + body.LABEL,
			UPGRADES_TIER_0 = [];
		
		// Guns
		if (body.GUNS) GUNS.push(...body.GUNS);
		if (weapon.GUNS) GUNS.push(...weapon.GUNS);
		
		// Turrets
		if (weapon.TURRETS) TURRETS.push(...weapon.TURRETS);
		TURRETS.splice(0, 0, body.TURRETS[0]);
		TURRETS.push(...body.TURRETS.slice(1));
		
		// Body stat modification
		if (weapon.BODY) for (let m in weapon.BODY) BODY[m] *= weapon.BODY[m];
		if (body.BODY) for (let m in body.BODY) BODY[m] *= body.BODY[m];

		// Upgrades
		for (let w in weapon.UPGRADES_TIER_M1) {
			for (let b in body.UPGRADES_TIER_M1) {
				let weaponName = weapon.UPGRADES_TIER_M1[w],
					bodyName = body.UPGRADES_TIER_M1[b];

				if (!mergedDreads.includes(weaponName + bodyName))
					mergeDreadv2(weaponName, bodyName);
				
				UPGRADES_TIER_0.push(weaponName.split("_")[0] + bodyName);
			}
		}

		// Hexnought building
		if (weapon.PARENT[0] == "genericPentanought" && buildHexnoughts) {
			for (let i in pentanoughtWeapons) {
				UPGRADES_TIER_0.push(mergeHexnoughtV2(weapon, ensureIsClass(Class, pentanoughtWeapons[i]), body));
			}
		}

		// Can he build it? Yes he can!
		Class[className] = {
			PARENT, BODY, LABEL, GUNS, TURRETS, UPGRADES_TIER_0,
		};
	}

	// Initiate build for all dread paths and do upgrades for all eggnoughts
	for (let w in eggnoughtWeapons) {
		let weaponName = eggnoughtWeapons[w];
		Class[weaponName].UPGRADES_TIER_1 = [];
		for (let b in eggnoughtBodies) {
			let bodyName = eggnoughtBodies[b];
			mergeDreadv2(weaponName, bodyName);
			Class[weaponName].UPGRADES_TIER_1.push(weaponName.split("_")[0] + bodyName);
		}
	}
};
