# dat.gui

Forked from [dataarts/dat.gui](https://github.com/dataarts/dat.gui), modify and added.

A lightweight graphical user interface for changing variables in JavaScript.

Get started with dat.GUI by reading the [API documentation](API.md).

## Change Log

### 2024.5.14

GUI下新增.removeAllControllers() .removeAllFolders() .removeAll()方法;

Controller下新增.hide() .show()方法;

## Packaged Builds

The easiest way to use dat.GUI in your code is by using the built source at `build/dat.gui.min.js`. These built JavaScript files bundle all the necessary dependencies to run dat.GUI.

In your `head` tag, include the following code:

```html
<script type="text/javascript" src="dat.gui.min.js"></script>
```

## Installing from npm

```bash
npm install --save @lijuhong1981/dat.gui
```

```js
// CommonJS:
const dat = require('dat.gui');

// ES6:
import * as dat from 'dat.gui';

const gui = new dat.GUI();
```

## Directory Contents

```text
├── build - Compiled source code.
├── src - Source files.
└── tests - Tests.
```

## Building your own dat.GUI

In the terminal, enter the following:

```bash
npm install
npm run build
```

## npm scripts

- npm run build - Build development and production version of scripts.
- npm run build-docs - Build API markdown docment.

## Working with Content Security Policy

If you're using a server with a Content Security Policy in place that blocks 'unsafe-inline', you will have problems when dat.gui.js tries to inject style information. To get around this, load 'build/dat.gui.css' as an external style sheet.
