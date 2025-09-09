
# Angular In UXP

This repo contains a working example of running Angular in UXP.

## Important Information

This branch contains everything needed to demonstrate components, directives, services, and theme awareness.

The most important files to take a look at are 
- [components](src/app/components/) to see an example component
- [directives](src/app/directives/) to see an example directive
- [services](src/app/services/) to see an example service
- [app.component.html](src/app/app.component.html) to see how components/directives are used.
- [app.module.ts](src/app/app.module.ts) to see how components/directives need to be registered.
- [styles.scss](styles.scss) to see how to set theme aware CSS variables

## Getting started

### Pre-requisites

- node v20.18.0; if you don't already, use nvm ( [MAC](https://github.com/nvm-sh/nvm) | [Windows](https://github.com/coreybutler/nvm-windows) )
- [UXP Developer Tool (UDT)](https://developer.adobe.com/photoshop/uxp/2022/guides/devtool/installation/)
- [Visual Studio Code](https://code.visualstudio.com/Download)

### Install dependencies

To install the node modules and pull the git children repositories, run the following:

```sh
npm install
```

### Building

To build for production, run the following:

```sh
npm run build
```

### Watching

To build for development and rebuild on changes, run the following:

```sh
npm run watch
```

### Running Plugin

1. Open the Adobe UXP Developer Tools app
2. Click 'Add Plugin'
3. Navigate to your project folder, then select `dist/manifest.json`. It is import you select the one under the dist folder.
4. Select 'Load' or 'Load & Watch' (you'll want to select 'Load & Watch' if you are running `npm run watch`)

## Authors

- **Jeremiah Lynn** ( [github](https://github.com/jeremiahlynn) )

