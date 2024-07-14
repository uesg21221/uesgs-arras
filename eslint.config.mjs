import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginHTML from 'eslint-plugin-html';
import pluginAirbnb from 'eslint-config-airbnb';
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import pluginUnusedImports from 'eslint-plugin-unused-imports';

export default [
    {
        files: ['./src/**/*.js'],
        languageOptions: {sourceType: 'commonjs'},
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    {
        plugins: {
            html: pluginHTML,
            airbnb: pluginAirbnb,
            'simple-import-sort': pluginSimpleImportSort,
            'unused-imports': pluginUnusedImports,
        },
    },
    pluginJs.configs.recommended,
    {
        ignores: ['./src/modules/definitions/addons/'],
    },
    {
        rules: {
            'no-undef': 'off',
            'no-unused-vars': 'off',
        },
    },
];
