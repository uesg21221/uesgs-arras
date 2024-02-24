class Color {
	constructor (isTile) {
        this.isTile = isTile;
        this.reset();
	}
	reset () {
        this.base = -1;
        this.hueShift = 0;
        this.saturationShift = 1;
        this.brightnessShift = 0;
        this.allowBrightnessInvert = false;
	}
    //lets just say we have to deal with some kind of color value and we dont know what it is
    interpret (color) {
    	switch (typeof color) {
    		case 'number':
    			this.base = color;
	            break;
    		case 'object':
	            this.base: color.BASE ?? 16;
	            this.hueShift: color.HUE_SHIFT ?? 0;
	            this.saturationShift: color.SATURATION_SHIFT ?? 1;
	            this.brightnessShift: color.BRIGHTNESS_SHIFT ?? 0;
	            this.allowBrightnessInvert: color.ALLOW_BRIGHTNESS_INVERT ?? false;
	            break;
    		case 'string':
    			if (!color.includes(" ")) {
	    			this.base = color;
    				break;
    			}

    			color = color.split(' ');
	            this.base: color[0] ?? 16;
	            this.hueShift: parseFloat(color[1]) ?? 0;
	            this.saturationShift: parseFloat(color[2]) ?? 1;
	            this.brightnessShift: parseFloat(color[3]) ?? 0;
	            this.allowBrightnessInvert: color[4] == 'true';
    	}
    }
    recompile () {
        let oldColor = this.compiled;
        this.compiled = this.base + " " + this.hueShift + " " + this.saturationShift + " " + this.brightnessShift + " " + this.allowBrightnessInvert;
        if (isTile && this.compiled != oldColor) {
            room.sendColorsToClient = true;
        }
        return this.compiled;
    }
}

module.exports = { Color };