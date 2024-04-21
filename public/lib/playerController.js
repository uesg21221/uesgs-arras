import { global } from './global.js';
import { settings } from './settings.js';
import { PlayerInput, InputBind, Input } from './classes/playerInput.js';
import { c2s } from './shared/packetTypes.js';

// all of this is gonna stay here and canvas.js will be renamed

let maxstat = false,
playerInput = new PlayerInput(canvas, {
    // mouse
    'Mouse0': ['primaryfire', false],
    'Mouse2': ['secondaryfire', false],
    'Mouse1': ['tertiaryfire', false], // Mouse1 is middle click
    'MouseMove': 'lookAround',
    'MouseWheelUp': 'zoom_up',
    'MouseWheelDown': 'zoom_down',

    // keyboard
    'g': ['toggle_autoalt', false],
    'e': ['toggle_autofire', false],
    'c': ['toggle_autospin', false],
    'r': ['toggle_override', false],
    'v': ['toggle_reversetank', false],
    'x': ['toggle_spinlock', false],
    'f': ['become', false],
    't': ['toggle_classtree', false],
    'Enter': ['respawn', false],
    'p': ['upgradetank_token', false],
    'y': ['upgradetank_option1', false],
    'u': ['upgradetank_option2', false],
    'i': ['upgradetank_option3', false],
    'h': ['upgradetank_option4', false],
    'j': ['upgradetank_option5', false],
    'k': ['upgradetank_option6', false],
    '1': ['upgradeskill_player_damage', false],
    '2': ['upgradeskill_player_health', false],
    '3': ['upgradeskill_bullet_speed', false],
    '4': ['upgradeskill_bullet_health', false],
    '5': ['upgradeskill_bullet_penetration', false],
    '6': ['upgradeskill_bullet_damage', false],
    '7': ['upgradeskill_reload', false],
    '8': ['upgradeskill_player_speed', false],
    '9': ['upgradeskill_player_shieldregeneration', false],
    '0': ['upgradeskill_player_shieldhealth', false],

    'ArrowUp': 'up_classtree',
    'ArrowLeft': 'down_classtree',
    'ArrowDown': 'left_classtree',
    'ArrowRight': 'right_classtree',
    'w': 'up',
    'a': 'down',
    's': 'left',
    'd': 'right',

    'l': ['levelup', false],
    'm': 'upgradeskill_maxstat',
    'Shift': 'secondaryfire_classtreesprint',
    'o': ['suicide', false],

    '+': ['zoom_up', false],
    '-': ['zoom_down', false]
});

// misc
playerInput.addEventListener('toggle_autoalt');
playerInput.addEventListener('toggle_autofire');
playerInput.addEventListener('toggle_autospin');
playerInput.addEventListener('toggle_override');
playerInput.addEventListener('toggle_reversetank');
playerInput.addEventListener('toggle_spinlock');

playerInput.addEventListener('become', e => e.isPressed && socket.talk('H'));
playerInput.addEventListener('toggle_classtree', e => {
    if (!e.isPressed) return;
    global.treeScale = 1;
    global.showTree = !global.showTree;
});
playerInput.addEventListener('respawn', e => e.isPressed && socket.talk(c2s.spawn, global.playerName, 0, settings.game.autoLevelUp));

// upgrades
playerInput.addEventListener('upgradetank_token', e => e.isPressed && socket.talk(c2s.upgradeTankToken));

playerInput.addEventListener('upgradetank_option1', e => e.isPressed && socket.talk(c2s.upgradeTank, 0));
playerInput.addEventListener('upgradetank_option2', e => e.isPressed && socket.talk(c2s.upgradeTank, 1));
playerInput.addEventListener('upgradetank_option3', e => e.isPressed && socket.talk(c2s.upgradeTank, 2));
playerInput.addEventListener('upgradetank_option4', e => e.isPressed && socket.talk(c2s.upgradeTank, 3));
playerInput.addEventListener('upgradetank_option5', e => e.isPressed && socket.talk(c2s.upgradeTank, 4));
playerInput.addEventListener('upgradetank_option6', e => e.isPressed && socket.talk(c2s.upgradeTank, 5));

playerInput.addEventListener('upgradeskill_player_damage'            , e => e.isPressed && socket.talk(c2s.upgradeSkill, 0, maxstat));
playerInput.addEventListener('upgradeskill_player_health'            , e => e.isPressed && socket.talk(c2s.upgradeSkill, 1, maxstat));
playerInput.addEventListener('upgradeskill_bullet_speed'             , e => e.isPressed && socket.talk(c2s.upgradeSkill, 2, maxstat));
playerInput.addEventListener('upgradeskill_bullet_health'            , e => e.isPressed && socket.talk(c2s.upgradeSkill, 3, maxstat));
playerInput.addEventListener('upgradeskill_bullet_penetration'       , e => e.isPressed && socket.talk(c2s.upgradeSkill, 4, maxstat));
playerInput.addEventListener('upgradeskill_bullet_damage'            , e => e.isPressed && socket.talk(c2s.upgradeSkill, 5, maxstat));
playerInput.addEventListener('upgradeskill_reload'                   , e => e.isPressed && socket.talk(c2s.upgradeSkill, 6, maxstat));
playerInput.addEventListener('upgradeskill_player_speed'             , e => e.isPressed && socket.talk(c2s.upgradeSkill, 7, maxstat));
playerInput.addEventListener('upgradeskill_player_shieldregeneration', e => e.isPressed && socket.talk(c2s.upgradeSkill, 8, maxstat));
playerInput.addEventListener('upgradeskill_player_shieldhealth'      , e => e.isPressed && socket.talk(c2s.upgradeSkill, 9, maxstat));

// motion
playerInput.addEventListener('up_classtree');
playerInput.addEventListener('down_classtree');
playerInput.addEventListener('left_classtree');
playerInput.addEventListener('right_classtree');

playerInput.addEventListener('up');
playerInput.addEventListener('down');
playerInput.addEventListener('left');
playerInput.addEventListener('right');

// mouse control
playerInput.addEventListener('primaryfire');
playerInput.addEventListener('secondaryfire');
playerInput.addEventListener('tertiaryfire');
playerInput.addEventListener('lookAround');

// operator
playerInput.addEventListener('levelup');
playerInput.addEventListener('upgradeskill_maxstat', e => maxstat = e.isPressed);
playerInput.addEventListener('secondaryfire_classtreesprint');
playerInput.addEventListener('suicide');
playerInput.addEventListener('zoom_up', e => e.isPressed && global.showTree && (global.treeScale /= 1.1));
playerInput.addEventListener('zoom_down', e => e.isPressed && global.showTree && (global.treeScale *= 1.1));






class Canvas {
    constructor() {
        this.directionLock = false;
        this.target = global.target;
        this.socket = global.socket;
        this.directions = [];

        this.chatInput = document.getElementById('chatInput');
        this.chatInput.addEventListener('keydown', event => {
            if (![global.KEY_ENTER, global.KEY_ESC].includes(event.keyCode)) return;
            this.chatInput.blur();
            this.canvas.focus();
            this.chatInput.hidden = true;
            if (!this.chatInput.value) return;
            if (event.keyCode === global.KEY_ENTER) this.socket.talk('M', this.chatInput.value);
            this.chatInput.value = "";
        });

        this.canvas = document.getElementById('gameCanvas');
        this.canvas.addEventListener('mousemove', event => this.mouseMove(event), false);
        this.canvas.addEventListener('mousedown', event => this.mouseDown(event), false);
        this.canvas.addEventListener('mouseup', event => this.mouseUp(event), false);
        this.canvas.addEventListener('keypress', event => this.keyPress(event), false);
        this.canvas.addEventListener('keydown', event => this.keyDown(event), false);
        this.canvas.addEventListener('keyup', event => this.keyUp(event), false);
        this.canvas.addEventListener('wheel', event => this.wheel(event), false);
        this.canvas.resize = (width, height) => {
            this.canvas.width = this.width = width;
            this.canvas.height = this.height = height;
        };
        this.canvas.resize(innerWidth, innerHeight);
        this.reverseDirection = false;
        this.inverseMouse = false;
        this.spinLock = true;
        this.treeScrollSpeed = 0.5;
        this.treeScrollSpeedMultiplier = 1;
    }
    wheel(event) {
        if (!global.died && global.showTree) {
            if (event.deltaY > 1) {
                global.treeScale /= 1.1;
            } else {
                global.treeScale *= 1.1;
            }
        }
    }
    keyPress(event) {
        switch (event.keyCode) {
            case global.KEY_ZOOM_OUT:
                if (!global.died && global.showTree) global.treeScale /= 1.1;
                break;
            case global.KEY_ZOOM_IN:
                if (!global.died && global.showTree) global.treeScale *= 1.1;
                break;
        }
    }
    keyDown(event) {
        switch (event.keyCode) {
            case global.KEY_SHIFT:
                if (global.showTree) this.treeScrollSpeedMultiplier = 5;
                else this.socket.cmd.set(6, true);
                break;

            case global.KEY_ENTER:
                // Enter to respawn
                if (global.died) {
                    this.socket.talk(c2s.spawn, global.playerName, 0, 1 * settings.game.autoLevelUp);
                    global.died = false;
                    break;
                }

                // or to talk instead
                if (this.chatInput.hidden && global.gameStart) {
                    this.chatInput.hidden = false;
                    this.chatInput.focus();
                    break;
                }
                break;

            case global.KEY_UP_ARROW:
                if (!global.died && global.showTree) return global.scrollVelocityY = -this.treeScrollSpeed * this.treeScrollSpeedMultiplier;
            case global.KEY_UP:
                this.socket.cmd.set(0, true);
                break;
            case global.KEY_DOWN_ARROW:
                if (!global.died && global.showTree) return global.scrollVelocityY = +this.treeScrollSpeed * this.treeScrollSpeedMultiplier;
            case global.KEY_DOWN:
                this.socket.cmd.set(1, true);
                break;
            case global.KEY_LEFT_ARROW:
                if (!global.died && global.showTree) return global.scrollVelocityX = -this.treeScrollSpeed * this.treeScrollSpeedMultiplier;
            case global.KEY_LEFT:
                this.socket.cmd.set(2, true);
                break;
            case global.KEY_RIGHT_ARROW:
                if (!global.died && global.showTree) return global.scrollVelocityX = +this.treeScrollSpeed * this.treeScrollSpeedMultiplier;
            case global.KEY_RIGHT:
                this.socket.cmd.set(3, true);
                break;
            case global.KEY_MOUSE_0:
                this.socket.cmd.set(4, true);
                break;
            case global.KEY_MOUSE_1:
                this.socket.cmd.set(5, true);
                break;
            case global.KEY_MOUSE_2:
                this.socket.cmd.set(6, true);
                break;
            case global.KEY_LEVEL_UP:
                this.socket.talk('L');
                break;
            case global.KEY_FUCK_YOU:
                this.socket.talk('0');
                break;
            case global.KEY_BECOME:
                this.socket.talk('H');
                break;
            case global.KEY_MAX_STAT:
                global.statMaxing = true;
                break;
            case global.KEY_SUICIDE:
                this.socket.talk('1');
                break;
        }
        if (!event.repeat) {
            switch (event.keyCode) {
                case global.KEY_AUTO_SPIN:
                    global.autoSpin = !global.autoSpin;
                    this.socket.talk('t', 0);
                    break;
                case global.KEY_AUTO_FIRE:
                    this.socket.talk('t', 1);
                    break;
                case global.KEY_OVER_RIDE:
                    this.socket.talk('t', 2);
                    break;
                case global.KEY_REVERSE_MOUSE: //client side only, no server effects except message
                    this.inverseMouse = !this.inverseMouse;
                    this.socket.talk('t', 3);
                    break;
                case global.KEY_REVERSE_TANK: //client side only, no server effects except message
                    this.reverseDirection = !this.reverseDirection;
                    this.socket.talk('t', 4);
                    break;
                case global.KEY_AUTO_ALT:
                    this.socket.talk('t', 5);
                    break;
                case global.KEY_SPIN_LOCK:
                    this.spinLock = !this.spinLock;
                    this.socket.talk('t', 6);
                    break;
                case global.KEY_CLASS_TREE:
                    global.treeScale = 1;
                    global.showTree = !global.showTree;
                    break;
            }
            if (global.canSkill) {
                let skill = [
                    global.KEY_UPGRADE_ATK, global.KEY_UPGRADE_HTL, global.KEY_UPGRADE_SPD,
                    global.KEY_UPGRADE_STR, global.KEY_UPGRADE_PEN, global.KEY_UPGRADE_DAM,
                    global.KEY_UPGRADE_RLD, global.KEY_UPGRADE_MOB, global.KEY_UPGRADE_RGN,
                    global.KEY_UPGRADE_SHI
                ].indexOf(event.keyCode);
                if (skill >= 0) this.socket.talk(c2s.upgradeSkill, skill, 1 * global.statMaxing);
            }
            if (global.canUpgrade) {
                switch (event.keyCode) {
                    case global.KEY_CHOOSE_1:
                        this.socket.talk('U', 0);
                        break;
                    case global.KEY_CHOOSE_2:
                        this.socket.talk('U', 1);
                        break;
                    case global.KEY_CHOOSE_3:
                        this.socket.talk('U', 2);
                        break;
                    case global.KEY_CHOOSE_4:
                        this.socket.talk('U', 3);
                        break;
                    case global.KEY_CHOOSE_5:
                        this.socket.talk('U', 4);
                        break;
                    case global.KEY_CHOOSE_6:
                        this.socket.talk('U', 5);
                        break;
                }
            }
        }
    }
    keyUp(event) {
        switch (event.keyCode) {
            case global.KEY_SHIFT:
                if (global.showTree) this.treeScrollSpeedMultiplier = 1;
                else this.socket.cmd.set(6, false);
                break;
            case global.KEY_UP_ARROW:
                global.scrollVelocityY = 0;
            case global.KEY_UP:
                this.socket.cmd.set(0, false);
                break;
            case global.KEY_DOWN_ARROW:
                global.scrollVelocityY = 0;
            case global.KEY_DOWN:
                this.socket.cmd.set(1, false);
                break;
            case global.KEY_LEFT_ARROW:
                global.scrollVelocityX = 0;
            case global.KEY_LEFT:
                this.socket.cmd.set(2, false);
                break;
            case global.KEY_RIGHT_ARROW:
                global.scrollVelocityX = 0;
            case global.KEY_RIGHT:
                this.socket.cmd.set(3, false);
                break;
            case global.KEY_MOUSE_0:
                this.socket.cmd.set(4, false);
                break;
            case global.KEY_MOUSE_1:
                this.socket.cmd.set(5, false);
                break;
            case global.KEY_MOUSE_2:
                this.socket.cmd.set(6, false);
                break;
            case global.KEY_MAX_STAT:
                global.statMaxing = false;
                break;
        }
    }
    mouseDown(mouse) {
        if (!this.socket) return;
        let primaryFire = 4,
            secondaryFire = 6;
        if (this.inverseMouse) [primaryFire, secondaryFire] = [secondaryFire, primaryFire];
        switch (mouse.button) {
            case 0:
                let mpos = {
                    x: mouse.clientX * global.ratio,
                    y: mouse.clientY * global.ratio,
                };
                let statIndex = global.clickables.stat.check(mpos);
                if (statIndex !== -1) {
                    this.socket.talk(c2s.upgradeSkill, statIndex, 0);
                } else if (global.clickables.skipUpgrades.check(mpos) !== -1) {
                    global.clearUpgrades();
                } else {
                    let upgradeIndex = global.clickables.upgrade.check(mpos);
                    if (upgradeIndex !== -1) this.socket.talk('U', upgradeIndex);
                    else this.socket.cmd.set(primaryFire, true);
                }
                break;
            case 1:
                this.socket.cmd.set(5, true);
                break;
            case 2:
                this.socket.cmd.set(secondaryFire, true);
                break;
        }
    }
    mouseUp(mouse) {
        if (!this.socket) return;
        let primaryFire = 4,
            secondaryFire = 6;
        if (this.inverseMouse) [primaryFire, secondaryFire] = [secondaryFire, primaryFire];
        switch (mouse.button) {
            case 0:
                this.socket.cmd.set(primaryFire, false);
                break;
            case 1:
                this.socket.cmd.set(5, false);
                break;
            case 2:
                this.socket.cmd.set(secondaryFire, false);
                break;
        }
    }
    mouseMove(mouse) {
        global.statHover = global.clickables.hover.check({
            x: mouse.clientX * global.ratio,
            y: mouse.clientY * global.ratio,
        }) === 0;
        if (!this.spinLock) return;
        global.mouse.x = mouse.clientX * global.ratio;
        global.mouse.y = mouse.clientY * global.ratio;
    }
}
export { Canvas }