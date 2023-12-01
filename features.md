# List of added, changed or removed features

Unfinished list of all features that OSA/APS++ has included in the base template that are not in other templates.


## Added

* 8 Team Support.

* `SHAPE` supports decimal numbers.
  * Rotates the shape based on the decimal value.

* Custom Projectile Colors.
  * If your bullet has a `COLOR`, it overrides the inherited color.

* Invulnerability flicker.
  * When an entity has `.invuln` set to true, it flickers.

* Arguments to IO Controllers.
  * Allows you to configurate a controller.
  * `CONTROLLERS: [['spin', { speed: 0.1 }]]`.

* Entity Definition Attribute: `UPGRADE_COLOR`.
  * Lets you change the color of an entity's upgrade box.

* Entity Definition Attribute: `UPGRADE_LABEL`.
  * Lets you change an entity's upgrade box label.

* Entity Definition Attribute: `IGNORED_BY_AI`.
  * Makes `io_nearestDifferentMaster` ignore you.

* Gun Definition Attribute: `SHOOT_ON_DEATH`.
  * Makes the gun shoot if the entity it is attached to dies.

* Shape kill counter in the death screen.
* Auto LVL up.
* Split Health Bars.
* Auto-Alt, Suicide, Reverse Tank, Reverse Mouse, Inverse Mouse, Spin-Lock.
* Configurable Welcome Message.


## Changed

* General Codebase
  * Removed Immediately Invoked Function Expressions.

* Moved animated colors to their own function.
  * Also added Lesbian (`29`) and Bi (`38`).

* Small options menu updates
  * Lists all key binds and also specifies which ones require tokens.

* Upgrade Menu Renderer
  * Now correctly renders various upgrade amounts.

* Player Bots
  * They now upgrade classes and skill naturally.
  * Can be configured with `BOT_XP`, `BOT_SKILL_UPGRADE_CHANCES`, `BOT_CLASS_UPGRADE_CHANCES`.

* Token Management
  * Your actual token strings go into `.env`.
  * The permissions of your token go into `server/permissions.js`.

* Definitions Management
  * Split up into numerous other files, all located in `server/modules/definitions`.

* Upgrade Tiers
  * Instead of manually having to add tiers, you now change `MAX_UPGRADE_TIER`, `TIER_MULTIPLIER`.

* `NECRO`
  * Can be a `SHAPE` number, or an array of them, which details what kind of shaped foods it can infect.

* Configuration Files.
  * `.json` files are in `.js` instead.

* Skills now support up to 255 stat points instead of 15.

* Siege
  * Reworked how wave generation works.
  * Spawns friendly bosses.


## Removed

* 3rd party packages.
  * All NPM packages besides `ws` have been optimised away.


## Fixes

* Entities with 0 body damage don't get assist credit when they happen to ram something as it dies.
* Bots spawn in their team's bases if there are bases.
* Bots fire alt-fire barrels.
* Bots can now use Trapper classes.
* Dominator Game Mode.
* Doesn't kick for invalid tokens, instead just does not give any perms.
* Level Bar now shows max level if you have exactly enough score to reach that level.
* Large `SHAPE`s now work.