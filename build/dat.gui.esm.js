function ___$insertStyle(css) {
    if (!css || typeof window === 'undefined') {
        return;
    }
    const style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.innerHTML = css;
    document.head.appendChild(style);
    return css;
}

/**
 * dat-gui JavaScript Controller Library
 * https://github.com/dataarts/dat.gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

function colorToString(color, forceCSSHex) {
  const colorFormat = color.__state.conversionName.toString();

  const r = Math.round(color.r);
  const g = Math.round(color.g);
  const b = Math.round(color.b);
  const a = color.a;
  const h = Math.round(color.h);
  const s = color.s.toFixed(1);
  const v = color.v.toFixed(1);

  if (forceCSSHex || (colorFormat === 'THREE_CHAR_HEX') || (colorFormat === 'SIX_CHAR_HEX')) {
    let str = color.hex.toString(16);
    while (str.length < 6) {
      str = '0' + str;
    }
    return '#' + str;
  } else if (colorFormat === 'CSS_RGB') {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  } else if (colorFormat === 'CSS_RGBA') {
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  } else if (colorFormat === 'HEX') {
    return '0x' + color.hex.toString(16);
  } else if (colorFormat === 'RGB_ARRAY') {
    return '[' + r + ',' + g + ',' + b + ']';
  } else if (colorFormat === 'RGBA_ARRAY') {
    return '[' + r + ',' + g + ',' + b + ',' + a + ']';
  } else if (colorFormat === 'RGB_OBJ') {
    return '{r:' + r + ',g:' + g + ',b:' + b + '}';
  } else if (colorFormat === 'RGBA_OBJ') {
    return '{r:' + r + ',g:' + g + ',b:' + b + ',a:' + a + '}';
  } else if (colorFormat === 'HSV_OBJ') {
    return '{h:' + h + ',s:' + s + ',v:' + v + '}';
  } else if (colorFormat === 'HSVA_OBJ') {
    return '{h:' + h + ',s:' + s + ',v:' + v + ',a:' + a + '}';
  }

  return 'unknown format';
}

/**
 * dat-gui JavaScript Controller Library
 * https://github.com/dataarts/dat.gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

const ARR_EACH = Array.prototype.forEach;
const ARR_SLICE = Array.prototype.slice;

/**
 * Band-aid methods for things that should be a lot easier in JavaScript.
 * Implementation and structure inspired by underscore.js
 * http://documentcloud.github.com/underscore/
 */

const Common = {
  BREAK: {},

  extend: function(target) {
    this.each(ARR_SLICE.call(arguments, 1), function(obj) {
      const keys = this.isObject(obj) ? Object.keys(obj) : [];
      keys.forEach(function(key) {
        if (!this.isUndefined(obj[key])) {
          target[key] = obj[key];
        }
      }.bind(this));
    }, this);

    return target;
  },

  defaults: function(target) {
    this.each(ARR_SLICE.call(arguments, 1), function(obj) {
      const keys = this.isObject(obj) ? Object.keys(obj) : [];
      keys.forEach(function(key) {
        if (this.isUndefined(target[key])) {
          target[key] = obj[key];
        }
      }.bind(this));
    }, this);

    return target;
  },

  compose: function() {
    const toCall = ARR_SLICE.call(arguments);
    return function() {
      let args = ARR_SLICE.call(arguments);
      for (let i = toCall.length - 1; i >= 0; i--) {
        args = [toCall[i].apply(this, args)];
      }
      return args[0];
    };
  },

  each: function(obj, itr, scope) {
    if (!obj) {
      return;
    }

    if (ARR_EACH && obj.forEach && obj.forEach === ARR_EACH) {
      obj.forEach(itr, scope);
    } else if (obj.length === obj.length + 0) { // Is number but not NaN
      let key;
      let l;
      for (key = 0, l = obj.length; key < l; key++) {
        if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) {
          return;
        }
      }
    } else {
      for (const key in obj) {
        if (itr.call(scope, obj[key], key) === this.BREAK) {
          return;
        }
      }
    }
  },

  defer: function(fnc) {
    setTimeout(fnc, 0);
  },

  // if the function is called repeatedly, wait until threshold passes until we execute the function
  debounce: function(func, threshold, callImmediately) {
    let timeout;

    return function() {
      const obj = this;
      const args = arguments;
      function delayed() {
        timeout = null;
        if (!callImmediately) func.apply(obj, args);
      }

      const callNow = callImmediately || !timeout;

      clearTimeout(timeout);
      timeout = setTimeout(delayed, threshold);

      if (callNow) {
        func.apply(obj, args);
      }
    };
  },

  toArray: function(obj) {
    if (obj.toArray) return obj.toArray();
    return ARR_SLICE.call(obj);
  },

  isUndefined: function(obj) {
    return obj === undefined;
  },

  isNull: function(obj) {
    return obj === null;
  },

  isNaN: function(obj) {
    return isNaN(obj);
  },

  isArray: Array.isArray || function(obj) {
    return obj.constructor === Array;
  },

  isObject: function(obj) {
    return obj === Object(obj);
  },

  isNumber: function(obj) {
    return obj === obj + 0;
  },

  isString: function(obj) {
    return obj === obj + '';
  },

  isBoolean: function(obj) {
    return obj === false || obj === true;
  },

  isFunction: function(obj) {
    return obj instanceof Function;
  }

};

/**
 * dat-gui JavaScript Controller Library
 * https://github.com/dataarts/dat.gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */


const INTERPRETATIONS = [
  // Strings
  {
    litmus: Common.isString,
    conversions: {
      THREE_CHAR_HEX: {
        read: function(original) {
          const test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
          if (test === null) {
            return false;
          }

          return {
            space: 'HEX',
            hex: parseInt(
              '0x' +
              test[1].toString() + test[1].toString() +
              test[2].toString() + test[2].toString() +
              test[3].toString() + test[3].toString(), 0
            )
          };
        },

        write: colorToString
      },

      SIX_CHAR_HEX: {
        read: function(original) {
          const test = original.match(/^#([A-F0-9]{6})$/i);
          if (test === null) {
            return false;
          }

          return {
            space: 'HEX',
            hex: parseInt('0x' + test[1].toString(), 0)
          };
        },

        write: colorToString
      },

      CSS_RGB: {
        read: function(original) {
          const test = original.match(/^rgb\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);
          if (test === null) {
            return false;
          }

          return {
            space: 'RGB',
            r: parseFloat(test[1]),
            g: parseFloat(test[2]),
            b: parseFloat(test[3])
          };
        },

        write: colorToString
      },

      CSS_RGBA: {
        read: function(original) {
          const test = original.match(/^rgba\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);
          if (test === null) {
            return false;
          }

          return {
            space: 'RGB',
            r: parseFloat(test[1]),
            g: parseFloat(test[2]),
            b: parseFloat(test[3]),
            a: parseFloat(test[4])
          };
        },

        write: colorToString
      }
    }
  },

  // Numbers
  {
    litmus: Common.isNumber,

    conversions: {

      HEX: {
        read: function(original) {
          return {
            space: 'HEX',
            hex: original,
            conversionName: 'HEX'
          };
        },

        write: function(color) {
          return color.hex;
        }
      }

    }

  },

  // Arrays
  {
    litmus: Common.isArray,
    conversions: {
      RGB_ARRAY: {
        read: function(original) {
          if (original.length !== 3) {
            return false;
          }

          return {
            space: 'RGB',
            r: original[0],
            g: original[1],
            b: original[2]
          };
        },

        write: function(color) {
          return [color.r, color.g, color.b];
        }
      },

      RGBA_ARRAY: {
        read: function(original) {
          if (original.length !== 4) return false;
          return {
            space: 'RGB',
            r: original[0],
            g: original[1],
            b: original[2],
            a: original[3]
          };
        },

        write: function(color) {
          return [color.r, color.g, color.b, color.a];
        }
      }
    }
  },

  // Objects
  {
    litmus: Common.isObject,
    conversions: {

      RGBA_OBJ: {
        read: function(original) {
          if (Common.isNumber(original.r) &&
            Common.isNumber(original.g) &&
            Common.isNumber(original.b) &&
            Common.isNumber(original.a)) {
            return {
              space: 'RGB',
              r: original.r,
              g: original.g,
              b: original.b,
              a: original.a
            };
          }
          return false;
        },

        write: function(color) {
          return {
            r: color.r,
            g: color.g,
            b: color.b,
            a: color.a
          };
        }
      },

      RGB_OBJ: {
        read: function(original) {
          if (Common.isNumber(original.r) &&
            Common.isNumber(original.g) &&
            Common.isNumber(original.b)) {
            return {
              space: 'RGB',
              r: original.r,
              g: original.g,
              b: original.b
            };
          }
          return false;
        },

        write: function(color) {
          return {
            r: color.r,
            g: color.g,
            b: color.b
          };
        }
      },

      HSVA_OBJ: {
        read: function(original) {
          if (Common.isNumber(original.h) &&
            Common.isNumber(original.s) &&
            Common.isNumber(original.v) &&
            Common.isNumber(original.a)) {
            return {
              space: 'HSV',
              h: original.h,
              s: original.s,
              v: original.v,
              a: original.a
            };
          }
          return false;
        },

        write: function(color) {
          return {
            h: color.h,
            s: color.s,
            v: color.v,
            a: color.a
          };
        }
      },

      HSV_OBJ: {
        read: function(original) {
          if (Common.isNumber(original.h) &&
            Common.isNumber(original.s) &&
            Common.isNumber(original.v)) {
            return {
              space: 'HSV',
              h: original.h,
              s: original.s,
              v: original.v
            };
          }
          return false;
        },

        write: function(color) {
          return {
            h: color.h,
            s: color.s,
            v: color.v
          };
        }
      }
    }
  }
];

let result;
let toReturn;

const interpret = function() {
  toReturn = false;

  const original = arguments.length > 1 ? Common.toArray(arguments) : arguments[0];
  Common.each(INTERPRETATIONS, function(family) {
    if (family.litmus(original)) {
      Common.each(family.conversions, function(conversion, conversionName) {
        result = conversion.read(original);

        if (toReturn === false && result !== false) {
          toReturn = result;
          result.conversionName = conversionName;
          result.conversion = conversion;
          return Common.BREAK;
        }
      });

      return Common.BREAK;
    }
  });

  return toReturn;
};

/**
 * dat-gui JavaScript Controller Library
 * https://github.com/dataarts/dat.gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

let tmpComponent;

const ColorMath = {
  hsv_to_rgb: function(h, s, v) {
    const hi = Math.floor(h / 60) % 6;

    const f = h / 60 - Math.floor(h / 60);
    const p = v * (1.0 - s);
    const q = v * (1.0 - (f * s));
    const t = v * (1.0 - ((1.0 - f) * s));

    const c = [
      [v, t, p],
      [q, v, p],
      [p, v, t],
      [p, q, v],
      [t, p, v],
      [v, p, q]
    ][hi];

    return {
      r: c[0] * 255,
      g: c[1] * 255,
      b: c[2] * 255
    };
  },

  rgb_to_hsv: function(r, g, b) {
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const delta = max - min;
    let h;
    let s;

    if (max !== 0) {
      s = delta / max;
    } else {
      return {
        h: NaN,
        s: 0,
        v: 0
      };
    }

    if (r === max) {
      h = (g - b) / delta;
    } else if (g === max) {
      h = 2 + (b - r) / delta;
    } else {
      h = 4 + (r - g) / delta;
    }
    h /= 6;
    if (h < 0) {
      h += 1;
    }

    return {
      h: h * 360,
      s: s,
      v: max / 255
    };
  },

  rgb_to_hex: function(r, g, b) {
    let hex = this.hex_with_component(0, 2, r);
    hex = this.hex_with_component(hex, 1, g);
    hex = this.hex_with_component(hex, 0, b);
    return hex;
  },

  component_from_hex: function(hex, componentIndex) {
    return (hex >> (componentIndex * 8)) & 0xFF;
  },

  hex_with_component: function(hex, componentIndex, value) {
    return value << (tmpComponent = componentIndex * 8) | (hex & ~(0xFF << tmpComponent));
  }
};

/**
 * dat-gui JavaScript Controller Library
 * https://github.com/dataarts/dat.gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */


class Color {
  constructor() {
    this.__state = interpret.apply(this, arguments);

    if (this.__state === false) {
      throw new Error('Failed to interpret color arguments');
    }

    this.__state.a = this.__state.a || 1;
  }

  toString() {
    return colorToString(this);
  }

  toHexString() {
    return colorToString(this, true);
  }

  toOriginal() {
    return this.__state.conversion.write(this);
  }
}

function defineRGBComponent(target, component, componentHexIndex) {
  Object.defineProperty(target, component, {
    get: function() {
      if (this.__state.space === 'RGB') {
        return this.__state[component];
      }

      Color.recalculateRGB(this, component, componentHexIndex);

      return this.__state[component];
    },

    set: function(v) {
      if (this.__state.space !== 'RGB') {
        Color.recalculateRGB(this, component, componentHexIndex);
        this.__state.space = 'RGB';
      }

      this.__state[component] = v;
    }
  });
}

function defineHSVComponent(target, component) {
  Object.defineProperty(target, component, {
    get: function() {
      if (this.__state.space === 'HSV') {
        return this.__state[component];
      }

      Color.recalculateHSV(this);

      return this.__state[component];
    },

    set: function(v) {
      if (this.__state.space !== 'HSV') {
        Color.recalculateHSV(this);
        this.__state.space = 'HSV';
      }

      this.__state[component] = v;
    }
  });
}


Color.recalculateRGB = function(color, component, componentHexIndex) {
  if (color.__state.space === 'HEX') {
    color.__state[component] = ColorMath.component_from_hex(color.__state.hex, componentHexIndex);
  } else if (color.__state.space === 'HSV') {
    Common.extend(color.__state, ColorMath.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));
  } else {
    throw new Error('Corrupted color state');
  }
};

Color.recalculateHSV = function(color) {
  const result = ColorMath.rgb_to_hsv(color.r, color.g, color.b);

  Common.extend(color.__state,
    {
      s: result.s,
      v: result.v
    });

  if (!Common.isNaN(result.h)) {
    color.__state.h = result.h;
  } else if (Common.isUndefined(color.__state.h)) {
    color.__state.h = 0;
  }
};

Color.COMPONENTS = ['r', 'g', 'b', 'h', 's', 'v', 'hex', 'a'];

defineRGBComponent(Color.prototype, 'r', 2);
defineRGBComponent(Color.prototype, 'g', 1);
defineRGBComponent(Color.prototype, 'b', 0);

defineHSVComponent(Color.prototype, 'h');
defineHSVComponent(Color.prototype, 's');
defineHSVComponent(Color.prototype, 'v');

Object.defineProperty(Color.prototype, 'a', {
  get: function() {
    return this.__state.a;
  },

  set: function(v) {
    this.__state.a = v;
  }
});

Object.defineProperty(Color.prototype, 'hex', {
  get: function() {
    if (this.__state.space !== 'HEX') {
      this.__state.hex = ColorMath.rgb_to_hex(this.r, this.g, this.b);
      this.__state.space = 'HEX';
    }

    return this.__state.hex;
  },

  set: function(v) {
    this.__state.space = 'HEX';
    this.__state.hex = v;
  }
});

/**
 * dat-gui JavaScript Controller Library
 * https://github.com/dataarts/dat.gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @class An "abstract" class that represents a given property of an object.
 *
 * @param {Object} object The object to be manipulated
 * @param {string} property The name of the property to be manipulated
 */
class Controller {
  constructor(object, property) {
    this.initialValue = object[property];

    /**
     * Those who extend this class will put their DOM elements in here.
     * @type {DOMElement}
     */
    this.domElement = document.createElement('div');

    /**
     * The object to manipulate
     * @type {Object}
     */
    this.object = object;

    /**
     * The name of the property to manipulate
     * @type {String}
     */
    this.property = property;

    /**
     * The function to be called on change.
     * @type {Function}
     * @ignore
     */
    this.__onChange = undefined;

    /**
     * The function to be called on finishing change.
     * @type {Function}
     * @ignore
     */
    this.__onFinishChange = undefined;
  }

  /**
   * Specify that a function fire every time someone changes the value with
   * this Controller.
   *
   * @param {Function} fnc This function will be called whenever the value
   * is modified via this Controller.
   * @returns {Controller} this
   */
  onChange(fnc) {
    this.__onChange = fnc;
    return this;
  }

  /**
   * Specify that a function fire every time someone "finishes" changing
   * the value wih this Controller. Useful for values that change
   * incrementally like numbers or strings.
   *
   * @param {Function} fnc This function will be called whenever
   * someone "finishes" changing the value via this Controller.
   * @returns {Controller} this
   */
  onFinishChange(fnc) {
    this.__onFinishChange = fnc;
    return this;
  }

  /**
   * Change the value of <code>object[property]</code>
   *
   * @param {Object} newValue The new value of <code>object[property]</code>
   */
  setValue(newValue) {
    this.object[this.property] = newValue;
    if (this.__onChange) {
      this.__onChange.call(this, newValue);
    }

    this.updateDisplay();
    return this;
  }

  /**
   * Gets the value of <code>object[property]</code>
   *
   * @returns {Object} The current value of <code>object[property]</code>
   */
  getValue() {
    return this.object[this.property];
  }

  /**
   * Refreshes the visual display of a Controller in order to keep sync
   * with the object's current value.
   * @returns {Controller} this
   */
  updateDisplay() {
    return this;
  }

  /**
   * @returns {boolean} true if the value has deviated from initialValue
   */
  isModified() {
    return this.initialValue !== this.getValue();
  }

  /**
  * Hides the GUI.
  */
  hide() {
    this.domElement.style.display = 'none';
    return this;
  }

  /**
  * Shows the GUI.
  */
  show() {
    this.domElement.style.display = '';
    return this;
  }
}

/**
 * dat-gui JavaScript Controller Library
 * https://github.com/dataarts/dat.gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */


const EVENT_MAP = {
  HTMLEvents: ['change'],
  MouseEvents: ['click', 'mousemove', 'mousedown', 'mouseup', 'mouseover'],
  KeyboardEvents: ['keydown']
};

const EVENT_MAP_INV = {};
Common.each(EVENT_MAP, function(v, k) {
  Common.each(v, function(e) {
    EVENT_MAP_INV[e] = k;
  });
});

const CSS_VALUE_PIXELS = /(\d+(\.\d+)?)px/;

function cssValueToPixels(val) {
  if (val === '0' || Common.isUndefined(val)) {
    return 0;
  }

  const match = val.match(CSS_VALUE_PIXELS);

  if (!Common.isNull(match)) {
    return parseFloat(match[1]);
  }

  // TODO ...ems? %?

  return 0;
}

/**
 * @namespace
 * @member dat.dom
 */
const dom$1 = {

  /**
   *
   * @param elem
   * @param selectable
   */
  makeSelectable: function(elem, selectable) {
    if (elem === undefined || elem.style === undefined) return;

    elem.onselectstart = selectable ? function() {
      return false;
    } : function() {
    };

    elem.style.MozUserSelect = selectable ? 'auto' : 'none';
    elem.style.KhtmlUserSelect = selectable ? 'auto' : 'none';
    elem.unselectable = selectable ? 'on' : 'off';
  },

  /**
   *
   * @param elem
   * @param horizontal
   * @param vert
   */
  makeFullscreen: function(elem, hor, vert) {
    let vertical = vert;
    let horizontal = hor;

    if (Common.isUndefined(horizontal)) {
      horizontal = true;
    }

    if (Common.isUndefined(vertical)) {
      vertical = true;
    }

    elem.style.position = 'absolute';

    if (horizontal) {
      elem.style.left = 0;
      elem.style.right = 0;
    }
    if (vertical) {
      elem.style.top = 0;
      elem.style.bottom = 0;
    }
  },

  /**
   *
   * @param elem
   * @param eventType
   * @param params
   */
  fakeEvent: function(elem, eventType, pars, aux) {
    const params = pars || {};
    const className = EVENT_MAP_INV[eventType];
    if (!className) {
      throw new Error('Event type ' + eventType + ' not supported.');
    }
    const evt = document.createEvent(className);
    switch (className) {
      case 'MouseEvents':
      {
        const clientX = params.x || params.clientX || 0;
        const clientY = params.y || params.clientY || 0;
        evt.initMouseEvent(eventType, params.bubbles || false,
          params.cancelable || true, window, params.clickCount || 1,
          0, // screen X
          0, // screen Y
          clientX, // client X
          clientY, // client Y
          false, false, false, false, 0, null);
        break;
      }
      case 'KeyboardEvents':
      {
        const init = evt.initKeyboardEvent || evt.initKeyEvent; // webkit || moz
        Common.defaults(params, {
          cancelable: true,
          ctrlKey: false,
          altKey: false,
          shiftKey: false,
          metaKey: false,
          keyCode: undefined,
          charCode: undefined
        });
        init(eventType, params.bubbles || false,
          params.cancelable, window,
          params.ctrlKey, params.altKey,
          params.shiftKey, params.metaKey,
          params.keyCode, params.charCode);
        break;
      }
      default:
      {
        evt.initEvent(eventType, params.bubbles || false, params.cancelable || true);
        break;
      }
    }
    Common.defaults(evt, aux);
    elem.dispatchEvent(evt);
  },

  /**
   *
   * @param elem
   * @param event
   * @param func
   * @param bool
   */
  bind: function(elem, event, func, newBool) {
    const bool = newBool || false;
    if (elem.addEventListener) {
      elem.addEventListener(event, func, bool);
    } else if (elem.attachEvent) {
      elem.attachEvent('on' + event, func);
    }
    return dom$1;
  },

  /**
   *
   * @param elem
   * @param event
   * @param func
   * @param bool
   */
  unbind: function(elem, event, func, newBool) {
    const bool = newBool || false;
    if (elem.removeEventListener) {
      elem.removeEventListener(event, func, bool);
    } else if (elem.detachEvent) {
      elem.detachEvent('on' + event, func);
    }
    return dom$1;
  },

  /**
   *
   * @param elem
   * @param className
   */
  addClass: function(elem, className) {
    if (elem.className === undefined) {
      elem.className = className;
    } else if (elem.className !== className) {
      const classes = elem.className.split(/ +/);
      if (classes.indexOf(className) === -1) {
        classes.push(className);
        elem.className = classes.join(' ').replace(/^\s+/, '').replace(/\s+$/, '');
      }
    }
    return dom$1;
  },

  /**
   *
   * @param elem
   * @param className
   */
  removeClass: function(elem, className) {
    if (className) {
      if (elem.className === className) {
        elem.removeAttribute('class');
      } else {
        const classes = elem.className.split(/ +/);
        const index = classes.indexOf(className);
        if (index !== -1) {
          classes.splice(index, 1);
          elem.className = classes.join(' ');
        }
      }
    } else {
      elem.className = undefined;
    }
    return dom$1;
  },

  hasClass: function(elem, className) {
    return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(elem.className) || false;
  },

  /**
   *
   * @param elem
   */
  getWidth: function(elem) {
    const style = getComputedStyle(elem);

    return cssValueToPixels(style['border-left-width']) +
      cssValueToPixels(style['border-right-width']) +
      cssValueToPixels(style['padding-left']) +
      cssValueToPixels(style['padding-right']) +
      cssValueToPixels(style.width);
  },

  /**
   *
   * @param elem
   */
  getHeight: function(elem) {
    const style = getComputedStyle(elem);

    return cssValueToPixels(style['border-top-width']) +
      cssValueToPixels(style['border-bottom-width']) +
      cssValueToPixels(style['padding-top']) +
      cssValueToPixels(style['padding-bottom']) +
      cssValueToPixels(style.height);
  },

  /**
   *
   * @param el
   */
  getOffset: function(el) {
    let elem = el;
    const offset = { left: 0, top: 0 };
    if (elem.offsetParent) {
      do {
        offset.left += elem.offsetLeft;
        offset.top += elem.offsetTop;
        elem = elem.offsetParent;
      } while (elem);
    }
    return offset;
  },

  // http://stackoverflow.com/posts/2684561/revisions
  /**
   *
   * @param elem
   */
  isActive: function(elem) {
    return elem === document.activeElement && (elem.type || elem.href);
  }

};

/**
 * dat-gui JavaScript Controller Library
 * https://github.com/dataarts/dat.gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */


/**
 * @class Provides a checkbox input to alter the boolean property of an object.
 *
 * @extends dat.controllers.Controller
 *
 * @param {Object} object The object to be manipulated
 * @param {string} property The name of the property to be manipulated
 */
class BooleanController extends Controller {
  constructor(object, property) {
    super(object, property);

    const _this = this;
    this.__prev = this.getValue();

    this.__checkbox = document.createElement('input');
    this.__checkbox.setAttribute('type', 'checkbox');

    function onChange() {
      _this.setValue(!_this.__prev);
    }

    dom$1.bind(this.__checkbox, 'change', onChange, false);

    this.domElement.appendChild(this.__checkbox);

    // Match original value
    this.updateDisplay();
  }

  setValue(v) {
    const toReturn = super.setValue(v);
    if (this.__onFinishChange) {
      this.__onFinishChange.call(this, this.getValue());
    }
    this.__prev = this.getValue();
    return toReturn;
  }

  updateDisplay() {
    if (this.getValue() === true) {
      this.__checkbox.setAttribute('checked', 'checked');
      this.__checkbox.checked = true;
      this.__prev = true;
    } else {
      this.__checkbox.checked = false;
      this.__prev = false;
    }

    return super.updateDisplay();
  }
}

/**
 * dat-gui JavaScript Controller Library
 * https://github.com/dataarts/dat.gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */


/**
 * @class Provides a select input to alter the property of an object, using a
 * list of accepted values.
 *
 * @extends dat.controllers.Controller
 *
 * @param {Object} object The object to be manipulated
 * @param {string} property The name of the property to be manipulated
 * @param {Object|string[]} options A map of labels to acceptable values, or
 * a list of acceptable string values.
 */
class OptionController extends Controller {
  constructor(object, property, opts) {
    super(object, property);

    let options = opts;

    const _this = this;

    /**
     * The drop down menu
     * @ignore
     */
    this.__select = document.createElement('select');

    if (Common.isArray(options)) {
      const map = {};
      Common.each(options, function(element) {
        map[element] = element;
      });
      options = map;
    }

    Common.each(options, function(value, key) {
      const opt = document.createElement('option');
      opt.innerHTML = key;
      opt.setAttribute('value', value);
      _this.__select.appendChild(opt);
    });

    // Acknowledge original value
    this.updateDisplay();

    dom$1.bind(this.__select, 'change', function() {
      const desiredValue = this.options[this.selectedIndex].value;
      _this.setValue(desiredValue);
    });

    this.domElement.appendChild(this.__select);
  }

  setValue(v) {
    const toReturn = super.setValue(v);

    if (this.__onFinishChange) {
      this.__onFinishChange.call(this, this.getValue());
    }
    return toReturn;
  }

  updateDisplay() {
    if (dom$1.isActive(this.__select)) return this; // prevent number from updating if user is trying to manually update
    this.__select.value = this.getValue();
    return super.updateDisplay();
  }
}

/**
 * dat-gui JavaScript Controller Library
 * https://github.com/dataarts/dat.gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */


/**
 * @class Provides a text input to alter the string property of an object.
 *
 * @extends dat.controllers.Controller
 *
 * @param {Object} object The object to be manipulated
 * @param {string} property The name of the property to be manipulated
 */
class StringController extends Controller {
  constructor(object, property) {
    super(object, property);

    const _this = this;

    function onChange() {
      _this.setValue(_this.__input.value);
    }

    function onBlur() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    this.__input = document.createElement('input');
    this.__input.setAttribute('type', 'text');

    dom$1.bind(this.__input, 'keyup', onChange);
    dom$1.bind(this.__input, 'change', onChange);
    dom$1.bind(this.__input, 'blur', onBlur);
    dom$1.bind(this.__input, 'keydown', function(e) {
      if (e.keyCode === 13) {
        this.blur();
      }
    });

    this.updateDisplay();

    this.domElement.appendChild(this.__input);
  }

  updateDisplay() {
    // Stops the caret from moving on account of:
    // keyup -> setValue -> updateDisplay
    if (!dom$1.isActive(this.__input)) {
      this.__input.value = this.getValue();
    }
    return super.updateDisplay();
  }
}

/**
 * dat-gui JavaScript Controller Library
 * https://github.com/dataarts/dat.gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */


function numDecimals(x) {
  const _x = x.toString();
  if (_x.indexOf('.') > -1) {
    return _x.length - _x.indexOf('.') - 1;
  }

  return 0;
}

/**
 * @class Represents a given property of an object that is a number.
 *
 * @extends dat.controllers.Controller
 *
 * @param {Object} object The object to be manipulated
 * @param {string} property The name of the property to be manipulated
 * @param {Object} [params] Optional parameters
 * @param {Number} [params.min] Minimum allowed value
 * @param {Number} [params.max] Maximum allowed value
 * @param {Number} [params.step] Increment by which to change value
 */
class NumberController extends Controller {
  constructor(object, property, params) {
    super(object, property);

    const _params = params || {};

    this.__min = _params.min;
    this.__max = _params.max;
    this.__step = _params.step;

    if (Common.isUndefined(this.__step)) {
      if (this.initialValue === 0) {
        this.__impliedStep = 1; // What are we, psychics?
      } else {
        // Hey Doug, check this out.
        this.__impliedStep = Math.pow(10, Math.floor(Math.log(Math.abs(this.initialValue)) / Math.LN10)) / 10;
      }
    } else {
      this.__impliedStep = this.__step;
    }

    this.__precision = numDecimals(this.__impliedStep);
  }

  setValue(v) {
    let _v = v;

    if (this.__min !== undefined && _v < this.__min) {
      _v = this.__min;
    } else if (this.__max !== undefined && _v > this.__max) {
      _v = this.__max;
    }

    if (this.__step !== undefined && _v % this.__step !== 0) {
      _v = Math.round(_v / this.__step) * this.__step;
    }

    return super.setValue(_v);
  }

  /**
   * Specify a minimum value for <code>object[property]</code>.
   *
   * @param {Number} minValue The minimum value for
   * <code>object[property]</code>
   * @returns {dat.controllers.NumberController} this
   */
  min(minValue) {
    this.__min = minValue;
    return this;
  }

  /**
   * Specify a maximum value for <code>object[property]</code>.
   *
   * @param {Number} maxValue The maximum value for
   * <code>object[property]</code>
   * @returns {dat.controllers.NumberController} this
   */
  max(maxValue) {
    this.__max = maxValue;
    return this;
  }

  /**
   * Specify a step value that dat.controllers.NumberController
   * increments by.
   *
   * @param {Number} stepValue The step value for
   * dat.controllers.NumberController
   * @default if minimum and maximum specified increment is 1% of the
   * difference otherwise stepValue is 1
   * @returns {dat.controllers.NumberController} this
   */
  step(stepValue) {
    this.__step = stepValue;
    this.__impliedStep = stepValue;
    this.__precision = numDecimals(stepValue);
    return this;
  }
}

/**
 * dat-gui JavaScript Controller Library
 * https://github.com/dataarts/dat.gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */


function roundToDecimal(value, decimals) {
  const tenTo = Math.pow(10, decimals);
  return Math.round(value * tenTo) / tenTo;
}

/**
 * @class Represents a given property of an object that is a number and
 * provides an input element with which to manipulate it.
 *
 * @extends dat.controllers.Controller
 * @extends dat.controllers.NumberController
 *
 * @param {Object} object The object to be manipulated
 * @param {string} property The name of the property to be manipulated
 * @param {Object} [params] Optional parameters
 * @param {Number} [params.min] Minimum allowed value
 * @param {Number} [params.max] Maximum allowed value
 * @param {Number} [params.step] Increment by which to change value
 */
class NumberControllerBox extends NumberController {
  constructor(object, property, params) {
    super(object, property, params);

    this.__truncationSuspended = false;

    const _this = this;

    /**
     * {Number} Previous mouse y position
     * @ignore
     */
    let prevY;

    function onChange() {
      const attempted = parseFloat(_this.__input.value);
      if (!Common.isNaN(attempted)) {
        _this.setValue(attempted);
      }
    }

    function onFinish() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    function onBlur() {
      onFinish();
    }

    function onMouseDrag(e) {
      const diff = prevY - e.clientY;
      _this.setValue(_this.getValue() + diff * _this.__impliedStep);

      prevY = e.clientY;
    }

    function onMouseUp() {
      dom$1.unbind(window, 'mousemove', onMouseDrag);
      dom$1.unbind(window, 'mouseup', onMouseUp);
      onFinish();
    }

    function onMouseDown(e) {
      dom$1.bind(window, 'mousemove', onMouseDrag);
      dom$1.bind(window, 'mouseup', onMouseUp);
      prevY = e.clientY;
    }

    this.__input = document.createElement('input');
    this.__input.setAttribute('type', 'text');

    // Makes it so manually specified values are not truncated.

    dom$1.bind(this.__input, 'change', onChange);
    dom$1.bind(this.__input, 'blur', onBlur);
    dom$1.bind(this.__input, 'mousedown', onMouseDown);
    dom$1.bind(this.__input, 'keydown', function(e) {
      // When pressing enter, you can be as precise as you want.
      if (e.keyCode === 13) {
        _this.__truncationSuspended = true;
        this.blur();
        _this.__truncationSuspended = false;
        onFinish();
      }
    });

    this.updateDisplay();

    this.domElement.appendChild(this.__input);
  }

  updateDisplay() {
    this.__input.value = this.__truncationSuspended ? this.getValue() : roundToDecimal(this.getValue(), this.__precision);
    return super.updateDisplay();
  }
}

/**
 * dat-gui JavaScript Controller Library
 * https://github.com/dataarts/dat.gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */


function map(v, i1, i2, o1, o2) {
  return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
}

/**
 * @class Represents a given property of an object that is a number, contains
 * a minimum and maximum, and provides a slider element with which to
 * manipulate it. It should be noted that the slider element is made up of
 * <code>&lt;div&gt;</code> tags, <strong>not</strong> the html5
 * <code>&lt;slider&gt;</code> element.
 *
 * @extends dat.controllers.Controller
 * @extends dat.controllers.NumberController
 *
 * @param {Object} object The object to be manipulated
 * @param {string} property The name of the property to be manipulated
 * @param {Number} minValue Minimum allowed value
 * @param {Number} maxValue Maximum allowed value
 * @param {Number} stepValue Increment by which to change value
 */
class NumberControllerSlider extends NumberController {
  constructor(object, property, min, max, step) {
    super(object, property, { min: min, max: max, step: step });

    const _this = this;

    this.__background = document.createElement('div');
    this.__foreground = document.createElement('div');

    dom$1.bind(this.__background, 'mousedown', onMouseDown);
    dom$1.bind(this.__background, 'touchstart', onTouchStart);

    dom$1.addClass(this.__background, 'slider');
    dom$1.addClass(this.__foreground, 'slider-fg');

    function onMouseDown(e) {
      document.activeElement.blur();

      dom$1.bind(window, 'mousemove', onMouseDrag);
      dom$1.bind(window, 'mouseup', onMouseUp);

      onMouseDrag(e);
    }

    function onMouseDrag(e) {
      e.preventDefault();

      const bgRect = _this.__background.getBoundingClientRect();

      _this.setValue(
        map(e.clientX, bgRect.left, bgRect.right, _this.__min, _this.__max)
      );

      return false;
    }

    function onMouseUp() {
      dom$1.unbind(window, 'mousemove', onMouseDrag);
      dom$1.unbind(window, 'mouseup', onMouseUp);
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    function onTouchStart(e) {
      if (e.touches.length !== 1) { return; }
      dom$1.bind(window, 'touchmove', onTouchMove);
      dom$1.bind(window, 'touchend', onTouchEnd);
      onTouchMove(e);
    }

    function onTouchMove(e) {
      const clientX = e.touches[0].clientX;
      const bgRect = _this.__background.getBoundingClientRect();

      _this.setValue(
        map(clientX, bgRect.left, bgRect.right, _this.__min, _this.__max)
      );
    }

    function onTouchEnd() {
      dom$1.unbind(window, 'touchmove', onTouchMove);
      dom$1.unbind(window, 'touchend', onTouchEnd);
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    this.updateDisplay();

    this.__background.appendChild(this.__foreground);
    this.domElement.appendChild(this.__background);
  }

  updateDisplay() {
    const pct = (this.getValue() - this.__min) / (this.__max - this.__min);
    this.__foreground.style.width = pct * 100 + '%';
    return super.updateDisplay();
  }
}

/**
 * dat-gui JavaScript Controller Library
 * https://github.com/dataarts/dat.gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */


/**
 * @class Provides a GUI interface to fire a specified method, a property of an object.
 *
 * @extends dat.controllers.Controller
 *
 * @param {Object} object The object to be manipulated
 * @param {string} property The name of the property to be manipulated
 */
class FunctionController extends Controller {
  constructor(object, property, text) {
    super(object, property);

    const _this = this;

    this.__button = document.createElement('div');
    this.__button.innerHTML = text === undefined ? 'Fire' : text;

    dom$1.bind(this.__button, 'click', function(e) {
      e.preventDefault();
      _this.fire();
      return false;
    });

    dom$1.addClass(this.__button, 'button');

    this.domElement.appendChild(this.__button);
  }

  fire() {
    if (this.__onChange) {
      this.__onChange.call(this);
    }
    this.getValue().call(this.object);
    if (this.__onFinishChange) {
      this.__onFinishChange.call(this, this.getValue());
    }
  }
}

/**
 * dat-gui JavaScript Controller Library
 * https://github.com/dataarts/dat.gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */


/**
 * @class Represents a given property of an object that is a color.
 * @param {Object} object
 * @param {string} property
 */
class ColorController extends Controller {
  constructor(object, property) {
    super(object, property);

    this.__color = new Color(this.getValue());
    this.__temp = new Color(0);

    const _this = this;

    this.domElement = document.createElement('div');

    dom$1.makeSelectable(this.domElement, false);

    this.__selector = document.createElement('div');
    this.__selector.className = 'selector';

    this.__saturation_field = document.createElement('div');
    this.__saturation_field.className = 'saturation-field';

    this.__field_knob = document.createElement('div');
    this.__field_knob.className = 'field-knob';
    this.__field_knob_border = '2px solid ';

    this.__hue_knob = document.createElement('div');
    this.__hue_knob.className = 'hue-knob';

    this.__hue_field = document.createElement('div');
    this.__hue_field.className = 'hue-field';

    this.__input = document.createElement('input');
    this.__input.type = 'text';
    this.__input_textShadow = '0 1px 1px ';

    dom$1.bind(this.__input, 'keydown', function(e) {
      if (e.keyCode === 13) { // on enter
        onBlur.call(this);
      }
    });

    dom$1.bind(this.__input, 'blur', onBlur);

    dom$1.bind(this.__selector, 'mousedown', function(/* e */) {
      dom$1
        .addClass(this, 'drag')
        .bind(window, 'mouseup', function(/* e */) {
          dom$1.removeClass(_this.__selector, 'drag');
        });
    });

    dom$1.bind(this.__selector, 'touchstart', function(/* e */) {
      dom$1
        .addClass(this, 'drag')
        .bind(window, 'touchend', function(/* e */) {
          dom$1.removeClass(_this.__selector, 'drag');
        });
    });

    const valueField = document.createElement('div');

    Common.extend(this.__selector.style, {
      width: '122px',
      height: '102px',
      padding: '3px',
      backgroundColor: '#222',
      boxShadow: '0px 1px 3px rgba(0,0,0,0.3)'
    });

    Common.extend(this.__field_knob.style, {
      position: 'absolute',
      width: '12px',
      height: '12px',
      border: this.__field_knob_border + (this.__color.v < 0.5 ? '#fff' : '#000'),
      boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
      borderRadius: '12px',
      zIndex: 1
    });

    Common.extend(this.__hue_knob.style, {
      position: 'absolute',
      width: '15px',
      height: '2px',
      borderRight: '4px solid #fff',
      zIndex: 1
    });

    Common.extend(this.__saturation_field.style, {
      width: '100px',
      height: '100px',
      border: '1px solid #555',
      marginRight: '3px',
      display: 'inline-block',
      cursor: 'pointer'
    });

    Common.extend(valueField.style, {
      width: '100%',
      height: '100%',
      background: 'none'
    });

    linearGradient(valueField, 'top', 'rgba(0,0,0,0)', '#000');

    Common.extend(this.__hue_field.style, {
      width: '15px',
      height: '100px',
      border: '1px solid #555',
      cursor: 'ns-resize',
      position: 'absolute',
      top: '3px',
      right: '3px'
    });

    hueGradient(this.__hue_field);

    Common.extend(this.__input.style, {
      outline: 'none',
      //      width: '120px',
      textAlign: 'center',
      //      padding: '4px',
      //      marginBottom: '6px',
      color: '#fff',
      border: 0,
      fontWeight: 'bold',
      textShadow: this.__input_textShadow + 'rgba(0,0,0,0.7)'
    });

    dom$1.bind(this.__saturation_field, 'mousedown', fieldDown);
    dom$1.bind(this.__saturation_field, 'touchstart', fieldDown);

    dom$1.bind(this.__field_knob, 'mousedown', fieldDown);
    dom$1.bind(this.__field_knob, 'touchstart', fieldDown);

    dom$1.bind(this.__hue_field, 'mousedown', fieldDownH);
    dom$1.bind(this.__hue_field, 'touchstart', fieldDownH);

    function fieldDown(e) {
      setSV(e);
      dom$1.bind(window, 'mousemove', setSV);
      dom$1.bind(window, 'touchmove', setSV);
      dom$1.bind(window, 'mouseup', fieldUpSV);
      dom$1.bind(window, 'touchend', fieldUpSV);
    }

    function fieldDownH(e) {
      setH(e);
      dom$1.bind(window, 'mousemove', setH);
      dom$1.bind(window, 'touchmove', setH);
      dom$1.bind(window, 'mouseup', fieldUpH);
      dom$1.bind(window, 'touchend', fieldUpH);
    }

    function fieldUpSV() {
      dom$1.unbind(window, 'mousemove', setSV);
      dom$1.unbind(window, 'touchmove', setSV);
      dom$1.unbind(window, 'mouseup', fieldUpSV);
      dom$1.unbind(window, 'touchend', fieldUpSV);
      onFinish();
    }

    function fieldUpH() {
      dom$1.unbind(window, 'mousemove', setH);
      dom$1.unbind(window, 'touchmove', setH);
      dom$1.unbind(window, 'mouseup', fieldUpH);
      dom$1.unbind(window, 'touchend', fieldUpH);
      onFinish();
    }

    function onBlur() {
      const i = interpret(this.value);
      if (i !== false) {
        _this.__color.__state = i;
        _this.setValue(_this.__color.toOriginal());
      } else {
        this.value = _this.__color.toString();
      }
    }

    function onFinish() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.__color.toOriginal());
      }
    }

    this.__saturation_field.appendChild(valueField);
    this.__selector.appendChild(this.__field_knob);
    this.__selector.appendChild(this.__saturation_field);
    this.__selector.appendChild(this.__hue_field);
    this.__hue_field.appendChild(this.__hue_knob);

    this.domElement.appendChild(this.__input);
    this.domElement.appendChild(this.__selector);

    this.updateDisplay();

    function setSV(e) {
      if (e.type.indexOf('touch') === -1) { e.preventDefault(); }

      const fieldRect = _this.__saturation_field.getBoundingClientRect();
      const { clientX, clientY } = (e.touches && e.touches[0]) || e;
      let s = (clientX - fieldRect.left) / (fieldRect.right - fieldRect.left);
      let v = 1 - (clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);

      if (v > 1) {
        v = 1;
      } else if (v < 0) {
        v = 0;
      }

      if (s > 1) {
        s = 1;
      } else if (s < 0) {
        s = 0;
      }

      _this.__color.v = v;
      _this.__color.s = s;

      _this.setValue(_this.__color.toOriginal());


      return false;
    }

    function setH(e) {
      if (e.type.indexOf('touch') === -1) { e.preventDefault(); }

      const fieldRect = _this.__hue_field.getBoundingClientRect();
      const { clientY } = (e.touches && e.touches[0]) || e;
      let h = 1 - (clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);

      if (h > 1) {
        h = 1;
      } else if (h < 0) {
        h = 0;
      }

      _this.__color.h = h * 360;

      _this.setValue(_this.__color.toOriginal());

      return false;
    }
  }

  updateDisplay() {
    const i = interpret(this.getValue());

    if (i !== false) {
      let mismatch = false;

      // Check for mismatch on the interpreted value.

      Common.each(Color.COMPONENTS, function(component) {
        if (!Common.isUndefined(i[component]) && !Common.isUndefined(this.__color.__state[component]) &&
          i[component] !== this.__color.__state[component]) {
          mismatch = true;
          return {}; // break
        }
      }, this);

      // If nothing diverges, we keep our previous values
      // for statefulness, otherwise we recalculate fresh
      if (mismatch) {
        Common.extend(this.__color.__state, i);
      }
    }

    Common.extend(this.__temp.__state, this.__color.__state);

    this.__temp.a = 1;

    const flip = (this.__color.v < 0.5 || this.__color.s > 0.5) ? 255 : 0;
    const _flip = 255 - flip;

    Common.extend(this.__field_knob.style, {
      marginLeft: 100 * this.__color.s - 7 + 'px',
      marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
      backgroundColor: this.__temp.toHexString(),
      border: this.__field_knob_border + 'rgb(' + flip + ',' + flip + ',' + flip + ')'
    });

    this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + 'px';

    this.__temp.s = 1;
    this.__temp.v = 1;

    linearGradient(this.__saturation_field, 'left', '#fff', this.__temp.toHexString());

    this.__input.value = this.__color.toString();

    Common.extend(this.__input.style, {
      backgroundColor: this.__color.toHexString(),
      color: 'rgb(' + flip + ',' + flip + ',' + flip + ')',
      textShadow: this.__input_textShadow + 'rgba(' + _flip + ',' + _flip + ',' + _flip + ',.7)'
    });
  }
}

const vendors = ['-moz-', '-o-', '-webkit-', '-ms-', ''];

function linearGradient(elem, x, a, b) {
  elem.style.background = '';
  Common.each(vendors, function(vendor) {
    elem.style.cssText += 'background: ' + vendor + 'linear-gradient(' + x + ', ' + a + ' 0%, ' + b + ' 100%); ';
  });
}

function hueGradient(elem) {
  elem.style.background = '';
  elem.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);';
  elem.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
}

/**
 * dat-gui JavaScript Controller Library
 * https://github.com/dataarts/dat.gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

const css = {
  load: function(url, indoc) {
    const doc = indoc || document;
    const link = doc.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    doc.getElementsByTagName('head')[0].appendChild(link);
  },

  inject: function(cssContent, indoc) {
    const doc = indoc || document;
    const injected = document.createElement('style');
    injected.type = 'text/css';
    injected.innerHTML = cssContent;
    const head = doc.getElementsByTagName('head')[0];
    try {
      head.appendChild(injected);
    } catch (e) { // Unable to inject CSS, probably because of a Content Security Policy
    }
  }
};

const saveDialogContents = `<div id="dg-save" class="dg dialogue">

  Here's the new load parameter for your <code>GUI</code>'s constructor:

  <textarea id="dg-new-constructor"></textarea>

  <div id="dg-save-locally">

    <input id="dg-local-storage" type="checkbox"/> Automatically save
    values to <code>localStorage</code> on exit.

    <div id="dg-local-explain">The values saved to <code>localStorage</code> will
      override those passed to <code>dat.GUI</code>'s constructor. This makes it
      easier to work incrementally, but <code>localStorage</code> is fragile,
      and your friends may not see the same values you do.

    </div>

  </div>

</div>`;

/**
 * dat-gui JavaScript Controller Library
 * https://github.com/dataarts/dat.gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */


const ControllerFactory = function(object, property) {
  const initialValue = object[property];

  // Providing options?
  if (Common.isArray(arguments[2]) || Common.isObject(arguments[2])) {
    return new OptionController(object, property, arguments[2]);
  }

  // Providing a map?
  if (Common.isNumber(initialValue)) {
    // Has min and max? (slider)
    if (Common.isNumber(arguments[2]) && Common.isNumber(arguments[3])) {
      // has step?
      if (Common.isNumber(arguments[4])) {
        return new NumberControllerSlider(object, property,
          arguments[2], arguments[3], arguments[4]);
      }

      return new NumberControllerSlider(object, property, arguments[2], arguments[3]);
    }

    // number box
    if (Common.isNumber(arguments[4])) { // has step
      return new NumberControllerBox(object, property,
        { min: arguments[2], max: arguments[3], step: arguments[4] });
    }
    return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3] });
  }

  if (Common.isString(initialValue)) {
    return new StringController(object, property);
  }

  if (Common.isFunction(initialValue)) {
    return new FunctionController(object, property, '');
  }

  if (Common.isBoolean(initialValue)) {
    return new BooleanController(object, property);
  }

  return null;
};

/**
 * dat-gui JavaScript Controller Library
 * https://github.com/dataarts/dat.gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

function requestAnimationFrame(callback) {
  setTimeout(callback, 1000 / 60);
}

var requestAnimationFrame$1 = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    requestAnimationFrame;

/**
 * dat-gui JavaScript Controller Library
 * https://github.com/dataarts/dat.gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */


class CenteredDiv {
  constructor() {
    this.backgroundElement = document.createElement('div');
    Common.extend(this.backgroundElement.style, {
      backgroundColor: 'rgba(0,0,0,0.8)',
      top: 0,
      left: 0,
      display: 'none',
      zIndex: '1000',
      opacity: 0,
      WebkitTransition: 'opacity 0.2s linear',
      transition: 'opacity 0.2s linear'
    });

    dom$1.makeFullscreen(this.backgroundElement);
    this.backgroundElement.style.position = 'fixed';

    this.domElement = document.createElement('div');
    Common.extend(this.domElement.style, {
      position: 'fixed',
      display: 'none',
      zIndex: '1001',
      opacity: 0,
      WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear',
      transition: 'transform 0.2s ease-out, opacity 0.2s linear'
    });


    document.body.appendChild(this.backgroundElement);
    document.body.appendChild(this.domElement);

    const _this = this;
    dom$1.bind(this.backgroundElement, 'click', function() {
      _this.hide();
    });
  }

  show() {
    const _this = this;

    this.backgroundElement.style.display = 'block';

    this.domElement.style.display = 'block';
    this.domElement.style.opacity = 0;
    //    this.domElement.style.top = '52%';
    this.domElement.style.webkitTransform = 'scale(1.1)';

    this.layout();

    Common.defer(function() {
      _this.backgroundElement.style.opacity = 1;
      _this.domElement.style.opacity = 1;
      _this.domElement.style.webkitTransform = 'scale(1)';
    });
  }

  /**
   * Hide centered div
   */
  hide() {
    const _this = this;

    const hide = function() {
      _this.domElement.style.display = 'none';
      _this.backgroundElement.style.display = 'none';

      dom$1.unbind(_this.domElement, 'webkitTransitionEnd', hide);
      dom$1.unbind(_this.domElement, 'transitionend', hide);
      dom$1.unbind(_this.domElement, 'oTransitionEnd', hide);
    };

    dom$1.bind(this.domElement, 'webkitTransitionEnd', hide);
    dom$1.bind(this.domElement, 'transitionend', hide);
    dom$1.bind(this.domElement, 'oTransitionEnd', hide);

    this.backgroundElement.style.opacity = 0;
    //    this.domElement.style.top = '48%';
    this.domElement.style.opacity = 0;
    this.domElement.style.webkitTransform = 'scale(1.1)';
  }

  layout() {
    this.domElement.style.left = window.innerWidth / 2 - dom$1.getWidth(this.domElement) / 2 + 'px';
    this.domElement.style.top = window.innerHeight / 2 - dom$1.getHeight(this.domElement) / 2 + 'px';
  }
}

var styleSheet = ___$insertStyle(".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .cr.function .property-name{width:100%}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco,monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px \"Lucida Grande\",sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2fa1d6}.dg .cr.number input[type=text]{color:#2fa1d6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2fa1d6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}");

/**
 * dat-gui JavaScript Controller Library
 * https://github.com/dataarts/dat.gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */


css.inject(styleSheet);

/** @ignore Outer-most className for GUI's */
const CSS_NAMESPACE = 'dg';

const HIDE_KEY_CODE = 72;

/** @ignore The only value shared between the JS and SCSS. Use caution. */
const CLOSE_BUTTON_HEIGHT = 20;

const DEFAULT_DEFAULT_PRESET_NAME = 'Default';

const SUPPORTS_LOCAL_STORAGE = (function() {
  try {
    return !!window.localStorage;
  } catch (e) {
    return false;
  }
}());

let SAVE_DIALOGUE;

/** @ignore Have we yet to create an autoPlace GUI? */
let autoPlaceVirgin = true;

/** @ignore Fixed position div that auto place GUI's go inside */
let autoPlaceContainer;

/** @ignore Are we hiding the GUI's ? */
let hide = false;

/** @private GUI's which should be hidden */
const hideableGuis = [];

/**
 * @class A lightweight controller library for JavaScript. It allows you to easily
 * manipulate variables and fire functions on the fly.
 *
 * @typicalname gui
 *
 * @example
 * // Creating a GUI with options.
 * var gui = new dat.GUI({name: 'My GUI'});
 *
 * @example
 * // Creating a GUI and a subfolder.
 * var gui = new dat.GUI();
 * var folder1 = gui.addFolder('Flow Field');
 *
 * @param {Object} [params]
 * @param {String} [params.name] The name of this GUI.
 * @param {Object} [params.load] JSON object representing the saved state of
 * this GUI.
 * @param {dat.gui.GUI} [params.parent] The GUI I'm nested in.
 * @param {Boolean} [params.autoPlace=true]
 * @param {Boolean} [params.hideable=true] If true, GUI is shown/hidden by <kbd>h</kbd> keypress.
 * @param {Boolean} [params.closed=false] If true, starts closed
 * @param {Boolean} [params.closeOnTop=false] If true, close/open button shows on top of the GUI
 */
const GUI$1 = function(pars) {
  const _this = this;

  let params = pars || {};

  /**
   * Outermost DOM Element
   * @type {DOMElement}
   */
  this.domElement = document.createElement('div');
  this.__ul = document.createElement('ul');
  this.domElement.appendChild(this.__ul);

  dom$1.addClass(this.domElement, CSS_NAMESPACE);

  /**
   * Nested GUI's by name
   * @ignore
   */
  this.__folders = {};

  this.__controllers = [];

  /**
   * List of objects I'm remembering for save, only used in top level GUI
   * @ignore
   */
  this.__rememberedObjects = [];

  /**
   * Maps the index of remembered objects to a map of controllers, only used
   * in top level GUI.
   *
   * @private
   * @ignore
   *
   * @example
   * [
   *  {
     *    propertyName: Controller,
     *    anotherPropertyName: Controller
     *  },
   *  {
     *    propertyName: Controller
     *  }
   * ]
   */
  this.__rememberedObjectIndecesToControllers = [];

  this.__listening = [];

  // Default parameters
  params = Common.defaults(params, {
    closeOnTop: false,
    autoPlace: true,
    width: GUI$1.DEFAULT_WIDTH
  });

  params = Common.defaults(params, {
    resizable: params.autoPlace,
    hideable: params.autoPlace
  });

  if (!Common.isUndefined(params.load)) {
    // Explicit preset
    if (params.preset) {
      params.load.preset = params.preset;
    }
  } else {
    params.load = { preset: DEFAULT_DEFAULT_PRESET_NAME };
  }

  if (Common.isUndefined(params.parent) && params.hideable) {
    hideableGuis.push(this);
  }

  // Only root level GUI's are resizable.
  params.resizable = Common.isUndefined(params.parent) && params.resizable;

  if (params.autoPlace && Common.isUndefined(params.scrollable)) {
    params.scrollable = true;
  }
  //    params.scrollable = common.isUndefined(params.parent) && params.scrollable === true;

  // Not part of params because I don't want people passing this in via
  // constructor. Should be a 'remembered' value.
  let useLocalStorage =
    SUPPORTS_LOCAL_STORAGE &&
    localStorage.getItem(getLocalStorageHash(this, 'isLocal')) === 'true';

  let saveToLocalStorage;
  let titleRow;

  Object.defineProperties(this,
    /** @lends GUI.prototype */
    {
      /**
       * The parent <code>GUI</code>
       * @type dat.gui.GUI
       */
      parent: {
        get: function() {
          return params.parent;
        }
      },

      scrollable: {
        get: function() {
          return params.scrollable;
        }
      },

      /**
       * Handles <code>GUI</code>'s element placement for you
       * @type Boolean
       */
      autoPlace: {
        get: function() {
          return params.autoPlace;
        }
      },

      /**
       * Handles <code>GUI</code>'s position of open/close button
       * @type Boolean
       */
      closeOnTop: {
        get: function() {
          return params.closeOnTop;
        }
      },

      /**
       * The identifier for a set of saved values
       * @type String
       */
      preset: {
        get: function() {
          if (_this.parent) {
            return _this.getRoot().preset;
          }

          return params.load.preset;
        },

        set: function(v) {
          if (_this.parent) {
            _this.getRoot().preset = v;
          } else {
            params.load.preset = v;
          }
          setPresetSelectIndex(this);
          _this.revert();
        }
      },

      /**
       * The width of <code>GUI</code> element
       * @type Number
       */
      width: {
        get: function() {
          return params.width;
        },
        set: function(v) {
          params.width = v;
          setWidth(_this, v);
        }
      },

      /**
       * The name of <code>GUI</code>. Used for folders. i.e
       * a folder's name
       * @type String
       */
      name: {
        get: function() {
          return params.name;
        },
        set: function(v) {
          // TODO Check for collisions among sibling folders
          params.name = v;
          if (titleRow) {
            titleRow.innerHTML = params.name;
          }
        }
      },

      /**
       * Whether the <code>GUI</code> is collapsed or not
       * @type Boolean
       */
      closed: {
        get: function() {
          return params.closed;
        },
        set: function(v) {
          params.closed = v;
          if (params.closed) {
            dom$1.addClass(_this.__ul, GUI$1.CLASS_CLOSED);
          } else {
            dom$1.removeClass(_this.__ul, GUI$1.CLASS_CLOSED);
          }
          // For browsers that aren't going to respect the CSS transition,
          // Lets just check our height against the window height right off
          // the bat.
          this.onResize();

          if (_this.__closeButton) {
            _this.__closeButton.innerHTML = v ? GUI$1.TEXT_OPEN : GUI$1.TEXT_CLOSED;
          }
        }
      },

      /**
       * Contains all presets
       * @type Object
       */
      load: {
        get: function() {
          return params.load;
        }
      },

      /**
       * Determines whether or not to use <a href="https://developer.mozilla.org/en/DOM/Storage#localStorage">localStorage</a> as the means for
       * <code>remember</code>ing
       * @type Boolean
       */
      useLocalStorage: {

        get: function() {
          return useLocalStorage;
        },
        set: function(bool) {
          if (SUPPORTS_LOCAL_STORAGE) {
            useLocalStorage = bool;
            if (bool) {
              dom$1.bind(window, 'unload', saveToLocalStorage);
            } else {
              dom$1.unbind(window, 'unload', saveToLocalStorage);
            }
            localStorage.setItem(getLocalStorageHash(_this, 'isLocal'), bool);
          }
        }
      }
    });

  // Are we a root level GUI?
  if (Common.isUndefined(params.parent)) {
    this.closed = params.closed || false;

    dom$1.addClass(this.domElement, GUI$1.CLASS_MAIN);
    dom$1.makeSelectable(this.domElement, false);

    // Are we supposed to be loading locally?
    if (SUPPORTS_LOCAL_STORAGE) {
      if (useLocalStorage) {
        _this.useLocalStorage = true;

        const savedGui = localStorage.getItem(getLocalStorageHash(this, 'gui'));

        if (savedGui) {
          params.load = JSON.parse(savedGui);
        }
      }
    }

    this.__closeButton = document.createElement('div');
    this.__closeButton.innerHTML = GUI$1.TEXT_CLOSED;
    dom$1.addClass(this.__closeButton, GUI$1.CLASS_CLOSE_BUTTON);
    if (params.closeOnTop) {
      dom$1.addClass(this.__closeButton, GUI$1.CLASS_CLOSE_TOP);
      this.domElement.insertBefore(this.__closeButton, this.domElement.childNodes[0]);
    } else {
      dom$1.addClass(this.__closeButton, GUI$1.CLASS_CLOSE_BOTTOM);
      this.domElement.appendChild(this.__closeButton);
    }

    dom$1.bind(this.__closeButton, 'click', function() {
      _this.closed = !_this.closed;
    });
    // Oh, you're a nested GUI!
  } else {
    if (params.closed === undefined) {
      params.closed = true;
    }

    const titleRowName = document.createTextNode(params.name);
    dom$1.addClass(titleRowName, 'controller-name');

    titleRow = addRow(_this, titleRowName);

    const onClickTitle = function(e) {
      e.preventDefault();
      _this.closed = !_this.closed;
      return false;
    };

    dom$1.addClass(this.__ul, GUI$1.CLASS_CLOSED);

    dom$1.addClass(titleRow, 'title');
    dom$1.bind(titleRow, 'click', onClickTitle);

    if (!params.closed) {
      this.closed = false;
    }
  }

  if (params.autoPlace) {
    if (Common.isUndefined(params.parent)) {
      if (autoPlaceVirgin) {
        autoPlaceContainer = document.createElement('div');
        dom$1.addClass(autoPlaceContainer, CSS_NAMESPACE);
        dom$1.addClass(autoPlaceContainer, GUI$1.CLASS_AUTO_PLACE_CONTAINER);
        document.body.appendChild(autoPlaceContainer);
        autoPlaceVirgin = false;
      }

      // Put it in the dom for you.
      autoPlaceContainer.appendChild(this.domElement);

      // Apply the auto styles
      dom$1.addClass(this.domElement, GUI$1.CLASS_AUTO_PLACE);
    }


    // Make it not elastic.
    if (!this.parent) {
      setWidth(_this, params.width);
    }
  }

  this.__resizeHandler = function() {
    _this.onResizeDebounced();
  };

  dom$1.bind(window, 'resize', this.__resizeHandler);
  dom$1.bind(this.__ul, 'webkitTransitionEnd', this.__resizeHandler);
  dom$1.bind(this.__ul, 'transitionend', this.__resizeHandler);
  dom$1.bind(this.__ul, 'oTransitionEnd', this.__resizeHandler);
  this.onResize();

  if (params.resizable) {
    addResizeHandle(this);
  }

  saveToLocalStorage = function() {
    if (SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(_this, 'isLocal')) === 'true') {
      localStorage.setItem(getLocalStorageHash(_this, 'gui'), JSON.stringify(_this.getSaveObject()));
    }
  };

  // expose this method publicly
  this.saveToLocalStorageIfPossible = saveToLocalStorage;

  function resetWidth() {
    const root = _this.getRoot();
    root.width += 1;
    Common.defer(function() {
      root.width -= 1;
    });
  }

  if (!params.parent) {
    resetWidth();
  }
};

GUI$1.toggleHide = function() {
  hide = !hide;
  Common.each(hideableGuis, function(gui) {
    gui.domElement.style.display = hide ? 'none' : '';
  });
};

GUI$1.CLASS_AUTO_PLACE = 'a';
GUI$1.CLASS_AUTO_PLACE_CONTAINER = 'ac';
GUI$1.CLASS_MAIN = 'main';
GUI$1.CLASS_CONTROLLER_ROW = 'cr';
GUI$1.CLASS_TOO_TALL = 'taller-than-window';
GUI$1.CLASS_CLOSED = 'closed';
GUI$1.CLASS_CLOSE_BUTTON = 'close-button';
GUI$1.CLASS_CLOSE_TOP = 'close-top';
GUI$1.CLASS_CLOSE_BOTTOM = 'close-bottom';
GUI$1.CLASS_DRAG = 'drag';

GUI$1.DEFAULT_WIDTH = 245;
GUI$1.TEXT_CLOSED = 'Close Controls';
GUI$1.TEXT_OPEN = 'Open Controls';

GUI$1._keydownHandler = function(e) {
  if (document.activeElement.type !== 'text' &&
    (e.which === HIDE_KEY_CODE || e.keyCode === HIDE_KEY_CODE)) {
    GUI$1.toggleHide();
  }
};
dom$1.bind(window, 'keydown', GUI$1._keydownHandler, false);

Common.extend(
  GUI$1.prototype,

  /** @lends GUI.prototype */
  {

    /**
     * Adds a new {@link Controller} to the GUI. The type of controller created
     * is inferred from the initial value of <code>object[property]</code>. For
     * color properties, see {@link addColor}.
     *
     * @param {Object} object The object to be manipulated
     * @param {String} property The name of the property to be manipulated
     * @param {Number} [min] Minimum allowed value
     * @param {Number} [max] Maximum allowed value
     * @param {Number} [step] Increment by which to change value
     * @returns {Controller} The controller that was added to the GUI.
     * @instance
     *
     * @example
     * // Add a string controller.
     * var person = {name: 'Sam'};
     * gui.add(person, 'name');
     *
     * @example
     * // Add a number controller slider.
     * var person = {age: 45};
     * gui.add(person, 'age', 0, 100);
     */
    add: function(object, property) {
      return add(
        this,
        object,
        property,
        {
          factoryArgs: Array.prototype.slice.call(arguments, 2)
        }
      );
    },

    /**
     * Adds a new color controller to the GUI.
     *
     * @param object
     * @param property
     * @returns {Controller} The controller that was added to the GUI.
     * @instance
     *
     * @example
     * var palette = {
     *   color1: '#FF0000', // CSS string
     *   color2: [ 0, 128, 255 ], // RGB array
     *   color3: [ 0, 128, 255, 0.3 ], // RGB with alpha
     *   color4: { h: 350, s: 0.9, v: 0.3 } // Hue, saturation, value
     * };
     * gui.addColor(palette, 'color1');
     * gui.addColor(palette, 'color2');
     * gui.addColor(palette, 'color3');
     * gui.addColor(palette, 'color4');
     */
    addColor: function(object, property) {
      return add(
        this,
        object,
        property,
        {
          color: true
        }
      );
    },

    /**
     * Removes the given controller from the GUI.
     * @param {Controller} controller
     * @instance
     */
    remove: function(controller) {
      // TODO listening?
      this.__ul.removeChild(controller.__li);
      this.__controllers.splice(this.__controllers.indexOf(controller), 1);
      const _this = this;
      Common.defer(function() {
        _this.onResize();
      });
    },

    /**
     * Removes the root GUI from the document and unbinds all event listeners.
     * For subfolders, use `gui.removeFolder(folder)` instead.
     * @instance
     */
    destroy: function() {
      if (this.parent) {
        throw new Error(
          'Only the root GUI should be removed with .destroy(). ' +
          'For subfolders, use gui.removeFolder(folder) instead.'
        );
      }

      if (this.autoPlace) {
        autoPlaceContainer.removeChild(this.domElement);
      }

      const _this = this;
      Common.each(this.__folders, function(subfolder) {
        _this.removeFolder(subfolder);
      });

      dom$1.unbind(window, 'keydown', GUI$1._keydownHandler, false);

      removeListeners(this);
    },

    /**
     * Creates a new subfolder GUI instance.
     * @param name
     * @returns {dat.gui.GUI} The new folder.
     * @throws {Error} if this GUI already has a folder by the specified
     * name
     * @instance
     */
    addFolder: function(name) {
      // We have to prevent collisions on names in order to have a key
      // by which to remember saved values
      if (this.__folders[name] !== undefined) {
        throw new Error('You already have a folder in this GUI by the' +
          ' name "' + name + '"');
      }

      const newGuiParams = { name: name, parent: this };

      // We need to pass down the autoPlace trait so that we can
      // attach event listeners to open/close folder actions to
      // ensure that a scrollbar appears if the window is too short.
      newGuiParams.autoPlace = this.autoPlace;

      // Do we have saved appearance data for this folder?
      if (this.load && // Anything loaded?
        this.load.folders && // Was my parent a dead-end?
        this.load.folders[name]) { // Did daddy remember me?
        // Start me closed if I was closed
        newGuiParams.closed = this.load.folders[name].closed;

        // Pass down the loaded data
        newGuiParams.load = this.load.folders[name];
      }

      const gui = new GUI$1(newGuiParams);
      this.__folders[name] = gui;

      const li = addRow(this, gui.domElement);
      dom$1.addClass(li, 'folder');
      return gui;
    },

    /**
     * Removes a subfolder GUI instance.
     * @param {dat.gui.GUI} folder The folder to remove.
     * @instance
     */
    removeFolder: function(folder) {
      this.__ul.removeChild(folder.domElement.parentElement);

      delete this.__folders[folder.name];

      // Do we have saved appearance data for this folder?
      if (this.load && // Anything loaded?
        this.load.folders && // Was my parent a dead-end?
        this.load.folders[folder.name]) {
        delete this.load.folders[folder.name];
      }

      removeListeners(folder);

      const _this = this;

      Common.each(folder.__folders, function(subfolder) {
        folder.removeFolder(subfolder);
      });

      Common.defer(function() {
        _this.onResize();
      });
    },

    /**
     * Removes all controller from the GUI instance.
     * @instance
     */
    removeAllControllers: function() {
      const _this = this;

      const controllers = _this.__controllers.slice();
      controllers.forEach(controller => {
        _this.remove(controller);
      });
      controllers.length = 0;
    },

    /**
     * Removes all subfolder from the GUI instance.
     * @instance
     */
    removeAllFolders: function() {
      const _this = this;

      const folders = Object.assign({}, _this.__folders);
      for (const name in folders) {
        if (Object.hasOwnProperty.call(folders, name)) {
          const folder = folders[name];
          _this.removeFolder(folder);
        }
      }
    },

    /**
     * Removes all controller and subfolder from the GUI instance.
     * @instance
     */
    removeAll: function() {
      this.removeAllControllers();
      this.removeAllFolders();
    },

    /**
     * Opens the GUI.
     */
    open: function() {
      this.closed = false;
    },

    /**
     * Closes the GUI.
     */
    close: function() {
      this.closed = true;
    },

    /**
    * Hides the GUI.
    */
    hide: function() {
      this.domElement.style.display = 'none';
    },

    /**
    * Shows the GUI.
    */
    show: function() {
      this.domElement.style.display = '';
    },


    onResize: function() {
      // we debounce this function to prevent performance issues when rotating on tablet/mobile
      const root = this.getRoot();
      if (root.scrollable) {
        const top = dom$1.getOffset(root.__ul).top;
        let h = 0;

        Common.each(root.__ul.childNodes, function(node) {
          if (!(root.autoPlace && node === root.__save_row)) {
            h += dom$1.getHeight(node);
          }
        });

        if (window.innerHeight - top - CLOSE_BUTTON_HEIGHT < h) {
          dom$1.addClass(root.domElement, GUI$1.CLASS_TOO_TALL);
          root.__ul.style.height = window.innerHeight - top - CLOSE_BUTTON_HEIGHT + 'px';
        } else {
          dom$1.removeClass(root.domElement, GUI$1.CLASS_TOO_TALL);
          root.__ul.style.height = 'auto';
        }
      }

      if (root.__resize_handle) {
        Common.defer(function() {
          root.__resize_handle.style.height = root.__ul.offsetHeight + 'px';
        });
      }

      if (root.__closeButton) {
        root.__closeButton.style.width = root.width + 'px';
      }
    },

    onResizeDebounced: Common.debounce(function() { this.onResize(); }, 50),

    /**
     * Mark objects for saving. The order of these objects cannot change as
     * the GUI grows. When remembering new objects, append them to the end
     * of the list.
     *
     * @param {...Object} objects
     * @throws {Error} if not called on a top level GUI.
     * @instance
     * @ignore
     */
    remember: function() {
      if (Common.isUndefined(SAVE_DIALOGUE)) {
        SAVE_DIALOGUE = new CenteredDiv();
        SAVE_DIALOGUE.domElement.innerHTML = saveDialogContents;
      }

      if (this.parent) {
        throw new Error('You can only call remember on a top level GUI.');
      }

      const _this = this;

      Common.each(Array.prototype.slice.call(arguments), function(object) {
        if (_this.__rememberedObjects.length === 0) {
          addSaveMenu(_this);
        }
        if (_this.__rememberedObjects.indexOf(object) === -1) {
          _this.__rememberedObjects.push(object);
        }
      });

      if (this.autoPlace) {
        // Set save row width
        setWidth(this, this.width);
      }
    },

    /**
     * @returns {dat.gui.GUI} the topmost parent GUI of a nested GUI.
     * @instance
     */
    getRoot: function() {
      let gui = this;
      while (gui.parent) {
        gui = gui.parent;
      }
      return gui;
    },

    /**
     * @returns {Object} a JSON object representing the current state of
     * this GUI as well as its remembered properties.
     * @instance
     */
    getSaveObject: function() {
      const toReturn = this.load;
      toReturn.closed = this.closed;

      // Am I remembering any values?
      if (this.__rememberedObjects.length > 0) {
        toReturn.preset = this.preset;

        if (!toReturn.remembered) {
          toReturn.remembered = {};
        }

        toReturn.remembered[this.preset] = getCurrentPreset(this);
      }

      toReturn.folders = {};
      Common.each(this.__folders, function(element, key) {
        toReturn.folders[key] = element.getSaveObject();
      });

      return toReturn;
    },

    save: function() {
      if (!this.load.remembered) {
        this.load.remembered = {};
      }

      this.load.remembered[this.preset] = getCurrentPreset(this);
      markPresetModified(this, false);
      this.saveToLocalStorageIfPossible();
    },

    saveAs: function(presetName) {
      if (!this.load.remembered) {
        // Retain default values upon first save
        this.load.remembered = {};
        this.load.remembered[DEFAULT_DEFAULT_PRESET_NAME] = getCurrentPreset(this, true);
      }

      this.load.remembered[presetName] = getCurrentPreset(this);
      this.preset = presetName;
      addPresetOption(this, presetName, true);
      this.saveToLocalStorageIfPossible();
    },

    revert: function(gui) {
      Common.each(this.__controllers, function(controller) {
        // Make revert work on Default.
        if (!this.getRoot().load.remembered) {
          controller.setValue(controller.initialValue);
        } else {
          recallSavedValue(gui || this.getRoot(), controller);
        }

        // fire onFinishChange callback
        if (controller.__onFinishChange) {
          controller.__onFinishChange.call(controller, controller.getValue());
        }
      }, this);

      Common.each(this.__folders, function(folder) {
        folder.revert(folder);
      });

      if (!gui) {
        markPresetModified(this.getRoot(), false);
      }
    },

    listen: function(controller) {
      const init = this.__listening.length === 0;
      this.__listening.push(controller);
      if (init) {
        updateDisplays(this.__listening);
      }
    },

    updateDisplay: function() {
      Common.each(this.__controllers, function(controller) {
        controller.updateDisplay();
      });
      Common.each(this.__folders, function(folder) {
        folder.updateDisplay();
      });
    }
  }
);

/**
 * Add a row to the end of the GUI or before another row.
 *
 * @param gui
 * @param [newDom] If specified, inserts the dom content in the new row
 * @param [liBefore] If specified, places the new row before another row
 *
 * @ignore
 */
function addRow(gui, newDom, liBefore) {
  const li = document.createElement('li');
  if (newDom) {
    li.appendChild(newDom);
  }

  if (liBefore) {
    gui.__ul.insertBefore(li, liBefore);
  } else {
    gui.__ul.appendChild(li);
  }
  gui.onResize();
  return li;
}

function removeListeners(gui) {
  dom$1.unbind(window, 'resize', gui.__resizeHandler);

  if (gui.saveToLocalStorageIfPossible) {
    dom$1.unbind(window, 'unload', gui.saveToLocalStorageIfPossible);
  }
}

function markPresetModified(gui, modified) {
  const opt = gui.__preset_select[gui.__preset_select.selectedIndex];

  if (modified) {
    opt.innerHTML = opt.value + '*';
  } else {
    opt.innerHTML = opt.value;
  }
}

function augmentController(gui, li, controller) {
  controller.__li = li;
  controller.__gui = gui;

  Common.extend(controller, /** @lends Controller.prototype */ {
    /**
     * @param  {Array|Object} options
     * @return {Controller}
     */
    options: function(options) {
      if (arguments.length > 1) {
        const nextSibling = controller.__li.nextElementSibling;
        controller.remove();

        return add(
          gui,
          controller.object,
          controller.property,
          {
            before: nextSibling,
            factoryArgs: [Common.toArray(arguments)]
          }
        );
      }

      if (Common.isArray(options) || Common.isObject(options)) {
        const nextSibling = controller.__li.nextElementSibling;
        controller.remove();

        return add(
          gui,
          controller.object,
          controller.property,
          {
            before: nextSibling,
            factoryArgs: [options]
          }
        );
      }
    },

    /**
     * Sets the name of the controller.
     * @param  {string} name
     * @return {Controller}
     */
    name: function(name) {
      controller.__li.firstElementChild.firstElementChild.innerHTML = name;
      return controller;
    },

    /**
     * Sets controller to listen for changes on its underlying object.
     * @return {Controller}
     */
    listen: function() {
      controller.__gui.listen(controller);
      return controller;
    },

    /**
     * Removes the controller from its parent GUI.
     * @return {Controller}
     */
    remove: function() {
      controller.__gui.remove(controller);
      return controller;
    }
  });

  // All sliders should be accompanied by a box.
  if (controller instanceof NumberControllerSlider) {
    const box = new NumberControllerBox(controller.object, controller.property,
      { min: controller.__min, max: controller.__max, step: controller.__step });

    Common.each(['updateDisplay', 'onChange', 'onFinishChange', 'step', 'min', 'max'], function(method) {
      const pc = controller[method];
      const pb = box[method];
      controller[method] = box[method] = function() {
        const args = Array.prototype.slice.call(arguments);
        pb.apply(box, args);
        return pc.apply(controller, args);
      };
    });

    dom$1.addClass(li, 'has-slider');
    controller.domElement.insertBefore(box.domElement, controller.domElement.firstElementChild);
  } else if (controller instanceof NumberControllerBox) {
    const r = function(returned) {
      // Have we defined both boundaries?
      if (Common.isNumber(controller.__min) && Common.isNumber(controller.__max)) {
        // Well, then lets just replace this with a slider.

        // lets remember if the old controller had a specific name or was listening
        const oldName = controller.__li.firstElementChild.firstElementChild.innerHTML;
        const wasListening = controller.__gui.__listening.indexOf(controller) > -1;

        controller.remove();
        const newController = add(
          gui,
          controller.object,
          controller.property,
          {
            before: controller.__li.nextElementSibling,
            factoryArgs: [controller.__min, controller.__max, controller.__step]
          }
        );

        newController.name(oldName);
        if (wasListening) newController.listen();

        return newController;
      }

      return returned;
    };

    controller.min = Common.compose(r, controller.min);
    controller.max = Common.compose(r, controller.max);
  } else if (controller instanceof BooleanController) {
    dom$1.bind(li, 'click', function() {
      dom$1.fakeEvent(controller.__checkbox, 'click');
    });

    dom$1.bind(controller.__checkbox, 'click', function(e) {
      e.stopPropagation(); // Prevents double-toggle
    });
  } else if (controller instanceof FunctionController) {
    dom$1.bind(li, 'click', function() {
      dom$1.fakeEvent(controller.__button, 'click');
    });

    dom$1.bind(li, 'mouseover', function() {
      dom$1.addClass(controller.__button, 'hover');
    });

    dom$1.bind(li, 'mouseout', function() {
      dom$1.removeClass(controller.__button, 'hover');
    });
  } else if (controller instanceof ColorController) {
    dom$1.addClass(li, 'color');
    controller.updateDisplay = Common.compose(function(val) {
      li.style.borderLeftColor = controller.__color.toString();
      return val;
    }, controller.updateDisplay);

    controller.updateDisplay();
  }

  controller.setValue = Common.compose(function(val) {
    if (gui.getRoot().__preset_select && controller.isModified()) {
      markPresetModified(gui.getRoot(), true);
    }

    return val;
  }, controller.setValue);
}

function recallSavedValue(gui, controller) {
  // Find the topmost GUI, that's where remembered objects live.
  const root = gui.getRoot();

  // Does the object we're controlling match anything we've been told to
  // remember?
  const matchedIndex = root.__rememberedObjects.indexOf(controller.object);

  // Why yes, it does!
  if (matchedIndex !== -1) {
    // Let me fetch a map of controllers for thcommon.isObject.
    let controllerMap = root.__rememberedObjectIndecesToControllers[matchedIndex];

    // Ohp, I believe this is the first controller we've created for this
    // object. Lets make the map fresh.
    if (controllerMap === undefined) {
      controllerMap = {};
      root.__rememberedObjectIndecesToControllers[matchedIndex] =
        controllerMap;
    }

    // Keep track of this controller
    controllerMap[controller.property] = controller;

    // Okay, now have we saved any values for this controller?
    if (root.load && root.load.remembered) {
      const presetMap = root.load.remembered;

      // Which preset are we trying to load?
      let preset;

      if (presetMap[gui.preset]) {
        preset = presetMap[gui.preset];
      } else if (presetMap[DEFAULT_DEFAULT_PRESET_NAME]) {
        // Uhh, you can have the default instead?
        preset = presetMap[DEFAULT_DEFAULT_PRESET_NAME];
      } else {
        // Nada.
        return;
      }

      // Did the loaded object remember thcommon.isObject? &&  Did we remember this particular property?
      if (preset[matchedIndex] && preset[matchedIndex][controller.property] !== undefined) {
        // We did remember something for this guy ...
        const value = preset[matchedIndex][controller.property];

        // And that's what it is.
        controller.initialValue = value;
        controller.setValue(value);
      }
    }
  }
}

function add(gui, object, property, params) {
  if (object[property] === undefined) {
    throw new Error(`Object "${object}" has no property "${property}"`);
  }

  let controller;

  if (params.color) {
    controller = new ColorController(object, property);
  } else {
    const factoryArgs = [object, property].concat(params.factoryArgs);
    controller = ControllerFactory.apply(gui, factoryArgs);
  }

  if (params.before instanceof Controller) {
    params.before = params.before.__li;
  }

  recallSavedValue(gui, controller);

  dom$1.addClass(controller.domElement, 'c');

  const name = document.createElement('span');
  dom$1.addClass(name, 'property-name');
  name.innerHTML = controller.property;

  const container = document.createElement('div');
  container.appendChild(name);
  container.appendChild(controller.domElement);

  const li = addRow(gui, container, params.before);

  dom$1.addClass(li, GUI$1.CLASS_CONTROLLER_ROW);
  if (controller instanceof ColorController) {
    dom$1.addClass(li, 'color');
  } else {
    dom$1.addClass(li, typeof controller.getValue());
  }

  augmentController(gui, li, controller);

  gui.__controllers.push(controller);

  return controller;
}

function getLocalStorageHash(gui, key) {
  // TODO how does this deal with multiple GUI's?
  return document.location.href + '.' + key;
}

function addPresetOption(gui, name, setSelected) {
  const opt = document.createElement('option');
  opt.innerHTML = name;
  opt.value = name;
  gui.__preset_select.appendChild(opt);
  if (setSelected) {
    gui.__preset_select.selectedIndex = gui.__preset_select.length - 1;
  }
}

function showHideExplain(gui, explain) {
  explain.style.display = gui.useLocalStorage ? 'block' : 'none';
}

function addSaveMenu(gui) {
  const div = gui.__save_row = document.createElement('li');

  dom$1.addClass(gui.domElement, 'has-save');

  gui.__ul.insertBefore(div, gui.__ul.firstChild);

  dom$1.addClass(div, 'save-row');

  const gears = document.createElement('span');
  gears.innerHTML = '&nbsp;';
  dom$1.addClass(gears, 'button gears');

  // TODO replace with FunctionController
  const button = document.createElement('span');
  button.innerHTML = 'Save';
  dom$1.addClass(button, 'button');
  dom$1.addClass(button, 'save');

  const button2 = document.createElement('span');
  button2.innerHTML = 'New';
  dom$1.addClass(button2, 'button');
  dom$1.addClass(button2, 'save-as');

  const button3 = document.createElement('span');
  button3.innerHTML = 'Revert';
  dom$1.addClass(button3, 'button');
  dom$1.addClass(button3, 'revert');

  const select = gui.__preset_select = document.createElement('select');

  if (gui.load && gui.load.remembered) {
    Common.each(gui.load.remembered, function(value, key) {
      addPresetOption(gui, key, key === gui.preset);
    });
  } else {
    addPresetOption(gui, DEFAULT_DEFAULT_PRESET_NAME, false);
  }

  dom$1.bind(select, 'change', function() {
    for (let index = 0; index < gui.__preset_select.length; index++) {
      gui.__preset_select[index].innerHTML = gui.__preset_select[index].value;
    }

    gui.preset = this.value;
  });

  div.appendChild(select);
  div.appendChild(gears);
  div.appendChild(button);
  div.appendChild(button2);
  div.appendChild(button3);

  if (SUPPORTS_LOCAL_STORAGE) {
    const explain = document.getElementById('dg-local-explain');
    const localStorageCheckBox = document.getElementById('dg-local-storage');
    const saveLocally = document.getElementById('dg-save-locally');

    saveLocally.style.display = 'block';

    if (localStorage.getItem(getLocalStorageHash(gui, 'isLocal')) === 'true') {
      localStorageCheckBox.setAttribute('checked', 'checked');
    }

    showHideExplain(gui, explain);

    // TODO: Use a boolean controller, fool!
    dom$1.bind(localStorageCheckBox, 'change', function() {
      gui.useLocalStorage = !gui.useLocalStorage;
      showHideExplain(gui, explain);
    });
  }

  const newConstructorTextArea = document.getElementById('dg-new-constructor');

  dom$1.bind(newConstructorTextArea, 'keydown', function(e) {
    if (e.metaKey && (e.which === 67 || e.keyCode === 67)) {
      SAVE_DIALOGUE.hide();
    }
  });

  dom$1.bind(gears, 'click', function() {
    newConstructorTextArea.innerHTML = JSON.stringify(gui.getSaveObject(), undefined, 2);
    SAVE_DIALOGUE.show();
    newConstructorTextArea.focus();
    newConstructorTextArea.select();
  });

  dom$1.bind(button, 'click', function() {
    gui.save();
  });

  dom$1.bind(button2, 'click', function() {
    const presetName = prompt('Enter a new preset name.');
    if (presetName) {
      gui.saveAs(presetName);
    }
  });

  dom$1.bind(button3, 'click', function() {
    gui.revert();
  });

  // div.appendChild(button2);
}

function addResizeHandle(gui) {
  let pmouseX;

  gui.__resize_handle = document.createElement('div');

  Common.extend(gui.__resize_handle.style, {

    width: '6px',
    marginLeft: '-3px',
    height: '200px',
    cursor: 'ew-resize',
    position: 'absolute'
    // border: '1px solid blue'

  });

  function drag(e) {
    e.preventDefault();

    gui.width += pmouseX - e.clientX;
    gui.onResize();
    pmouseX = e.clientX;

    return false;
  }

  function dragStop() {
    dom$1.removeClass(gui.__closeButton, GUI$1.CLASS_DRAG);
    dom$1.unbind(window, 'mousemove', drag);
    dom$1.unbind(window, 'mouseup', dragStop);
  }

  function dragStart(e) {
    e.preventDefault();

    pmouseX = e.clientX;

    dom$1.addClass(gui.__closeButton, GUI$1.CLASS_DRAG);
    dom$1.bind(window, 'mousemove', drag);
    dom$1.bind(window, 'mouseup', dragStop);

    return false;
  }

  dom$1.bind(gui.__resize_handle, 'mousedown', dragStart);
  dom$1.bind(gui.__closeButton, 'mousedown', dragStart);

  gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild);
}

function setWidth(gui, w) {
  gui.domElement.style.width = w + 'px';
  // Auto placed save-rows are position fixed, so we have to
  // set the width manually if we want it to bleed to the edge
  if (gui.__save_row && gui.autoPlace) {
    gui.__save_row.style.width = w + 'px';
  }
  if (gui.__closeButton) {
    gui.__closeButton.style.width = w + 'px';
  }
}

function getCurrentPreset(gui, useInitialValues) {
  const toReturn = {};

  // For each object I'm remembering
  Common.each(gui.__rememberedObjects, function(val, index) {
    const savedValues = {};

    // The controllers I've made for thcommon.isObject by property
    const controllerMap =
      gui.__rememberedObjectIndecesToControllers[index];

    // Remember each value for each property
    Common.each(controllerMap, function(controller, property) {
      savedValues[property] = useInitialValues ? controller.initialValue : controller.getValue();
    });

    // Save the values for thcommon.isObject
    toReturn[index] = savedValues;
  });

  return toReturn;
}

function setPresetSelectIndex(gui) {
  for (let index = 0; index < gui.__preset_select.length; index++) {
    if (gui.__preset_select[index].value === gui.preset) {
      gui.__preset_select.selectedIndex = index;
    }
  }
}

function updateDisplays(controllerArray) {
  if (controllerArray.length !== 0) {
    requestAnimationFrame$1.call(window, function() {
      updateDisplays(controllerArray);
    });
  }

  Common.each(controllerArray, function(c) {
    c.updateDisplay();
  });
}

/**
 * dat-gui JavaScript Controller Library
 * https://github.com/dataarts/dat.gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */


const color = {
  Color: Color,
  math: ColorMath,
  interpret: interpret
};

const controllers = {
  Controller: Controller,
  BooleanController: BooleanController,
  OptionController: OptionController,
  StringController: StringController,
  NumberController: NumberController,
  NumberControllerBox: NumberControllerBox,
  NumberControllerSlider: NumberControllerSlider,
  FunctionController: FunctionController,
  ColorController: ColorController
};

const dom = { dom: dom$1 };

const gui = { GUI: GUI$1 };

const GUI = GUI$1;

var index = {
  color,
  controllers,
  dom,
  gui,
  GUI
};

export { GUI, color, controllers, index as default, dom, gui };
//# sourceMappingURL=dat.gui.esm.js.map
