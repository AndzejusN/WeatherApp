const mix = require('laravel-mix');

mix.setPublicPath('public');

mix.version();

if (mix.inProduction()) {
	mix.sourceMaps();
}

mix.js('assets/js/app.js', 'public/js/app.js');
mix.sass('assets/sass/app.scss', 'public/css/app.css');

