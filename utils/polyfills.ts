// Essential polyfills for better iOS compatibility

// Polyfill for globalThis (iOS < 12.1)
if (typeof globalThis === 'undefined') {
  (global as any).globalThis = global;
}

// Polyfill for Object.entries (iOS < 12)
if (!Object.entries) {
  Object.entries = function(obj: any) {
    const ownProps = Object.keys(obj);
    let i = ownProps.length;
    const resArray = new Array(i);
    while (i--) {
      resArray[i] = [ownProps[i], obj[ownProps[i]]];
    }
    return resArray;
  };
}

// Polyfill for Array.prototype.find (iOS < 9)
if (!Array.prototype.find) {
  Array.prototype.find = function(predicate: any) {
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    const list = Object(this);
    const length = parseInt(list.length, 10) || 0;
    const thisArg = arguments[1];
    for (let i = 0; i < length; i++) {
      const element = list[i];
      if (predicate.call(thisArg, element, i, list)) {
        return element;
      }
    }
    return undefined;
  };
}

// Polyfill for Promise.finally (iOS < 11.1)
if (Promise && !Promise.prototype.finally) {
  Promise.prototype.finally = function(onFinally: any) {
    return this.then(
      (value) => Promise.resolve(onFinally()).then(() => value),
      (reason) => Promise.resolve(onFinally()).then(() => { throw reason; })
    );
  };
}

// Polyfill for String.prototype.padStart (iOS < 12)
if (!String.prototype.padStart) {
  String.prototype.padStart = function(targetLength: number, padString?: string) {
    targetLength = targetLength >> 0;
    padString = String(typeof padString !== 'undefined' ? padString : ' ');
    if (this.length > targetLength) {
      return String(this);
    } else {
      targetLength = targetLength - this.length;
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length);
      }
      return padString.slice(0, targetLength) + String(this);
    }
  };
}

export {};
