const { combineStats } = require('../../facilitators.js');
const { base, statnames } = require('../../constants.js');
const g = require('../../gunvals.js');

// undertow
Class.undertowEffect = {
   PARENT: 'genericTank',
   TYPE: 'undertowEffect',
   SIZE: 5,
   COLOR: 1,
   HITS_OWN_TYPE: "never",
   GIVE_KILL_MESSAGE: false,
   ACCEPTS_SCORE: false,
   DRAW_HEALTH: false,
   DIE_AT_RANGE: true,
   BODY: {
      HEALTH: 9e99,
      DAMAGE: 0,
      RANGE: 5,
      PUSHABILITY: 0,
   }
}
Class.undertowBullet = {
   PARENT: 'bullet',
   ON: [
      {
         event: "tick",
         handler: ({ body }) => {
            for (let instance of entities) {
               let diffX = instance.x - body.x,
               diffY = instance.y - body.y,
               dist2 = diffX ** 2 + diffY ** 2;
               if (dist2 <= ((body.size / 12)*250) ** 1.9) {
                  if ((instance.team != body.team || (instance.type == "undertowEffect" && instance.master.id == body.master.id)) && instance.type != "wall" && instance.isTurret != true) {
                     if (instance.type == "undertowEffect") {
                        forceMulti = 1
                     }
                     else if (instance.type == "food") {
                     forceMulti = (6 / instance.size)
                     }      
                     else {
                        forceMulti = (2 / instance.size)
                     }           
                     instance.velocity.x += util.clamp(body.x - instance.x, -90, 90) * instance.damp * forceMulti;//0.05
                     instance.velocity.y += util.clamp(body.y - instance.y, -90, 90) * instance.damp * forceMulti;//0.05
                     if (instance.type != "undertowEffect" && instance.type != "bullet" && instance.type != "swarm" && instance.type != "drone" && instance.type != "trap" && instance.type != "dominator") {
                        let o = new Entity({x: instance.x, y: instance.y})
                        o.define('undertowEffect')
                        o.team = body.team;
                        o.color = instance.color;
                        o.alpha = 0.3;
                        o.master = body.master;
                     }
                  }
               }
               if (dist2 < body.size ** 3 + instance.size ** 3) {
                  if (instance.master.id == body.master.id) {
                     if (instance.type == "undertowEffect")
                     {
                        instance.kill();
                     }
                  }
               }
            }
         }
      }
   ]
}
