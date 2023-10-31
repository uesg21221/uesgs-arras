const room = new Array(15).fill().map((row, rowIndex) => {
    if (rowIndex >= 1 && rowIndex < 14) {
      // Create a row of 'goop' for the center 10x10 region.
      return new Array(15).fill('goop', 1, 14);
    } else {
      // Create a row of empty tiles for the outer border.
      return new Array(15).fill();
    }
  });

module.exports = {
    THE_GOOPS_LOOP: true,
    X_GRID: 15,
    Y_GRID: 15,
    WIDTH: 5000,
    HEIGHT: 5000,
    ROOM_SETUP: room,
    LEVEL_CAP: 4096,
    LEVEL_SKILL_POINT_FUNCTION: level => {
        if (level < 2) return 0;
        if (level <= 40) return 1;
        if (level <= 45 && level & 1 == 1) return 1;
        if (level % 3 == 1 && level < 280) return 1;
        return 0;
    },
};