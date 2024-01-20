const { combineStats, menu } = require('../facilitators.js');
const { base } = require('../constants.js');

Class.spectator.CAN_GO_OUTSIDE_ROOM = true;
Class.fastSpectator = {
    PARENT: "spectator",
    LABEL: "Fast Spectator",
    BODY: {
        SPEED: 25,
        ACCELERATION: base.ACCEL * 5,
        FOV: 5,
    },
}
Class.superFastSpectator = {
    PARENT: "genericTank",
    LABEL: "Super Fast Spectator",
    BODY: {
        SPEED: 75,
        ACCELERATION: base.ACCEL * 10,
        FOV: 10,
    },
}

Class.snowtanksTesting = menu("SnowTesting");
Class.snowtanksTesting.SHAPE = -6;
Class.snowtanksTesting.COLOR = {BASE: 0, SATURATION_SHIFT: 0.7, BRIGHTNESS_SHIFT: 15};

Class.particleEmitterTest = {
    PARENT: 'genericTank',
    LABEL: "Particle Emitter Testing",
    COLOR: 6,
    PARTICLE_EMITTER: {
        RATE: 20,
        SIZE: 10,
        ALPHA: 0.6,
    }
}

Class.spectator.UPGRADES_TIER_0 = ["spectator", "fastSpectator", "superFastSpectator"];
Class.fastSpectator.UPGRADES_TIER_0 = ["spectator", "fastSpectator", "superFastSpectator"];
Class.superFastSpectator.UPGRADES_TIER_0 = ["spectator", "fastSpectator", "superFastSpectator"];

Class.testing.UPGRADES_TIER_0.push('snowtanksTesting');
    Class.snowtanksTesting.UPGRADES_TIER_0 = ["particleEmitterTest"];
