# Squarespace local theming with Gulp + Surge

Theming Squarespace sucks. We tend to write vanilla CSS and copy/paste our changes in Squarespace's internal editor. The idea is to give you the dev tools you know and love in a local environment that's easily deployable to surge.sh CDN. All you need to do is to include your new stylesheet through Squarespace's code injection option. This is how you do it.

1. Clone or download repo
2. Install and setup surge.sh account: `npm install --global surge`
3. Install Nucleus globally `npm i -g nucleus-styleguide`
4. Install project dependencies: `npm install` in project folder
5. Adjust prefered domain on line 28 in gulpfile.js – Remember https!. Fx `https://kontrapunkt-devsite.surge.sh`
6. Go to Squarespace > Settings > Advanced > Code Injection. Add `<link rel="stylesheet" href="https://[YOUR DOMAIN]/dist/styles/app.min.css">`
7. Style away and deploy to surge: `gulp deploy`
