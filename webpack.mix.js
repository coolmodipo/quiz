const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                '@': path.resolve(__dirname, 'resources/js'),
                '@sass': path.resolve(__dirname, 'resources/sass'),
                '@components': path.resolve(__dirname, 'resources/js/components'),
                '@queries': path.resolve(__dirname, 'resources/js/_GraphQL/_queries'),
                '@mutations': path.resolve(__dirname, 'resources/js/_GraphQL/_mutations')
            }
        }
    })
    .js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');
