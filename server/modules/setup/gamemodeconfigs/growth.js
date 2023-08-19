module.exports = {
    WIDTH: 12000,
    HEIGHT: 12000,
    SKILL_CAP: 45 + (80 - 45) * 6,
    LEVEL_SKILL_POINT_FUNCTION: (level, max_points) => {
        if (level < 2) return 0;
        if (level <= 40) return 1;
        if (level <= 45 && level & 1 == 1) return 1;
        if (level % 6 == 1 && level < (max_points - 45) * 6 + 42) return 1;
        return 0;
    },
};