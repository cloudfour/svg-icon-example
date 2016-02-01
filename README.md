# SVG Icon Process Example

- [Explanatory blog post](http://blog.cloudfour.com/our-svg-icon-process/)
- [Live Demo](http://cloudfour.github.io/svg-icon-example/)

## Getting started

0. Install [Node.js](http://nodejs.org/) `v0.12` or later
0. Clone this repository
0. `cd` into the project directory
0. Run `npm start`
0. View http://localhost:3000 in your browser

## Structure

```
├── dist/               Output directory
├── src/
│   ├── icons/
│   │   ├── *.svg       Individual icons
│   │   ├── icons.ai    Source file for icons
│   │   └── icons.yaml  Accessibility info for icons
│   └── static/         Static files
└── gulpfile.js         Build tasks
```

## Deployment

**Note:** This requires _write_ permissions for the repository.

Run `gulp deploy` to update and publish the `gh-pages` branch based on the contents of the current `dist` directory.
