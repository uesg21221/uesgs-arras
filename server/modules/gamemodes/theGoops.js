function startCountdown(totalTimeInSeconds) {
    let timeLeft = totalTimeInSeconds;

    function announceTimeLeft() {
        if (timeLeft > 0) {
            let minutesLeft = Math.ceil(timeLeft / 60);
            sockets.broadcast(`Time left: ${minutesLeft} minute${minutesLeft !== 1 ? 's' : ''}!`);
            timeLeft -= 60; // Announce every 60 seconds (1 minute)
            setTimeout(announceTimeLeft, 60000); // Schedule the next announcement
        } else {
            sockets.broadcast("Time's up! Nobody wins!");
            setTimeout(closeArena, 3000); // Close the arena when the time is up
        }
    }

    // Start the countdown
    announceTimeLeft();
}

class TheGoops {
    constructor() {
        this.goopBlobTypes = ["goopBlob","goopBlobBirther","goopBlobFarmer","goopBlobAttacker","goopBlobTargeter","goopBlobResistant"],
        this.gameWon = false,
        this.goops = 0,
        this.maxgoops = 0
    }

    init() {
        Class.basic.UPGRADES_TIER_1.push('healer');
        for (let loc of room.goop) {
            this.spawn(loc);
        }
        console.log('Boss rush initialized.');

        const totalTime = 800;

        setTimeout(function() {
            startCountdown(totalTime)
        }, 3000);
    }

    spawn(loc, type = false) {
        this.goops += 1
        this.maxgoops += 1
        type = type ? type : ran.choose(this.goopBlobTypes);
        let o = new Entity(loc);
        o.x +=  (Math.random() - 0.5) * 200;
        o.y +=  (Math.random() - 0.5) * 200;
        o.define(type);
        o.team = 6009;
        const centerX = c.WIDTH/2;
        const centerY = c.HEIGHT/2;
        const distance = util.getDistance(new Vector(o.x,o.y), new Vector(centerX,centerY))
        const maxScore = 10000000;
        const minScore = 1000;
        const exponentialFactor = 0.002;
        o.skill.score = minScore + (maxScore - minScore) * Math.exp(-exponentialFactor * distance);
        o.name = "Goop Blob";
        o.color = "#545c24 0 1 0 false";
        o.SIZE = c.WIDTH / c.X_GRID / 20;
        o.controllers = [new ioTypes.nearestDifferentMaster(o), new ioTypes.spin(o)];

        o.on('dead', () => {


            this.goops -= 1

            let killers = [];
            for (let instance of o.collisionArray) {
                if (isPlayerTeam(instance.team) && 6009 !== instance.team) {
                    killers.push(instance);
                }
            }

                let killer = ran.choose(killers);
                let newTeam = killer.team,
                    teamName = newTeam > 0 ? killer.name : getTeamName(newTeam);
                room.setType((newTeam > 0) ? "dom3" : (newTeam > -9) ? "dom" + (-newTeam) : "dom0", loc);

                sockets.broadcast(`A goop blob is has been destroyed by ${teamName}!`);
                sockets.broadcast(`${this.goops} goop blob${this.goops !== 1 ? 's' : ''} remain!`);

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
