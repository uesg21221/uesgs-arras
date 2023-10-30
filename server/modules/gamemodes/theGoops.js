class TheGoops {
    constructor() {
        this.goopBlobTypes = ["goopBlob","goopBlobBirther","goopBlobFarmer","goopBlobAttacker"],
        this.gameWon = false,
        this.goops = 0,
        this.maxgoops = 0

        setTimeout(function() {
            sockets.broadcast("You have lost the game!");
            setTimeout(closeArena, 3000);
        }, 1000000);
    }

    init() {
        Class.basic.UPGRADES_TIER_1.push('healer');
        for (let loc of room.goop) {
            this.spawn(loc);
        }
        console.log('Boss rush initialized.');
    }

    spawn(loc, type = false) {
        this.goops += 1
        this.maxgoops += 1
        type = type ? type : ran.choose(this.goopBlobTypes);
        let o = new Entity(loc);
        o.define(type);
        o.team = 6009;
        o.skill.score = 111069;
        o.name = "Goop Blob";
        o.SIZE = c.WIDTH / c.X_GRID / 10;
        //o.isDominator = true;
        o.controllers = [new ioTypes.nearestDifferentMaster(o), new ioTypes.spin(o)];
    
        o.on('dead', () => {
    
    
            this.goops -= 1
    
                room.setType('norm', loc);
    
                sockets.broadcast(`A goop blob has been destroyed!`);
    
                if (this.goops==0 && !this.gameWon) {
                    this.gameWon = true;
                    setTimeout(function() {
                        sockets.broadcast("You have won the game!");
                        setTimeout(closeArena, 3000);
                    }, 1500);
                }
    
        });
    };
}

module.exports = { TheGoops };
