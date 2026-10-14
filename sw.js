/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-7e5eb42b'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "pwa-maskable-512x512.png",
    "revision": "8df36f9e7ec266efe37e0927e458c9a0"
  }, {
    "url": "pwa-512x512.png",
    "revision": "ee5dcd368272de57cc6ecbeaaa04b505"
  }, {
    "url": "pwa-192x192.png",
    "revision": "31794cd313496554362a716da59afa75"
  }, {
    "url": "index.html",
    "revision": "b32496959045496feba643fb8f48caf2"
  }, {
    "url": "icon.svg",
    "revision": "3101c7c6b1324adb630b3f481b960cf5"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "acbe11499818e5f115494d47240b20d6"
  }, {
    "url": "404.html",
    "revision": "66ff9ac814d3c61f00ab02a417ed8149"
  }, {
    "url": "assets/workbox-window.prod.es5-Bd17z0YL.js",
    "revision": null
  }, {
    "url": "assets/index-QNsl8-sg.js",
    "revision": null
  }, {
    "url": "assets/index-MYC5-2VD.css",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "acbe11499818e5f115494d47240b20d6"
  }, {
    "url": "icon.svg",
    "revision": "3101c7c6b1324adb630b3f481b960cf5"
  }, {
    "url": "pwa-192x192.png",
    "revision": "31794cd313496554362a716da59afa75"
  }, {
    "url": "pwa-512x512.png",
    "revision": "ee5dcd368272de57cc6ecbeaaa04b505"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "8df36f9e7ec266efe37e0927e458c9a0"
  }, {
    "url": "manifest.webmanifest",
    "revision": "e8e03e67d122ce9b035306e0bfd7d56c"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
